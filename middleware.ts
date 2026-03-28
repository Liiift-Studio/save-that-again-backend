// Centralized auth middleware with CORS, auth checks, and in-memory sliding window rate limiting
// Note: Actual JWT verification remains in route handlers (jsonwebtoken requires Node.js runtime)
// Rate limiter state resets on cold starts (acceptable for Vercel serverless)

import { NextRequest, NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// CORS configuration
// ---------------------------------------------------------------------------

/** Origins allowed to make cross-origin requests to the API */
const ALLOWED_ORIGINS = [
	'https://savethatagain.com',
	'https://www.savethatagain.com',
	'http://localhost:3000',
];

/** CORS methods permitted on API routes */
const ALLOWED_METHODS = 'GET, POST, PUT, DELETE, OPTIONS';

/** CORS headers permitted on API routes */
const ALLOWED_HEADERS = 'Content-Type, Authorization';

/** Preflight cache duration in seconds (24 hours) */
const CORS_MAX_AGE = '86400';

/**
 * Check whether the given origin is in the allowed list.
 * Returns the origin string if allowed, or null otherwise.
 */
function getAllowedOrigin(request: NextRequest): string | null {
	const origin = request.headers.get('origin');
	if (origin && ALLOWED_ORIGINS.includes(origin)) {
		return origin;
	}
	return null;
}

/**
 * Append CORS response headers to a NextResponse when the request
 * includes a recognized origin. Mobile apps (Flutter) do not send an
 * Origin header, so CORS headers are simply omitted for those requests.
 */
function applyCorsHeaders(response: NextResponse, origin: string | null): NextResponse {
	if (!origin) {
		return response;
	}
	response.headers.set('Access-Control-Allow-Origin', origin);
	response.headers.set('Access-Control-Allow-Methods', ALLOWED_METHODS);
	response.headers.set('Access-Control-Allow-Headers', ALLOWED_HEADERS);
	response.headers.set('Access-Control-Max-Age', CORS_MAX_AGE);
	return response;
}

// ---------------------------------------------------------------------------
// Auth & rate limit configuration
// ---------------------------------------------------------------------------

/** Routes that require a Bearer token in the Authorization header */
const PROTECTED_ROUTE_PREFIXES = [
	'/api/clips',
	'/api/analytics',
	'/api/user',
];

/** Rate limit values per route prefix (requests per minute) */
const RATE_LIMITS: Record<string, number> = {
	'/api/clips': 60,
	'/api/analytics': 30,
	'/api/user': 30,
};

/** Default rate limit for any protected route not explicitly configured */
const DEFAULT_RATE_LIMIT = 60;

/** Sliding window duration in milliseconds (60 seconds) */
const WINDOW_MS = 60_000;

/** Interval for cleaning up stale rate limit entries in milliseconds */
const CLEANUP_INTERVAL_MS = 60_000;

// ---------------------------------------------------------------------------
// Sliding window rate limiter (Edge-compatible, in-memory)
// ---------------------------------------------------------------------------

/** Stores request timestamps per composite key (ip:routePrefix) */
const requestLog = new Map<string, number[]>();

/** Timestamp of the last stale-entry cleanup run */
let lastCleanup = Date.now();

/**
 * Remove entries from the request log that are older than the sliding window.
 * Runs at most once per CLEANUP_INTERVAL_MS to avoid per-request overhead.
 */
function cleanupStaleEntries(): void {
	const now = Date.now();
	if (now - lastCleanup < CLEANUP_INTERVAL_MS) {
		return;
	}
	lastCleanup = now;
	const cutoff = now - WINDOW_MS;

	for (const [key, timestamps] of requestLog) {
		const filtered = timestamps.filter((t) => t > cutoff);
		if (filtered.length === 0) {
			requestLog.delete(key);
		} else {
			requestLog.set(key, filtered);
		}
	}
}

/**
 * Record a request and return the current count within the sliding window.
 * Also prunes expired timestamps for the given key inline.
 */
function recordRequest(key: string): number {
	const now = Date.now();
	const cutoff = now - WINDOW_MS;
	const existing = requestLog.get(key) ?? [];

	// Remove timestamps outside the current window and append the new one
	const active = existing.filter((t) => t > cutoff);
	active.push(now);
	requestLog.set(key, active);

	return active.length;
}

/**
 * Get the earliest timestamp still inside the window for a given key.
 * Used to compute the Retry-After value when a client is rate-limited.
 */
function getWindowResetTime(key: string): number {
	const timestamps = requestLog.get(key);
	if (!timestamps || timestamps.length === 0) {
		return Math.floor(Date.now() / 1000) + 60;
	}
	// The window "resets" when the oldest active timestamp expires
	const oldestActive = timestamps[0];
	return Math.floor((oldestActive + WINDOW_MS) / 1000);
}

// ---------------------------------------------------------------------------
// Route helpers
// ---------------------------------------------------------------------------

/**
 * Determine whether a given pathname is a protected API route
 */
function isProtectedRoute(pathname: string): boolean {
	return PROTECTED_ROUTE_PREFIXES.some(
		(prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
	);
}

/**
 * Get the matching route prefix for a given pathname, or null if none match
 */
function getRoutePrefix(pathname: string): string | null {
	for (const prefix of PROTECTED_ROUTE_PREFIXES) {
		if (pathname === prefix || pathname.startsWith(prefix + '/')) {
			return prefix;
		}
	}
	return null;
}

/**
 * Get the rate limit for a given pathname based on its matching prefix
 */
function getRateLimit(pathname: string): number {
	const prefix = getRoutePrefix(pathname);
	if (prefix) {
		return RATE_LIMITS[prefix] ?? DEFAULT_RATE_LIMIT;
	}
	return DEFAULT_RATE_LIMIT;
}

/**
 * Validate that the Authorization header contains a Bearer token.
 * Returns the token string if valid, or null if missing/malformed.
 */
function extractBearerToken(request: NextRequest): string | null {
	const authHeader = request.headers.get('authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return null;
	}
	const token = authHeader.substring(7).trim();
	return token.length > 0 ? token : null;
}

/**
 * Extract the client IP address from the request.
 * Prefers x-forwarded-for header, falls back to request.ip, then 'unknown'.
 */
function getClientIp(request: NextRequest): string {
	const forwarded = request.headers.get('x-forwarded-for');
	if (forwarded) {
		// x-forwarded-for may contain a comma-separated list; take the first (client) IP
		return forwarded.split(',')[0].trim();
	}
	return request.headers.get('x-real-ip') ?? 'unknown';
}

// ---------------------------------------------------------------------------
// Middleware entry point
// ---------------------------------------------------------------------------

/**
 * Next.js Edge middleware - runs before route handlers.
 * Enforces Bearer token presence and sliding-window rate limiting on protected routes.
 */
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const allowedOrigin = getAllowedOrigin(request);

	// --- CORS preflight ---
	// Handle OPTIONS requests on all API routes before auth or rate limiting
	if (request.method === 'OPTIONS') {
		const preflightResponse = new NextResponse(null, { status: 204 });
		return applyCorsHeaders(preflightResponse, allowedOrigin);
	}

	// Allow public routes (non-API, auth endpoints, health check) to pass through
	if (!isProtectedRoute(pathname)) {
		const response = NextResponse.next();
		return applyCorsHeaders(response, allowedOrigin);
	}

	// Protected route - verify Authorization header presence
	const token = extractBearerToken(request);
	if (!token) {
		const response = NextResponse.json(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
		return applyCorsHeaders(response, allowedOrigin);
	}

	// --- Rate limiting ---
	// Periodically prune stale entries to prevent memory leaks
	cleanupStaleEntries();

	const ip = getClientIp(request);
	const routePrefix = getRoutePrefix(pathname) ?? pathname;
	const rateLimitKey = `${ip}:${routePrefix}`;
	const limit = getRateLimit(pathname);
	const currentCount = recordRequest(rateLimitKey);
	const remaining = Math.max(0, limit - currentCount);
	const resetEpoch = getWindowResetTime(rateLimitKey);

	// Exceeded rate limit — return 429
	if (currentCount > limit) {
		const retryAfter = Math.max(1, resetEpoch - Math.floor(Date.now() / 1000));
		const response = NextResponse.json(
			{
				error: 'Too Many Requests',
				message: `Rate limit of ${limit} requests per minute exceeded. Try again in ${retryAfter} seconds.`,
			},
			{
				status: 429,
				headers: {
					'X-RateLimit-Limit': limit.toString(),
					'X-RateLimit-Remaining': '0',
					'X-RateLimit-Reset': resetEpoch.toString(),
					'Retry-After': retryAfter.toString(),
				},
			}
		);
		return applyCorsHeaders(response, allowedOrigin);
	}

	// Under limit — forward the request with rate limit headers
	const response = NextResponse.next();
	response.headers.set('X-RateLimit-Limit', limit.toString());
	response.headers.set('X-RateLimit-Remaining', remaining.toString());
	response.headers.set('X-RateLimit-Reset', resetEpoch.toString());

	return applyCorsHeaders(response, allowedOrigin);
}

/**
 * Matcher config - only run middleware on API routes.
 * This avoids unnecessary middleware execution on static assets, images, etc.
 */
export const config = {
	matcher: ['/api/:path*'],
};

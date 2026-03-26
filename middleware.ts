// Centralized auth middleware - checks for Bearer token presence on protected API routes
// Note: Actual JWT verification remains in route handlers (jsonwebtoken requires Node.js runtime)

import { NextRequest, NextResponse } from 'next/server';

/** Routes that require a Bearer token in the Authorization header */
const PROTECTED_ROUTE_PREFIXES = [
	'/api/clips',
	'/api/analytics',
	'/api/user',
];

/** Rate limit values per route prefix (requests per minute) - foundation for future enforcement */
const RATE_LIMITS: Record<string, number> = {
	'/api/clips': 60,
	'/api/analytics': 30,
	'/api/user': 30,
};

/** Default rate limit for any protected route not explicitly configured */
const DEFAULT_RATE_LIMIT = 60;

/**
 * Determine whether a given pathname is a protected API route
 */
function isProtectedRoute(pathname: string): boolean {
	return PROTECTED_ROUTE_PREFIXES.some(
		(prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
	);
}

/**
 * Get the rate limit for a given pathname based on its matching prefix
 */
function getRateLimit(pathname: string): number {
	for (const prefix of PROTECTED_ROUTE_PREFIXES) {
		if (pathname === prefix || pathname.startsWith(prefix + '/')) {
			return RATE_LIMITS[prefix] ?? DEFAULT_RATE_LIMIT;
		}
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
 * Next.js Edge middleware - runs before route handlers.
 * Checks for Bearer token presence on protected routes and adds rate limit headers.
 */
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Allow public routes (non-API, auth endpoints, health check) to pass through
	if (!isProtectedRoute(pathname)) {
		return NextResponse.next();
	}

	// Protected route - verify Authorization header presence
	const token = extractBearerToken(request);
	if (!token) {
		return NextResponse.json(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
	}

	// Token is present - forward the request with rate limit headers
	const rateLimit = getRateLimit(pathname);
	const response = NextResponse.next();

	response.headers.set('X-RateLimit-Limit', rateLimit.toString());
	response.headers.set('X-RateLimit-Remaining', rateLimit.toString());
	response.headers.set('X-RateLimit-Reset', Math.floor(Date.now() / 1000 + 60).toString());

	return response;
}

/**
 * Matcher config - only run middleware on API routes.
 * This avoids unnecessary middleware execution on static assets, images, etc.
 */
export const config = {
	matcher: ['/api/:path*'],
};

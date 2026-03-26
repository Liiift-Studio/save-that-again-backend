// Unit tests for middleware.ts - auth gating and rate limit headers on API routes

/**
 * Next.js middleware uses NextRequest/NextResponse from 'next/server'.
 * We mock these to test the middleware function in isolation.
 */

// Minimal mock for NextResponse
const mockNextResponseJson = jest.fn();
const mockNextResponseNext = jest.fn();

jest.mock('next/server', () => {
	/** Helper to create a mock response with readable headers */
	function createMockResponse(headers: Record<string, string> = {}) {
		const headerMap = new Map(Object.entries(headers));
		return {
			headers: {
				set: (key: string, value: string) => headerMap.set(key, value),
				get: (key: string) => headerMap.get(key) ?? null,
			},
		};
	}

	return {
		NextRequest: jest.fn(),
		NextResponse: {
			json: jest.fn((body: unknown, init?: { status?: number }) => ({
				body,
				status: init?.status ?? 200,
			})),
			next: jest.fn(() => createMockResponse()),
		},
	};
});

import { NextResponse } from 'next/server';
import { middleware } from '../middleware';

/** Helper to build a fake NextRequest-like object */
function buildRequest(pathname: string, authorizationHeader?: string) {
	return {
		nextUrl: { pathname },
		headers: {
			get: (name: string) => {
				if (name === 'authorization') return authorizationHeader ?? null;
				return null;
			},
		},
	} as any;
}

describe('middleware - protected routes without auth', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return 401 for /api/clips without Authorization header', () => {
		const request = buildRequest('/api/clips');
		const result = middleware(request);

		expect(NextResponse.json).toHaveBeenCalledWith(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
	});

	it('should return 401 for /api/clips/some-id without Authorization header', () => {
		const request = buildRequest('/api/clips/some-id');
		middleware(request);

		expect(NextResponse.json).toHaveBeenCalledWith(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
	});

	it('should return 401 for /api/user without Authorization header', () => {
		const request = buildRequest('/api/user');
		middleware(request);

		expect(NextResponse.json).toHaveBeenCalledWith(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
	});

	it('should return 401 for /api/analytics without Authorization header', () => {
		const request = buildRequest('/api/analytics');
		middleware(request);

		expect(NextResponse.json).toHaveBeenCalledWith(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
	});

	it('should return 401 when Authorization header has no Bearer prefix', () => {
		const request = buildRequest('/api/clips', 'Basic some-token');
		middleware(request);

		expect(NextResponse.json).toHaveBeenCalledWith(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
	});

	it('should return 401 when Bearer token is empty', () => {
		const request = buildRequest('/api/clips', 'Bearer ');
		middleware(request);

		expect(NextResponse.json).toHaveBeenCalledWith(
			{ error: 'Unauthorized - Bearer token required' },
			{ status: 401 }
		);
	});
});

describe('middleware - public routes', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should pass through for /api/auth/login without auth', () => {
		const request = buildRequest('/api/auth/login');
		middleware(request);

		expect(NextResponse.next).toHaveBeenCalled();
		expect(NextResponse.json).not.toHaveBeenCalled();
	});

	it('should pass through for /api/auth/register without auth', () => {
		const request = buildRequest('/api/auth/register');
		middleware(request);

		expect(NextResponse.next).toHaveBeenCalled();
		expect(NextResponse.json).not.toHaveBeenCalled();
	});

	it('should pass through for / (non-API route) without auth', () => {
		const request = buildRequest('/');
		middleware(request);

		expect(NextResponse.next).toHaveBeenCalled();
		expect(NextResponse.json).not.toHaveBeenCalled();
	});

	it('should pass through for /api/health without auth', () => {
		const request = buildRequest('/api/health');
		middleware(request);

		expect(NextResponse.next).toHaveBeenCalled();
		expect(NextResponse.json).not.toHaveBeenCalled();
	});
});

describe('middleware - valid Bearer token', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should pass through for /api/clips with a valid Bearer token', () => {
		const request = buildRequest('/api/clips', 'Bearer valid-jwt-token');
		middleware(request);

		expect(NextResponse.next).toHaveBeenCalled();
		expect(NextResponse.json).not.toHaveBeenCalled();
	});

	it('should set rate limit headers on the response', () => {
		const request = buildRequest('/api/clips', 'Bearer valid-jwt-token');
		const result = middleware(request);

		// NextResponse.next() was called, and the response should have rate limit headers
		expect(NextResponse.next).toHaveBeenCalled();
		// The response object returned by our mock has a headers.get method
		if (result && result.headers) {
			expect(result.headers.get('X-RateLimit-Limit')).toBe('60');
			expect(Number(result.headers.get('X-RateLimit-Remaining'))).toBeLessThanOrEqual(60);
			expect(result.headers.get('X-RateLimit-Reset')).toBeDefined();
		}
	});

	it('should apply correct rate limit for /api/analytics (30 rpm)', () => {
		const request = buildRequest('/api/analytics', 'Bearer valid-jwt-token');
		const result = middleware(request);

		if (result && result.headers) {
			expect(result.headers.get('X-RateLimit-Limit')).toBe('30');
		}
	});
});

import { NextRequest, NextResponse } from 'next/server';
import { googleAuth } from '@/lib/auth';

/**
 * POST /api/auth/google - Authenticate with Google OAuth
 * Handles both login and registration for Google users
 */
export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { idToken } = body;

		if (!idToken) {
			return NextResponse.json(
				{ error: 'Google ID token is required' },
				{ status: 400 }
			);
		}

		const result = await googleAuth(idToken);

		if ('error' in result) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 401 }
			);
		}

		return NextResponse.json(
			{
				user: {
					id: result.user.id,
					email: result.user.email,
					name: result.user.name,
					profile_picture: result.user.profile_picture,
					auth_provider: result.user.auth_provider,
				},
				token: result.token,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Google auth error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

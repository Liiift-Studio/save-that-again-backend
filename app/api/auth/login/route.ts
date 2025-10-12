import { NextRequest, NextResponse } from 'next/server';
import { loginUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email, password } = body;

		// Validate input
		if (!email || !password) {
			return NextResponse.json(
				{ error: 'Email and password are required' },
				{ status: 400 }
			);
		}

		// Login user
		const result = await loginUser(email, password);

		if ('error' in result) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 401 }
			);
		}

		// Return user and token (exclude password_hash)
		const { password_hash, ...userWithoutPassword } = result.user;
		return NextResponse.json({
			user: userWithoutPassword,
			token: result.token,
		});

	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

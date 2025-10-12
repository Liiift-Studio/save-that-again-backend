import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth';

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { email, password, name } = body;

		// Validate input
		if (!email || !password || !name) {
			return NextResponse.json(
				{ error: 'Email, password, and name are required' },
				{ status: 400 }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			);
		}

		// Validate password length
		if (password.length < 8) {
			return NextResponse.json(
				{ error: 'Password must be at least 8 characters' },
				{ status: 400 }
			);
		}

		// Register user
		const result = await registerUser(email, password, name);

		if ('error' in result) {
			return NextResponse.json(
				{ error: result.error },
				{ status: 400 }
			);
		}

		// Return user and token (exclude password_hash)
		const { password_hash, ...userWithoutPassword } = result.user;
		return NextResponse.json({
			user: userWithoutPassword,
			token: result.token,
		}, { status: 201 });

	} catch (error) {
		console.error('Register error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

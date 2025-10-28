import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { getUserByEmail, getUserById, createUser, createGoogleUser, getUserByGoogleId, type User } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const SALT_ROUNDS = 10;

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

export interface JWTPayload {
	userId: string;
	email: string;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
	return hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
	return compare(password, hash);
}

/**
 * Generate a JWT token for a user
 */
export function generateToken(userId: string, email: string): string {
	const payload: JWTPayload = { userId, email };
	return sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): JWTPayload | null {
	try {
		return verify(token, JWT_SECRET) as JWTPayload;
	} catch (error) {
		return null;
	}
}

/**
 * Register a new user
 */
export async function registerUser(email: string, password: string, name: string): Promise<{ user: User; token: string } | { error: string }> {
	// Check if user already exists
	const existingUser = await getUserByEmail(email);
	if (existingUser) {
		return { error: 'User already exists' };
	}

	// Hash password
	const passwordHash = await hashPassword(password);

	// Create user
	const user = await createUser(email, passwordHash, name);
	if (!user) {
		return { error: 'Failed to create user' };
	}

	// Generate token
	const token = generateToken(user.id, user.email);

	return { user, token };
}

/**
 * Login a user
 */
export async function loginUser(email: string, password: string): Promise<{ user: User; token: string } | { error: string }> {
	// Get user
	const user = await getUserByEmail(email);
	if (!user) {
		return { error: 'Invalid credentials' };
	}

	// Check if user has a password (not OAuth-only account)
	if (!user.password_hash) {
		return { error: 'This account uses Google Sign-In. Please login with Google.' };
	}

	// Verify password
	const isValid = await verifyPassword(password, user.password_hash);
	if (!isValid) {
		return { error: 'Invalid credentials' };
	}

	// Generate token
	const token = generateToken(user.id, user.email);

	return { user, token };
}

/**
 * Get user from token
 */
export async function getUserFromToken(token: string): Promise<User | null> {
	const payload = verifyToken(token);
	if (!payload) {
		return null;
	}

	return getUserById(payload.userId);
}

/**
 * Verify Google ID token and return user info
 */
export async function verifyGoogleToken(idToken: string): Promise<{
	email: string;
	googleId: string;
	name: string | null;
	picture: string | null;
} | null> {
	try {
		const ticket = await googleClient.verifyIdToken({
			idToken,
			audience: GOOGLE_CLIENT_ID,
		});
		const payload = ticket.getPayload();
		
		if (!payload || !payload.email || !payload.sub) {
			return null;
		}

		return {
			email: payload.email,
			googleId: payload.sub,
			name: payload.name || null,
			picture: payload.picture || null,
		};
	} catch (error) {
		console.error('Error verifying Google token:', error);
		return null;
	}
}

/**
 * Login or register user with Google OAuth
 */
export async function googleAuth(idToken: string): Promise<{ user: User; token: string } | { error: string }> {
	// Verify Google token
	const googleUser = await verifyGoogleToken(idToken);
	if (!googleUser) {
		return { error: 'Invalid Google token' };
	}

	// Check if user exists by Google ID
	let user = await getUserByGoogleId(googleUser.googleId);
	
	if (!user) {
		// Check if user exists by email (from email/password auth)
		const existingUser = await getUserByEmail(googleUser.email);
		if (existingUser) {
			return { error: 'Email already registered with email/password. Please login with your password.' };
		}

		// Create new Google user
		user = await createGoogleUser(
			googleUser.email,
			googleUser.googleId,
			googleUser.name,
			googleUser.picture
		);
		
		if (!user) {
			return { error: 'Failed to create user' };
		}
	}

	// Generate JWT token
	const token = generateToken(user.id, user.email);

	return { user, token };
}

/**
 * Extract bearer token from authorization header
 */
export function extractBearerToken(authHeader: string | null): string | null {
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return null;
	}
	return authHeader.substring(7);
}

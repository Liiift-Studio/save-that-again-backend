import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { getUserByEmail, getUserById, createUser, type User } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const SALT_ROUNDS = 10;

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
 * Extract bearer token from authorization header
 */
export function extractBearerToken(authHeader: string | null): string | null {
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return null;
	}
	return authHeader.substring(7);
}

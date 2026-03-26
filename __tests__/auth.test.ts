// Unit tests for lib/auth.ts - password hashing, JWT tokens, and user auth flows

// Set JWT_SECRET before importing auth module (it reads env at import time)
process.env.JWT_SECRET = 'test-secret-key-for-unit-tests';

import {
	hashPassword,
	verifyPassword,
	generateToken,
	verifyToken,
	extractBearerToken,
	registerUser,
	loginUser,
} from '../lib/auth';

// Mock the database module so auth functions don't hit a real database
jest.mock('../lib/db', () => ({
	getUserByEmail: jest.fn(),
	getUserById: jest.fn(),
	createUser: jest.fn(),
	createGoogleUser: jest.fn(),
	getUserByGoogleId: jest.fn(),
}));

// Mock google-auth-library to prevent real OAuth client initialization
jest.mock('google-auth-library', () => ({
	OAuth2Client: jest.fn().mockImplementation(() => ({
		verifyIdToken: jest.fn(),
	})),
}));

import { getUserByEmail, createUser } from '../lib/db';

const mockedGetUserByEmail = getUserByEmail as jest.MockedFunction<typeof getUserByEmail>;
const mockedCreateUser = createUser as jest.MockedFunction<typeof createUser>;

describe('hashPassword and verifyPassword', () => {
	it('should hash a password and verify it correctly', async () => {
		const password = 'my-secret-password';
		const hashed = await hashPassword(password);

		expect(hashed).not.toBe(password);
		expect(hashed.length).toBeGreaterThan(0);

		const isValid = await verifyPassword(password, hashed);
		expect(isValid).toBe(true);
	});

	it('should reject an incorrect password', async () => {
		const hashed = await hashPassword('correct-password');
		const isValid = await verifyPassword('wrong-password', hashed);
		expect(isValid).toBe(false);
	});

	it('should produce different hashes for the same password (salt)', async () => {
		const password = 'same-password';
		const hash1 = await hashPassword(password);
		const hash2 = await hashPassword(password);
		expect(hash1).not.toBe(hash2);
	});
});

describe('generateToken and verifyToken', () => {
	it('should generate a token and verify it round-trip', () => {
		const userId = 'user-123';
		const email = 'test@example.com';

		const token = generateToken(userId, email);
		expect(typeof token).toBe('string');
		expect(token.length).toBeGreaterThan(0);

		const payload = verifyToken(token);
		expect(payload).not.toBeNull();
		expect(payload!.userId).toBe(userId);
		expect(payload!.email).toBe(email);
	});

	it('should return null for an invalid token', () => {
		const payload = verifyToken('not-a-valid-token');
		expect(payload).toBeNull();
	});

	it('should return null for an empty string', () => {
		const payload = verifyToken('');
		expect(payload).toBeNull();
	});

	it('should return null for a tampered token', () => {
		const token = generateToken('user-1', 'a@b.com');
		// Flip a character in the signature portion
		const tampered = token.slice(0, -2) + 'XX';
		const payload = verifyToken(tampered);
		expect(payload).toBeNull();
	});
});

describe('extractBearerToken', () => {
	it('should return null for a null header', () => {
		expect(extractBearerToken(null)).toBeNull();
	});

	it('should return null for an empty string', () => {
		expect(extractBearerToken('')).toBeNull();
	});

	it('should return null when there is no Bearer prefix', () => {
		expect(extractBearerToken('some-token-value')).toBeNull();
	});

	it('should return null for lowercase "bearer " prefix', () => {
		expect(extractBearerToken('bearer abc123')).toBeNull();
	});

	it('should extract the token from a valid Bearer header', () => {
		expect(extractBearerToken('Bearer my-jwt-token')).toBe('my-jwt-token');
	});

	it('should handle Bearer with extra whitespace in the token', () => {
		// The function does substring(7), so leading space in the token value is preserved
		expect(extractBearerToken('Bearer  token-with-leading-space')).toBe(' token-with-leading-space');
	});
});

describe('registerUser', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return error when user already exists', async () => {
		mockedGetUserByEmail.mockResolvedValue({
			id: 'existing-id',
			email: 'taken@example.com',
			password_hash: 'hash',
			name: 'Existing',
			google_id: null,
			auth_provider: 'email',
			profile_picture: null,
			created_at: new Date(),
		});

		const result = await registerUser('taken@example.com', 'password123', 'Test');
		expect('error' in result).toBe(true);
		if ('error' in result) {
			expect(result.error).toBe('User already exists');
		}
	});

	it('should return error when createUser fails', async () => {
		mockedGetUserByEmail.mockResolvedValue(null);
		mockedCreateUser.mockResolvedValue(null);

		const result = await registerUser('new@example.com', 'password123', 'New User');
		expect('error' in result).toBe(true);
		if ('error' in result) {
			expect(result.error).toBe('Failed to create user');
		}
	});

	it('should return user and token on successful registration', async () => {
		mockedGetUserByEmail.mockResolvedValue(null);
		const fakeUser = {
			id: 'new-user-id',
			email: 'new@example.com',
			password_hash: 'hashed',
			name: 'New User',
			google_id: null,
			auth_provider: 'email',
			profile_picture: null,
			created_at: new Date(),
		};
		mockedCreateUser.mockResolvedValue(fakeUser);

		const result = await registerUser('new@example.com', 'password123', 'New User');
		expect('user' in result).toBe(true);
		if ('user' in result) {
			expect(result.user.id).toBe('new-user-id');
			expect(typeof result.token).toBe('string');
		}
	});

	it('should normalize email to lowercase', async () => {
		mockedGetUserByEmail.mockResolvedValue(null);
		mockedCreateUser.mockResolvedValue(null);

		await registerUser('  Upper@Example.COM  ', 'pass', 'Name');
		expect(mockedGetUserByEmail).toHaveBeenCalledWith('upper@example.com');
	});
});

describe('loginUser', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should return error for non-existent user', async () => {
		mockedGetUserByEmail.mockResolvedValue(null);

		const result = await loginUser('nobody@example.com', 'password');
		expect('error' in result).toBe(true);
		if ('error' in result) {
			expect(result.error).toBe('Invalid credentials');
		}
	});

	it('should return error for Google-only account (no password_hash)', async () => {
		mockedGetUserByEmail.mockResolvedValue({
			id: 'google-user',
			email: 'google@example.com',
			password_hash: null,
			name: 'Google User',
			google_id: 'g-123',
			auth_provider: 'google',
			profile_picture: null,
			created_at: new Date(),
		});

		const result = await loginUser('google@example.com', 'password');
		expect('error' in result).toBe(true);
		if ('error' in result) {
			expect(result.error).toContain('Google Sign-In');
		}
	});

	it('should return error for wrong password', async () => {
		const correctHash = await hashPassword('correct-password');
		mockedGetUserByEmail.mockResolvedValue({
			id: 'user-1',
			email: 'user@example.com',
			password_hash: correctHash,
			name: 'User',
			google_id: null,
			auth_provider: 'email',
			profile_picture: null,
			created_at: new Date(),
		});

		const result = await loginUser('user@example.com', 'wrong-password');
		expect('error' in result).toBe(true);
		if ('error' in result) {
			expect(result.error).toBe('Invalid credentials');
		}
	});

	it('should return user and token for correct credentials', async () => {
		const correctHash = await hashPassword('my-password');
		const fakeUser = {
			id: 'user-1',
			email: 'user@example.com',
			password_hash: correctHash,
			name: 'User',
			google_id: null,
			auth_provider: 'email',
			profile_picture: null,
			created_at: new Date(),
		};
		mockedGetUserByEmail.mockResolvedValue(fakeUser);

		const result = await loginUser('user@example.com', 'my-password');
		expect('user' in result).toBe(true);
		if ('user' in result) {
			expect(result.user.id).toBe('user-1');
			expect(typeof result.token).toBe('string');

			// Verify the token contains correct payload
			const payload = verifyToken(result.token);
			expect(payload).not.toBeNull();
			expect(payload!.userId).toBe('user-1');
			expect(payload!.email).toBe('user@example.com');
		}
	});
});

import { sql } from '@vercel/postgres';

/**
 * Database utility functions for Vercel Postgres
 */

export interface User {
	id: string;
	email: string;
	password_hash: string | null;
	name: string | null;
	google_id: string | null;
	auth_provider: string;
	profile_picture: string | null;
	created_at: Date;
}

export interface AudioClip {
	id: string;
	user_id: string;
	title: string;
	timestamp: Date;
	duration: number;
	blob_url: string;
	blob_pathname: string;
	file_size: number;
	tags: string[];
	created_at: Date;
	updated_at: Date;
}

export async function createUser(email: string, passwordHash: string, name: string): Promise<User | null> {
	try {
		const result = await sql<User>`
			INSERT INTO users (email, password_hash, name, auth_provider)
			VALUES (${email}, ${passwordHash}, ${name}, 'email')
			RETURNING *
		`;
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error creating user:', error);
		return null;
	}
}

export async function createGoogleUser(
	email: string,
	googleId: string,
	name: string | null,
	profilePicture: string | null
): Promise<User | null> {
	try {
		const result = await sql<User>`
			INSERT INTO users (email, google_id, name, profile_picture, auth_provider)
			VALUES (${email}, ${googleId}, ${name}, ${profilePicture}, 'google')
			RETURNING *
		`;
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error creating Google user:', error);
		return null;
	}
}

export async function getUserByGoogleId(googleId: string): Promise<User | null> {
	try {
		const result = await sql<User>`
			SELECT * FROM users
			WHERE google_id = ${googleId}
			LIMIT 1
		`;
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error getting user by Google ID:', error);
		return null;
	}
}

export async function getUserByEmail(email: string): Promise<User | null> {
	try {
		const result = await sql<User>`
			SELECT * FROM users
			WHERE email = ${email}
			LIMIT 1
		`;
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error getting user by email:', error);
		return null;
	}
}

export async function getUserById(id: string): Promise<User | null> {
	try {
		const result = await sql<User>`
			SELECT * FROM users
			WHERE id = ${id}
			LIMIT 1
		`;
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error getting user by id:', error);
		return null;
	}
}

export async function createAudioClip(
	userId: string,
	title: string,
	timestamp: Date,
	duration: number,
	blobUrl: string,
	blobPathname: string,
	fileSize: number,
	tags: string[] = []
): Promise<AudioClip | null> {
	try {
		const tagsJson = JSON.stringify(tags);
		const result = await sql<AudioClip>`
			INSERT INTO audio_clips (user_id, title, timestamp, duration, blob_url, blob_pathname, file_size, tags)
			VALUES (${userId}, ${title}, ${timestamp.toISOString()}, ${duration}, ${blobUrl}, ${blobPathname}, ${fileSize}, ${tagsJson}::jsonb)
			RETURNING *
		`;
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error creating audio clip:', error);
		return null;
	}
}

export async function getAudioClipsByUserId(userId: string, limit: number = 50, offset: number = 0): Promise<AudioClip[]> {
	try {
		const result = await sql<AudioClip>`
			SELECT * FROM audio_clips
			WHERE user_id = ${userId}
			ORDER BY timestamp DESC
			LIMIT ${limit}
			OFFSET ${offset}
		`;
		return result.rows;
	} catch (error) {
		console.error('Error getting audio clips:', error);
		return [];
	}
}

export async function getAudioClipById(id: string, userId: string): Promise<AudioClip | null> {
	try {
		const result = await sql<AudioClip>`
			SELECT * FROM audio_clips
			WHERE id = ${id} AND user_id = ${userId}
			LIMIT 1
		`;
		return result.rows[0] || null;
	} catch (error) {
		console.error('Error getting audio clip by id:', error);
		return null;
	}
}

export async function deleteAudioClip(id: string, userId: string): Promise<boolean> {
	try {
		const result = await sql`
			DELETE FROM audio_clips
			WHERE id = ${id} AND user_id = ${userId}
		`;
		return (result.rowCount ?? 0) > 0;
	} catch (error) {
		console.error('Error deleting audio clip:', error);
		return false;
	}
}

export async function countUserClips(userId: string): Promise<number> {
	try {
		const result = await sql<{ count: number }>`
			SELECT COUNT(*) as count
			FROM audio_clips
			WHERE user_id = ${userId}
		`;
		return result.rows[0]?.count || 0;
	} catch (error) {
		console.error('Error counting user clips:', error);
		return 0;
	}
}

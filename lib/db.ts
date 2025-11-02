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
	data_sharing_consent?: boolean;
	analytics_consent?: boolean;
	marketing_consent?: boolean;
	last_settings_update?: Date | null;
	account_deletion_requested?: Date | null;
	account_deletion_scheduled?: Date | null;
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

/**
 * Delete a user account and all associated data
 */
export async function deleteUserAccount(userId: string): Promise<boolean> {
	try {
		// The CASCADE constraint will automatically delete all audio_clips
		const result = await sql`
			DELETE FROM users
			WHERE id = ${userId}
		`;
		return (result.rowCount ?? 0) > 0;
	} catch (error) {
		console.error('Error deleting user account:', error);
		return false;
	}
}

/**
 * Request account deletion (30-day grace period)
 */
export async function requestAccountDeletion(userId: string): Promise<boolean> {
	try {
		const now = new Date();
		const scheduledDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
		
		const result = await sql`
			UPDATE users
			SET account_deletion_requested = ${now.toISOString()},
				account_deletion_scheduled = ${scheduledDate.toISOString()}
			WHERE id = ${userId}
		`;
		return (result.rowCount ?? 0) > 0;
	} catch (error) {
		console.error('Error requesting account deletion:', error);
		return false;
	}
}

/**
 * Cancel account deletion request
 */
export async function cancelAccountDeletion(userId: string): Promise<boolean> {
	try {
		const result = await sql`
			UPDATE users
			SET account_deletion_requested = NULL,
				account_deletion_scheduled = NULL
			WHERE id = ${userId}
		`;
		return (result.rowCount ?? 0) > 0;
	} catch (error) {
		console.error('Error canceling account deletion:', error);
		return false;
	}
}

/**
 * Update user privacy settings
 */
export async function updatePrivacySettings(
	userId: string,
	dataSharing: boolean,
	analytics: boolean,
	marketing: boolean
): Promise<boolean> {
	try {
		const now = new Date();
		const result = await sql`
			UPDATE users
			SET data_sharing_consent = ${dataSharing},
				analytics_consent = ${analytics},
				marketing_consent = ${marketing},
				last_settings_update = ${now.toISOString()}
			WHERE id = ${userId}
		`;
		return (result.rowCount ?? 0) > 0;
	} catch (error) {
		console.error('Error updating privacy settings:', error);
		return false;
	}
}

/**
 * Get all user data for export (GDPR compliance)
 */
export async function getUserDataForExport(userId: string): Promise<{
	user: User | null;
	clips: AudioClip[];
} | null> {
	try {
		const user = await getUserById(userId);
		if (!user) {
			return null;
		}
		
		const clips = await getAudioClipsByUserId(userId, 1000); // Get all clips
		
		return {
			user,
			clips
		};
	} catch (error) {
		console.error('Error getting user data for export:', error);
		return null;
	}
}

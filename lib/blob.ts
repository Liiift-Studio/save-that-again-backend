import { put, del } from '@vercel/blob';

/**
 * Blob storage utilities for Vercel Blob
 */

/**
 * Upload a file to Vercel Blob
 */
export async function uploadAudioBlob(
	file: Buffer | Blob,
	filename: string
): Promise<{ url: string; pathname: string } | { error: string }> {
	try {
		const blob = await put(filename, file, {
			access: 'public',
			addRandomSuffix: true,
		});

		return {
			url: blob.url,
			pathname: blob.pathname,
		};
	} catch (error) {
		console.error('Error uploading to blob:', error);
		return { error: 'Failed to upload file' };
	}
}

/**
 * Delete a file from Vercel Blob
 */
export async function deleteAudioBlob(url: string): Promise<boolean> {
	try {
		await del(url);
		return true;
	} catch (error) {
		console.error('Error deleting from blob:', error);
		return false;
	}
}

/**
 * Generate a unique filename for audio clips
 */
export function generateAudioFilename(userId: string, timestamp: Date): string {
	const dateStr = timestamp.toISOString().replace(/:/g, '-').replace(/\./g, '-');
	return `audio/${userId}/${dateStr}.m4a`;
}

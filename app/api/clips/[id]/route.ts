import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken, extractBearerToken } from '@/lib/auth';
import { getAudioClipById, deleteAudioClip } from '@/lib/db';
import { deleteAudioBlob } from '@/lib/blob';

/**
 * GET /api/clips/[id]
 * Get a specific audio clip
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		// Await params (Next.js 15 requirement)
		const { id } = await params;

		// Authenticate user
		const token = extractBearerToken(request.headers.get('authorization'));
		if (!token) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		const user = await getUserFromToken(token);
		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid token' },
				{ status: 401 }
			);
		}

		// Get clip
		const clip = await getAudioClipById(id, user.id);
		if (!clip) {
			return NextResponse.json(
				{ error: 'Clip not found' },
				{ status: 404 }
			);
		}

		return NextResponse.json({ clip });

	} catch (error) {
		console.error('Get clip error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

/**
 * DELETE /api/clips/[id]
 * Delete a specific audio clip
 */
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		// Await params (Next.js 15 requirement)
		const { id } = await params;

		// Authenticate user
		const token = extractBearerToken(request.headers.get('authorization'));
		if (!token) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 }
			);
		}

		const user = await getUserFromToken(token);
		if (!user) {
			return NextResponse.json(
				{ error: 'Invalid token' },
				{ status: 401 }
			);
		}

		// Get clip to get blob URL
		const clip = await getAudioClipById(id, user.id);
		if (!clip) {
			return NextResponse.json(
				{ error: 'Clip not found' },
				{ status: 404 }
			);
		}

		// Delete from blob storage
		await deleteAudioBlob(clip.blob_url);

		// Delete from database
		const deleted = await deleteAudioClip(id, user.id);
		if (!deleted) {
			return NextResponse.json(
				{ error: 'Failed to delete clip' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });

	} catch (error) {
		console.error('Delete clip error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

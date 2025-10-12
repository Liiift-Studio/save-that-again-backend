import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken, extractBearerToken } from '@/lib/auth';
import { createAudioClip, getAudioClipsByUserId, countUserClips } from '@/lib/db';
import { uploadAudioBlob, generateAudioFilename } from '@/lib/blob';

/**
 * GET /api/clips
 * List all audio clips for the authenticated user
 */
export async function GET(request: NextRequest) {
	try {
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

		// Get query parameters
		const searchParams = request.nextUrl.searchParams;
		const limit = parseInt(searchParams.get('limit') || '50');
		const offset = parseInt(searchParams.get('offset') || '0');

		// Get clips
		const clips = await getAudioClipsByUserId(user.id, limit, offset);
		const total = await countUserClips(user.id);

		return NextResponse.json({
			clips,
			total,
			limit,
			offset,
		});

	} catch (error) {
		console.error('Get clips error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

/**
 * POST /api/clips
 * Upload a new audio clip
 */
export async function POST(request: NextRequest) {
	try {
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

		// Parse form data
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const title = formData.get('title') as string;
		const timestamp = formData.get('timestamp') as string;
		const duration = formData.get('duration') as string;
		const tagsStr = formData.get('tags') as string;

		// Validate input
		if (!file) {
			return NextResponse.json(
				{ error: 'Audio file is required' },
				{ status: 400 }
			);
		}

		if (!title || !timestamp || !duration) {
			return NextResponse.json(
				{ error: 'Title, timestamp, and duration are required' },
				{ status: 400 }
			);
		}

		// Parse tags
		let tags: string[] = [];
		if (tagsStr) {
			try {
				tags = JSON.parse(tagsStr);
			} catch {
				tags = [];
			}
		}

		// Upload to blob storage
		const timestampDate = new Date(timestamp);
		const filename = generateAudioFilename(user.id, timestampDate);
		const fileBuffer = Buffer.from(await file.arrayBuffer());

		const uploadResult = await uploadAudioBlob(fileBuffer, filename);
		if ('error' in uploadResult) {
			return NextResponse.json(
				{ error: uploadResult.error },
				{ status: 500 }
			);
		}

		// Create database entry
		const clip = await createAudioClip(
			user.id,
			title,
			timestampDate,
			parseInt(duration),
			uploadResult.url,
			uploadResult.pathname,
			file.size,
			tags
		);

		if (!clip) {
			return NextResponse.json(
				{ error: 'Failed to create clip' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ clip }, { status: 201 });

	} catch (error) {
		console.error('Upload clip error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

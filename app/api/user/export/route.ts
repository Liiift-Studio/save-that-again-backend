import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, getUserFromToken } from '@/lib/auth';
import { getUserDataForExport } from '@/lib/db';

/**
 * GET /api/user/export
 * Export all user data (GDPR Article 20 - Right to data portability)
 */
export async function GET(request: NextRequest) {
	try {
		// Authenticate user
		const authHeader = request.headers.get('authorization');
		const token = extractBearerToken(authHeader);
		
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

		// Get all user data
		const userData = await getUserDataForExport(user.id);
		
		if (!userData) {
			return NextResponse.json(
				{ error: 'Failed to export user data' },
				{ status: 500 }
			);
		}

		// Sanitize user data (remove sensitive fields)
		const sanitizedUser = {
			id: userData.user?.id,
			email: userData.user?.email,
			name: userData.user?.name,
			auth_provider: userData.user?.auth_provider,
			created_at: userData.user?.created_at,
			data_sharing_consent: userData.user?.data_sharing_consent,
			analytics_consent: userData.user?.analytics_consent,
			marketing_consent: userData.user?.marketing_consent,
			last_settings_update: userData.user?.last_settings_update,
		};

		// Prepare export data
		const exportData = {
			export_date: new Date().toISOString(),
			export_version: '1.0',
			user: sanitizedUser,
			clips: userData.clips.map(clip => ({
				id: clip.id,
				title: clip.title,
				timestamp: clip.timestamp,
				duration: clip.duration,
				file_size: clip.file_size,
				blob_url: clip.blob_url,
				tags: clip.tags,
				created_at: clip.created_at,
				updated_at: clip.updated_at,
			})),
			statistics: {
				total_clips: userData.clips.length,
				total_duration_ms: userData.clips.reduce((sum, clip) => sum + clip.duration, 0),
				total_file_size_bytes: userData.clips.reduce((sum, clip) => sum + clip.file_size, 0),
			}
		};

		// Return as downloadable JSON file
		const filename = `save-that-again-data-${user.id}-${Date.now()}.json`;
		
		return new NextResponse(JSON.stringify(exportData, null, 2), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Content-Disposition': `attachment; filename="${filename}"`,
			},
		});
	} catch (error) {
		console.error('Error exporting user data:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

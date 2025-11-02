import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, getUserFromToken } from '@/lib/auth';
import { updatePrivacySettings, getUserById } from '@/lib/db';

/**
 * PUT /api/user/privacy
 * Update user privacy settings
 */
export async function PUT(request: NextRequest) {
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

		// Parse request body
		const body = await request.json();
		const { data_sharing, analytics, marketing } = body;

		// Validate input
		if (typeof data_sharing !== 'boolean' || 
		    typeof analytics !== 'boolean' || 
		    typeof marketing !== 'boolean') {
			return NextResponse.json(
				{ error: 'Invalid privacy settings format' },
				{ status: 400 }
			);
		}

		// Update settings
		const success = await updatePrivacySettings(
			user.id,
			data_sharing,
			analytics,
			marketing
		);

		if (!success) {
			return NextResponse.json(
				{ error: 'Failed to update privacy settings' },
				{ status: 500 }
			);
		}

		// Get updated user
		const updatedUser = await getUserById(user.id);

		return NextResponse.json({
			message: 'Privacy settings updated successfully',
			settings: {
				data_sharing_consent: updatedUser?.data_sharing_consent,
				analytics_consent: updatedUser?.analytics_consent,
				marketing_consent: updatedUser?.marketing_consent,
				last_updated: updatedUser?.last_settings_update,
			}
		});
	} catch (error) {
		console.error('Error updating privacy settings:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

/**
 * GET /api/user/privacy
 * Get current privacy settings
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

		// Get current settings
		const currentUser = await getUserById(user.id);

		return NextResponse.json({
			settings: {
				data_sharing_consent: currentUser?.data_sharing_consent ?? true,
				analytics_consent: currentUser?.analytics_consent ?? true,
				marketing_consent: currentUser?.marketing_consent ?? false,
				last_updated: currentUser?.last_settings_update,
			}
		});
	} catch (error) {
		console.error('Error getting privacy settings:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

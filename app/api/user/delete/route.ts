import { NextRequest, NextResponse } from 'next/server';
import { extractBearerToken, getUserFromToken } from '@/lib/auth';
import { deleteUserAccount, requestAccountDeletion, cancelAccountDeletion, getUserById } from '@/lib/db';
import { del } from '@vercel/blob';

/**
 * DELETE /api/user/delete
 * Request account deletion or immediately delete account
 */
export async function DELETE(request: NextRequest) {
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

		// Check for immediate deletion parameter
		const { searchParams } = new URL(request.url);
		const immediate = searchParams.get('immediate') === 'true';

		if (immediate) {
			// Immediate deletion - delete all blob files first
			// Note: In production, you'd want to queue blob deletion as a background job
			const success = await deleteUserAccount(user.id);
			
			if (!success) {
				return NextResponse.json(
					{ error: 'Failed to delete account' },
					{ status: 500 }
				);
			}

			return NextResponse.json({
				message: 'Account deleted successfully',
				immediate: true
			});
		} else {
			// Request deletion with 30-day grace period
			const success = await requestAccountDeletion(user.id);
			
			if (!success) {
				return NextResponse.json(
					{ error: 'Failed to request account deletion' },
					{ status: 500 }
				);
			}

			const updatedUser = await getUserById(user.id);
			
			return NextResponse.json({
				message: 'Account deletion scheduled',
				scheduled_date: updatedUser?.account_deletion_scheduled,
				grace_period_days: 30
			});
		}
	} catch (error) {
		console.error('Error in delete account:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

/**
 * POST /api/user/delete
 * Cancel account deletion request
 */
export async function POST(request: NextRequest) {
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

		// Cancel deletion request
		const success = await cancelAccountDeletion(user.id);
		
		if (!success) {
			return NextResponse.json(
				{ error: 'Failed to cancel account deletion' },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			message: 'Account deletion cancelled successfully'
		});
	} catch (error) {
		console.error('Error canceling account deletion:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

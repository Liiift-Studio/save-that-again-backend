// Analytics API endpoint for tracking app usage

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getUserFromToken } from '../../../lib/auth';

export async function GET(request: NextRequest) {
	try {
		// Verify authentication
		const authHeader = request.headers.get('authorization');
		if (!authHeader?.startsWith('Bearer ')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const token = authHeader.substring(7);
		const user = getUserFromToken(token);
		if (!user) {
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
		}

		// Get analytics for this user
		const { rows } = await sql`
			SELECT 
				COUNT(DISTINCT c.id) as total_clips,
				SUM(c.duration) as total_duration_ms,
				MIN(c.created_at) as first_clip,
				MAX(c.created_at) as last_clip
			FROM clips c
			WHERE c.user_id = ${user.id}
		`;

		const stats = rows[0] || {};

		return NextResponse.json({
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			stats: {
				totalClips: parseInt(stats.total_clips) || 0,
				totalDurationMs: parseInt(stats.total_duration_ms) || 0,
				firstClipDate: stats.first_clip,
				lastClipDate: stats.last_clip,
			},
		});
	} catch (error) {
		console.error('Analytics error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch analytics' },
			{ status: 500 }
		);
	}
}

// Track analytics events
export async function POST(request: NextRequest) {
	try {
		// Verify authentication
		const authHeader = request.headers.get('authorization');
		if (!authHeader?.startsWith('Bearer ')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const token = authHeader.substring(7);
		const user = getUserFromToken(token);
		if (!user) {
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
		}

		const body = await request.json();
		const { event, metadata } = body;

		if (!event) {
			return NextResponse.json({ error: 'Event required' }, { status: 400 });
		}

		// Store analytics event (in a real app, use a dedicated analytics table)
		console.log('Analytics event:', {
			user_id: user.id,
			event,
			metadata,
			timestamp: new Date().toISOString(),
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Analytics tracking error:', error);
		return NextResponse.json(
			{ error: 'Failed to track event' },
			{ status: 500 }
		);
	}
}

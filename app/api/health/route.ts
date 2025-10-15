// Health check and monitoring endpoint

import { NextResponse } from 'next/server';
import { verifyBackupSystem, verifyDatabaseIntegrity } from '../../../lib/database-backup';

/**
 * Health check endpoint for monitoring
 * Call this periodically to ensure system is operational
 */
export async function GET() {
	try {
		const startTime = Date.now();

		// Check database backup system
		const backupStatus = await verifyBackupSystem();

		// Check database integrity
		const integrityCheck = await verifyDatabaseIntegrity();

		const responseTime = Date.now() - startTime;

		const health = {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			checks: {
				database: {
					accessible: backupStatus.backupEnabled,
					status: backupStatus.status,
				},
				backups: {
					enabled: backupStatus.backupEnabled,
					provider: 'Neon (automatic)',
				},
				integrity: {
					healthy: integrityCheck.healthy,
					issues: integrityCheck.issues,
				},
			},
			performance: {
				responseTimeMs: responseTime,
			},
			version: '1.0.0',
		};

		// Return 503 if any critical check fails
		if (!backupStatus.backupEnabled || !integrityCheck.healthy) {
			return NextResponse.json(
				{ ...health, status: 'degraded' },
				{ status: 503 }
			);
		}

		return NextResponse.json(health);
	} catch (error) {
		return NextResponse.json(
			{
				status: 'unhealthy',
				error: (error as Error).message,
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		);
	}
}

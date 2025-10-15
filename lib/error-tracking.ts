// Error tracking and monitoring setup

/**
 * Error tracking utility for monitoring application errors
 * 
 * In production, integrate with a service like Sentry:
 * 1. Install: npm install @sentry/nextjs
 * 2. Run: npx @sentry/wizard@latest -i nextjs
 * 3. Set SENTRY_DSN in environment variables
 * 
 * For now, this provides structured error logging
 */

interface ErrorContext {
	user?: {
		id: string;
		email: string;
	};
	request?: {
		url: string;
		method: string;
		headers?: Record<string, string>;
	};
	extra?: Record<string, any>;
}

class ErrorTracker {
	private static instance: ErrorTracker;

	private constructor() {}

	static getInstance(): ErrorTracker {
		if (!ErrorTracker.instance) {
			ErrorTracker.instance = new ErrorTracker();
		}
		return ErrorTracker.instance;
	}

	/**
	 * Log an error with context
	 */
	logError(error: Error, context?: ErrorContext): void {
		const errorData = {
			message: error.message,
			stack: error.stack,
			timestamp: new Date().toISOString(),
			context,
		};

		// Log to console (in production, send to monitoring service)
		console.error('Application Error:', JSON.stringify(errorData, null, 2));

		// In production, uncomment and configure Sentry:
		// if (process.env.SENTRY_DSN) {
		//   Sentry.captureException(error, {
		//     user: context?.user,
		//     tags: {
		//       url: context?.request?.url,
		//       method: context?.request?.method,
		//     },
		//     extra: context?.extra,
		//   });
		// }
	}

	/**
	 * Log a warning
	 */
	logWarning(message: string, context?: ErrorContext): void {
		const warningData = {
			level: 'warning',
			message,
			timestamp: new Date().toISOString(),
			context,
		};

		console.warn('Application Warning:', JSON.stringify(warningData, null, 2));

		// In production, send to monitoring service
	}

	/**
	 * Log an info message
	 */
	logInfo(message: string, context?: ErrorContext): void {
		const infoData = {
			level: 'info',
			message,
			timestamp: new Date().toISOString(),
			context,
		};

		console.log('Application Info:', JSON.stringify(infoData, null, 2));
	}

	/**
	 * Capture a performance metric
	 */
	logPerformance(operation: string, durationMs: number, metadata?: Record<string, any>): void {
		const perfData = {
			operation,
			durationMs,
			timestamp: new Date().toISOString(),
			metadata,
		};

		console.log('Performance Metric:', JSON.stringify(perfData, null, 2));

		// In production, send to monitoring service
		// if (process.env.SENTRY_DSN) {
		//   Sentry.addBreadcrumb({
		//     category: 'performance',
		//     message: operation,
		//     level: 'info',
		//     data: { durationMs, ...metadata },
		//   });
		// }
	}
}

export const errorTracker = ErrorTracker.getInstance();

/**
 * Wrap an async function with error tracking
 */
export function withErrorTracking<T extends (...args: any[]) => Promise<any>>(
	fn: T,
	context?: Omit<ErrorContext, 'request'>
): T {
	return (async (...args: Parameters<T>) => {
		try {
			const start = Date.now();
			const result = await fn(...args);
			const duration = Date.now() - start;
			
			// Log slow operations
			if (duration > 1000) {
				errorTracker.logWarning(`Slow operation: ${fn.name} took ${duration}ms`, context);
			}
			
			return result;
		} catch (error) {
			errorTracker.logError(error as Error, context);
			throw error;
		}
	}) as T;
}

/**
 * Express/Next.js middleware for automatic error tracking
 */
export function errorTrackingMiddleware(error: Error, context: ErrorContext): void {
	errorTracker.logError(error, context);
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
	const [showBanner, setShowBanner] = useState(false);

	useEffect(() => {
		// Check if user has already made a choice
		const consent = localStorage.getItem('cookie-consent');
		if (!consent) {
			// Show banner after a short delay for better UX
			setTimeout(() => setShowBanner(true), 1000);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem('cookie-consent', 'accepted');
		setShowBanner(false);
		// Reload to initialize analytics
		window.location.reload();
	};

	const handleDecline = () => {
		localStorage.setItem('cookie-consent', 'declined');
		setShowBanner(false);
	};

	if (!showBanner) {
		return null;
	}

	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-slide-up">
			<div className="max-w-6xl mx-auto glass-card p-6 rounded-2xl shadow-2xl">
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
					<div className="flex-1">
						<h3 className="text-lg font-bold mb-2">We Value Your Privacy</h3>
						<p className="text-sm text-stone-300">
							We use cookies to analyze site traffic and improve your experience. 
							By accepting, you agree to our use of cookies for analytics.{' '}
							<Link href="/cookies" className="text-gradient hover:underline">
								Learn more
							</Link>
						</p>
					</div>
					<div className="flex gap-3 items-center shrink-0">
						<button
							onClick={handleDecline}
							className="glass-button px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
						>
							Decline
						</button>
						<button
							onClick={handleAccept}
							className="glass-button-primary px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
						>
							Accept
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

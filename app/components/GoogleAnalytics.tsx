'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics() {
	const [consent, setConsent] = useState<boolean | null>(null);

	useEffect(() => {
		// Check if user has previously given consent
		const savedConsent = localStorage.getItem('cookie-consent');
		if (savedConsent === 'accepted') {
			setConsent(true);
		} else if (savedConsent === 'declined') {
			setConsent(false);
		}
	}, []);

	// Only load GA if consent is given
	if (consent !== true) {
		return null;
	}

	return (
		<>
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-XLK1H51ZDL"
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', 'G-XLK1H51ZDL', {
						page_path: window.location.pathname,
					});
				`}
			</Script>
		</>
	);
}

export default function StructuredData() {
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "Save That Again",
		"applicationCategory": "UtilitiesApplication",
		"operatingSystem": "Wear OS, Android, iOS",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD",
			"availability": "https://schema.org/InStock"
		},
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "4.8",
			"ratingCount": "150",
			"bestRating": "5",
			"worstRating": "1"
		},
		"description": "Never miss a moment again. Continuous audio buffer for smart watches, phones, and tablets. Capture the last 5 minutes of audio with a single tap.",
		"softwareVersion": "1.0",
		"datePublished": "2024-01-01",
		"author": {
			"@type": "Organization",
			"name": "Save That Again"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Save That Again",
			"logo": {
				"@type": "ImageObject",
				"url": "https://savethatagain.com/logo.png"
			}
		},
		"screenshot": "https://savethatagain.com/logo.png",
		"featureList": [
			"5-minute rolling audio buffer",
			"One-tap retroactive recording",
			"Cloud storage sync",
			"High-quality AAC audio",
			"Multi-platform support",
			"Privacy-focused design"
		]
	};

	const organizationData = {
		"@context": "https://schema.org",
		"@type": "Organization",
		"name": "Save That Again",
		"url": "https://savethatagain.com",
		"logo": "https://savethatagain.com/logo.png",
		"description": "Retroactive audio recording application for smart watches and mobile devices",
		"sameAs": []
	};

	const faqData = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": [
			{
				"@type": "Question",
				"name": "What is Save That Again?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Save That Again is a retroactive audio recording app that maintains a continuous 5-minute rolling buffer. When something important happens, simply tap your smart watch to save the last 5 minutes permanently."
				}
			},
			{
				"@type": "Question",
				"name": "How does retroactive recording work?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "The app continuously records audio in a 5-minute rolling buffer on your device. When you tap the save button, the last 5 minutes from the buffer are permanently saved and synced to the cloud. The temporary buffer is automatically deleted."
				}
			},
			{
				"@type": "Question",
				"name": "Is Save That Again free?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Yes, Save That Again offers a free tier with up to 10 saved clips and 1GB of cloud storage. Premium plans are available for unlimited clips and additional storage."
				}
			},
			{
				"@type": "Question",
				"name": "What devices are supported?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Save That Again works on Pixel Watch, Android smart watches, Android phones and tablets, and iOS devices."
				}
			},
			{
				"@type": "Question",
				"name": "Is my audio data private?",
				"acceptedAnswer": {
					"@type": "Answer",
					"text": "Yes, privacy is our priority. Only clips you explicitly save are uploaded to the cloud. The rolling buffer stays on your device and is automatically deleted. All data transmission is encrypted."
				}
			}
		]
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
			/>
		</>
	);
}

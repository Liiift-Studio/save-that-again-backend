import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Save That Again - Retroactive Audio Recording for Smart Watch",
		template: "%s | Save That Again"
	},
	description: "Never miss a moment again. Continuous audio buffer for smart watches, phones, and tablets. Capture the last 5 minutes of audio with a single tap. Perfect for baby's first words, music ideas, meetings, and more.",
	keywords: "retroactive audio recording, smart watch recorder, continuous audio buffer, save moments, baby first words, meeting recorder, music ideas, Pixel Watch app, wear os recording, audio buffer app",
	authors: [{ name: "Save That Again" }],
	creator: "Save That Again",
	publisher: "Save That Again",
	metadataBase: new URL('https://savethatagain.com'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://savethatagain.com',
		siteName: 'Save That Again',
		title: 'Save That Again - Never Miss a Moment',
		description: 'Continuous audio buffer for smart watches. Capture the last 5 minutes with one tap.',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again Logo'
		}]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Save That Again - Never Miss a Moment',
		description: 'Continuous audio buffer for smart watches. Capture the last 5 minutes with one tap.',
		images: ['/logo.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	icons: {
		icon: '/favicon.svg',
		apple: '/favicon.svg',
	},
	verification: {
		google: 'google-site-verification-code-here',
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <CookieConsent />
        {children}
      </body>
    </html>
  );
}

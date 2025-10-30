// Privacy Policy page for Save That Again

import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import InteractiveBackground from '../components/InteractiveBackground';

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
			{/* Interactive Background */}
			<InteractiveBackground />
			
			{/* Gradient Background */}
			<div className="fixed inset-0 bg-gradient-radial from-stone-900/20 via-black to-black pointer-events-none z-0" />
			<div className="fixed inset-0 bg-gradient-to-br from-neutral-800/5 via-transparent to-stone-800/5 pointer-events-none z-0" />
			
			{/* Navigation */}
			<nav className="relative z-50 glass-nav">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<Link href="/" className="flex items-center gap-3">
							<Image
								src="/logo-white.svg"
								alt="Save That Again"
								width={32}
								height={32}
								className="drop-shadow-glow"
								priority
							/>
							<span className="font-bold bg-gradient-to-r from-white to-stone-300 bg-clip-text text-transparent" style={{ fontFamily: 'Gamay, sans-serif', fontStretch: '200%', fontSize: '20px', lineHeight: '32px' }}>
								Save That Again
							</span>
						</Link>
						<Link
							href="/login"
							className="glass-button text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform"
						>
							Sign In
						</Link>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="relative z-10 max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 flex-1">
				<h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide">Privacy Policy</h1>
				<p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
				
				<div className="space-y-8 text-gray-300">
					<section>
						<h2 className="text-2xl font-bold mb-4">Introduction</h2>
						<p className="leading-relaxed">
							Save That Again ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and web services.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
						<p className="leading-relaxed mb-4">
							We collect the following types of information:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li><strong>Account Information:</strong> Email address, name, and authentication credentials</li>
							<li><strong>Audio Recordings:</strong> 30-second audio clips you choose to save</li>
							<li><strong>Device Information:</strong> Device type, operating system version, and app version</li>
							<li><strong>Usage Data:</strong> Timestamps of when clips are saved, accessed, or deleted</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
						<p className="leading-relaxed mb-4">
							We use your information to:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>Provide and maintain our service</li>
							<li>Store and sync your audio clips across devices</li>
							<li>Authenticate your account and prevent unauthorized access</li>
							<li>Improve our application and develop new features</li>
							<li>Send you technical notices and support messages</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Audio Recording Privacy</h2>
						<p className="leading-relaxed">
							Your privacy is paramount. The 30-second audio buffer operates entirely on your device and is constantly overwritten. Audio is only saved to our servers when you explicitly press the save button. We do not access, analyze, or share your audio recordings except as necessary to provide the service to you.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Data Storage and Security</h2>
						<p className="leading-relaxed">
							We use industry-standard encryption to protect your data both in transit and at rest. Your audio clips are stored securely in the cloud and are only accessible through your authenticated account. We implement appropriate technical and organizational measures to maintain data security.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Data Retention</h2>
						<p className="leading-relaxed">
							We retain your audio clips until you choose to delete them. Account information is retained while your account is active and for a reasonable period after account closure as required by law or for legitimate business purposes.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Your Rights</h2>
						<p className="leading-relaxed mb-4">
							You have the right to:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>Access your personal data</li>
							<li>Delete your audio clips at any time</li>
							<li>Request deletion of your account and associated data</li>
							<li>Export your data in a portable format</li>
							<li>Opt out of non-essential data collection</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
						<p className="leading-relaxed">
							We use third-party services for cloud storage (Vercel Blob), authentication (Google OAuth), and database management (Supabase). These services have their own privacy policies governing their use of your information.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
						<p className="leading-relaxed">
							Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
						<p className="leading-relaxed">
							We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Contact Us</h2>
						<p className="leading-relaxed">
							If you have questions about this Privacy Policy, please contact us at{' '}
							<Link href="/contact" className="text-[#2196f3] hover:text-[#1976d2]">
								our contact page
							</Link>.
						</p>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}

// Terms of Service page for Save That Again

import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import InteractiveBackground from '../components/InteractiveBackground';

export default function TermsPage() {
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
				<h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wide">Terms of Service</h1>
				<p className="text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
				
				<div className="space-y-8 text-gray-300">
					<section>
						<h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
						<p className="leading-relaxed">
							By accessing or using Save That Again ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not use the Service.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Description of Service</h2>
						<p className="leading-relaxed">
							Save That Again is an audio capture application for Pixel Watch that allows users to save the previous 30 seconds of audio to the cloud. The Service includes mobile applications, web portal, and cloud storage infrastructure.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">User Accounts</h2>
						<p className="leading-relaxed mb-4">
							To use the Service, you must:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>Create an account with accurate and complete information</li>
							<li>Be at least 13 years of age</li>
							<li>Maintain the security of your account credentials</li>
							<li>Notify us immediately of any unauthorized access to your account</li>
							<li>Be responsible for all activities that occur under your account</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
						<p className="leading-relaxed mb-4">
							You agree not to use the Service to:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4">
							<li>Record conversations without proper consent where legally required</li>
							<li>Violate any applicable laws or regulations</li>
							<li>Infringe upon the rights of others, including privacy rights</li>
							<li>Upload malicious code or attempt to harm the Service</li>
							<li>Reverse engineer or attempt to extract the source code</li>
							<li>Use the Service for any commercial purpose without authorization</li>
							<li>Share your account credentials with others</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Recording Consent</h2>
						<p className="leading-relaxed">
							You are solely responsible for ensuring you have the legal right to record and save audio in your jurisdiction. Some locations require consent from all parties being recorded. By using this Service, you agree to comply with all applicable recording laws and obtain necessary consents.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Content Ownership</h2>
						<p className="leading-relaxed">
							You retain all rights to the audio recordings you create using the Service. By using the Service, you grant us a limited license to store, process, and transmit your recordings as necessary to provide the Service to you.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Storage Limitations</h2>
						<p className="leading-relaxed">
							Your account may be subject to storage limits based on your subscription tier. We reserve the right to delete recordings that exceed your storage quota after providing reasonable notice.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Service Availability</h2>
						<p className="leading-relaxed">
							We strive to provide reliable service but do not guarantee uninterrupted access. The Service may be temporarily unavailable for maintenance, updates, or due to circumstances beyond our control. We are not liable for any loss of recordings due to service interruptions.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Termination</h2>
						<p className="leading-relaxed">
							We reserve the right to suspend or terminate your account if you violate these Terms. You may terminate your account at any time through the account settings. Upon termination, your recordings will be deleted in accordance with our data retention policy.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Disclaimer of Warranties</h2>
						<p className="leading-relaxed">
							THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE ERROR-FREE, SECURE, OR UNINTERRUPTED.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
						<p className="leading-relaxed">
							TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF YOUR USE OF THE SERVICE.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Indemnification</h2>
						<p className="leading-relaxed">
							You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Changes to Terms</h2>
						<p className="leading-relaxed">
							We may modify these Terms at any time. We will notify you of material changes by email or through the Service. Continued use of the Service after changes constitutes acceptance of the modified Terms.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Governing Law</h2>
						<p className="leading-relaxed">
							These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to conflict of law principles.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Contact Information</h2>
						<p className="leading-relaxed">
							If you have questions about these Terms, please{' '}
							<Link href="/contact" className="text-[#2196f3] hover:text-[#1976d2]">
								contact us
							</Link>.
						</p>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}

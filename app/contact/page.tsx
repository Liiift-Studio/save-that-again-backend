// Contact page for Save That Again

import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import InteractiveBackground from '../components/InteractiveBackground';

export default function ContactPage() {
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
				<h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-wide">Contact Us</h1>
				
				<div className="space-y-8 text-gray-300">
					<section>
						<p className="text-lg leading-relaxed mb-8">
							Have questions, feedback, or need support? We'd love to hear from you.
						</p>
					</section>

					<section className="glass-card p-8 rounded-2xl">
						<h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
						
						<div className="space-y-6">
							<div>
								<h3 className="font-semibold mb-2 flex items-center gap-2">
									<svg className="w-5 h-5 text-[#2196f3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
									</svg>
									Email Support
								</h3>
								<p className="text-gray-400 ml-7">
									<a href="mailto:support@savethatagain.com" className="text-[#2196f3] hover:text-[#1976d2]">
										support@savethatagain.com
									</a>
								</p>
								<p className="text-sm text-gray-500 ml-7 mt-1">
									We typically respond within 24-48 hours
								</p>
							</div>

							<div>
								<h3 className="font-semibold mb-2 flex items-center gap-2">
									<svg className="w-5 h-5 text-[#2196f3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
									</svg>
									Documentation
								</h3>
								<p className="text-gray-400 ml-7">
									Check out our{' '}
									<Link href="/about" className="text-[#2196f3] hover:text-[#1976d2]">
										About page
									</Link>{' '}
									for more information about how Save That Again works.
								</p>
							</div>

							<div>
								<h3 className="font-semibold mb-2 flex items-center gap-2">
									<svg className="w-5 h-5 text-[#2196f3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									Legal
								</h3>
								<p className="text-gray-400 ml-7">
									<Link href="/privacy" className="text-[#2196f3] hover:text-[#1976d2]">
										Privacy Policy
									</Link>
									{' • '}
									<Link href="/terms" className="text-[#2196f3] hover:text-[#1976d2]">
										Terms of Service
									</Link>
								</p>
							</div>
						</div>
					</section>

					<section className="glass-card p-8 rounded-2xl">
						<h2 className="text-2xl font-bold mb-4">Report a Bug</h2>
						<p className="text-gray-400 mb-4">
							Found a bug? Please email us with:
						</p>
						<ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
							<li>Description of the issue</li>
							<li>Steps to reproduce</li>
							<li>Device and app version</li>
							<li>Screenshots if applicable</li>
						</ul>
						<p className="text-gray-400 mt-4">
							Send bug reports to:{' '}
							<a href="mailto:bugs@savethatagain.com" className="text-[#2196f3] hover:text-[#1976d2]">
								bugs@savethatagain.com
							</a>
						</p>
					</section>

					<section className="glass-card p-8 rounded-2xl">
						<h2 className="text-2xl font-bold mb-4">Business Inquiries</h2>
						<p className="text-gray-400">
							For partnership opportunities, press inquiries, or other business matters, please contact:{' '}
							<a href="mailto:business@savethatagain.com" className="text-[#2196f3] hover:text-[#1976d2]">
								business@savethatagain.com
							</a>
						</p>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}

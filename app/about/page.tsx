// About page for Save That Again

import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import InteractiveBackground from '../components/InteractiveBackground';
import BufferDemo from '../components/BufferDemo';

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
			{/* Interactive Background */}
			<InteractiveBackground />
			
			{/* Gradient Background */}
			<div className="fixed inset-0 bg-gradient-radial from-blue-900/20 via-black to-black pointer-events-none z-0" />
			<div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none z-0" />
			
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
							<span className="font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent" style={{ fontFamily: 'Gamay, sans-serif', fontStretch: '200%', fontSize: '20px', lineHeight: '32px' }}>
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
				<h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-wide">About Save That Again</h1>
				
				<div className="space-y-8 text-gray-300">
					<section>
						<h2 className="text-2xl font-bold mb-4">Never Miss a Moment</h2>
						<p className="leading-relaxed">
							Save That Again is a revolutionary audio capture app for Pixel Watch that solves a common problem: capturing something important that was just said. Whether it's a brilliant idea, a funny quote, or an important instruction, Save That Again ensures you never lose those precious moments.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">How It Works</h2>
						<p className="leading-relaxed mb-6">
							Save That Again continuously buffers the last 30 seconds of audio in the background on your Pixel Watch. When you press the save button, it instantly captures those previous 30 seconds and stores them securely in the cloud.
						</p>
						
						{/* Interactive Buffer Demo */}
						<BufferDemo />

						<div className="mt-6">
							<h3 className="text-lg font-semibold mb-3 text-blue-400">Key Features</h3>
							<ul className="list-disc list-inside space-y-2 ml-4">
								<li>Runs quietly in the background on your Pixel Watch</li>
								<li>Press the button to save the last 30 seconds</li>
								<li>Automatically syncs to the cloud</li>
								<li>Access your clips from any device via the web portal</li>
								<li>Download, share, or delete clips as needed</li>
							</ul>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Privacy First</h2>
						<p className="leading-relaxed">
							Your privacy is our top priority. Audio is only saved when you explicitly press the save button. The 30-second buffer is constantly overwritten and is never stored or transmitted unless you choose to save it. All saved clips are encrypted and only accessible by you.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-bold mb-4">Our Mission</h2>
						<p className="leading-relaxed">
							We believe that life's most important moments often happen unexpectedly. Save That Again empowers you to capture those spontaneous instances of brilliance, humor, and importance without the need to predict when they'll occur.
						</p>
					</section>

					<section className="pt-8">
						<Link
							href="/signup"
							className="inline-block glass-button px-8 py-3 rounded-full hover:scale-105 transition-transform"
						>
							Get Started
						</Link>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}

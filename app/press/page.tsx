// Press page with media kit and press resources
import Link from 'next/link';
import Footer from '../components/Footer';
import InteractiveBackground from '../components/InteractiveBackground';

export default function PressPage() {
	return (
		<div className="min-h-screen relative">
			<InteractiveBackground />
			
			{/* Navigation */}
			<nav className="glass-nav fixed top-0 left-0 right-0 z-50">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<Link 
						href="/" 
						className="text-xl font-bold hover:opacity-80 transition-opacity"
						style={{ fontFamily: 'Gamay', fontStretch: '200%' }}
					>
						SAVE THAT AGAIN
					</Link>
				</div>
			</nav>

			<main className="relative z-10 pt-24 pb-16 px-6">
				<div className="max-w-4xl mx-auto">
					<h1 className="text-5xl md:text-6xl font-bold mb-8 text-gradient">
						PRESS
					</h1>

					{/* About Section */}
					<section className="mb-12 glass-card p-8 rounded-xl">
						<h2 className="text-2xl font-bold mb-4">About Save That Again</h2>
						<p className="text-lg mb-4 text-stone-300">
							Save That Again is a revolutionary audio recording application that captures what you wish you had been recording. With a continuous 5-minute rolling buffer, users can retroactively save important moments with a simple tap—perfect for musicians, journalists, educators, and anyone who needs to capture spontaneous brilliance.
						</p>
						<p className="text-lg text-stone-300">
							Available on Wear OS smartwatches and mobile devices, Save That Again brings professional-grade audio capture to your wrist, ensuring you never miss another important moment.
						</p>
					</section>

					{/* Key Facts */}
					<section className="mb-12 glass-card p-8 rounded-xl">
						<h2 className="text-2xl font-bold mb-4">Key Facts</h2>
						<ul className="space-y-3 text-stone-300">
							<li className="flex items-start">
								<span className="text-stone-400 mr-3">•</span>
								<span><strong>Platform:</strong> Wear OS, iOS, Android</span>
							</li>
							<li className="flex items-start">
								<span className="text-stone-400 mr-3">•</span>
								<span><strong>Technology:</strong> 5-minute rolling buffer with instant retroactive save</span>
							</li>
							<li className="flex items-start">
								<span className="text-stone-400 mr-3">•</span>
								<span><strong>Audio Quality:</strong> High-quality AAC format (128kbps, 44.1kHz)</span>
							</li>
							<li className="flex items-start">
								<span className="text-stone-400 mr-3">•</span>
								<span><strong>Privacy:</strong> Local-first with optional cloud backup</span>
							</li>
							<li className="flex items-start">
								<span className="text-stone-400 mr-3">•</span>
								<span><strong>Use Cases:</strong> Music composition, interviews, lectures, meetings, voice notes</span>
							</li>
						</ul>
					</section>

					{/* Press Kit */}
					<section className="mb-12 glass-card p-8 rounded-xl">
						<h2 className="text-2xl font-bold mb-6">Press Kit</h2>
						
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold mb-3 text-stone-400">Brand Assets</h3>
								<ul className="space-y-2 text-stone-300">
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span>Logo files (SVG, PNG) available in black and white variants</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span>Brand colors: #2196f3 (Primary Blue), #000000 (Background), #e0e0e0 (Text)</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span>Typography: Gamay (headings), Halyard Text (body)</span>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-3 text-stone-400">Screenshots & Media</h3>
								<p className="text-stone-300 mb-3">
									High-resolution screenshots and promotional materials available upon request.
								</p>
								<p className="text-stone-300">
									Contact: <a href="mailto:press@savethatagain.com" className="text-stone-400 hover:text-blue-300 transition-colors">press@savethatagain.com</a>
								</p>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-3 text-stone-400">Company Information</h3>
								<p className="text-stone-300">
									For detailed company information, product specifications, or to schedule an interview, please reach out to our press team.
								</p>
							</div>
						</div>
					</section>

					{/* Contact Information */}
					<section className="mb-12 glass-card p-8 rounded-xl">
						<h2 className="text-2xl font-bold mb-4">Media Contact</h2>
						<div className="space-y-3 text-stone-300">
							<p>
								<strong>Press Inquiries:</strong> <a href="mailto:press@savethatagain.com" className="text-stone-400 hover:text-blue-300 transition-colors">press@savethatagain.com</a>
							</p>
							<p>
								<strong>General Inquiries:</strong> <a href="mailto:contact@savethatagain.com" className="text-stone-400 hover:text-blue-300 transition-colors">contact@savethatagain.com</a>
							</p>
							<p>
								<strong>Business Development:</strong> <a href="mailto:business@savethatagain.com" className="text-stone-400 hover:text-blue-300 transition-colors">business@savethatagain.com</a>
							</p>
						</div>
					</section>

					{/* Recent News */}
					<section className="mb-12 glass-card p-8 rounded-xl">
						<h2 className="text-2xl font-bold mb-4">Recent News</h2>
						<p className="text-stone-300">
							Latest updates and announcements coming soon.
						</p>
					</section>

					{/* Navigation Links */}
					<section className="flex flex-wrap gap-4 justify-center mt-12">
						<Link href="/about" className="glass-button px-6 py-3 rounded-lg hover:scale-105 transition-transform">
							About
						</Link>
						<Link href="/contact" className="glass-button px-6 py-3 rounded-lg hover:scale-105 transition-transform">
							Contact
						</Link>
						<Link href="/" className="glass-button-primary px-6 py-3 rounded-lg hover:scale-105 transition-transform">
							Home
						</Link>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}

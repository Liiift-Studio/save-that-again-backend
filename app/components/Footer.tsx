// Footer component for Save That Again

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative z-10 border-t border-stone-800 bg-black/50 backdrop-blur-sm mt-16">
			<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Brand Column */}
					<div className="col-span-1 md:col-span-2 text-center md:text-left">
						<Link href="/" className="flex items-center gap-3 mb-4 justify-center md:justify-start">
							<Image
								src="/logo-white.svg"
								alt="Save That Again"
								width={32}
								height={32}
								className="drop-shadow-glow"
							/>
							<span className="font-bold bg-gradient-to-r from-white to-stone-300 bg-clip-text text-transparent" style={{ fontFamily: 'Halyard Text, sans-serif', fontSize: '20px', lineHeight: '32px' }}>
								Save That Again
							</span>
						</Link>
						<p className="text-stone-400 text-sm mb-4">
							Never miss a moment. Capture the last 30 seconds of audio with a simple button press on your Pixel Watch.
						</p>
						<p className="text-stone-500 text-xs">
							© {currentYear} Save That Again. All rights reserved.
						</p>
					</div>

					{/* Product Column */}
					<div className="text-center md:text-left">
						<h5 className="font-semibold mb-4">Product</h5>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="/about" className="text-stone-400 hover:text-white transition-colors">
									About
								</Link>
							</li>
							<li>
								<Link href="/clips" className="text-stone-400 hover:text-white transition-colors">
									Your Clips
								</Link>
							</li>
						</ul>
					</div>

					{/* Legal Column */}
					<div className="text-center md:text-left">
						<h5 className="font-semibold mb-4">Legal</h5>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="/privacy" className="text-stone-400 hover:text-white transition-colors">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="/terms" className="text-stone-400 hover:text-white transition-colors">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link href="/contact" className="text-stone-400 hover:text-white transition-colors">
									Contact
								</Link>
							</li>
							<li>
								<Link href="/press" className="text-stone-400 hover:text-white transition-colors">
									Press
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}

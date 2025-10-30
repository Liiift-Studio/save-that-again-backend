// Internal brand package and style guide - not linked publicly but accessible via URL
import Link from 'next/link';
import InteractiveBackground from '../components/InteractiveBackground';
import Footer from '../components/Footer';

export default function BrandPage() {
	return (
		<div className="min-h-screen relative">
			<InteractiveBackground />
			
			{/* Navigation */}
			<nav className="glass-nav fixed top-0 left-0 right-0 z-50">
				<div className="max-w-6xl mx-auto px-6 py-4">
					<Link 
						href="/" 
						className="text-xl font-bold hover:opacity-80 transition-opacity"
						style={{ fontFamily: 'Halyard Text' }}
					>
						SAVE THAT AGAIN
					</Link>
				</div>
			</nav>

			<main className="relative z-10 pt-24 pb-16 px-6">
				<div className="max-w-6xl mx-auto">
					<h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
						BRAND PACKAGE
					</h1>
					<p className="text-xl text-stone-400 mb-12">Internal reference for all brand and style decisions</p>

					{/* Typography */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Typography</h2>
						
						<div className="space-y-8">
							<div>
								<h3 className="text-2xl font-semibold mb-4 text-stone-400">Gamay (Display Font)</h3>
								<div className="space-y-4">
									<div className="p-6 bg-black/40 rounded-lg border border-stone-700">
										<p className="text-sm text-stone-400 mb-2">Headings - 200% Stretch, Bold</p>
										<h1 className="text-5xl font-bold" style={{ fontStretch: '200%' }}>The Quick Brown Fox</h1>
									</div>
									<div className="p-6 bg-black/40 rounded-lg border border-stone-700">
										<p className="text-sm text-stone-400 mb-2">H1 - 170% Stretch</p>
										<h1 className="text-5xl font-bold">Jumps Over Lazy Dogs</h1>
									</div>
									<div className="p-6 bg-black/40 rounded-lg border border-stone-700">
										<p className="text-sm text-stone-400 mb-2">H2 - Uppercase, Letter Spacing 0.02em</p>
										<h2 className="text-3xl font-bold">SAVE THAT AGAIN</h2>
									</div>
								</div>
								<div className="mt-4 p-4 bg-stone-950/30 rounded-lg">
									<p className="text-sm text-stone-300">
										<strong>Usage:</strong> All headings (H1-H6), logo text, display elements<br/>
										<strong>Font Stretch:</strong> 60%-200% (variable)<br/>
										<strong>Font Weight:</strong> 100-900 (variable)<br/>
										<strong>Format:</strong> WOFF2, WOFF
									</p>
								</div>
							</div>

							<div>
								<h3 className="text-2xl font-semibold mb-4 text-stone-400">Halyard Text (Body Font)</h3>
								<div className="space-y-4">
									<div className="p-6 bg-black/40 rounded-lg border border-stone-700">
										<p className="text-sm text-stone-400 mb-2" style={{ fontFamily: 'Halyard Text' }}>Body Text - Regular</p>
										<p className="text-lg" style={{ fontFamily: 'Halyard Text' }}>
											The quick brown fox jumps over the lazy dog. This is body copy with excellent readability and clean letterforms designed for extended reading.
										</p>
									</div>
									<div className="p-6 bg-black/40 rounded-lg border border-stone-700">
										<p className="text-sm text-stone-400 mb-2" style={{ fontFamily: 'Halyard Text' }}>Body Text - Bold</p>
										<p className="text-lg font-bold" style={{ fontFamily: 'Halyard Text' }}>
											Important information stands out with bold weight while maintaining the same clean aesthetic.
										</p>
									</div>
								</div>
								<div className="mt-4 p-4 bg-stone-950/30 rounded-lg">
									<p className="text-sm text-stone-300">
										<strong>Usage:</strong> All body text, paragraphs, UI elements, buttons<br/>
										<strong>Line Height:</strong> 1.4 (enforced globally)<br/>
										<strong>Font Weight:</strong> 100-900 (variable)<br/>
										<strong>Format:</strong> WOFF2, WOFF
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* Color Palette */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Color Palette</h2>
						
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Primary Colors</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg" style={{ background: '#000000' }}></div>
										<div>
											<p className="font-mono text-sm">#000000</p>
											<p className="text-stone-400 text-sm">Background (True Black)</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg border border-stone-700" style={{ background: '#e0e0e0' }}></div>
										<div>
											<p className="font-mono text-sm">#e0e0e0</p>
											<p className="text-stone-400 text-sm">Foreground (Light Gray)</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg" style={{ background: '#2196f3' }}></div>
										<div>
											<p className="font-mono text-sm">#2196f3</p>
											<p className="text-stone-400 text-sm">Accent Blue (Primary)</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg" style={{ background: '#1976d2' }}></div>
										<div>
											<p className="font-mono text-sm">#1976d2</p>
											<p className="text-stone-400 text-sm">Accent Blue Hover</p>
										</div>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">UI Colors</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg" style={{ background: '#1a1a1a' }}></div>
										<div>
											<p className="font-mono text-sm">#1a1a1a</p>
											<p className="text-stone-400 text-sm">Card Background</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg" style={{ background: '#404040' }}></div>
										<div>
											<p className="font-mono text-sm">#404040</p>
											<p className="text-stone-400 text-sm">Border Gray</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg" style={{ background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #c084fc)' }}></div>
										<div>
											<p className="font-mono text-sm">Gradient</p>
											<p className="text-stone-400 text-sm">Text Gradient (Blue→Purple)</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="mt-8 p-4 bg-stone-950/30 rounded-lg">
							<p className="text-sm text-stone-300">
								<strong>Usage Guidelines:</strong><br/>
								• Use true black (#000000) for backgrounds to optimize OLED displays<br/>
								• Accent blue (#2196f3) for interactive elements, links, and CTAs<br/>
								• Text gradient for hero headings and special emphasis<br/>
								• Maintain WCAG AA contrast ratios for accessibility
							</p>
						</div>
					</section>

					{/* Glassmorphism */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Glassmorphism Effects</h2>
						
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Glass Components</h3>
								<div className="space-y-4">
									<div className="glass-nav p-4 rounded-lg">
										<p className="text-sm font-mono mb-1">.glass-nav</p>
										<p className="text-xs text-stone-400">Navigation bar with blur effect</p>
									</div>
									<div className="glass-card p-4 rounded-lg">
										<p className="text-sm font-mono mb-1">.glass-card</p>
										<p className="text-xs text-stone-400">Standard card with gradient border</p>
									</div>
									<div className="glass-button p-4 rounded-lg">
										<p className="text-sm font-mono mb-1">.glass-button</p>
										<p className="text-xs text-stone-400">Button with subtle glass effect</p>
									</div>
									<div className="glass-button-primary p-4 rounded-lg">
										<p className="text-sm font-mono mb-1">.glass-button-primary</p>
										<p className="text-xs text-stone-400">Primary CTA with gradient</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Technical Specs</h3>
								<div className="p-4 bg-black/40 rounded-lg border border-stone-700 font-mono text-sm space-y-2">
									<p><span className="text-stone-400">backdrop-filter:</span> blur(4px-12px)</p>
									<p><span className="text-stone-400">background:</span> rgba(30, 58, 138, 0.15-0.4)</p>
									<p><span className="text-stone-400">border:</span> 1px solid rgba(168, 162, 158, 0.2-0.5)</p>
									<p><span className="text-stone-400">box-shadow:</span> 0 8px 32px rgba(0, 0, 0, 0.3)</p>
								</div>
							</div>
						</div>
					</section>

					{/* Spacing & Layout */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Spacing & Layout</h2>
						
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Container Widths</h3>
								<div className="space-y-2 font-mono text-sm">
									<p><span className="text-stone-400">max-w-4xl:</span> 56rem (896px) - Standard content</p>
									<p><span className="text-stone-400">max-w-6xl:</span> 72rem (1152px) - Wide content</p>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Padding Standards</h3>
								<div className="space-y-2 font-mono text-sm">
									<p><span className="text-stone-400">Section padding:</span> py-16 px-6</p>
									<p><span className="text-stone-400">Card padding:</span> p-8</p>
									<p><span className="text-stone-400">Button padding:</span> px-6 py-3</p>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Border Radius</h3>
								<div className="space-y-2 font-mono text-sm">
									<p><span className="text-stone-400">Cards:</span> rounded-xl (12px)</p>
									<p><span className="text-stone-400">Buttons:</span> rounded-lg (8px)</p>
									<p><span className="text-stone-400">Inputs:</span> rounded-md (6px)</p>
								</div>
							</div>
						</div>
					</section>

					{/* Animations */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Animations</h2>
						
						<div className="grid md:grid-cols-3 gap-6">
							<div className="glass-card-small p-6 rounded-lg animate-float">
								<p className="text-sm font-mono mb-2">.animate-float</p>
								<p className="text-xs text-stone-400">6s ease-in-out infinite</p>
							</div>
							<div className="glass-card-small p-6 rounded-lg hover:scale-105 transition-transform">
								<p className="text-sm font-mono mb-2">hover:scale-105</p>
								<p className="text-xs text-stone-400">Hover me for scale effect</p>
							</div>
							<div className="glass-button p-6 rounded-lg pulse-button">
								<p className="text-sm font-mono mb-2">.pulse-button</p>
								<p className="text-xs text-stone-400">Pulsing opacity effect</p>
							</div>
						</div>

						<div className="mt-6 p-4 bg-stone-950/30 rounded-lg">
							<p className="text-sm text-stone-300">
								<strong>Timing:</strong> Use 0.3s for UI transitions, 2-8s for ambient animations<br/>
								<strong>Easing:</strong> ease-in-out for smooth, natural motion
							</p>
						</div>
					</section>

					{/* Component Patterns */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Component Patterns</h2>
						
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Navigation</h3>
								<p className="text-stone-300 mb-2">Fixed top navigation with glass effect</p>
								<div className="p-4 bg-black/40 rounded-lg border border-stone-700 font-mono text-xs overflow-x-auto">
									<pre>{`<nav className="glass-nav fixed top-0 left-0 right-0 z-50">
  <div className="max-w-4xl mx-auto px-6 py-4">
    <Link href="/" className="text-xl font-bold">LOGO</Link>
  </div>
</nav>`}</pre>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Interactive Background</h3>
								<p className="text-stone-300 mb-2">Animated gradient background component</p>
								<div className="p-4 bg-black/40 rounded-lg border border-stone-700 font-mono text-xs overflow-x-auto">
									<pre>{`<InteractiveBackground />`}</pre>
								</div>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Footer</h3>
								<p className="text-stone-300 mb-2">Standard footer with links and branding</p>
								<div className="p-4 bg-black/40 rounded-lg border border-stone-700 font-mono text-xs overflow-x-auto">
									<pre>{`<Footer />`}</pre>
								</div>
							</div>
						</div>
					</section>

					{/* Usage Guidelines */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Usage Guidelines</h2>
						
						<div className="space-y-6">
							<div>
								<h3 className="text-xl font-semibold pb-3 text-stone-400">Do's</h3>
								<ul className="space-y-2 text-stone-300">
									<li className="flex items-start">
										<span className="text-green-400 mr-3">✓</span>
										<span>Use Gamay for all headings with wide stretch (170%-200%)</span>
									</li>
									<li className="flex items-start">
										<span className="text-green-400 mr-3">✓</span>
										<span>Maintain 1.4 line-height for optimal readability</span>
									</li>
									<li className="flex items-start">
										<span className="text-green-400 mr-3">✓</span>
										<span>Use glassmorphism for depth and modern aesthetic</span>
									</li>
									<li className="flex items-start">
										<span className="text-green-400 mr-3">✓</span>
										<span>Keep true black backgrounds for OLED optimization</span>
									</li>
									<li className="flex items-start">
										<span className="text-green-400 mr-3">✓</span>
										<span>Use text gradient for hero headings and emphasis</span>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-semibold pb-3 text-stone-400">Don'ts</h3>
								<ul className="space-y-2 text-stone-300">
									<li className="flex items-start">
										<span className="text-red-400 mr-3">✗</span>
										<span>Don't use condensed font stretch for headings</span>
									</li>
									<li className="flex items-start">
										<span className="text-red-400 mr-3">✗</span>
										<span>Don't override the 1.4 line-height without good reason</span>
									</li>
									<li className="flex items-start">
										<span className="text-red-400 mr-3">✗</span>
										<span>Don't use pure white (#ffffff) - use #e0e0e0 instead</span>
									</li>
									<li className="flex items-start">
										<span className="text-red-400 mr-3">✗</span>
										<span>Don't stack too many glass effects - maintain hierarchy</span>
									</li>
									<li className="flex items-start">
										<span className="text-red-400 mr-3">✗</span>
										<span>Don't use the brand fonts outside the Save That Again product</span>
									</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Brand Voice */}
					<section className="mb-16 glass-card p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Brand Voice</h2>
						
						<div className="grid md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Personality</h3>
								<ul className="space-y-2 text-stone-300">
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Innovative:</strong> Forward-thinking and tech-savvy</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Approachable:</strong> Friendly without being casual</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Confident:</strong> Assured in our capabilities</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Clear:</strong> Direct and easy to understand</span>
									</li>
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-semibold mb-4 text-stone-400">Tone</h3>
								<ul className="space-y-2 text-stone-300">
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Professional:</strong> Not corporate or stuffy</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Helpful:</strong> Always solution-oriented</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Enthusiastic:</strong> Passionate about the product</span>
									</li>
									<li className="flex items-start">
										<span className="text-stone-400 mr-3">•</span>
										<span><strong>Respectful:</strong> Value user's time and needs</span>
									</li>
								</ul>
							</div>
						</div>
					</section>

					{/* Quick Reference */}
					<section className="glass-card-popular p-8 rounded-xl">
						<h2 className="text-3xl font-bold mb-6">Quick Reference</h2>
						
						<div className="grid md:grid-cols-3 gap-6 text-sm">
							<div>
								<h3 className="font-semibold mb-2 text-stone-400">Typography</h3>
								<p className="font-mono text-xs text-stone-400">
									H1-H6: Gamay, 200% stretch<br/>
									Body: Halyard Text<br/>
									Line height: 1.4
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2 text-stone-400">Colors</h3>
								<p className="font-mono text-xs text-stone-400">
									BG: #000000<br/>
									Text: #e0e0e0<br/>
									Accent: #2196f3
								</p>
							</div>
							<div>
								<h3 className="font-semibold mb-2 text-stone-400">Spacing</h3>
								<p className="font-mono text-xs text-stone-400">
									Container: max-w-4xl<br/>
									Section: py-16 px-6<br/>
									Radius: rounded-xl
								</p>
							</div>
						</div>
					</section>

					{/* Navigation */}
					<section className="flex justify-center mt-12">
						<Link href="/" className="glass-button-primary px-8 py-4 rounded-lg hover:scale-105 transition-transform text-lg">
							Back to Home
						</Link>
					</section>
				</div>
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
}

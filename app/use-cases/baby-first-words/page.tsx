import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
	title: 'Never Miss Baby\'s First Words | Save That Again - Smart Watch Baby Recorder',
	description: 'Capture your baby\'s first words, giggles, and precious moments you weren\'t expecting. Continuous audio buffer saves the last 5 minutes with one tap on your smart watch.',
	keywords: 'baby first words recorder, capture baby sounds, newborn audio recorder, baby milestone recorder, smart watch baby app, retroactive audio recording',
	openGraph: {
		title: 'Never Miss Baby\'s First Words | Save That Again',
		description: 'Capture your baby\'s first words, giggles, and precious moments you weren\'t expecting.',
		url: 'https://savethatagain.com/use-cases/baby-first-words',
		type: 'website',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again - Baby First Words Recorder'
		}]
	}
};

export default function BabyFirstWordsPage() {
	return (
		<div className="min-h-screen bg-black text-white">
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
							/>
							<span className="hidden md:inline-block font-black" style={{ fontFamily: 'Halyard Text, sans-serif', fontSize: '20px' }}>
								Save That Again
							</span>
						</Link>
						<div className="flex items-center gap-4">
							<Link href="/login" className="glass-button text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">
								Sign In
							</Link>
							<Link href="/signup" className="glass-button-primary text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">
								Get Started
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative pt-32 pb-24 px-6">
				<div className="max-w-5xl mx-auto text-center">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
						Never Miss <span className="text-gradient">Baby's First Words</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-300">
						Your baby just said "mama" or "dada" for the first time, but you weren't recording. 
						With Save That Again on your smart watch, you'll never miss these precious moments again.
					</p>
					<Link href="/signup" className="glass-button-primary text-lg px-8 py-4 rounded-full hover:scale-105 transition-all inline-block">
						Start Capturing Moments Free
					</Link>
				</div>
			</section>

			{/* The Problem Section */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">The Problem Every Parent Faces</h2>
					<div className="glass-card p-8 rounded-2xl">
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							Your baby's first words are some of the most precious moments you'll ever experience. 
							But they happen when you least expect them—during playtime, at the dinner table, or during a quiet moment.
						</p>
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							By the time you realize what just happened and scramble for your phone to start recording, 
							the moment is gone forever. You're left with a memory, but no way to share it with family or relive it yourself.
						</p>
						<p className="text-xl leading-relaxed text-stone-300">
							<strong className="text-gradient">That changes today.</strong>
						</p>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						Always Ready to <span className="text-gradient">Capture the Moment</span>
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">🎙️</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Always Recording</h3>
							<p className="text-stone-300">
								Your smart watch continuously maintains a 5-minute rolling buffer of audio. 
								It's always ready, even when you're not thinking about it.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">👶</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Baby Says "Mama"</h3>
							<p className="text-stone-300">
								Your baby surprises you with their first word. You're not holding your phone, 
								but you're wearing your smart watch.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">💾</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Tap to Save Forever</h3>
							<p className="text-stone-300">
								Simply tap your watch face within 5 minutes, and that precious moment is 
								permanently saved to your cloud storage.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Parent Testimonials Style Section */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-stone-900/20 to-transparent">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Perfect for New Parents</h2>
					<div className="space-y-6">
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">First Words</h3>
							<p className="text-lg text-stone-300">
								Capture "mama," "dada," "hi," "bye-bye" and all those precious first attempts at speech.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Baby Giggles</h3>
							<p className="text-lg text-stone-300">
								Those spontaneous belly laughs and infectious giggles that light up your world.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Babbling & Cooing</h3>
							<p className="text-lg text-stone-300">
								The adorable sounds your baby makes while discovering their voice.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Bedtime Songs</h3>
							<p className="text-lg text-stone-300">
								Your baby trying to sing along to their favorite lullabies or nursery rhymes.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Built for Busy Parents</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Hands-Free Operation</h3>
							<p className="text-stone-300">
								Just tap your smart watch—no need to fumble with your phone while holding your baby.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">High Quality Audio</h3>
							<p className="text-stone-300">
								Crystal clear recordings at 128kbps AAC so you can hear every precious sound.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Secure Cloud Storage</h3>
							<p className="text-stone-300">
								Automatically backed up to the cloud so you'll never lose these memories.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Share with Family</h3>
							<p className="text-stone-300">
								Easily share recordings with grandparents and family members who can't be there.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-4xl mx-auto">
					<div className="glass-card-feature p-12 rounded-3xl text-center">
						<h2 className="text-4xl font-bold mb-6">
							Start Capturing Your Baby's Precious Moments
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Don't let another milestone slip away. Get Save That Again free today.
						</p>
						<Link href="/signup" className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all">
							Get Started Free
						</Link>
						<p className="mt-4 text-stone-400">
							Compatible with Pixel Watch, Android smart watches, phones, and tablets
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

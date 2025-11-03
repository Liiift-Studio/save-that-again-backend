import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
	title: 'Capture Musical Ideas Instantly | Save That Again - Musician Audio Recorder',
	description: 'Never lose a melody or musical idea again. Retroactive recording captures improvisations, jam sessions, and spontaneous musical moments with one tap.',
	keywords: 'music recording app, capture melody, musician recorder, jam session recorder, improvisation recorder, smart watch music app, retroactive audio for musicians',
	openGraph: {
		title: 'Capture Musical Ideas Instantly | Save That Again',
		description: 'Never lose a melody or musical idea again. Retroactive recording for musicians.',
		url: 'https://savethatagain.com/use-cases/record-music-ideas',
		type: 'website',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again - Musician Audio Recorder'
		}]
	}
};

export default function RecordMusicIdeasPage() {
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
						Never Lose a <span className="text-gradient">Musical Idea</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-300">
						You just played the perfect riff, hummed an incredible melody, or improvised something magical. 
						Capture it retroactively with a single tap on your smart watch.
					</p>
					<Link href="/signup" className="glass-button-primary text-lg px-8 py-4 rounded-full hover:scale-105 transition-all inline-block">
						Start Capturing Music Free
					</Link>
				</div>
			</section>

			{/* The Problem Section */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">The Musician's Dilemma</h2>
					<div className="glass-card p-8 rounded-2xl">
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							Musical inspiration strikes when you least expect it—during a casual jam session, 
							while noodling around on your instrument, or when a melody pops into your head.
						</p>
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							But by the time you stop playing to hit record, the moment is gone. That perfect take, 
							that spontaneous improvisation, that magical phrase you'll never recreate—lost forever.
						</p>
						<p className="text-xl leading-relaxed text-stone-300">
							<strong className="text-gradient">Not anymore.</strong>
						</p>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						Always <span className="text-gradient">Listening</span>, Ready to Save
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">🎵</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Continuous Buffer</h3>
							<p className="text-stone-300">
								Your device maintains a rolling 5-minute buffer of audio while you practice, 
								jam, or compose.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">🎸</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Play Freely</h3>
							<p className="text-stone-300">
								No need to think about recording. Just play, improvise, and create without 
								breaking your flow.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">⌚</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Tap to Keep</h3>
							<p className="text-stone-300">
								When you play something worth keeping, just tap your watch to save the last 
								5 minutes permanently.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Use Cases for Musicians */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-stone-900/20 to-transparent">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Perfect for Every Musician</h2>
					<div className="space-y-6">
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Spontaneous Improvisation</h3>
							<p className="text-lg text-stone-300">
								Capture those magical improvisations that happen when you're just feeling the music.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Jam Sessions</h3>
							<p className="text-lg text-stone-300">
								Record the best moments from band practice or casual jams with friends.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Song Sketches</h3>
							<p className="text-lg text-stone-300">
								Save melody ideas, chord progressions, or lyrics as they come to you.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Practice Sessions</h3>
							<p className="text-lg text-stone-300">
								Capture breakthrough moments during practice to review and learn from later.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Vocal Ideas</h3>
							<p className="text-lg text-stone-300">
								Hum, sing, or beatbox ideas without fumbling for your phone to start recording.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Built for Musicians</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">High Fidelity Audio</h3>
							<p className="text-stone-300">
								128kbps AAC at 44.1kHz ensures your recordings sound great for demo purposes.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Hands-Free Operation</h3>
							<p className="text-stone-300">
								Keep playing—just tap your watch when you want to save. Never break your creative flow.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Cloud Sync</h3>
							<p className="text-stone-300">
								Access your recordings from any device. Share with bandmates or upload to your DAW.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Unlimited Ideas</h3>
							<p className="text-stone-300">
								Save as many musical ideas as you want. Never worry about running out of space.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Who Uses This Section */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						For Every Type of <span className="text-gradient">Musician</span>
					</h2>
					<div className="grid md:grid-cols-3 gap-6">
						<div className="glass-card p-6 rounded-2xl text-center">
							<div className="text-5xl mb-4">🎸</div>
							<h3 className="text-xl font-bold mb-3">Guitarists</h3>
							<p className="text-stone-300">Capture riffs, solos, and chord progressions</p>
						</div>
						<div className="glass-card p-6 rounded-2xl text-center">
							<div className="text-5xl mb-4">🎹</div>
							<h3 className="text-xl font-bold mb-3">Pianists</h3>
							<p className="text-stone-300">Save melodies and harmonic ideas</p>
						</div>
						<div className="glass-card p-6 rounded-2xl text-center">
							<div className="text-5xl mb-4">🎤</div>
							<h3 className="text-xl font-bold mb-3">Vocalists</h3>
							<p className="text-stone-300">Record vocal lines and harmonies</p>
						</div>
						<div className="glass-card p-6 rounded-2xl text-center">
							<div className="text-5xl mb-4">🥁</div>
							<h3 className="text-xl font-bold mb-3">Drummers</h3>
							<p className="text-stone-300">Capture groove ideas and fills</p>
						</div>
						<div className="glass-card p-6 rounded-2xl text-center">
							<div className="text-5xl mb-4">🎺</div>
							<h3 className="text-xl font-bold mb-3">Wind Players</h3>
							<p className="text-stone-300">Save improvisations and phrases</p>
						</div>
						<div className="glass-card p-6 rounded-2xl text-center">
							<div className="text-5xl mb-4">🎻</div>
							<h3 className="text-xl font-bold mb-3">String Players</h3>
							<p className="text-stone-300">Document melodic and technical ideas</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-4xl mx-auto">
					<div className="glass-card-feature p-12 rounded-3xl text-center">
						<h2 className="text-4xl font-bold mb-6">
							Stop Losing Musical Ideas
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Join musicians who never miss a creative moment. Start free today.
						</p>
						<Link href="/signup" className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all">
							Get Started Free
						</Link>
						<p className="mt-4 text-stone-400">
							Works with smart watches, phones, tablets, and online
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

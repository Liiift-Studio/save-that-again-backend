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
							<h3 className="text-2xl font-bold mb-4 text-gradient">Continuous Buffer</h3>
							<p className="text-stone-300">
								Your device maintains a rolling 5-minute buffer of audio while you practice, 
								jam, or compose.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Play Freely</h3>
							<p className="text-stone-300">
								No need to think about recording. Just play, improvise, and create without 
								breaking your flow.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
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

			{/* Musician Reviews */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">What Musicians Are Saying</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-xl">
									A
								</div>
								<div>
									<div className="font-bold">Alex T.</div>
									<div className="text-sm text-stone-400">Jazz Guitarist</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"I was jamming with my trio last week and played this killer lick that just came out of nowhere. Tapped my watch, saved it, and we turned it into the hook for our new song. This app has literally changed how I practice and compose."
							</p>
							<div className="text-yellow-500">★★★★★</div>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl">
									R
								</div>
								<div>
									<div className="font-bold">Rachel M.</div>
									<div className="text-sm text-stone-400">Singer-Songwriter</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"The melody for my latest single came to me while I was washing dishes. I hummed it out loud, tapped my watch, and had it saved before I even dried my hands. Would have lost that idea forever otherwise. Game changer for songwriters."
							</p>
							<div className="text-yellow-500">★★★★★</div>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center font-bold text-xl">
									K
								</div>
								<div>
									<div className="font-bold">Kevin L.</div>
									<div className="text-sm text-stone-400">Electronic Producer</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"I use this constantly in the studio. I'll be tweaking synth patches and suddenly hit something incredible. Instead of trying to recreate it, I just tap my watch and have the audio reference. Then I can build the track around that exact sound."
							</p>
							<div className="text-yellow-500">★★★★★</div>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-xl">
									M
								</div>
								<div>
									<div className="font-bold">Marcus D.</div>
									<div className="text-sm text-stone-400">Session Drummer</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"Perfect for capturing those spontaneous groove variations that happen during sessions. I've got a library of drum fills and patterns now that I actually played instead of just imagining. The audio quality is solid for reference tracks too."
							</p>
							<div className="text-yellow-500">★★★★★</div>
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

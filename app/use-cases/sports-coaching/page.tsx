import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
	title: 'Sports Coaching Audio Recorder | Save That Again - Capture Technique Tips',
	description: 'Never miss coaching feedback again. Retroactive recording captures technique tips, form corrections, and coaching advice with one tap on your smart watch.',
	keywords: 'sports coaching recorder, technique tips recorder, coaching feedback app, training audio recorder, athlete development, smart watch coaching',
	openGraph: {
		title: 'Sports Coaching Audio Recorder | Save That Again',
		description: 'Never miss coaching feedback again. Capture technique tips and form corrections retroactively.',
		url: 'https://savethatagain.com/use-cases/sports-coaching',
		type: 'website',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again - Sports Coaching Recorder'
		}]
	}
};

export default function SportsCoachingPage() {
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
						Never Miss <span className="text-gradient">Coaching Feedback</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-300">
						Your coach just gave you the perfect cue for your technique. 
						Capture their exact words retroactively with a single tap on your smart watch.
					</p>
					<Link href="/signup" className="glass-button-primary text-lg px-8 py-4 rounded-full hover:scale-105 transition-all inline-block">
						Start Recording Free
					</Link>
				</div>
			</section>

			{/* The Problem Section */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">The Athlete's Challenge</h2>
					<div className="glass-card p-8 rounded-2xl">
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							During training, your coach provides invaluable feedback on your form, technique, 
							and performance. But you're focused on executing the movement, not memorizing instructions.
						</p>
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							By the time you finish your set and think to record their advice, you've already 
							forgotten the specific cues and corrections they gave you.
						</p>
						<p className="text-xl leading-relaxed text-stone-300">
							<strong className="text-gradient">Now you can capture every valuable coaching moment.</strong>
						</p>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						Focus on <span className="text-gradient">Training</span>, Not Recording
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">🏃</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Always Listening</h3>
							<p className="text-stone-300">
								Your watch continuously maintains a 5-minute buffer during training sessions.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">💪</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Coach Gives Feedback</h3>
							<p className="text-stone-300">
								Your coach provides the perfect cue for your technique or form correction.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">⌚</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Quick Tap to Save</h3>
							<p className="text-stone-300">
								After your set, tap your watch to save the last 5 minutes of coaching.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Sports & Use Cases */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-stone-900/20 to-transparent">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Perfect For Every Sport</h2>
					<div className="space-y-6">
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Weight Training</h3>
							<p className="text-lg text-stone-300">
								Capture form cues, breathing techniques, and progression advice from your trainer.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Running & Track</h3>
							<p className="text-lg text-stone-300">
								Save stride corrections, pacing strategies, and race day tactics.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Team Sports</h3>
							<p className="text-lg text-stone-300">
								Record plays, positioning feedback, and tactical instructions.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Martial Arts</h3>
							<p className="text-lg text-stone-300">
								Capture technique breakdowns, kata corrections, and sparring feedback.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Swimming</h3>
							<p className="text-lg text-stone-300">
								Save stroke corrections, breathing patterns, and turn technique advice.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Golf</h3>
							<p className="text-lg text-stone-300">
								Record swing analysis, putting tips, and course management strategies.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Built for Athletes</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Hands-Free Operation</h3>
							<p className="text-stone-300">
								Keep training—just tap your watch when you want to save coaching feedback.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Clear Audio</h3>
							<p className="text-stone-300">
								High-quality recording captures every word even in noisy gym environments.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Review Later</h3>
							<p className="text-stone-300">
								Listen back during cool-down or before your next session to reinforce technique.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Share with Coach</h3>
							<p className="text-stone-300">
								Send clips to your coach for remote feedback or follow-up analysis.
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
							Accelerate Your Athletic Development
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Join athletes who never miss valuable coaching feedback. Start free today.
						</p>
						<Link href="/signup" className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all">
							Get Started Free
						</Link>
						<p className="mt-4 text-stone-400">
							Works during workouts with smart watches, phones, and tablets
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

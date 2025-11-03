import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
	title: 'Retroactive Meeting Recorder | Save That Again - Never Miss Important Points',
	description: 'Capture important points from meetings, lectures, and conversations retroactively. Save the last 5 minutes when someone says something brilliant with one tap.',
	keywords: 'meeting recorder, lecture recorder, conversation recorder, retroactive audio, important points recorder, smart watch meeting app, save meeting notes',
	openGraph: {
		title: 'Retroactive Meeting Recorder | Save That Again',
		description: 'Never miss important points from meetings and conversations. Retroactive recording saves what just happened.',
		url: 'https://savethatagain.com/use-cases/meeting-recorder',
		type: 'website',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again - Meeting Recorder'
		}]
	}
};

export default function MeetingRecorderPage() {
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
						Never Miss <span className="text-gradient">Important Points</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-300">
						Someone just shared a brilliant insight in your meeting or lecture. 
						Capture it retroactively with a single tap on your smart watch.
					</p>
					<Link href="/signup" className="glass-button-primary text-lg px-8 py-4 rounded-full hover:scale-105 transition-all inline-block">
						Start Recording Free
					</Link>
				</div>
			</section>

			{/* The Problem Section */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">The Recording Paradox</h2>
					<div className="glass-card p-8 rounded-2xl">
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							In meetings, lectures, or conversations, the most valuable moments are always unexpected. 
							Someone shares a perfect explanation, makes an insightful observation, or provides crucial information.
						</p>
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							By the time you realize it's worth recording and reach for your phone, the moment has passed. 
							You're left trying to remember exactly what was said, but the details fade quickly.
						</p>
						<p className="text-xl leading-relaxed text-stone-300">
							<strong className="text-gradient">Save That Again solves this.</strong>
						</p>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						Always <span className="text-gradient">Ready</span> to Capture
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">🎧</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Continuous Listening</h3>
							<p className="text-stone-300">
								Your device maintains a 5-minute rolling buffer during meetings and conversations.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">💡</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Brilliant Insight</h3>
							<p className="text-stone-300">
								Someone says something important—an insight, explanation, or crucial detail.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">⌚</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Discreet Save</h3>
							<p className="text-stone-300">
								Tap your watch discreetly to save the last 5 minutes without interrupting.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Use Cases */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-stone-900/20 to-transparent">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Perfect For</h2>
					<div className="space-y-6">
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Business Meetings</h3>
							<p className="text-lg text-stone-300">
								Capture action items, decisions, and important discussion points you might forget.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Lectures & Classes</h3>
							<p className="text-lg text-stone-300">
								Save the professor's perfect explanation of a complex concept for later review.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Expert Advice</h3>
							<p className="text-lg text-stone-300">
								Record valuable insights from mentors, consultants, or subject matter experts.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Brainstorming Sessions</h3>
							<p className="text-lg text-stone-300">
								Capture breakthrough ideas and creative solutions as they emerge naturally.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Training & Workshops</h3>
							<p className="text-lg text-stone-300">
								Save instructions, tips, or techniques for reference when you're practicing later.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Casual Conversations</h3>
							<p className="text-lg text-stone-300">
								Preserve meaningful moments from everyday conversations with friends and family.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Professional Features</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Discreet Operation</h3>
							<p className="text-stone-300">
								Simple watch tap doesn't interrupt the flow of conversation or draw attention.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Clear Audio Quality</h3>
							<p className="text-stone-300">
								128kbps AAC ensures you can hear and understand every word clearly.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Cloud Storage</h3>
							<p className="text-stone-300">
								Recordings automatically sync to the cloud for access from any device.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Easy Sharing</h3>
							<p className="text-stone-300">
								Share important clips with team members or study groups instantly.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Privacy Focused</h3>
							<p className="text-stone-300">
								Only saved clips are uploaded—temporary buffer stays on your device.
							</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Unlimited Storage</h3>
							<p className="text-stone-300">
								Save as many important moments as you need without worrying about space.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						Why Professionals <span className="text-gradient">Choose Save That Again</span>
					</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4">Better Note-Taking</h3>
							<p className="text-lg text-stone-300 leading-relaxed">
								Focus on listening and participating instead of frantically taking notes. 
								Capture the exact words when something important is said.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4">Improved Learning</h3>
							<p className="text-lg text-stone-300 leading-relaxed">
								Review complex explanations multiple times at your own pace. 
								Study more effectively with audio you can revisit.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4">Better Accountability</h3>
							<p className="text-lg text-stone-300 leading-relaxed">
								Have accurate records of decisions, commitments, and action items 
								from meetings and discussions.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4">Knowledge Retention</h3>
							<p className="text-lg text-stone-300 leading-relaxed">
								Build a personal library of insights, techniques, and valuable 
								information you can reference anytime.
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
							Start Capturing Important Moments
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Join professionals and students who never miss crucial information. Start free today.
						</p>
						<Link href="/signup" className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all">
							Get Started Free
						</Link>
						<p className="mt-4 text-stone-400">
							Compatible with smart watches, phones, tablets, and online
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

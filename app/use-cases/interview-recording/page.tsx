import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
	title: 'Interview Recording App | Save That Again - Capture Every Answer',
	description: 'Never miss important interview responses. Retroactive recording captures unexpected insights, memorable quotes, and key information with one tap.',
	keywords: 'interview recorder, journalist recorder, research interview app, quote capture, interview audio recorder, smart watch interviewer',
	openGraph: {
		title: 'Interview Recording App | Save That Again',
		description: 'Never miss important interview responses. Capture unexpected insights retroactively.',
		url: 'https://savethatagain.com/use-cases/interview-recording',
		type: 'website',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again - Interview Recorder'
		}]
	}
};

export default function InterviewRecordingPage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<nav className="relative z-50 glass-nav">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<Link href="/" className="flex items-center gap-3">
							<Image src="/logo-white.svg" alt="Save That Again" width={32} height={32} className="drop-shadow-glow" />
							<span className="hidden md:inline-block font-black" style={{ fontFamily: 'Halyard Text, sans-serif', fontSize: '20px' }}>Save That Again</span>
						</Link>
						<div className="flex items-center gap-4">
							<Link href="/login" className="glass-button text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">Sign In</Link>
							<Link href="/signup" className="glass-button-primary text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform">Get Started</Link>
						</div>
					</div>
				</div>
			</nav>

			<section className="relative pt-32 pb-24 px-6">
				<div className="max-w-5xl mx-auto text-center">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
						Capture Every <span className="text-gradient">Interview Moment</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-300">
						Your interview subject just shared an incredible quote you didn't expect. Save it retroactively without interrupting the flow of conversation.
					</p>
					<Link href="/signup" className="glass-button-primary text-lg px-8 py-4 rounded-full hover:scale-105 transition-all inline-block">
						Start Recording Free
					</Link>
				</div>
			</section>

			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">The Interviewer's Challenge</h2>
					<div className="glass-card p-8 rounded-2xl">
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							During interviews, the best quotes and insights often come when you least expect them. 
							Your subject reveals something profound, shares a perfect soundbite, or explains something in an unexpectedly clear way.
						</p>
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							If you're not already recording, fumbling with your phone or recorder breaks the natural flow of conversation 
							and might make your subject self-conscious.
						</p>
						<p className="text-xl leading-relaxed text-stone-300">
							<strong className="text-gradient">Save That Again captures it all discreetly.</strong>
						</p>
					</div>
				</div>
			</section>

			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						Natural <span className="text-gradient">Conversation Flow</span>
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Always Ready</h3>
							<p className="text-stone-300">5-minute rolling buffer runs continuously during interviews and conversations.</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Perfect Quote</h3>
							<p className="text-stone-300">Subject shares an unexpected insight, memorable quote, or important detail.</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Discreet Save</h3>
							<p className="text-stone-300">Quick watch tap saves the moment without breaking conversation flow.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="relative py-24 px-6 bg-gradient-to-b from-stone-900/20 to-transparent">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Perfect For Professionals</h2>
					<div className="space-y-6">
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Journalists</h3>
							<p className="text-lg text-stone-300">Capture perfect quotes and unexpected revelations without fumbling for your recorder.</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Researchers</h3>
							<p className="text-lg text-stone-300">Save important responses and insights during qualitative research interviews.</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Podcasters</h3>
							<p className="text-lg text-stone-300">Record pre-interview conversations and post-recording insights worth including.</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Documentarians</h3>
							<p className="text-lg text-stone-300">Capture candid moments and authentic responses that happen between takes.</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">HR Professionals</h3>
							<p className="text-lg text-stone-300">Save key responses and memorable answers from job interviews for review.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Professional Features</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Non-Intrusive</h3>
							<p className="text-stone-300">Simple watch tap doesn't interrupt conversation or make subjects self-conscious.</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">High-Quality Audio</h3>
							<p className="text-stone-300">Clear recordings suitable for transcription and quoting.</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Instant Access</h3>
							<p className="text-stone-300">Review clips immediately after interview or sync to cloud for later transcription.</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Ethical Recording</h3>
							<p className="text-stone-300">Only saves moments you explicitly choose—respects subject privacy.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Professional Reviews */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">What Professionals Are Saying</h2>
					<div className="grid md:grid-cols-2 gap-8">
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xl">
									R
								</div>
								<div>
									<div className="font-bold">Rachel D.</div>
									<div className="text-sm text-stone-400">Investigative Journalist</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"I was interviewing a source for a major story and they dropped this perfect quote that encapsulated the entire issue. Saved it with a quick tap on my watch without breaking eye contact. That quote became the headline. This tool is journalism gold."
							</p>
							<div className="text-yellow-500">★★★★★</div>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-xl">
									K
								</div>
								<div>
									<div className="font-bold">Kevin H.</div>
									<div className="text-sm text-stone-400">PhD Candidate</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"During field research interviews, my subjects often share the most valuable insights off-the-cuff. Being able to capture those moments retroactively without making them feel recorded has been crucial. My dissertation data is so much richer because of this app."
							</p>
							<div className="text-yellow-500">★★★★★</div>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center font-bold text-xl">
									S
								</div>
								<div>
									<div className="font-bold">Samantha T.</div>
									<div className="text-sm text-stone-400">Podcast Host</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"The best content happens before I hit record or after I think we're done. My watch is always running the buffer now. I've captured incredible pre-interview stories that became bonus episodes. My audience loves the authentic, unscripted moments."
							</p>
							<div className="text-yellow-500">★★★★★</div>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<div className="flex items-center gap-4 mb-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center font-bold text-xl">
									J
								</div>
								<div>
									<div className="font-bold">James W.</div>
									<div className="text-sm text-stone-400">Documentary Filmmaker</div>
								</div>
							</div>
							<p className="text-stone-300 leading-relaxed mb-3">
								"Candid moments are everything in documentary work. Someone says something profound when they think the camera is off. With this app, I never miss those moments anymore. I've got hours of incredible footage I never would have captured otherwise. Essential tool."
							</p>
							<div className="text-yellow-500">★★★★★</div>
						</div>
					</div>
				</div>
			</section>

			<section className="relative py-24 px-6">
				<div className="max-w-4xl mx-auto">
					<div className="glass-card-feature p-12 rounded-3xl text-center">
						<h2 className="text-4xl font-bold mb-6">Never Miss an Important Quote</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Join journalists and researchers who capture every valuable moment. Start free today.
						</p>
						<Link href="/signup" className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all">
							Get Started Free
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

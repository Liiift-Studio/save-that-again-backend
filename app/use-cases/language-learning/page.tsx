import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer';

export const metadata: Metadata = {
	title: 'Language Learning Audio Recorder | Save That Again - Capture Pronunciation',
	description: 'Perfect your pronunciation and save native speaker conversations. Retroactive recording captures language learning moments with one tap on your smart watch.',
	keywords: 'language learning recorder, pronunciation recorder, conversation practice, language app, speaking practice recorder, native speaker audio',
	openGraph: {
		title: 'Language Learning Audio Recorder | Save That Again',
		description: 'Perfect your pronunciation and save native speaker conversations retroactively.',
		url: 'https://savethatagain.com/use-cases/language-learning',
		type: 'website',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again - Language Learning Recorder'
		}]
	}
};

export default function LanguageLearningPage() {
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
						Master <span className="text-gradient">Pronunciation</span> Effortlessly
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-300">
						A native speaker just said that phrase perfectly. Capture it retroactively to practice pronunciation at your own pace.
					</p>
					<Link href="/signup" className="glass-button-primary text-lg px-8 py-4 rounded-full hover:scale-105 transition-all inline-block">
						Start Learning Free
					</Link>
				</div>
			</section>

			<section className="relative py-24 px-6 bg-gradient-to-b from-transparent to-stone-900/20">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">The Language Learner's Dilemma</h2>
					<div className="glass-card p-8 rounded-2xl">
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							When practicing with native speakers or listening to authentic conversations, you hear perfect pronunciation and natural expressions you want to remember.
						</p>
						<p className="text-xl leading-relaxed mb-6 text-stone-300">
							But by the time you realize you should record it for later practice, the moment has passed and you can't recreate that perfect example.
						</p>
						<p className="text-xl leading-relaxed text-stone-300">
							<strong className="text-gradient">Now save every learning opportunity.</strong>
						</p>
					</div>
				</div>
			</section>

			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">
						Learn <span className="text-gradient">Naturally</span>
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">🗣️</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Continuous Buffer</h3>
							<p className="text-stone-300">Your device maintains a 5-minute rolling buffer during conversations and study sessions.</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">💬</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Perfect Example</h3>
							<p className="text-stone-300">Native speaker uses a phrase with perfect pronunciation or explains something clearly.</p>
						</div>
						<div className="glass-card p-6 rounded-2xl">
							<div className="text-5xl mb-4">⌚</div>
							<h3 className="text-2xl font-bold mb-4 text-gradient">Save for Practice</h3>
							<p className="text-stone-300">Tap your watch to save that perfect example for unlimited practice later.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="relative py-24 px-6 bg-gradient-to-b from-stone-900/20 to-transparent">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-12">Perfect For Language Students</h2>
					<div className="space-y-6">
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Pronunciation Practice</h3>
							<p className="text-lg text-stone-300">Save native speaker examples of difficult sounds and phrases to practice repeatedly.</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Conversation Partners</h3>
							<p className="text-lg text-stone-300">Capture natural expressions and idioms from language exchange partners.</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Tutoring Sessions</h3>
							<p className="text-lg text-stone-300">Record explanations of grammar rules and pronunciation tips from tutors.</p>
						</div>
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-2xl font-bold mb-4 text-gradient">Immersion Moments</h3>
							<p className="text-lg text-stone-300">Save overheard conversations and authentic language use in real-world settings.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="relative py-24 px-6">
				<div className="max-w-4xl mx-auto">
					<div className="glass-card-feature p-12 rounded-3xl text-center">
						<h2 className="text-4xl font-bold mb-6">Accelerate Your Language Learning</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Join language learners who capture every perfect example. Start free today.
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

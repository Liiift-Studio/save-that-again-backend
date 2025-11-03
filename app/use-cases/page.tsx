import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';

export const metadata: Metadata = {
	title: 'Use Cases | Save That Again - Never Miss Another Moment',
	description: 'Discover how Save That Again helps parents, musicians, professionals, athletes, and students capture life\'s most important moments retroactively.',
	keywords: 'retroactive recording use cases, audio recording scenarios, smart watch recorder applications, save moments app',
	openGraph: {
		title: 'Use Cases | Save That Again',
		description: 'Discover how Save That Again helps you never miss another moment.',
		url: 'https://savethatagain.com/use-cases',
		type: 'website',
		images: [{
			url: '/logo.png',
			width: 1200,
			height: 630,
			alt: 'Save That Again - Use Cases'
		}]
	}
};

const useCases = [
	{
		title: "Baby's First Words",
		description: "Never miss precious baby milestones like first words, giggles, and babbling moments.",
		icon: "👶",
		href: "/use-cases/baby-first-words",
		color: "from-pink-500/20 to-purple-500/20"
	},
	{
		title: "Musical Ideas",
		description: "Capture spontaneous melodies, improvisations, and jam session magic.",
		icon: "🎵",
		href: "/use-cases/record-music-ideas",
		color: "from-blue-500/20 to-cyan-500/20"
	},
	{
		title: "Meeting Notes",
		description: "Save important insights from meetings, lectures, and conversations.",
		icon: "💼",
		href: "/use-cases/meeting-recorder",
		color: "from-green-500/20 to-emerald-500/20"
	},
	{
		title: "Sports Coaching",
		description: "Capture coaching feedback, technique tips, and training advice.",
		icon: "🏃",
		href: "/use-cases/sports-coaching",
		color: "from-orange-500/20 to-red-500/20"
	},
	{
		title: "Language Learning",
		description: "Perfect pronunciation with native speaker examples and conversational practice.",
		icon: "🗣️",
		href: "/use-cases/language-learning",
		color: "from-purple-500/20 to-pink-500/20"
	},
	{
		title: "Interview Recording",
		description: "Capture perfect quotes and unexpected insights from interview subjects.",
		icon: "🎤",
		href: "/use-cases/interview-recording",
		color: "from-indigo-500/20 to-blue-500/20"
	}
];

export default function UseCasesPage() {
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
						Never Miss <span className="text-gradient">Your Moments</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-stone-300">
						Discover how people use Save That Again to capture life's unexpected moments across every situation.
					</p>
				</div>
			</section>

			{/* Use Cases Grid */}
			<section className="relative py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{useCases.map((useCase, index) => (
							<Link
								key={index}
								href={useCase.href}
								className="glass-card p-8 rounded-2xl hover:scale-105 transition-all group"
							>
								<h3 className="text-2xl font-bold mb-4 text-gradient">{useCase.title}</h3>
								<p className="text-lg text-stone-300 leading-relaxed mb-6">
									{useCase.description}
								</p>
								<div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
									<span>Learn More</span>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="relative py-24 px-6 bg-gradient-to-b from-stone-900/20 to-transparent">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-16">
						One App, <span className="text-gradient">Endless Possibilities</span>
					</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="glass-card p-8 rounded-2xl text-center">
							<h3 className="text-2xl font-bold mb-4">Always Recording</h3>
							<p className="text-stone-300 leading-relaxed">
								Continuous 5-minute rolling buffer captures everything that's happening around you.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl text-center">
							<h3 className="text-2xl font-bold mb-4">One-Tap Save</h3>
							<p className="text-stone-300 leading-relaxed">
								When something special happens, just tap your watch to save the last 5 minutes.
							</p>
						</div>
						<div className="glass-card p-8 rounded-2xl text-center">
							<h3 className="text-2xl font-bold mb-4">Cloud Sync</h3>
							<p className="text-stone-300 leading-relaxed">
								Access your captured moments from any device, anytime, anywhere.
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
							Ready to Start Capturing Moments?
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Join thousands who never miss life's important moments. Start free today.
						</p>
						<Link href="/signup" className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all">
							Get Started Free
						</Link>
						<p className="mt-4 text-stone-400">
							No credit card required • Compatible with smart watches, phones, and tablets
						</p>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

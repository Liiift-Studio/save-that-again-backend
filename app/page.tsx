'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import InteractiveBackground from './components/InteractiveBackground';
import Footer from './components/Footer';
import BufferDemo from './components/BufferDemo';
import RecordingComparison from './components/RecordingComparison';

export default function Home() {
	const [mounted, setMounted] = useState(false);
	const [userDevice, setUserDevice] = useState<'ios' | 'android' | 'other'>('other');
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		setMounted(true);
		
		// Detect device
		const userAgent = navigator.userAgent.toLowerCase();
		if (/iphone|ipad|ipod/.test(userAgent)) {
			setUserDevice('ios');
		} else if (/android/.test(userAgent)) {
			setUserDevice('android');
		}

		// Handle parallax scroll
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const emitCTAHover = (isHovering: boolean) => {
		window.dispatchEvent(new CustomEvent('ctaHover', { detail: { isHovering } }));
	};

	return (
		<div className="min-h-screen bg-black text-white overflow-hidden">
			{/* Interactive Particle Background with Blobs */}
			<InteractiveBackground />
			
			{/* Gradient Background */}
			<div className="fixed inset-0 bg-gradient-radial from-stone-900/20 via-black to-black pointer-events-none z-0" />
			<div className="fixed inset-0 bg-gradient-to-br from-neutral-800/5 via-transparent to-stone-800/5 pointer-events-none z-0" />
			
			{/* Navigation */}
			<nav className="relative z-50 glass-nav">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src="/logo-white.svg"
							alt="Save That Again"
							width={32}
							height={32}
							className="drop-shadow-glow"
							priority
						/>
						<span className="hidden md:inline-block font-black" style={{ fontFamily: 'Halyard Text, sans-serif', fontSize: '20px', lineHeight: '32px', color: 'var(--foreground)' }}>
							Save That Again
						</span>
					</div>
						<div className="flex items-center gap-4">
							<Link 
								href="/login"
								className="glass-button text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform"
							>
								Sign In
							</Link>
							<Link 
								href="/signup"
								className="glass-button-primary text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform"
								onMouseEnter={() => emitCTAHover(true)}
								onMouseLeave={() => emitCTAHover(false)}
							>
								Get Started
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="relative pt-32 pb-24 px-6 z-10">
				<div className="max-w-5xl mx-auto text-center">
				<div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
					<h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight" style={{ color: 'var(--foreground)' }}>
						<span className="">
							Never miss a&nbsp;
						</span>
						<span className="block text-gradient">
							moment again
						</span>
					</h1>
					<p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed text-stone-300">
						Continuous audio buffering for your smart watch, phone, tablet, and online. Capture the last 5 minutes with a single tap.
					</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link 
								href="/signup"
								className="glass-button-primary text-lg px-8 py-4 rounded-full hover:scale-105 transition-all font-medium"
								onMouseEnter={() => emitCTAHover(true)}
								onMouseLeave={() => emitCTAHover(false)}
							>
								Start Recording Free
							</Link>
							<a 
								href="#how-it-works"
								className="glass-button text-lg px-8 py-4 rounded-full hover:scale-105 transition-all font-medium"
							>
								See How It Works
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Use Cases Section */}
			<section className="relative py-24 px-6 z-10">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>
						Real <span className="text-gradient">Moments</span>
					</h2>
					<p className="text-xl text-center mb-16 max-w-2xl mx-auto text-stone-300">
						Life's most precious moments happen when you least expect them.
					</p>
					
					<div className="grid md:grid-cols-3 gap-6">
						<UseCaseCard
							title="First Words"
							description="Your child says 'mama' for the first time. You weren't ready to record, but now you'll have it forever."
						/>
						<UseCaseCard
							title="Musical Moments"
							description="A friend improvises an incredible melody. Capture the spontaneous creativity that can never be recreated."
						/>
						<UseCaseCard
							title="Brilliant Ideas"
							description="During a conversation, someone shares a game-changing insight. Never lose those lightbulb moments again."
						/>
						<UseCaseCard
							title="Genuine Laughter"
							description="That perfect joke or hilarious moment that had everyone in stitches. Relive the joy whenever you want."
						/>
						<UseCaseCard
							title="Learning Moments"
							description="An expert explains something complex perfectly. Save their explanation for future reference."
						/>
						<UseCaseCard
							title="Heartfelt Confessions"
							description="Words of love, appreciation, or encouragement that you want to treasure forever."
						/>
					</div>
				</div>
			</section>

			{/* The Buffer Section - Interactive Demo */}
			<section id="how-it-works" className="relative py-24 px-6 z-10">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
							How <span className="text-gradient">It Works</span>
						</h2>
						<p className="text-xl max-w-3xl mx-auto text-stone-300">
							Experience the power of rolling buffer technology. 
							Never miss a moment again with continuous background recording.
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-8 mb-8">
						{/* Text Description */}
						<div className="glass-card p-8 rounded-2xl">
							<h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
								The <span className="text-gradient">Buffer</span>
							</h3>
							<p className="text-xl mb-8 leading-relaxed text-stone-300">
								Your smart watch continuously records a rolling 5-minute buffer. 
								When something amazing happens, just tap to save it permanently.
							</p>
							<div className="space-y-4">
								<FeatureItem text="Always recording in the background" />
								<FeatureItem text="Instant save with one tap" />
								<FeatureItem text="Privacy-first: only saved clips are uploaded" />
								<FeatureItem text="Automatic cloud sync" />
							</div>
						</div>

						{/* Interactive Buffer Demo */}
						<div>
							<BufferDemo />
						</div>
					</div>
				</div>
			</section>

			{/* Recording Comparison Section */}
			<section className="relative py-24 px-6 z-10">
				<div className="max-w-6xl mx-auto">
					<RecordingComparison />
				</div>
			</section>

			{/* Features Grid */}
			<section className="relative py-24 px-6 z-10">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>
						Powerful <span className="text-gradient">Features</span>
					</h2>
					<p className="text-xl text-center mb-16 max-w-2xl mx-auto text-stone-300">
						Everything you need to capture and manage your audio moments.
					</p>
					
					<div className="grid md:grid-cols-3 gap-6">
						<FeatureCard
							title="High Quality Audio"
							description="AAC compression at 128kbps ensures crystal clear recordings at 44.1kHz."
						/>
						<FeatureCard
							title="Battery Optimized"
							description="Engineered for all-day recording on your smart watch without draining the battery."
						/>
						<FeatureCard
							title="Cloud Sync"
							description="Automatic upload to secure cloud storage. Access your clips anywhere."
						/>
						<FeatureCard
							title="Secure & Private"
							description="JWT authentication and encrypted transmission. Your data stays yours."
						/>
						<FeatureCard
							title="Multi-Platform"
							description="Works seamlessly on smart watches, phones, tablets, and online with a beautiful, intuitive interface."
						/>
						<FeatureCard
							title="One-Tap Save"
							description="No fumbling with controls. Just tap the save button when the moment strikes."
						/>
					</div>
				</div>
			</section>

			{/* Pricing Section */}
			<section className="relative py-24 px-6 z-10">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4" style={{ color: 'var(--foreground)' }}>
						Simple <span className="text-gradient">Pricing</span>
					</h2>
					<p className="text-xl text-center mb-16 max-w-2xl mx-auto text-stone-300">
						Start free. Upgrade when you're ready for more.
					</p>
					
					<div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
						<PricingCard
							name="Free"
							price="$0"
							period="forever"
							features={[
								"5-minute rolling buffer",
								"Up to 10 saved clips",
								"1GB cloud storage",
								"Basic features"
							]}
							cta="Get Started Free"
							ctaLink="/signup"
							popular={false}
							emitHover={emitCTAHover}
						/>
						<PricingCard
							name="Pro"
							price="$4.99"
							period="per month"
							features={[
								"5-minute rolling buffer",
								"Unlimited saved clips",
								"50GB cloud storage",
								"Advanced features",
								"Priority support"
							]}
							cta="Start Free Trial"
							ctaLink="/signup"
							popular={true}
							emitHover={emitCTAHover}
						/>
						<PricingCard
							name="Premium"
							price="$9.99"
							period="per month"
							features={[
								"10-minute rolling buffer",
								"Unlimited saved clips",
								"Unlimited cloud storage",
								"All features",
								"Priority support",
								"API access"
							]}
							cta="Start Free Trial"
							ctaLink="/signup"
							popular={false}
							emitHover={emitCTAHover}
						/>
					</div>
					<p className="text-center mt-8 text-stone-400">
						All accounts start free. No credit card required.
					</p>
				</div>
			</section>

			{/* Mobile App Download Section */}
			{userDevice !== 'other' && (
				<section className="relative py-24 px-6 z-10">
					<div className="max-w-4xl mx-auto">
						<div className="glass-card-feature p-12 rounded-3xl text-center">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
							Download for {userDevice === 'ios' ? 'iOS' : 'Android'}
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Get Save That Again on your {userDevice === 'ios' ? 'iPhone, iPad, and Apple Watch' : 'Android phone, tablet, and smart watch'}.
						</p>
							<a
								href={userDevice === 'ios' ? 'https://apps.apple.com' : 'https://play.google.com'}
								className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all font-medium"
								onMouseEnter={() => emitCTAHover(true)}
								onMouseLeave={() => emitCTAHover(false)}
							>
								Download Now
							</a>
						</div>
					</div>
				</section>
			)}

			{/* How It Works Timeline */}
			<section className="relative py-24 px-6 z-10">
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16" style={{ color: 'var(--foreground)' }}>
						Simple <span className="text-gradient">Workflow</span>
					</h2>
					
					<div className="space-y-8">
						<TimelineStep
							number="1"
							title="Continuous Recording"
							description="Your device starts recording automatically, maintaining a rolling 5-minute buffer."
						/>
						<TimelineStep
							number="2"
							title="Tap to Save"
							description="When something important happens, simply tap the save button on your watch."
						/>
						<TimelineStep
							number="3"
							title="Automatic Upload"
							description="The last 5 minutes are instantly saved and uploaded to your secure cloud storage."
						/>
						<TimelineStep
							number="4"
							title="Access Anywhere"
							description="View, manage, and download your saved clips from any device."
						/>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative py-24 px-6 z-10">
				<div className="max-w-4xl mx-auto">
					<div className="glass-card-feature p-12 rounded-3xl text-center">
						<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>
							Ready to capture every moment?
						</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto text-stone-300">
							Start using Save That Again today and never miss an important moment again.
						</p>
						<Link 
							href="/signup"
							className="glass-button-primary inline-block text-lg px-8 py-4 rounded-full hover:scale-105 transition-all font-medium"
							onMouseEnter={() => emitCTAHover(true)}
							onMouseLeave={() => emitCTAHover(false)}
						>
							Get Started Free
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

function FeatureItem({ text }: { text: string }) {
	return (
		<div className="flex items-center gap-3">
			<div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-blue)' }} />
			<span style={{ color: 'var(--foreground)' }}>{text}</span>
		</div>
	);
}

function FeatureCard({ title, description }: { title: string; description: string }) {
	return (
		<div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all group">
			<h3 className="text-2xl font-bold pb-3 text-gradient">{title}</h3>
			<p className="leading-relaxed text-stone-300">{description}</p>
		</div>
	);
}

function UseCaseCard({ title, description }: { title: string; description: string }) {
	return (
		<div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all group">
			<h3 className="text-2xl font-bold pb-3 text-gradient">{title}</h3>
			<p className="leading-relaxed text-stone-300">{description}</p>
		</div>
	);
}

function TimelineStep({ number, title, description }: { number: string; title: string; description: string }) {
	return (
		<div className="flex gap-6 items-start group">
			<div className="flex-shrink-0">
				<div className="glass-card-small w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
					{number}
				</div>
			</div>
			<div className="pt-1">
				<h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{title}</h3>
				<p className="text-lg leading-relaxed text-stone-300">{description}</p>
			</div>
		</div>
	);
}

function PricingCard({ 
	name, 
	price, 
	period, 
	features, 
	cta, 
	ctaLink, 
	popular,
	emitHover
}: { 
	name: string; 
	price: string; 
	period: string; 
	features: string[]; 
	cta: string; 
	ctaLink: string; 
	popular: boolean;
	emitHover: (isHovering: boolean) => void;
}) {
	return (
		<div className={`${popular ? 'glass-card-popular' : 'glass-card'} p-8 rounded-2xl relative ${popular ? 'ring-2' : ''}`} style={popular ? { borderColor: 'var(--accent-blue)' } : {}}>
			{popular && (
				<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
					<span style={{background: "var(--accent-blue)", color: "var(--background)"}} className="uppercase glass-button-primary px-4 py-1 rounded-full text-sm font-bold">
						Most Popular
					</span>
				</div>
			)}
			<h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{name}</h3>
			<div className="mb-6">
				<span className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>{price}</span>
				<span className="ml-2 text-stone-400">/ {period}</span>
			</div>
			<ul className="space-y-3 mb-8">
				{features.map((feature, index) => (
					<li key={index} className="flex items-start gap-2">
						<span className="mt-1" style={{ color: 'var(--accent-blue)' }}>✓</span>
						<span className="text-stone-300">{feature}</span>
					</li>
				))}
			</ul>
			<Link
				href={ctaLink}
				className={`block w-full text-center px-6 py-3 rounded-full font-medium transition-all ${
					popular 
						? 'glass-button-primary hover:scale-105' 
						: 'glass-button hover:scale-105'
				}`}
				onMouseEnter={() => emitHover(true)}
				onMouseLeave={() => emitHover(false)}
			>
				{cta}
			</Link>
		</div>
	);
}

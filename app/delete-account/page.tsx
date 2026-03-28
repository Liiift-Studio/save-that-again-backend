// Account Deletion page for Save That Again - required by Google Play

import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import InteractiveBackground from '../components/InteractiveBackground';

export const metadata = {
	title: 'Delete Your Account - Save That Again',
	description: 'Request deletion of your Save That Again account and all associated data.',
};

export default function DeleteAccountPage() {
	return (
		<div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
			<InteractiveBackground />
			<div className="fixed inset-0 bg-gradient-radial from-stone-900/20 via-black to-black pointer-events-none z-0" />
			<div className="fixed inset-0 bg-gradient-to-br from-neutral-800/5 via-transparent to-stone-800/5 pointer-events-none z-0" />

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
								priority
							/>
							<span className="text-lg font-semibold text-stone-200">Save That Again</span>
						</Link>
						<div className="flex items-center gap-6">
							<Link href="/privacy" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">Privacy Policy</Link>
							<Link href="/terms" className="text-sm text-stone-400 hover:text-stone-200 transition-colors">Terms</Link>
						</div>
					</div>
				</div>
			</nav>

			<main className="relative z-10 flex-grow max-w-3xl mx-auto px-6 py-16">
				<h1 className="text-4xl font-bold mb-8 text-stone-100">Delete Your Account</h1>

				<div className="space-y-8 text-stone-300 leading-relaxed">
					<section>
						<h2 className="text-2xl font-semibold text-stone-100 mb-4">How to Delete Your Account</h2>
						<p className="mb-4">You can delete your Save That Again account and all associated data using any of the following methods:</p>

						<div className="space-y-6">
							<div className="p-6 rounded-xl bg-stone-900/50 border border-stone-800">
								<h3 className="text-lg font-semibold text-stone-100 mb-2">Option 1: From the Phone App</h3>
								<ol className="list-decimal list-inside space-y-2 text-stone-300">
									<li>Open the Save That Again phone app</li>
									<li>Go to <strong>Settings</strong></li>
									<li>Scroll to <strong>Account</strong> section</li>
									<li>Tap <strong>Delete Account</strong></li>
									<li>Confirm your choice</li>
								</ol>
							</div>

							<div className="p-6 rounded-xl bg-stone-900/50 border border-stone-800">
								<h3 className="text-lg font-semibold text-stone-100 mb-2">Option 2: From the Web</h3>
								<ol className="list-decimal list-inside space-y-2 text-stone-300">
									<li>Log in at <a href="https://savethatagain.com/login" className="text-amber-400 hover:text-amber-300 underline">savethatagain.com/login</a></li>
									<li>Go to <strong>Settings</strong></li>
									<li>Click <strong>Delete Account</strong></li>
									<li>Confirm your choice</li>
								</ol>
							</div>

							<div className="p-6 rounded-xl bg-stone-900/50 border border-stone-800">
								<h3 className="text-lg font-semibold text-stone-100 mb-2">Option 3: Contact Us Directly</h3>
								<p className="text-stone-300">
									Email <a href="mailto:quinn@quitetype.com" className="text-amber-400 hover:text-amber-300 underline">quinn@quitetype.com</a> with
									the subject line &quot;Delete My Account&quot; and include the email address associated with your account.
									We will process your request within 48 hours.
								</p>
							</div>
						</div>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-stone-100 mb-4">What Gets Deleted</h2>
						<p className="mb-4">When you delete your account, the following data is <strong>permanently removed</strong>:</p>
						<ul className="list-disc list-inside space-y-2 text-stone-300">
							<li><strong>Account information</strong> — your name, email address, and authentication credentials</li>
							<li><strong>Audio recordings</strong> — all saved audio clips stored in the cloud</li>
							<li><strong>Usage data</strong> — analytics and activity history</li>
							<li><strong>Profile data</strong> — profile picture and preferences</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-stone-100 mb-4">Deletion Timeline</h2>
						<ul className="list-disc list-inside space-y-2 text-stone-300">
							<li><strong>Immediate deletion:</strong> Available in app settings. Account and all data are permanently removed right away.</li>
							<li><strong>Scheduled deletion (default):</strong> 30-day grace period. During this time, you can cancel the deletion by logging back in. After 30 days, all data is permanently removed.</li>
							<li><strong>Email request:</strong> Processed within 48 hours of receiving your request.</li>
						</ul>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-stone-100 mb-4">Data Retained After Deletion</h2>
						<p className="text-stone-300">
							After account deletion is complete, <strong>no personal data is retained</strong>. Anonymous, aggregated analytics
							data (such as total app usage counts) may be retained but cannot be linked back to your identity.
						</p>
					</section>

					<section>
						<h2 className="text-2xl font-semibold text-stone-100 mb-4">Questions?</h2>
						<p className="text-stone-300">
							If you have any questions about account deletion or data handling, contact us at{' '}
							<a href="mailto:quinn@quitetype.com" className="text-amber-400 hover:text-amber-300 underline">quinn@quitetype.com</a>.
						</p>
					</section>
				</div>
			</main>

			<Footer />
		</div>
	);
}

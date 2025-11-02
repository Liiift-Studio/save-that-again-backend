import InteractiveBackground from '../components/InteractiveBackground';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function CookiesPage() {
	return (
		<main className="min-h-screen bg-stone-950 text-stone-100">
			<InteractiveBackground />
			
			<div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
				<Link href="/" className="text-[#c9b896] hover:text-[#dcc7a4] mb-6 inline-block">
					← Back to Home
				</Link>

				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8" style={{ fontFamily: 'Daith Black, serif' }}>
					Cookie Policy
				</h1>

				<div className="prose prose-invert prose-stone max-w-none">
					<p className="text-xl text-stone-300 mb-8">
						Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
					</p>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>What Are Cookies</h2>
						<p className="text-stone-300 mb-4">
							Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>How We Use Cookies</h2>
						<p className="text-stone-300 mb-4">
							Save That Again uses cookies for the following purposes:
						</p>
						<ul className="list-disc pl-6 text-stone-300 space-y-2 mb-4">
							<li><strong>Authentication:</strong> To keep you logged in to your account</li>
							<li><strong>Preferences:</strong> To remember your settings and preferences</li>
							<li><strong>Security:</strong> To protect your account and prevent fraud</li>
							<li><strong>Analytics:</strong> To understand how you use our service (only with your consent)</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>Types of Cookies We Use</h2>
						
						<h3 className="text-xl font-bold mt-6 mb-3">Essential Cookies</h3>
						<p className="text-stone-300 mb-4">
							These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you, such as logging in or filling in forms.
						</p>
						<ul className="list-disc pl-6 text-stone-300 space-y-2 mb-4">
							<li><strong>Authentication token:</strong> Stores your login session</li>
							<li><strong>Security cookies:</strong> Protect against cross-site request forgery</li>
						</ul>

						<h3 className="text-xl font-bold mt-6 mb-3">Analytics Cookies</h3>
						<p className="text-stone-300 mb-4">
							These cookies help us understand how visitors interact with our website. We only use analytics cookies with your explicit consent, which you can manage in your <Link href="/settings" className="text-[#c9b896] hover:text-[#dcc7a4]">account settings</Link>.
						</p>

						<h3 className="text-xl font-bold mt-6 mb-3">Preference Cookies</h3>
						<p className="text-stone-300 mb-4">
							These cookies enable the website to remember choices you make (such as theme preferences) to provide enhanced, more personal features.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>Third-Party Cookies</h2>
						<p className="text-stone-300 mb-4">
							We use the following third-party services that may set cookies:
						</p>
						<ul className="list-disc pl-6 text-stone-300 space-y-2 mb-4">
							<li><strong>Google OAuth:</strong> For Google Sign-In authentication</li>
							<li><strong>Vercel:</strong> For hosting and content delivery</li>
						</ul>
						<p className="text-stone-300 mb-4">
							These third parties have their own privacy policies and cookie policies. We recommend reviewing them:
						</p>
						<ul className="list-disc pl-6 text-stone-300 space-y-2 mb-4">
							<li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#c9b896] hover:text-[#dcc7a4]">Google Privacy Policy</a></li>
							<li><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#c9b896] hover:text-[#dcc7a4]">Vercel Privacy Policy</a></li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>Managing Cookies</h2>
						<p className="text-stone-300 mb-4">
							You have several options for managing cookies:
						</p>

						<h3 className="text-xl font-bold mt-6 mb-3">In Your Account Settings</h3>
						<p className="text-stone-300 mb-4">
							You can manage your cookie preferences for analytics and marketing in your <Link href="/settings" className="text-[#c9b896] hover:text-[#dcc7a4]">account settings</Link>. Note that disabling essential cookies may affect the functionality of the website.
						</p>

						<h3 className="text-xl font-bold mt-6 mb-3">In Your Browser</h3>
						<p className="text-stone-300 mb-4">
							Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience on our website and limit the functionality available.
						</p>
						<p className="text-stone-300 mb-4">
							Learn how to manage cookies in popular browsers:
						</p>
						<ul className="list-disc pl-6 text-stone-300 space-y-2 mb-4">
							<li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#c9b896] hover:text-[#dcc7a4]">Google Chrome</a></li>
							<li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#c9b896] hover:text-[#dcc7a4]">Mozilla Firefox</a></li>
							<li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#c9b896] hover:text-[#dcc7a4]">Safari</a></li>
							<li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#c9b896] hover:text-[#dcc7a4]">Microsoft Edge</a></li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>Cookie Duration</h2>
						<p className="text-stone-300 mb-4">
							Cookies may be either "session" cookies or "persistent" cookies:
						</p>
						<ul className="list-disc pl-6 text-stone-300 space-y-2 mb-4">
							<li><strong>Session cookies:</strong> Temporary cookies that expire when you close your browser</li>
							<li><strong>Persistent cookies:</strong> Remain on your device for a set period or until you delete them. Our authentication token expires after 7 days</li>
						</ul>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>Updates to This Policy</h2>
						<p className="text-stone-300 mb-4">
							We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new policy on this page.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>Contact Us</h2>
						<p className="text-stone-300 mb-4">
							If you have questions about our use of cookies, please contact us:
						</p>
						<ul className="list-none text-stone-300 space-y-2">
							<li>Email: <a href="mailto:privacy@savethatagain.com" className="text-[#c9b896] hover:text-[#dcc7a4]">privacy@savethatagain.com</a></li>
							<li>Visit our <Link href="/contact" className="text-[#c9b896] hover:text-[#dcc7a4]">contact page</Link></li>
						</ul>
					</section>

					<div className="mt-12 p-6 bg-[#1C1917] bg-opacity-50 backdrop-blur-md rounded-lg border border-[#c9b896] border-opacity-20">
						<p className="text-stone-400 text-sm">
							By continuing to use Save That Again, you consent to our use of cookies as described in this policy. You can manage your cookie preferences at any time in your <Link href="/settings" className="text-[#c9b896] hover:text-[#dcc7a4]">account settings</Link>.
						</p>
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}

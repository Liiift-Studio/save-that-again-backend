// Signup page for Save That Again web interface

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import InteractiveBackground from '../components/InteractiveBackground';
import Footer from '../components/Footer';

export default function SignupPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleGoogleLogin = async () => {
		setError('');
		setIsLoading(true);

		try {
			const { google } = window as any;
			await google.accounts.id.initialize({
				client_id: '10264037893-arkrv2vpalginmd7aquc0m28he9h0dun.apps.googleusercontent.com',
				callback: async (response: any) => {
					try {
						const res = await fetch('/api/auth/google', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({ idToken: response.credential }),
						});

						const data = await res.json();

						if (res.ok) {
							// Store token
							localStorage.setItem('auth_token', data.token);
							localStorage.setItem('user', JSON.stringify(data.user));
							// Redirect to clips page
							router.push('/clips');
						} else {
							setError(data.error || 'Google signup failed');
							setIsLoading(false);
						}
					} catch (err) {
						setError('Network error during Google signup. Please try again.');
						setIsLoading(false);
					}
				},
			});

			google.accounts.id.prompt();
		} catch (err) {
			setError('Failed to initialize Google Sign-In. Please try again.');
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		// Use email prefix as name
		const name = email.split('@')[0];

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password, name }),
			});

			const data = await response.json();

			if (response.ok) {
				// Store token
				localStorage.setItem('auth_token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
				// Redirect to clips page
				router.push('/clips');
			} else {
				setError(data.error || 'Signup failed');
			}
		} catch (err) {
			setError('Network error. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black text-white overflow-hidden">
			{/* Interactive Background */}
			<InteractiveBackground />
			
			{/* Gradient Background */}
			<div className="fixed inset-0 bg-gradient-radial from-stone-900/20 via-black to-black pointer-events-none z-0" />
			<div className="fixed inset-0 bg-gradient-to-br from-neutral-800/5 via-transparent to-stone-800/5 pointer-events-none z-0" />
			
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
							priority
						/>
						<span className="font-bold bg-gradient-to-r from-white to-stone-300 bg-clip-text text-transparent" style={{ fontFamily: 'Halyard Text, sans-serif', fontSize: '20px', lineHeight: '32px' }}>
							Save That Again
						</span>
					</Link>
						<div className="flex items-center gap-4">
							<Link 
								href="/login"
								className="glass-button text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform"
							>
								Sign In
							</Link>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
				<div className="max-w-md w-full glass-card p-8 rounded-2xl">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold mb-2">Get Started</h1>
						<p className="text-stone-400">Create your account</p>
					</div>

					{/* Google Sign-In Button */}
					<button
						onClick={handleGoogleLogin}
						disabled={isLoading}
						className="w-full glass-button font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-105 transition-transform"
					>
						<svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
							<g fill="none" fillRule="evenodd">
								<path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
								<path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853"/>
								<path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC04"/>
								<path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.427 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"/>
							</g>
						</svg>
						Continue with Google
					</button>

					{/* OR Divider */}
					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-stone-700"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-4 bg-stone-900/50 text-stone-400">OR</span>
						</div>
					</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium mb-2"
						>
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-3 rounded-lg"
							placeholder="you@example.com"
							disabled={isLoading}
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium mb-2"
						>
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								minLength={6}
								className="w-full px-4 py-3 rounded-lg pr-12"
								placeholder="••••••••"
								disabled={isLoading}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
								disabled={isLoading}
							>
								{showPassword ? (
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
									</svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
										<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
										<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
									</svg>
								)}
							</button>
						</div>
							<p className="mt-1 text-xs text-stone-500">
							Minimum 6 characters
						</p>
					</div>

					{error && (
						<div className="border border-red-500 bg-red-950 text-red-300 px-4 py-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className={`w-full btn-primary font-semibold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${!isLoading ? 'pulse-button' : ''}`}
					>
						{isLoading ? 'Creating account...' : 'Sign Up'}
					</button>
				</form>

					<div className="mt-6 text-center">
						<p className="text-stone-400">
							Already have an account?{' '}
							<Link href="/login" className="text-stone-300 hover:text-white font-semibold transition-colors">
								Login
							</Link>
						</p>
					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
}

// Signup page for Save That Again web interface

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password }),
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
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="max-w-md w-full dark-card p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Save That Again</h1>
					<p className="text-gray-400">Create your account</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium mb-2"
						>
							Name
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-4 py-3 rounded-lg"
							placeholder="Your name"
							disabled={isLoading}
						/>
					</div>

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
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={6}
							className="w-full px-4 py-3 rounded-lg"
							placeholder="••••••••"
							disabled={isLoading}
						/>
						<p className="mt-1 text-xs text-gray-500">
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
					<p className="text-gray-400">
						Already have an account?{' '}
						<Link href="/login" className="text-[#2196f3] hover:text-[#1976d2] font-semibold">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

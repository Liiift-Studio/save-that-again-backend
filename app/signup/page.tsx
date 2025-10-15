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

		// Validation
		if (password.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}

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
		<div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
			<div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Save That Again
					</h1>
					<p className="text-gray-600">Create your account</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Full Name
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							placeholder="John Doe"
							disabled={isLoading}
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Email Address
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							placeholder="you@example.com"
							disabled={isLoading}
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							placeholder="••••••••"
							disabled={isLoading}
						/>
						<p className="text-xs text-gray-500 mt-1">
							At least 6 characters
						</p>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Creating account...' : 'Sign Up'}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-gray-600">
						Already have an account?{' '}
						<Link
							href="/login"
							className="text-blue-600 hover:text-blue-700 font-semibold"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

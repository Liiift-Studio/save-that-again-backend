'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InteractiveBackground from '../components/InteractiveBackground';
import Footer from '../components/Footer';

export default function SettingsPage() {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	
	// Privacy settings
	const [dataSharing, setDataSharing] = useState(true);
	const [analytics, setAnalytics] = useState(true);
	const [marketing, setMarketing] = useState(false);
	
	// Account deletion
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [deleteConfirmText, setDeleteConfirmText] = useState('');
	const [deletionScheduled, setDeletionScheduled] = useState<string | null>(null);

	useEffect(() => {
		checkAuth();
		loadPrivacySettings();
	}, []);

	const checkAuth = () => {
		const token = localStorage.getItem('token');
		const userData = localStorage.getItem('user');
		
		if (!token || !userData) {
			router.push('/login');
			return;
		}
		
		setUser(JSON.parse(userData));
		setLoading(false);
	};

	const loadPrivacySettings = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const response = await fetch('https://savethatagain.com/api/user/privacy', {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setDataSharing(data.settings.data_sharing_consent);
				setAnalytics(data.settings.analytics_consent);
				setMarketing(data.settings.marketing_consent);
			}
		} catch (err) {
			console.error('Error loading privacy settings:', err);
		}
	};

	const handleSavePrivacy = async () => {
		setSaving(true);
		setMessage('');
		setError('');

		const token = localStorage.getItem('token');
		if (!token) {
			setError('Not authenticated');
			setSaving(false);
			return;
		}

		try {
			const response = await fetch('https://savethatagain.com/api/user/privacy', {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data_sharing: dataSharing,
					analytics: analytics,
					marketing: marketing,
				}),
			});

			if (response.ok) {
				setMessage('Privacy settings updated successfully');
			} else {
				const data = await response.json();
				setError(data.error || 'Failed to update settings');
			}
		} catch (err) {
			setError('Network error. Please try again.');
		} finally {
			setSaving(false);
		}
	};

	const handleExportData = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const response = await fetch('https://savethatagain.com/api/user/export', {
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `save-that-again-data-${Date.now()}.json`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
				setMessage('Data exported successfully');
			} else {
				setError('Failed to export data');
			}
		} catch (err) {
			setError('Network error. Please try again.');
		}
	};

	const handleRequestDeletion = async () => {
		if (deleteConfirmText !== 'DELETE MY ACCOUNT') {
			setError('Please type DELETE MY ACCOUNT to confirm');
			return;
		}

		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const response = await fetch('https://savethatagain.com/api/user/delete', {
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setDeletionScheduled(data.scheduled_date);
				setShowDeleteConfirm(false);
				setMessage('Account deletion scheduled for 30 days from now');
			} else {
				const data = await response.json();
				setError(data.error || 'Failed to request deletion');
			}
		} catch (err) {
			setError('Network error. Please try again.');
		}
	};

	const handleCancelDeletion = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const response = await fetch('https://savethatagain.com/api/user/delete', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setDeletionScheduled(null);
				setMessage('Account deletion cancelled');
			} else {
				setError('Failed to cancel deletion');
			}
		} catch (err) {
			setError('Network error. Please try again.');
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		router.push('/');
	};

	if (loading) {
		return (
			<main className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center">
				<InteractiveBackground />
				<div className="text-xl">Loading...</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-stone-950 text-stone-100">
			<InteractiveBackground />
			
			<div className="relative z-10 container mx-auto px-4 py-16">
				{/* Header */}
				<div className="mb-12">
					<button
						onClick={() => router.push('/clips')}
						className="text-[#c9b896] hover:text-[#dcc7a4] mb-6 flex items-center gap-2"
					>
						← Back to Clips
					</button>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>
						Account Settings
					</h1>
					<p className="text-stone-400 text-lg">
						Manage your account, privacy, and data
					</p>
				</div>

				{/* Messages */}
				{message && (
					<div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg">
						{message}
					</div>
				)}
				{error && (
					<div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
						{error}
					</div>
				)}

				{/* Account deletion warning */}
				{deletionScheduled && (
					<div className="mb-6 p-6 bg-red-900/30 border border-red-700 rounded-lg">
						<h3 className="text-xl font-bold mb-2 text-red-400">Account Deletion Scheduled</h3>
						<p className="mb-4">Your account will be permanently deleted on {new Date(deletionScheduled).toLocaleDateString()}</p>
						<button
							onClick={handleCancelDeletion}
							className="px-6 py-2 bg-stone-700 hover:bg-stone-600 rounded-lg transition-colors"
						>
							Cancel Deletion
						</button>
					</div>
				)}

				<div className="grid lg:grid-cols-2 gap-8">
					{/* Privacy Settings */}
					<div className="bg-[#1C1917] bg-opacity-50 backdrop-blur-md rounded-2xl border border-[#c9b896] border-opacity-20 p-8">
						<h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Daith Black, serif' }}>
							Privacy Settings
						</h2>
						
						<div className="space-y-6">
							<label className="flex items-start gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={dataSharing}
									onChange={(e) => setDataSharing(e.target.checked)}
									className="mt-1 w-5 h-5 accent-[#c9b896]"
								/>
								<div>
									<div className="font-semibold">Data Sharing</div>
									<div className="text-sm text-stone-400">
										Allow sharing anonymized usage data to improve the service
									</div>
								</div>
							</label>

							<label className="flex items-start gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={analytics}
									onChange={(e) => setAnalytics(e.target.checked)}
									className="mt-1 w-5 h-5 accent-[#c9b896]"
								/>
								<div>
									<div className="font-semibold">Analytics</div>
									<div className="text-sm text-stone-400">
										Enable analytics tracking to help us understand how you use the app
									</div>
								</div>
							</label>

							<label className="flex items-start gap-3 cursor-pointer">
								<input
									type="checkbox"
									checked={marketing}
									onChange={(e) => setMarketing(e.target.checked)}
									className="mt-1 w-5 h-5 accent-[#c9b896]"
								/>
								<div>
									<div className="font-semibold">Marketing Communications</div>
									<div className="text-sm text-stone-400">
										Receive emails about new features, updates, and promotional offers
									</div>
								</div>
							</label>
						</div>

						<button
							onClick={handleSavePrivacy}
							disabled={saving}
							className="mt-8 w-full px-6 py-3 bg-[#c9b896] hover:bg-[#dcc7a4] text-stone-950 font-semibold rounded-lg transition-colors disabled:opacity-50"
						>
							{saving ? 'Saving...' : 'Save Privacy Settings'}
						</button>
					</div>

					{/* Data Management */}
					<div className="space-y-8">
						{/* Export Data */}
						<div className="bg-[#1C1917] bg-opacity-50 backdrop-blur-md rounded-2xl border border-[#c9b896] border-opacity-20 p-8">
							<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>
								Export Your Data
							</h2>
							<p className="text-stone-400 mb-6">
								Download a copy of all your data including account information and audio clips metadata (GDPR Article 20).
							</p>
							<button
								onClick={handleExportData}
								className="w-full px-6 py-3 bg-stone-700 hover:bg-stone-600 text-stone-100 font-semibold rounded-lg transition-colors"
							>
								Export Data as JSON
							</button>
						</div>

						{/* Account Info */}
						<div className="bg-[#1C1917] bg-opacity-50 backdrop-blur-md rounded-2xl border border-[#c9b896] border-opacity-20 p-8">
							<h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Daith Black, serif' }}>
								Account Information
							</h2>
							<div className="space-y-3 text-stone-400">
								<div>
									<span className="font-semibold text-stone-300">Email:</span> {user?.email}
								</div>
								<div>
									<span className="font-semibold text-stone-300">Name:</span> {user?.name || 'Not set'}
								</div>
								<div>
									<span className="font-semibold text-stone-300">Auth Provider:</span> {user?.auth_provider || 'email'}
								</div>
							</div>
							<button
								onClick={handleLogout}
								className="mt-6 w-full px-6 py-3 bg-stone-700 hover:bg-stone-600 text-stone-100 font-semibold rounded-lg transition-colors"
							>
								Log Out
							</button>
						</div>

						{/* Delete Account */}
						{!deletionScheduled && (
							<div className="bg-[#1C1917] bg-opacity-50 backdrop-blur-md rounded-2xl border border-red-700 border-opacity-30 p-8">
								<h2 className="text-2xl font-bold mb-4 text-red-400" style={{ fontFamily: 'Daith Black, serif' }}>
									Delete Account
								</h2>
								<p className="text-stone-400 mb-6">
									Permanently delete your account and all associated data. This action has a 30-day grace period during which you can cancel the deletion.
								</p>
								
								{!showDeleteConfirm ? (
									<button
										onClick={() => setShowDeleteConfirm(true)}
										className="w-full px-6 py-3 bg-red-900 hover:bg-red-800 text-stone-100 font-semibold rounded-lg transition-colors"
									>
										Delete My Account
									</button>
								) : (
									<div className="space-y-4">
										<p className="text-sm text-red-400 font-semibold">
											Type DELETE MY ACCOUNT to confirm:
										</p>
										<input
											type="text"
											value={deleteConfirmText}
											onChange={(e) => setDeleteConfirmText(e.target.value)}
											className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg focus:outline-none focus:border-red-500"
											placeholder="DELETE MY ACCOUNT"
										/>
										<div className="flex gap-3">
											<button
												onClick={handleRequestDeletion}
												className="flex-1 px-6 py-3 bg-red-900 hover:bg-red-800 text-stone-100 font-semibold rounded-lg transition-colors"
											>
												Confirm Deletion
											</button>
											<button
												onClick={() => {
													setShowDeleteConfirm(false);
													setDeleteConfirmText('');
												}}
												className="flex-1 px-6 py-3 bg-stone-700 hover:bg-stone-600 text-stone-100 font-semibold rounded-lg transition-colors"
											>
												Cancel
											</button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>

			<Footer />
		</main>
	);
}

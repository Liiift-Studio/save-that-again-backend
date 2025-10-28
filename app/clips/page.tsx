// Clips viewer page for Save That Again web interface

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Waveform from '../components/Waveform';
import InteractiveBackground from '../components/InteractiveBackground';

interface Clip {
	id: string;
	user_id: string;
	timestamp: string;
	duration: number;
	blob_url: string;
	tags: string[];
	created_at: string;
}

interface AudioState {
	[key: string]: {
		isPlaying: boolean;
		currentTime: number;
		duration: number;
	};
}

export default function ClipsPage() {
	const [clips, setClips] = useState<Clip[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [user, setUser] = useState<any>(null);
	const [audioStates, setAudioStates] = useState<AudioState>({});
	const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
	const router = useRouter();

	useEffect(() => {
		// Check authentication
		const token = localStorage.getItem('auth_token');
		const userData = localStorage.getItem('user');

		if (!token || !userData) {
			router.push('/login');
			return;
		}

		setUser(JSON.parse(userData));
		fetchClips(token);
	}, [router]);

	const fetchClips = async (token: string) => {
		try {
			const response = await fetch('/api/clips', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setClips(data.clips || []);
			} else if (response.status === 401) {
				// Token expired
				localStorage.removeItem('auth_token');
				localStorage.removeItem('user');
				router.push('/login');
			} else {
				setError('Failed to fetch clips');
			}
		} catch (err) {
			setError('Network error');
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('auth_token');
		localStorage.removeItem('user');
		router.push('/login');
	};

	const handleDelete = async (clipId: string) => {
		if (!confirm('Delete this clip? This cannot be undone.')) {
			return;
		}

		const token = localStorage.getItem('auth_token');
		try {
			const response = await fetch(`/api/clips/${clipId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setClips(clips.filter((c) => c.id !== clipId));
			} else {
				alert('Failed to delete clip');
			}
		} catch (err) {
			alert('Network error');
		}
	};

	const handleDownload = (clip: Clip) => {
		const link = document.createElement('a');
		link.href = clip.blob_url;
		link.download = `clip-${clip.timestamp}.m4a`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleShare = async (clip: Clip) => {
		const shareData = {
			title: 'Audio Clip',
			text: `Audio clip from ${formatTimestamp(clip.timestamp)}`,
			url: clip.blob_url,
		};

		if (navigator.share) {
			try {
				await navigator.share(shareData);
			} catch (err) {
				// User cancelled or error
			}
		} else {
			// Fallback: copy to clipboard
			navigator.clipboard.writeText(clip.blob_url);
			alert('Link copied to clipboard!');
		}
	};

	const formatDuration = (ms: number) => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	};

	const formatTimestamp = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleString();
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2196f3] mx-auto mb-4"></div>
					<p className="text-gray-400">Loading clips...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-black text-white overflow-hidden">
			{/* Interactive Background */}
			<InteractiveBackground />
			
			{/* Gradient Background */}
			<div className="fixed inset-0 bg-gradient-radial from-blue-900/20 via-black to-black pointer-events-none z-0" />
			<div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none z-0" />
			
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
					<span className="font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent" style={{ fontFamily: 'Gamay, sans-serif', fontStretch: '200%', fontSize: '20px', lineHeight: '32px' }}>
						Save That Again
					</span>
				</Link>
						<div className="flex items-center gap-4">
							{user && (
								<span className="text-sm text-gray-400">Welcome, {user.name}</span>
							)}
							<button
								onClick={handleLogout}
								className="glass-button text-sm px-4 py-2 rounded-full hover:scale-105 transition-transform"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* Main Content */}
			<main className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
				{error && (
					<div className="mb-6 border border-red-500 bg-red-950 text-red-300 px-4 py-3 rounded-lg">
						{error}
					</div>
				)}

				<div className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold mb-2 uppercase tracking-wide">Your Audio Clips</h1>
					<p className="text-gray-400 text-lg">
						{clips.length} clip{clips.length !== 1 ? 's' : ''} saved from your watch
					</p>
				</div>

				{clips.length === 0 ? (
					<div className="glass-card p-12 rounded-2xl text-center">
						<svg
							className="mx-auto h-12 w-12 text-gray-600 mb-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
							/>
						</svg>
						<h3 className="text-lg font-medium mb-2">No clips yet</h3>
						<p className="text-gray-400">
							Save moments from your Pixel Watch to see them here
						</p>
					</div>
				) : (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{clips.map((clip) => (
							<ClipCard
								key={clip.id}
								clip={clip}
								audioState={audioStates[clip.id]}
								audioRef={(el) => {
									if (el) audioRefs.current[clip.id] = el;
								}}
								onAudioUpdate={(state) => {
									setAudioStates((prev) => ({
										...prev,
										[clip.id]: state,
									}));
								}}
								onDelete={() => handleDelete(clip.id)}
								onDownload={() => handleDownload(clip)}
								onShare={() => handleShare(clip)}
								formatTimestamp={formatTimestamp}
								formatDuration={formatDuration}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
}

// Separate ClipCard component for better performance
function ClipCard({
	clip,
	audioState,
	audioRef,
	onAudioUpdate,
	onDelete,
	onDownload,
	onShare,
	formatTimestamp,
	formatDuration,
}: {
	clip: Clip;
	audioState?: { isPlaying: boolean; currentTime: number; duration: number };
	audioRef: (el: HTMLAudioElement | null) => void;
	onAudioUpdate: (state: {
		isPlaying: boolean;
		currentTime: number;
		duration: number;
	}) => void;
	onDelete: () => void;
	onDownload: () => void;
	onShare: () => void;
	formatTimestamp: (timestamp: string) => string;
	formatDuration: (ms: number) => string;
}) {
	return (
		<div className="glass-card p-6 rounded-2xl hover:scale-105 transition-all">
			<div className="flex items-start justify-between mb-4">
				<div className="flex-1">
					<p className="text-sm font-medium mb-1">
						{formatTimestamp(clip.timestamp)}
					</p>
					<p className="text-xs text-gray-500">
						Duration: {formatDuration(clip.duration)}
					</p>
				</div>
				<svg
					className="h-5 w-5 text-[#2196f3]"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clipRule="evenodd"
					/>
				</svg>
			</div>

			{/* Waveform visualization with play/pause control */}
			<div className="mb-4">
				<div className="flex items-center gap-3 mb-2">
					<button
						onClick={() => {
							const audio = (audioRef as any).current;
							if (!audio) return;
							
							if (audio.paused) {
								audio.play();
							} else {
								audio.pause();
							}
						}}
						className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2196f3] hover:bg-[#1976d2] transition-colors flex items-center justify-center"
						title={audioState?.isPlaying ? 'Pause' : 'Play'}
					>
						{audioState?.isPlaying ? (
							<svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
							</svg>
						) : (
							<svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
							</svg>
						)}
					</button>
					<div className="flex-1">
						<Waveform
							audioUrl={clip.blob_url}
							isPlaying={audioState?.isPlaying || false}
							currentTime={audioState?.currentTime || 0}
							duration={audioState?.duration || clip.duration / 1000}
							onSeek={(time) => {
								const audio = (audioRef as any).current;
								if (audio) {
									audio.currentTime = time;
								}
							}}
						/>
					</div>
				</div>
			</div>

			{/* Hidden audio element for waveform sync */}
			<audio
				ref={audioRef}
				src={clip.blob_url}
				preload="metadata"
				onLoadedMetadata={(e) => {
					const audio = e.target as HTMLAudioElement;
					onAudioUpdate({
						isPlaying: false,
						currentTime: 0,
						duration: audio.duration,
					});
				}}
				onTimeUpdate={(e) => {
					const audio = e.target as HTMLAudioElement;
					onAudioUpdate({
						isPlaying: !audio.paused,
						currentTime: audio.currentTime,
						duration: audio.duration,
					});
				}}
				onPlay={(e) => {
					const audio = e.target as HTMLAudioElement;
					onAudioUpdate({
						isPlaying: true,
						currentTime: audio.currentTime,
						duration: audio.duration,
					});
				}}
				onPause={(e) => {
					const audio = e.target as HTMLAudioElement;
					onAudioUpdate({
						isPlaying: false,
						currentTime: audio.currentTime,
						duration: audio.duration,
					});
				}}
				className="hidden"
			>
				Your browser does not support audio playback.
			</audio>

			{/* Action buttons */}
			<div className="flex gap-2 mb-4">
				<button
					onClick={onDownload}
					className="flex-1 glass-button text-sm px-3 py-2 rounded-full hover:scale-105 transition-transform"
					title="Download"
				>
					Download
				</button>
				<button
					onClick={onShare}
					className="flex-1 glass-button text-sm px-3 py-2 rounded-full hover:scale-105 transition-transform"
					title="Share"
				>
					Share
				</button>
				<button
					onClick={onDelete}
					className="flex-1 text-sm px-3 py-2 rounded-full border border-red-500 hover:bg-red-950 text-red-400 transition-all"
					title="Delete"
				>
					Delete
				</button>
			</div>

			{clip.tags && clip.tags.length > 0 && (
				<div className="flex flex-wrap gap-2">
					{clip.tags.map((tag, index) => (
						<span
							key={index}
							className="px-2 py-1 text-xs font-medium glass-card-small rounded-full text-blue-400"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
}

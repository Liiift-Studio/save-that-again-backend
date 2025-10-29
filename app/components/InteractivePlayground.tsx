'use client';

// Interactive playground where users can practice saving moments
import { useState, useEffect, useRef } from 'react';

interface Moment {
	id: number;
	time: number;
	text: string;
	emoji: string;
	type: 'good' | 'great' | 'amazing';
}

export default function InteractivePlayground() {
	const [currentTime, setCurrentTime] = useState(0);
	const [moments, setMoments] = useState<Moment[]>([]);
	const [savedMoments, setSavedMoments] = useState<number[]>([]);
	const [score, setScore] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [feedback, setFeedback] = useState<string>('');
	const bufferSize = 30; // 30 seconds
	const nextMomentIdRef = useRef(0);

	useEffect(() => {
		if (!gameStarted) return;

		const interval = setInterval(() => {
			setCurrentTime(prev => prev + 0.1);
		}, 100);

		return () => clearInterval(interval);
	}, [gameStarted]);

	useEffect(() => {
		if (!gameStarted) return;

		// Randomly spawn moments
		const spawnInterval = setInterval(() => {
			if (Math.random() > 0.7) { // 30% chance each second
				spawnMoment();
			}
		}, 1000);

		return () => clearInterval(spawnInterval);
	}, [gameStarted, currentTime]);

	const spawnMoment = () => {
		const momentTypes = [
			{ text: 'Baby\'s first word!', emoji: '👶', type: 'amazing' as const },
			{ text: 'Brilliant idea shared', emoji: '💡', type: 'great' as const },
			{ text: 'Funny joke told', emoji: '😂', type: 'good' as const },
			{ text: 'Beautiful song played', emoji: '🎵', type: 'great' as const },
			{ text: 'Heartfelt confession', emoji: '❤️', type: 'amazing' as const },
			{ text: 'Important advice given', emoji: '🎓', type: 'great' as const },
			{ text: 'Spontaneous laughter', emoji: '🤣', type: 'good' as const },
		];

		const randomMoment = momentTypes[Math.floor(Math.random() * momentTypes.length)];
		const newMoment: Moment = {
			id: nextMomentIdRef.current++,
			time: currentTime,
			...randomMoment
		};

		setMoments(prev => [...prev, newMoment]);

		// Show notification
		setFeedback(`${randomMoment.emoji} ${randomMoment.text}`);
		setTimeout(() => setFeedback(''), 2000);
	};

	const saveMoment = () => {
		const bufferStart = Math.max(0, currentTime - bufferSize);
		const capturedMoments = moments.filter(m => 
			m.time >= bufferStart && 
			m.time <= currentTime &&
			!savedMoments.includes(m.id)
		);

		if (capturedMoments.length > 0) {
			const newlySaved = capturedMoments.map(m => m.id);
			setSavedMoments(prev => [...prev, ...newlySaved]);
			
			// Calculate points
			const points = capturedMoments.reduce((sum, m) => {
				if (m.type === 'amazing') return sum + 30;
				if (m.type === 'great') return sum + 20;
				return sum + 10;
			}, 0);
			
			setScore(prev => prev + points);
			setFeedback(`🎉 Saved ${capturedMoments.length} moment${capturedMoments.length > 1 ? 's' : ''}! +${points} points`);
		} else {
			setFeedback('No new moments in buffer range');
		}

		setTimeout(() => setFeedback(''), 2000);
	};

	const startGame = () => {
		setGameStarted(true);
		setCurrentTime(0);
		setMoments([]);
		setSavedMoments([]);
		setScore(0);
		setFeedback('Game started! Watch for special moments...');
		setTimeout(() => setFeedback(''), 2000);
	};

	const resetGame = () => {
		setGameStarted(false);
		setCurrentTime(0);
		setMoments([]);
		setSavedMoments([]);
		setScore(0);
		setFeedback('');
	};

	const bufferStart = Math.max(0, currentTime - bufferSize);
	const visibleMoments = moments.filter(m => m.time >= bufferStart - 5);

	return (
		<div className="glass-card p-8 rounded-2xl">
			<div className="mb-6 text-center">
				<h3 className="text-3xl font-bold mb-3 text-gradient">
					Interactive Practice Mode
				</h3>
				<p className="text-gray-400">
					Practice using the rolling buffer! Special moments will appear randomly - try to save them all.
				</p>
			</div>

			{/* Score and Controls */}
			<div className="grid md:grid-cols-3 gap-4 mb-6">
				<div className="glass-card-small p-4 rounded-lg text-center">
					<div className="text-xs text-gray-400 mb-1">Score</div>
					<div className="text-3xl font-bold text-gradient">{score}</div>
				</div>
				<div className="glass-card-small p-4 rounded-lg text-center">
					<div className="text-xs text-gray-400 mb-1">Time Elapsed</div>
					<div className="text-3xl font-bold text-blue-400">{currentTime.toFixed(1)}s</div>
				</div>
				<div className="glass-card-small p-4 rounded-lg text-center">
					<div className="text-xs text-gray-400 mb-1">Moments Saved</div>
					<div className="text-3xl font-bold text-green-400">{savedMoments.length}</div>
				</div>
			</div>

			{/* Timeline Visualization */}
			<div className="mb-6">
				<div className="relative h-32 bg-black/40 rounded-lg border border-gray-700 overflow-hidden">
					{/* Buffer zone */}
					<div 
						className="absolute top-0 bottom-0 bg-blue-500/20 border-l-2 border-r-2 border-blue-500"
						style={{
							left: `${Math.max(0, ((bufferStart - (bufferStart - 5)) / 40) * 100)}%`,
							width: `${(bufferSize / 40) * 100}%`
						}}
					/>

					{/* Moments */}
					{visibleMoments.map(moment => {
						const position = ((moment.time - (bufferStart - 5)) / 40) * 100;
						const isSaved = savedMoments.includes(moment.id);
						const isInBuffer = moment.time >= bufferStart && moment.time <= currentTime;
						
						return (
							<div
								key={moment.id}
								className={`absolute top-1/2 -translate-y-1/2 transition-all ${
									isSaved ? 'scale-75 opacity-50' : isInBuffer ? 'scale-100' : 'opacity-30'
								}`}
								style={{ left: `${position}%` }}
							>
								<div className={`text-3xl ${isSaved ? 'grayscale' : ''}`}>
									{moment.emoji}
								</div>
								{isSaved && (
									<div className="absolute -top-1 -right-1 text-xs">✅</div>
								)}
							</div>
						);
					})}

					{/* Current time indicator */}
					<div 
						className="absolute top-0 bottom-0 w-1 bg-white"
						style={{ right: 0 }}
					>
						<div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-4 h-4 bg-white rounded-full" />
					</div>
				</div>

				<div className="flex gap-4 mt-2 text-xs text-gray-400">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-blue-500/40 border border-blue-500 rounded" />
						<span>Active Buffer ({bufferSize}s)</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-xl">✅</span>
						<span>Saved Moments</span>
					</div>
				</div>
			</div>

			{/* Feedback Message */}
			{feedback && (
				<div className="mb-4 p-4 bg-blue-950/40 rounded-lg border border-blue-900/30 text-center animate-pulse">
					<p className="text-sm text-blue-300 font-medium">{feedback}</p>
				</div>
			)}

			{/* Action Buttons */}
			<div className="grid md:grid-cols-2 gap-4">
				{!gameStarted ? (
					<button
						onClick={startGame}
						className="md:col-span-2 glass-button-primary px-6 py-4 rounded-lg font-semibold hover:scale-105 transition-all text-lg"
					>
						🎮 Start Practice Game
					</button>
				) : (
					<>
						<button
							onClick={saveMoment}
							className="glass-button-primary px-6 py-4 rounded-lg font-semibold hover:scale-105 transition-all"
						>
							💾 Save Buffer Now!
						</button>
						<button
							onClick={resetGame}
							className="glass-button px-6 py-4 rounded-lg font-semibold hover:scale-105 transition-all"
						>
							🔄 Reset Game
						</button>
					</>
				)}
			</div>

			{/* Instructions */}
			<div className="mt-6 p-4 bg-gradient-to-r from-purple-950/40 to-blue-950/40 rounded-lg border border-purple-900/30">
				<h4 className="font-bold text-blue-400 mb-2">How to Play:</h4>
				<ul className="text-sm text-gray-300 space-y-1">
					<li>• Special moments (emojis) appear randomly on the timeline</li>
					<li>• The blue zone shows your active 30-second buffer</li>
					<li>• Click "Save Buffer Now!" to capture all moments in the buffer</li>
					<li>• Different moments award different points (Amazing=30, Great=20, Good=10)</li>
					<li>• Try to save as many moments as possible!</li>
				</ul>
			</div>
		</div>
	);
}

'use client';

// Component showing traditional recording vs buffer recording with waveforms
import { useState, useEffect, useRef } from 'react';

export default function RecordingComparison() {
	const [currentTime, setCurrentTime] = useState(0);
	const [traditionalRecording, setTraditionalRecording] = useState(false);
	const [traditionalStartTime, setTraditionalStartTime] = useState<number | null>(null);
	const [savedBufferSegments, setSavedBufferSegments] = useState<{start: number, end: number}[]>([]);
	const totalDuration = 60; // 60 second timeline
	const traditionalWaveformRef = useRef<HTMLCanvasElement>(null);
	const bufferWaveformRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(prev => {
				if (prev >= totalDuration) return 0;
				return prev + 0.1;
			});
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, []);

	// Generate static speech-like waveform pattern (same pattern, not animated)
	const getSpeechPattern = (barIndex: number) => {
		// Combine multiple frequencies to create speech-like variation
		const baseFreq = Math.sin(barIndex * 0.3) * 0.4;
		const midFreq = Math.sin(barIndex * 0.5) * 0.3;
		const highFreq = Math.sin(barIndex * 0.7) * 0.2;
		
		// Add some randomness for natural speech patterns
		const randomness = Math.sin(barIndex * 1.1) * 0.1;
		
		// Create amplitude envelope (speech has pauses and peaks)
		const envelope = Math.abs(Math.sin(barIndex * 0.2)) * 0.8 + 0.2;
		
		return Math.abs(baseFreq + midFreq + highFreq + randomness) * envelope;
	};

	// Draw static waveforms (flat before current time, pattern after)
	useEffect(() => {
		drawWaveform(traditionalWaveformRef.current, 'traditional');
		drawWaveform(bufferWaveformRef.current, 'buffer');
	}, [currentTime, traditionalRecording, traditionalStartTime]);

	const drawWaveform = (canvas: HTMLCanvasElement | null, type: 'traditional' | 'buffer') => {
		if (!canvas) return;
		
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = canvas.offsetWidth * 2;
		canvas.height = canvas.offsetHeight * 2;
		ctx.scale(2, 2);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const width = canvas.offsetWidth;
		const height = canvas.offsetHeight;
		const barCount = 60;
		const barWidth = width / barCount;
		const centerY = height / 2;

		for (let i = 0; i < barCount; i++) {
			const timePosition = (i / barCount) * totalDuration;
			const x = i * barWidth;
			
			// Determine if this bar should show waveform or be flat
			let shouldShow = false;
			if (type === 'traditional') {
				// Traditional: only show if we're recording and past start time
				shouldShow = traditionalRecording && traditionalStartTime !== null && timePosition >= traditionalStartTime && timePosition <= currentTime;
			} else {
				// Buffer: always show for last 30 seconds
				const bufferStart = Math.max(0, currentTime - 30);
				shouldShow = timePosition >= bufferStart && timePosition <= currentTime;
			}

			const speechAmplitude = getSpeechPattern(i);
			const amplitude = shouldShow ? speechAmplitude : 0.05; // Very small amplitude when flat
			const barHeight = amplitude * centerY * 0.9;
			
			// Create gradient
			const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
			if (shouldShow) {
				gradient.addColorStop(0, 'rgba(157, 141, 122, 0.8)');
				gradient.addColorStop(0.5, 'rgba(157, 141, 122, 1)');
				gradient.addColorStop(1, 'rgba(157, 141, 122, 0.8)');
			} else {
				gradient.addColorStop(0, 'rgba(120, 113, 108, 0.2)');
				gradient.addColorStop(0.5, 'rgba(168, 162, 158, 0.3)');
				gradient.addColorStop(1, 'rgba(120, 113, 108, 0.2)');
			}
			
			ctx.fillStyle = gradient;
			ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight * 2);
		}
	};

	const startTraditionalRecording = () => {
		setTraditionalRecording(true);
		setTraditionalStartTime(currentTime);
	};

	const stopTraditionalRecording = () => {
		setTraditionalRecording(false);
		setTraditionalStartTime(null);
	};

	const handleSaveBuffer = () => {
		const start = Math.max(0, currentTime - 30);
		const end = currentTime;
		setSavedBufferSegments(prev => [...prev, { start, end }]);
	};

	const bufferStart = Math.max(0, currentTime - 30);
	const bufferEnd = currentTime;

	return (
		<div className="glass-card p-8 rounded-2xl">
			<div className="mb-8 text-center">
				<h3 className="text-3xl font-bold pb-3 text-gradient">
					Traditional Recording vs. Buffer Recording
				</h3>
				<p className="text-gray-400">
					See the difference between starting a recording manually and using a rolling buffer
				</p>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				{/* Traditional Recording */}
				<div className="glass-card-small p-6 rounded-xl">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-3 h-3 rounded-full bg-red-500" />
						<h4 className="text-xl font-bold">Traditional Recording</h4>
					</div>

					<div className="relative h-20 bg-black/40 rounded-lg border border-gray-700 mb-4 overflow-hidden">
						{/* Waveform overlaid on timeline */}
						<canvas
							ref={traditionalWaveformRef}
							className="absolute inset-0 w-full h-full pointer-events-none"
						/>
						{/* Timeline */}
						<div className="absolute bottom-1 left-0 right-0 flex items-center justify-center text-xs text-gray-600 px-2">
							<span className="whitespace-nowrap">Traditional Recording</span>
						</div>

					{/* Recording segment */}
					{traditionalStartTime !== null && traditionalRecording && (
						<div
							className="absolute top-0 bottom-0 bg-stone-500/40 border-l-2 border-r-2 border-stone-500"
							style={{
								left: `${(traditionalStartTime / totalDuration) * 100}%`,
								width: `${((currentTime - traditionalStartTime) / totalDuration) * 100}%`
							}}
						/>
					)}

						{/* Current time */}
						<div
							className="absolute top-0 bottom-0 w-1 bg-white"
							style={{ left: `${(currentTime / totalDuration) * 100}%` }}
						/>
					</div>

					<div className="mb-4">
					<button
						onClick={traditionalRecording ? stopTraditionalRecording : startTraditionalRecording}
						className={`w-full px-4 py-2 rounded-lg font-medium transition-all ${
							traditionalRecording
								? 'bg-stone-600/80 hover:bg-stone-600'
								: 'glass-button hover:scale-105'
						}`}
					>
						{traditionalRecording ? 'Stop Recording' : 'Start Recording'}
					</button>
					</div>

				<div className="p-3 bg-stone-950/20 rounded-lg border border-stone-900/30">
					<p className="text-xs text-gray-400">
						{!traditionalRecording && !traditionalStartTime && (
							<><strong>Limitation:</strong> Only captures audio from the moment you press "Start"</>
						)}
						{traditionalRecording && (
							<><strong>Recording:</strong> Capturing audio from {traditionalStartTime?.toFixed(1)}s onwards</>
						)}
						{!traditionalRecording && traditionalStartTime !== null && (
							<><strong>Stopped:</strong> Captured {(currentTime - traditionalStartTime).toFixed(1)}s of audio</>
						)}
					</p>
				</div>
				</div>

				{/* Buffer Recording */}
				<div className="glass-card-small p-6 rounded-xl border-2 border-stone-500/30">
					<div className="flex items-center gap-3 mb-4">
						<div className="w-3 h-3 rounded-full bg-stone-500 animate-pulse" />
						<h4 className="text-xl font-bold">Buffer Recording</h4>
						<span className="text-xs bg-stone-500/20 px-2 py-1 rounded-full">Always On</span>
					</div>

					<div className="relative h-20 bg-black/40 rounded-lg border border-stone-700 mb-4 overflow-hidden">
						{/* Waveform overlaid on timeline */}
						<canvas
							ref={bufferWaveformRef}
							className="absolute inset-0 w-full h-full pointer-events-none"
						/>
						{/* Timeline */}
						<div className="absolute bottom-1 left-0 right-0 flex items-center justify-center text-xs text-gray-600 px-2">
							<span className="whitespace-nowrap">Always Recording (30s buffer)</span>
						</div>

						{/* Active buffer - always last 30 seconds */}
						<div
							className="absolute top-0 bottom-0 bg-stone-500/40 border-l-2 border-r-2 border-stone-500"
							style={{
								left: `${(bufferStart / totalDuration) * 100}%`,
								width: `${((bufferEnd - bufferStart) / totalDuration) * 100}%`
							}}
						/>

					{/* Saved buffer segments */}
					{savedBufferSegments.map((segment, idx) => (
						<div
							key={idx}
							className="absolute top-0 bottom-0 bg-stone-600/40 border-l-2 border-r-2 border-stone-500"
							style={{
								left: `${(segment.start / totalDuration) * 100}%`,
								width: `${((segment.end - segment.start) / totalDuration) * 100}%`
							}}
						/>
					))}

						{/* Current time */}
						<div
							className="absolute top-0 bottom-0 w-1 bg-white"
							style={{ left: `${(currentTime / totalDuration) * 100}%` }}
						/>
					</div>

					<button
						onClick={handleSaveBuffer}
						className="w-full glass-button-primary px-4 py-3 rounded-lg font-medium hover:scale-105 transition-all mb-4"
					>
						Save Last 30 Seconds
					</button>

					<div className="p-3 bg-stone-950/20 rounded-lg border border-stone-900/30">
						<p className="text-xs text-gray-400">
							<strong>Always ready:</strong> Continuously captures the last 30 seconds. 
							Tap "Save" anytime to keep what just happened!
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 p-4 bg-gradient-to-r from-stone-950/40 to-stone-950/40 rounded-lg border border-stone-900/30">
				<p className="text-sm text-gray-300 text-center">
					<strong className="text-stone-400">The Advantage:</strong> With Save That Again's rolling buffer, 
					you never need to anticipate special moments. They're automatically captured in your 5-minute buffer, 
					ready to save with just one tap!
				</p>
			</div>
		</div>
	);
}

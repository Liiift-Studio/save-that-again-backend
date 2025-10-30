'use client';

// Interactive buffer demonstration component with real audio recording and waveform
import { useState, useEffect, useRef } from 'react';

export default function BufferDemo() {
	const [currentTime, setCurrentTime] = useState(0);
	const [savedSegments, setSavedSegments] = useState<{start: number, end: number}[]>([]);
	const [isSaving, setIsSaving] = useState(false);
	const [justSaved, setJustSaved] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [permissionGranted, setPermissionGranted] = useState(false);
	const [audioLevel, setAudioLevel] = useState(0);
	const [waveformData, setWaveformData] = useState<number[]>(new Array(50).fill(0));
	const bufferSize = 30; // 30 seconds
	const totalDuration = 120; // 2 minutes total
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const waveformCanvasRef = useRef<HTMLCanvasElement>(null);
	
	// Audio recording refs
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const audioContextRef = useRef<AudioContext | null>(null);
	const analyserRef = useRef<AnalyserNode | null>(null);
	const savedAudioRef = useRef<Blob[]>([]);
	const streamRef = useRef<MediaStream | null>(null);

	useEffect(() => {
		return () => {
			stopRecording();
		};
	}, []);

	// Draw waveform
	useEffect(() => {
		if (!waveformCanvasRef.current) return;
		
		const canvas = waveformCanvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas size
		canvas.width = canvas.offsetWidth * 2; // 2x for retina
		canvas.height = canvas.offsetHeight * 2;
		ctx.scale(2, 2);

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		// Draw waveform
		const width = canvas.offsetWidth;
		const height = canvas.offsetHeight;
		const barWidth = width / waveformData.length;
		const centerY = height / 2;

		waveformData.forEach((value, i) => {
			const x = i * barWidth;
			const barHeight = value * centerY * 0.8;
			
			// Create gradient
			const gradient = ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
			gradient.addColorStop(0, 'rgba(157, 141, 122, 0.8)');
			gradient.addColorStop(0.5, 'rgba(157, 141, 122, 1)');
			gradient.addColorStop(1, 'rgba(157, 141, 122, 0.8)');
			
			ctx.fillStyle = gradient;
			ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight * 2);
		});
	}, [waveformData]);

	const requestMicrophonePermission = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			streamRef.current = stream;
			setPermissionGranted(true);
			startRecording(stream);
		} catch (error) {
			console.error('Microphone permission denied:', error);
			alert('Microphone access is required for the demo. Please grant permission and try again.');
		}
	};

	const startRecording = (stream: MediaStream) => {
		// Set up audio context for visualization
		audioContextRef.current = new AudioContext();
		const source = audioContextRef.current.createMediaStreamSource(stream);
		analyserRef.current = audioContextRef.current.createAnalyser();
		analyserRef.current.fftSize = 256;
		analyserRef.current.smoothingTimeConstant = 0.8;
		source.connect(analyserRef.current);

		// Start visualizing audio
		visualizeAudio();

		// Set up media recorder
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorderRef.current = mediaRecorder;
		audioChunksRef.current = [];

		mediaRecorder.ondataavailable = (event) => {
			if (event.data.size > 0) {
				audioChunksRef.current.push(event.data);
				// Keep only the last 30 seconds of chunks (approximate)
				if (audioChunksRef.current.length > 30) {
					audioChunksRef.current.shift();
				}
			}
		};

		mediaRecorder.start(1000);
		setIsRecording(true);

		// Start time progression (reset after 2 minutes)
		intervalRef.current = setInterval(() => {
			setCurrentTime(prev => {
				const next = prev + 0.1;
				return next >= totalDuration ? 0 : next;
			});
		}, 100);
	};

	const visualizeAudio = () => {
		if (!analyserRef.current) return;

		const bufferLength = analyserRef.current.frequencyBinCount;
		const dataArray = new Uint8Array(bufferLength);
		const waveformDataArray = new Uint8Array(analyserRef.current.fftSize);
		
		const updateVisualization = () => {
			if (!analyserRef.current) return;
			
			// Get frequency data for level meter
			analyserRef.current.getByteFrequencyData(dataArray);
			const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
			setAudioLevel(average / 255);
			
			// Get time domain data for waveform
			analyserRef.current.getByteTimeDomainData(waveformDataArray);
			
			// Sample and normalize waveform data
			const step = Math.floor(waveformDataArray.length / 50);
			const normalized = [];
			for (let i = 0; i < 50; i++) {
				const value = waveformDataArray[i * step] / 128.0 - 1.0;
				normalized.push(Math.abs(value));
			}
			setWaveformData(normalized);
			
			requestAnimationFrame(updateVisualization);
		};
		
		updateVisualization();
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current && isRecording) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
		
		if (streamRef.current) {
			streamRef.current.getTracks().forEach(track => track.stop());
		}
		
		if (audioContextRef.current) {
			audioContextRef.current.close();
		}
		
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	};

	const handleSave = () => {
		if (isSaving || !isRecording) return;
		
		setIsSaving(true);
		setJustSaved(true);
		
		const endTime = currentTime;
		const startTime = Math.max(0, currentTime - bufferSize);
		
		setSavedSegments(prev => [...prev, { start: startTime, end: endTime }]);
		
		const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
		savedAudioRef.current.push(audioBlob);
		
		setTimeout(() => {
			setIsSaving(false);
			setJustSaved(false);
		}, 1000);
	};

	const playLastSavedAudio = () => {
		if (savedAudioRef.current.length === 0) {
			alert('No saved audio clips yet. Click "Save" to capture the buffer first!');
			return;
		}

		const lastSavedBlob = savedAudioRef.current[savedAudioRef.current.length - 1];
		const audioUrl = URL.createObjectURL(lastSavedBlob);
		const audio = new Audio(audioUrl);
		audio.play();
	};

	const getBufferSegments = () => {
		const segments = [];
		const segmentCount = 120; // One segment per second for 2 minutes
		const segmentDuration = totalDuration / segmentCount;
		const bufferStart = Math.max(0, currentTime - bufferSize);

		for (let i = 0; i < segmentCount; i++) {
			const segmentStart = i * segmentDuration;
			const segmentEnd = segmentStart + segmentDuration;
			const isInBuffer = segmentStart >= bufferStart && segmentStart <= currentTime;
			const age = currentTime - segmentEnd;
			const baseOpacity = isInBuffer ? Math.max(0.3, 1 - (age / bufferSize)) : 0;
			const opacity = baseOpacity * (0.6 + (audioLevel * 0.4));

			segments.push({
				id: i,
				start: segmentStart,
				end: segmentEnd,
				opacity,
				isInBuffer
			});
		}

		return segments;
	};

	const segments = getBufferSegments();
	const bufferStart = Math.max(0, currentTime - bufferSize);

	if (!permissionGranted) {
		return (
			<div className="glass-card p-8 rounded-xl">
				<div className="mb-6">
					<h3 className="text-xl font-semibold mb-2 text-stone-400">Buffer Demo</h3>
					<p className="text-sm text-gray-400">
						Experience real audio recording with a rolling 30-second buffer. Click below to grant microphone access.
					</p>
				</div>

				<div className="mb-4 p-4 bg-stone-950/20 rounded-lg border border-stone-900/30">
					<p className="text-sm text-gray-300 mb-2">
						<strong>Microphone Access Required</strong>
					</p>
					<p className="text-xs text-gray-400">
						This demo uses your microphone to create a real rolling audio buffer. 
						Your audio is only stored locally in your browser and is never uploaded.
					</p>
				</div>

				<button
					onClick={requestMicrophonePermission}
					className="w-full glass-button-primary px-6 py-4 rounded-lg font-semibold hover:scale-105 transition-all"
				>
					Enable Microphone & Start Demo
				</button>
			</div>
		);
	}

	return (
		<div className="glass-card p-8 rounded-xl">
			<div className="mb-6">
				<div className="flex items-center justify-between mb-2">
					<h3 className="text-xl font-semibold text-stone-400">Buffer Demo</h3>
					<div className="flex items-center gap-2">
						<div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
						<span className="text-xs text-gray-400">{isRecording ? 'LIVE' : 'STOPPED'}</span>
					</div>
				</div>
				<p className="text-sm text-gray-400">
					The buffer is actively recording! The visualization shows your real-time audio levels. 
					Speak or make noise to see the waveform react. Click "Save" to capture the last 30 seconds!
				</p>
			</div>


			{/* Audio Level Indicator */}
			{isRecording && (
				<div className="mb-4">
					<div className="flex items-center gap-3">
						<span className="text-xs text-gray-400">Audio Level:</span>
						<div className="flex-1 h-2 bg-stone-800 rounded-full overflow-hidden">
							<div 
								className="h-full bg-gradient-to-r from-stone-500 to-stone-400 transition-all duration-100"
								style={{ width: `${audioLevel * 100}%` }}
							/>
						</div>
					</div>
				</div>
			)}

			{/* Timeline Visualization */}
			<div className="mb-6">
				<div className="relative h-24 bg-black/40 rounded-lg border border-gray-700 overflow-hidden">
					{/* Waveform overlaid on timeline */}
					{isRecording && (
						<canvas
							ref={waveformCanvasRef}
							className="absolute inset-0 w-full h-full pointer-events-none"
						/>
					)}
					<div className="absolute inset-0 flex">
						{segments.map((segment) => (
							<div
								key={segment.id}
								className="flex-1 border-r border-gray-800/50 transition-all duration-300"
								style={{
									backgroundColor: segment.isInBuffer 
										? `rgba(157, 141, 122, ${segment.opacity})` 
										: 'transparent',
								}}
							/>
						))}
					</div>

					{savedSegments.map((saved, idx) => {
						const left = (saved.start / totalDuration) * 100;
						const width = ((saved.end - saved.start) / totalDuration) * 100;
						
						return (
							<div
								key={idx}
								className="absolute top-0 bottom-0 bg-stone-500/40 border-l-2 border-r-2 border-stone-400"
								style={{
									left: `${left}%`,
									width: `${width}%`,
								}}
							/>
						);
					})}

					<div 
						className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
						style={{ left: `${(currentTime / totalDuration) * 100}%` }}
					>
						<div className="absolute -top-1 -left-1.5 w-4 h-4 bg-white rounded-full shadow-lg" />
					</div>

					<div className="absolute bottom-1 left-2 text-xs text-gray-500">
						0s
					</div>
					<div className="absolute bottom-1 right-2 text-xs text-gray-500">
						{totalDuration}s
					</div>
					<div 
						className="absolute bottom-1 text-xs text-white font-semibold bg-black/60 px-2 py-0.5 rounded"
						style={{ left: `${(currentTime / totalDuration) * 100}%`, transform: 'translateX(-50%)' }}
					>
						{currentTime.toFixed(1)}s
					</div>
				</div>

				<div className="flex gap-6 mt-3 text-xs text-gray-400">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-stone-500/60 rounded" />
						<span>Active Buffer (30s)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-stone-500/40 border border-stone-400 rounded" />
						<span>Saved Clips</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-1 h-4 bg-white rounded" />
						<span>Current Time</span>
					</div>
				</div>
			</div>

			{/* Info Display */}
			<div className="grid grid-cols-2 gap-4 mb-6">
				<div className="glass-card-small p-4 rounded-lg">
					<div className="text-xs text-gray-400 mb-1">Buffer Window</div>
					<div className="text-lg font-bold text-stone-400">{bufferSize}s</div>
				</div>
				<div className="glass-card-small p-4 rounded-lg">
					<div className="text-xs text-gray-400 mb-1">Clips Saved</div>
					<div className="text-lg font-bold text-stone-400">{savedSegments.length}</div>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="grid grid-cols-2 gap-4 mb-4">
				<button
					onClick={handleSave}
					disabled={isSaving || !isRecording}
					className={`glass-button-primary px-6 py-4 rounded-lg font-semibold transition-all ${
						isSaving || !isRecording ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
					} ${justSaved ? 'animate-pulse' : ''}`}
				>
					{isSaving ? (
						<span className="flex items-center justify-center gap-2">
							<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
							</svg>
							Saving...
						</span>
					) : justSaved ? (
						<span className="flex items-center justify-center gap-2">
							<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
							</svg>
							Saved!
						</span>
					) : (
						<span>Save Last 30 Seconds</span>
					)}
				</button>

				<button
					onClick={playLastSavedAudio}
					disabled={savedSegments.length === 0}
					className={`glass-button px-6 py-4 rounded-lg font-semibold transition-all ${
						savedSegments.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
					}`}
				>
					Play Last Saved
				</button>
			</div>

			<button
				onClick={stopRecording}
				className="w-full glass-button px-4 py-2 rounded-lg text-sm hover:scale-105 transition-all"
			>
				Stop Demo
			</button>

			{/* Explanation */}
			<div className="mt-4 p-4 bg-stone-950/20 rounded-lg border border-stone-900/30">
				<p className="text-xs text-gray-400">
					<strong>How it works:</strong> Your microphone is recording into a rolling 30-second buffer. 
					The waveform shows your real-time audio, and the blue timeline segments pulse with your audio levels. 
					Click "Save" to capture the entire buffer, then "Play Last Saved" to hear it back!
				</p>
			</div>
		</div>
	);
}

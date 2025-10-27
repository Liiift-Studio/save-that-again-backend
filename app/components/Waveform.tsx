'use client';

import { useEffect, useRef, useState } from 'react';

interface WaveformProps {
	audioUrl: string;
	isPlaying?: boolean;
	currentTime?: number;
	duration?: number;
	height?: number;
	barCount?: number;
	color?: string;
}

export default function Waveform({
	audioUrl,
	isPlaying = false,
	currentTime = 0,
	duration = 1,
	height = 32,
	barCount = 40,
	color = '#2196f3',
}: WaveformProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [waveformData, setWaveformData] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		extractWaveform();
	}, [audioUrl]);

	const extractWaveform = async () => {
		try {
			setIsLoading(true);

			// Fetch audio file
			const response = await fetch(audioUrl);
			const arrayBuffer = await response.arrayBuffer();

			// Decode audio data
			const audioContext = new AudioContext();
			const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

			// Get channel data
			const channelData = audioBuffer.getChannelData(0);
			const samples: number[] = [];

			// Downsample to barCount samples
			const blockSize = Math.floor(channelData.length / barCount);

			for (let i = 0; i < barCount; i++) {
				const start = i * blockSize;
				const end = start + blockSize;

				// Find peak amplitude in this block
				let peak = 0;
				for (let j = start; j < end && j < channelData.length; j++) {
					const value = Math.abs(channelData[j]);
					if (value > peak) {
						peak = value;
					}
				}

				samples.push(peak);
			}

			setWaveformData(samples);
			setIsLoading(false);
		} catch (error) {
			console.error('Error extracting waveform:', error);
			// Generate fallback pattern
			const fallback = Array.from({ length: barCount }, (_, i) => {
				const wave1 = i % 3 === 0 ? 0.8 : 0.5;
				const wave2 = i % 5 === 0 ? 0.9 : 0.6;
				const wave3 = i % 7 === 0 ? 0.7 : 0.4;
				return (wave1 + wave2 + wave3) / 3;
			});
			setWaveformData(fallback);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!canvasRef.current || waveformData.length === 0) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const width = canvas.width;
		const height = canvas.height;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Calculate progress
		const progress = duration > 0 ? currentTime / duration : 0;
		const progressPosition = width * progress;

		// Draw bars
		const barWidth = 2;
		const spacing = (width - barCount * barWidth) / (barCount - 1);

		waveformData.forEach((amplitude, i) => {
			const x = i * (barWidth + spacing);
			const barHeight = height * amplitude * 0.9;
			const y1 = (height - barHeight) / 2;
			const y2 = y1 + barHeight;

			// Determine color based on progress
			ctx.strokeStyle = x <= progressPosition ? color : `${color}4D`; // 4D = 30% opacity
			ctx.lineWidth = barWidth;
			ctx.lineCap = 'round';

			ctx.beginPath();
			ctx.moveTo(x + barWidth / 2, y1);
			ctx.lineTo(x + barWidth / 2, y2);
			ctx.stroke();
		});
	}, [waveformData, currentTime, duration, isPlaying, color]);

	if (isLoading) {
		return (
			<div
				className="flex items-center justify-center"
				style={{ height: `${height}px` }}
			>
				<div className="animate-pulse flex gap-1">
					{Array.from({ length: 8 }).map((_, i) => (
						<div
							key={i}
							className="w-1 bg-gray-600 rounded"
							style={{ height: `${Math.random() * height * 0.5 + 8}px` }}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<canvas
			ref={canvasRef}
			width={400}
			height={height}
			className="w-full"
			style={{ height: `${height}px` }}
		/>
	);
}

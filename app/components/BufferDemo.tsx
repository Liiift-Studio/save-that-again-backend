'use client';

// Interactive buffer demonstration component
import { useState, useEffect, useRef } from 'react';

export default function BufferDemo() {
	const [currentTime, setCurrentTime] = useState(0);
	const [savedSegments, setSavedSegments] = useState<{start: number, end: number}[]>([]);
	const [isSaving, setIsSaving] = useState(false);
	const [justSaved, setJustSaved] = useState(false);
	const bufferSize = 30; // 30 seconds
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Simulate time progression
		intervalRef.current = setInterval(() => {
			setCurrentTime(prev => prev + 0.1);
		}, 100);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	const handleSave = () => {
		if (isSaving) return;
		
		setIsSaving(true);
		setJustSaved(true);
		
		// Calculate the saved segment
		const endTime = currentTime;
		const startTime = Math.max(0, currentTime - bufferSize);
		
		setSavedSegments(prev => [...prev, { start: startTime, end: endTime }]);
		
		// Reset saving state
		setTimeout(() => {
			setIsSaving(false);
			setJustSaved(false);
		}, 1000);
	};

	const getBufferSegments = () => {
		const segments = [];
		const bufferStart = Math.max(0, currentTime - bufferSize);
		const segmentCount = 30;
		const segmentDuration = bufferSize / segmentCount;

		for (let i = 0; i < segmentCount; i++) {
			const segmentStart = bufferStart + (i * segmentDuration);
			const segmentEnd = segmentStart + segmentDuration;
			
			// Check if this segment is within current buffer
			const isInBuffer = segmentEnd > bufferStart && segmentStart < currentTime;
			
			// Calculate opacity based on age (newer = brighter)
			const age = currentTime - segmentEnd;
			const opacity = isInBuffer ? Math.max(0.3, 1 - (age / bufferSize)) : 0;

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

	return (
		<div className="glass-card p-8 rounded-xl">
			<div className="mb-6">
				<h3 className="text-xl font-semibold mb-2 text-blue-400">Interactive Buffer Demo</h3>
				<p className="text-sm text-gray-400">
					Watch how the rolling buffer works. The buffer constantly records the last 30 seconds, shown in blue. 
					Click "Save" to capture it!
				</p>
			</div>

			{/* Timeline Visualization */}
			<div className="mb-6">
				<div className="relative h-24 bg-black/40 rounded-lg border border-gray-700 overflow-hidden">
					{/* Buffer segments */}
					<div className="absolute inset-0 flex">
						{segments.map((segment) => (
							<div
								key={segment.id}
								className="flex-1 border-r border-gray-800/50 transition-all duration-300"
								style={{
									backgroundColor: segment.isInBuffer 
										? `rgba(33, 150, 243, ${segment.opacity})` 
										: 'transparent',
								}}
							/>
						))}
					</div>

					{/* Saved segments overlay */}
					{savedSegments.map((saved, idx) => {
						const totalDuration = currentTime;
						const left = (saved.start / totalDuration) * 100;
						const width = ((saved.end - saved.start) / totalDuration) * 100;
						
						return (
							<div
								key={idx}
								className="absolute top-0 bottom-0 bg-green-500/40 border-l-2 border-r-2 border-green-400"
								style={{
									left: `${left}%`,
									width: `${width}%`,
								}}
							/>
						);
					})}

					{/* Current time indicator */}
					<div 
						className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
						style={{ right: 0 }}
					>
						<div className="absolute -top-1 -left-1.5 w-4 h-4 bg-white rounded-full shadow-lg" />
					</div>

					{/* Time labels */}
					<div className="absolute bottom-1 left-2 text-xs text-gray-500">
						{bufferStart.toFixed(1)}s
					</div>
					<div className="absolute bottom-1 right-2 text-xs text-white font-semibold">
						{currentTime.toFixed(1)}s
					</div>
				</div>

				{/* Legend */}
				<div className="flex gap-6 mt-3 text-xs text-gray-400">
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-blue-500/60 rounded" />
						<span>Active Buffer (30s)</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-4 h-4 bg-green-500/40 border border-green-400 rounded" />
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
					<div className="text-lg font-bold text-blue-400">{bufferSize}s</div>
				</div>
				<div className="glass-card-small p-4 rounded-lg">
					<div className="text-xs text-gray-400 mb-1">Clips Saved</div>
					<div className="text-lg font-bold text-green-400">{savedSegments.length}</div>
				</div>
			</div>

			{/* Save Button */}
			<button
				onClick={handleSave}
				disabled={isSaving}
				className={`w-full glass-button-primary px-6 py-4 rounded-lg font-semibold transition-all ${
					isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
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
					<span>Click to Save Last 30 Seconds</span>
				)}
			</button>

			{/* Explanation */}
			<div className="mt-4 p-4 bg-blue-950/20 rounded-lg border border-blue-900/30">
				<p className="text-xs text-gray-400">
					💡 <strong>How it works:</strong> The blue bar shows your active 30-second buffer. 
					It continuously records and overwrites old audio. When you click "Save", 
					it captures everything in the buffer (shown in green). The older parts of the buffer 
					fade out as they get overwritten with new audio.
				</p>
			</div>
		</div>
	);
}

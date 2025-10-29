'use client';

import { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

export default function InteractiveBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseRef = useRef({ x: 0, y: 0 });
	const [isHoveringCTA, setIsHoveringCTA] = useState(false);
	const noiseRef = useRef(createNoise3D());
	const currentNoiseFactorRef = useRef(25); // Current interpolated noise factor
	const circleRadiiRef = useRef<Map<number, number>>(new Map()); // Track interpolated radii for each circle

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let startTime = Date.now();

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		// Calculate a point on the circle with noise distortion
		const calcPoint = (angle: number, r: number, w: number, h: number, now: number): [number, number] => {
			// Calculate distance from center (0 at center, 1 at edges)
			const centerX = w / 2;
			const centerY = h / 2;
			const dx = (mouseRef.current.x - centerX) / centerX;
			const dy = (mouseRef.current.y - centerY) / centerY;
			const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
			
			// Base noise factor: noisier in the center (50 at center, 25 at edges)
			const baseNoiseFactor = 50 - Math.min(distanceFromCenter, 1) * 25;
			
			// Mouse X adds variance to base noise factor (-15 to +15)
			const mouseXVariance = ((mouseRef.current.x / w) - 0.5) * 30;
			
			// Combine base noise with X variance, or set to 0 when hovering CTA
			const targetNoiseFactor = isHoveringCTA ? 0 : baseNoiseFactor + mouseXVariance;
			
			// Smooth transition to target noise factor (slower = smoother)
			currentNoiseFactorRef.current += (targetNoiseFactor - currentNoiseFactorRef.current) * 0.05;
			
			// Mouse Y controls zoom (0-200)
			const zoom = (mouseRef.current.y / h) * 200;
			
			// Calculate base position
			let x = Math.cos(angle) * r + w / 2;
			let y = Math.sin(angle) * r + h / 2;
			
			// Apply noise distortion using interpolated noise factor
			const n = noiseRef.current(x / zoom, y / zoom, now / 2000) * currentNoiseFactorRef.current;
			
			// Recalculate position with noise offset
			x = Math.cos(angle) * (r + n) + w / 2;
			y = Math.sin(angle) * (r + n) + h / 2;
			
			return [x, y];
		};

		// Draw a single circle with given radius
		const drawCircle = (r: number, w: number, h: number, now: number) => {
			const numPoints = 400;
			const angleStep = (Math.PI * 2) / numPoints;
			
			ctx.beginPath();
			
			for (let i = 0; i <= numPoints; i++) {
				const angle = i * angleStep;
				const [x, y] = calcPoint(angle, r, w, h, now);
				
				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}
			
			ctx.closePath();
			ctx.strokeStyle = 'rgba(96, 165, 250, 0.7)';
			ctx.lineWidth = 1;
			ctx.stroke();
		};

		const draw = () => {
			const w = canvas.width;
			const h = canvas.height;
			const now = Date.now() - startTime;
			
			ctx.clearRect(0, 0, w, h);
			
			// Calculate maximum radius (smaller of width/height divided by 2)
			const m = Math.min(w, h);
			
			// Draw concentric circles from center outward
			// Fill 80% of the screen (40% radius from center)
			const maxDimension = Math.max(w, h);
			const maxRadius = maxDimension * 0.4; // 80% of screen coverage
			
			// Spacing: 10px increments
			for (let i = 10; i < maxRadius; i += 10) {
				const circleIndex = i / 10;
				const positionInGroup = circleIndex % 3; // 0-indexed: 0, 1, 2
				
				// Calculate target radius - in groups of 3, 1st and 3rd fully overlay on 2nd
				let targetRadius = i;
				if (isHoveringCTA) {
					if (positionInGroup === 1) {
						// First in group (1st circle) - move fully to 2nd position
						targetRadius = i + 10;
					} else if (positionInGroup === 0) {
						// Third in group (3rd circle) - move fully to 2nd position
						targetRadius = i - 10;
					}
					// positionInGroup === 2 (2nd circle) stays at original radius
				}
				
				// Get current interpolated radius
				const currentRadius = circleRadiiRef.current.get(i) || i;
				const newRadius = currentRadius + (targetRadius - currentRadius) * 0.05;
				circleRadiiRef.current.set(i, newRadius);
				
				drawCircle(newRadius, w, h, now);
			}
			
			animationFrameId = requestAnimationFrame(draw);
		};

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
		};

		const handleTouchMove = (e: TouchEvent) => {
			// Use the first touch point
			if (e.touches.length > 0) {
				const touch = e.touches[0];
				mouseRef.current = { x: touch.clientX, y: touch.clientY };
			}
		};

		const handleTouchStart = (e: TouchEvent) => {
			// Initialize position on touch start
			if (e.touches.length > 0) {
				const touch = e.touches[0];
				mouseRef.current = { x: touch.clientX, y: touch.clientY };
			}
		};

		const handleCTAHover = (e: CustomEvent) => {
			setIsHoveringCTA(e.detail.isHovering);
		};

		window.addEventListener('resize', resizeCanvas);
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('ctaHover', handleCTAHover as EventListener);
		
		resizeCanvas();
		draw();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchmove', handleTouchMove);
			window.removeEventListener('ctaHover', handleCTAHover as EventListener);
			cancelAnimationFrame(animationFrameId);
		};
	}, [isHoveringCTA]);

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 pointer-events-none z-0"
			style={{ opacity: 0.6 }}
		/>
	);
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { createNoise3D } from 'simplex-noise';

// Blob configuration
interface Blob {
	x: number; // Percentage 0-1
	y: number; // Percentage 0-1
	size: number; // Pixels
	opacity: number;
	blur: number;
	animationOffset: number;
	animationType: 'blob' | 'blob-delayed';
	currentX: number;
	currentY: number;
	avoidX: number;
	avoidY: number;
}

export default function InteractiveBackground() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mouseRef = useRef({ x: 0, y: 0 });
	const [isHoveringCTA, setIsHoveringCTA] = useState(false);
	const noiseRef = useRef(createNoise3D());
	const currentNoiseFactorRef = useRef(25); // Current interpolated noise factor
	const circleRadiiRef = useRef<Map<number, number>>(new Map()); // Track interpolated radii for each circle
	
	// Initialize blobs
	const blobsRef = useRef<Blob[]>([
		// Row 1 - Top
		{ x: 0.03, y: 0.02, size: 520, opacity: 0.30, blur: 80, animationOffset: 0, animationType: 'blob', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.25, y: 0.08, size: 580, opacity: 0.28, blur: 90, animationOffset: 2, animationType: 'blob-delayed', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.50, y: 0.05, size: 540, opacity: 0.26, blur: 85, animationOffset: 4, animationType: 'blob', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.75, y: 0.03, size: 600, opacity: 0.24, blur: 88, animationOffset: 1, animationType: 'blob-delayed', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		// Row 2 - Middle Upper
		{ x: 0.08, y: 0.25, size: 560, opacity: 0.19, blur: 92, animationOffset: 3, animationType: 'blob', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.40, y: 0.28, size: 620, opacity: 0.28, blur: 95, animationOffset: 5, animationType: 'blob-delayed', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.70, y: 0.30, size: 550, opacity: 0.26, blur: 86, animationOffset: 6, animationType: 'blob', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		// Row 3 - Middle Lower
		{ x: 0.15, y: 0.50, size: 590, opacity: 0.20, blur: 89, animationOffset: 7, animationType: 'blob-delayed', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.50, y: 0.55, size: 610, opacity: 0.25, blur: 94, animationOffset: 8, animationType: 'blob', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.80, y: 0.52, size: 570, opacity: 0.22, blur: 87, animationOffset: 9, animationType: 'blob-delayed', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		// Row 4 - Bottom
		{ x: 0.05, y: 0.75, size: 600, opacity: 0.30, blur: 90, animationOffset: 10, animationType: 'blob', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.30, y: 0.78, size: 580, opacity: 0.28, blur: 88, animationOffset: 11, animationType: 'blob-delayed', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.60, y: 0.80, size: 620, opacity: 0.25, blur: 92, animationOffset: 12, animationType: 'blob', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
		{ x: 0.85, y: 0.77, size: 560, opacity: 0.24, blur: 86, animationOffset: 13, animationType: 'blob-delayed', currentX: 0, currentY: 0, avoidX: 0, avoidY: 0 },
	]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationFrameId: number;
		let startTime = Date.now();
		
		// Initialize blob positions
		blobsRef.current.forEach(blob => {
			blob.currentX = blob.x;
			blob.currentY = blob.y;
		});

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
		const numPoints = 150; // Reduced from 400 to 150 for better performance
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
		ctx.strokeStyle = 'rgba(157, 141, 122, 0.5)';
		ctx.lineWidth = 1;
		ctx.stroke();
	};
	
	// Draw blobs with animation
	const drawBlobs = (w: number, h: number, now: number) => {
		const blobs = blobsRef.current;
		
		blobs.forEach(blob => {
			// Calculate blob center in pixels
			const blobX = blob.currentX * w;
			const blobY = blob.currentY * h;
			
			// Mouse avoidance
			const dx = mouseRef.current.x - blobX;
			const dy = mouseRef.current.y - blobY;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const avoidanceRadius = 350;
			
			if (distance < avoidanceRadius && distance > 0) {
				const force = (avoidanceRadius - distance) / avoidanceRadius;
				const targetAvoidX = -(dx / distance) * force * 100;
				const targetAvoidY = -(dy / distance) * force * 100;
				blob.avoidX += (targetAvoidX - blob.avoidX) * 0.1;
				blob.avoidY += (targetAvoidY - blob.avoidY) * 0.1;
			} else {
				blob.avoidX *= 0.9;
				blob.avoidY *= 0.9;
			}
			
			// Blob animation (rotation and scaling)
			const animTime = (now + blob.animationOffset * 1000) / 1000;
			let tx = 0, ty = 0, scale = 1;
			
			if (blob.animationType === 'blob') {
				// blob animation: 20s duration
				const t = (animTime % 20) / 20;
				if (t < 0.33) {
					const progress = t / 0.33;
					tx = 30 * progress;
					ty = -50 * progress;
					scale = 1 + 0.1 * progress;
				} else if (t < 0.66) {
					const progress = (t - 0.33) / 0.33;
					tx = 30 + (-50 * progress);
					ty = -50 + (70 * progress);
					scale = 1.1 + (-0.2 * progress);
				} else {
					const progress = (t - 0.66) / 0.34;
					tx = -20 + (20 * progress);
					ty = 20 + (-20 * progress);
					scale = 0.9 + (0.1 * progress);
				}
			} else {
				// blob-delayed animation: 25s duration
				const t = (animTime % 25) / 25;
				if (t < 0.33) {
					const progress = t / 0.33;
					tx = -40 * progress;
					ty = 30 * progress;
					scale = 1 - 0.05 * progress;
				} else if (t < 0.66) {
					const progress = (t - 0.33) / 0.33;
					tx = -40 + (65 * progress);
					ty = 30 + (-55 * progress);
					scale = 0.95 + (0.1 * progress);
				} else {
					const progress = (t - 0.66) / 0.34;
					tx = 25 + (-25 * progress);
					ty = -25 + (25 * progress);
					scale = 1.05 + (-0.05 * progress);
				}
			}
			
			// Calculate final position with avoidance and animation
			const finalX = blobX + blob.avoidX + tx;
			const finalY = blobY + blob.avoidY + ty;
			const finalSize = blob.size * scale;
			
			// Create radial gradient
			const gradient = ctx.createRadialGradient(finalX, finalY, 0, finalX, finalY, finalSize / 2);
			const baseAlpha = blob.opacity * 0.6; // Reduce overall opacity for softer look
			gradient.addColorStop(0, `rgba(0, 0, 0, ${baseAlpha})`);
			gradient.addColorStop(0.4, `rgba(0, 0, 0, ${baseAlpha * 0.6})`);
			gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
			
			// Apply blur effect by drawing multiple passes
			ctx.save();
			ctx.globalAlpha = 0.3;
			for (let i = 0; i < 3; i++) {
				ctx.beginPath();
				ctx.arc(finalX, finalY, finalSize / 2, 0, Math.PI * 2);
				ctx.fillStyle = gradient;
				ctx.fill();
			}
			ctx.restore();
		});
	};

		const draw = () => {
			const w = canvas.width;
			const h = canvas.height;
			const now = Date.now() - startTime;
			
			ctx.clearRect(0, 0, w, h);
			
			// Draw blobs first (behind circles)
			drawBlobs(w, h, now);
			
			// Calculate maximum radius (smaller of width/height divided by 2)
			const m = Math.min(w, h);
			
			// Draw concentric circles from center outward
			// Fill 80% of the screen (40% radius from center)
			const maxDimension = Math.max(w, h);
			const maxRadius = maxDimension * 0.4; // 80% of screen coverage
			
		// Spacing: 20px increments (reduced from 10px for better performance)
		for (let i = 20; i < maxRadius; i += 20) {
				const circleIndex = i / 20;
				const positionInGroup = circleIndex % 3; // 0-indexed: 0, 1, 2
				
				// Calculate target radius - in groups of 3, 1st and 3rd fully overlay on 2nd
				let targetRadius = i;
			if (isHoveringCTA) {
				if (positionInGroup === 1) {
					// First in group (1st circle) - move fully to 2nd position
					targetRadius = i + 20;
				} else if (positionInGroup === 0) {
					// Third in group (3rd circle) - move fully to 2nd position
					targetRadius = i - 20;
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

	// Throttle mouse movement to reduce unnecessary renders
	let mouseMoveTimeout: NodeJS.Timeout | null = null;
	const handleMouseMove = (e: MouseEvent) => {
		if (mouseMoveTimeout) return;
		
		mouseMoveTimeout = setTimeout(() => {
			mouseRef.current = { x: e.clientX, y: e.clientY };
			mouseMoveTimeout = null;
		}, 16); // ~60fps
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
			style={{ opacity: 0.6, willChange: 'contents' }}
		/>
	);
}

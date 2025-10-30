'use client';

// Blurred rotating blob background that responds to mouse position
import { useEffect, useRef } from 'react';

export default function BlobBackground() {
	const containerRef = useRef<HTMLDivElement>(null);
	const mouseX = useRef(0);
	const mouseY = useRef(0);
	const currentX = useRef(0);
	const currentY = useRef(0);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.current = e.clientX;
			mouseY.current = e.clientY;
		};

		window.addEventListener('mousemove', handleMouseMove);

		// Smooth animation loop
		let animationFrame: number;
		const animate = () => {
			// Faster lerp for more fluid movement
			currentX.current += (mouseX.current - currentX.current) * 0.1;
			currentY.current += (mouseY.current - currentY.current) * 0.1;

			if (containerRef.current) {
				const blobs = containerRef.current.querySelectorAll('.blob');
				blobs.forEach((blob, index) => {
					const element = blob as HTMLElement;
					const rect = element.getBoundingClientRect();
					const blobCenterX = rect.left + rect.width / 2;
					const blobCenterY = rect.top + rect.height / 2;
					
					// Calculate distance from mouse to blob center
					const deltaX = currentX.current - blobCenterX;
					const deltaY = currentY.current - blobCenterY;
					const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
					
					// Avoid cursor - move away from it with smoother transitions
					const avoidanceRadius = 350;
					if (distance < avoidanceRadius && distance > 0) {
						const force = (avoidanceRadius - distance) / avoidanceRadius;
						const avoidX = -(deltaX / distance) * force * 100;
						const avoidY = -(deltaY / distance) * force * 100;
						element.style.transform = `translate(${avoidX}px, ${avoidY}px)`;
						element.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
					} else {
						element.style.transform = `translate(0px, 0px)`;
						element.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
					}
				});
			}

			animationFrame = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(animationFrame);
		};
	}, []);

	return (
		<div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
			{/* Row 1 - Top */}
			<div
				className="blob blob-row1-1 absolute w-[520px] h-[520px] rounded-full animate-blob"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.18) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(80px)',
					top: '2%',
					left: '3%',
					animationDelay: '0s',
				}}
			/>
			<div
				className="blob blob-row1-3 absolute w-[580px] h-[580px] rounded-full animate-blob-delayed"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.16) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(90px)',
					top: '8%',
					left: '25%',
					animationDelay: '2s',
				}}
			/>
			<div
				className="blob blob-row1-5 absolute w-[540px] h-[540px] rounded-full animate-blob"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(85px)',
					top: '5%',
					left: '50%',
					animationDelay: '4s',
				}}
			/>
			<div
				className="blob blob-row1-7 absolute w-[600px] h-[600px] rounded-full animate-blob-delayed"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.13) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(88px)',
					top: '3%',
					left: '75%',
					animationDelay: '1s',
				}}
			/>

			{/* Row 2 - Middle Upper */}
			<div
				className="blob blob-row2-1 absolute w-[560px] h-[560px] rounded-full animate-blob"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.19) 0%, rgba(0, 0, 0, 0.10) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(92px)',
					top: '25%',
					left: '8%',
					animationDelay: '3s',
				}}
			/>
			<div
				className="blob blob-row2-3 absolute w-[620px] h-[620px] rounded-full animate-blob-delayed"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.16) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(95px)',
					top: '28%',
					left: '40%',
					animationDelay: '5s',
				}}
			/>
			<div
				className="blob blob-row2-5 absolute w-[550px] h-[550px] rounded-full animate-blob"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(86px)',
					top: '30%',
					left: '70%',
					animationDelay: '6s',
				}}
			/>

			{/* Row 3 - Middle Lower */}
			<div
				className="blob blob-row3-1 absolute w-[590px] h-[590px] rounded-full animate-blob-delayed"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.11) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(89px)',
					top: '50%',
					left: '15%',
					animationDelay: '7s',
				}}
			/>
			<div
				className="blob blob-row3-3 absolute w-[610px] h-[610px] rounded-full animate-blob"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.14) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(94px)',
					top: '55%',
					left: '50%',
					animationDelay: '8s',
				}}
			/>
			<div
				className="blob blob-row3-5 absolute w-[570px] h-[570px] rounded-full animate-blob-delayed"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.12) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(87px)',
					top: '52%',
					left: '80%',
					animationDelay: '9s',
				}}
			/>

			{/* Row 4 - Bottom */}
			<div
				className="blob blob-row4-1 absolute w-[600px] h-[600px] rounded-full animate-blob"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.18) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(90px)',
					top: '75%',
					left: '5%',
					animationDelay: '10s',
				}}
			/>
			<div
				className="blob blob-row4-3 absolute w-[580px] h-[580px] rounded-full animate-blob-delayed"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.28) 0%, rgba(0, 0, 0, 0.16) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(88px)',
					top: '78%',
					left: '30%',
					animationDelay: '11s',
				}}
			/>
			<div
				className="blob blob-row4-5 absolute w-[620px] h-[620px] rounded-full animate-blob"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.14) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(92px)',
					top: '80%',
					left: '60%',
					animationDelay: '12s',
				}}
			/>
			<div
				className="blob blob-row4-7 absolute w-[560px] h-[560px] rounded-full animate-blob-delayed"
				style={{
					background: 'radial-gradient(circle, rgba(0, 0, 0, 0.24) 0%, rgba(0, 0, 0, 0.13) 40%, rgba(0, 0, 0, 0) 70%)',
					filter: 'blur(86px)',
					top: '77%',
					left: '85%',
					animationDelay: '13s',
				}}
			/>
		</div>
	);
}

import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const points = useRef([]);
    const numPoints = 15; // Enough points to allow bending/curves
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const initX = window.innerWidth / 2;
        const initY = window.innerHeight / 2;
        mouse.current.x = initX;
        mouse.current.y = initY;
        
        points.current = [];
        for (let i = 0; i < numPoints; i++) {
            points.current.push({ x: initX, y: initY });
        }

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animationFrame;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // LEAD Point
            let head = points.current[0];
            head.x += (mouse.current.x - head.x) * 0.85; // Sharp reaction
            head.y += (mouse.current.y - head.y) * 0.85;

            // FOLLOWERS
            for (let i = 1; i < numPoints; i++) {
                let p = points.current[i];
                let prev = points.current[i - 1];
                
                // Extremely fast follow (0.8) makes the trail very short and "snappy"
                p.x += (prev.x - p.x) * 0.75; 
                p.y += (prev.y - p.y) * 0.75;
            }

            // SMOOTH DRAWING with Midpoint Interpolation
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';

            for (let i = 0; i < numPoints - 1; i++) {
                const p1 = points.current[i];
                const p2 = points.current[i + 1];
                const p3 = points.current[i + 2] || p2; // Lookahead for curve

                // Progressive tapering
                ctx.lineWidth = Math.max(0.2, 1.6 * (1 - i / numPoints));
                
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                
                // Curve towards the midpoint of next segment for buttery smoothness
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                const nextMidX = (p2.x + p3.x) / 2;
                const nextMidY = (p2.y + p3.y) / 2;

                ctx.quadraticCurveTo(p2.x, p2.y, nextMidX, nextMidY);
                ctx.stroke();
            }

            // Fine Pen Tip
            ctx.beginPath();
            ctx.arc(mouse.current.x, mouse.current.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'black';
            ctx.fill();

            animationFrame = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrame);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 99999,
                opacity: 0.8
            }}
        />
    );
};

export default CustomCursor;

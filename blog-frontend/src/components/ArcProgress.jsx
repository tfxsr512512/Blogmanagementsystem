import { useEffect, useRef } from 'react';

export default function ArcProgress({ progress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = 80;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    const centerY = 60;
    const radius = 200;
    const startAngle = Math.PI * 1.2;
    const endAngle = Math.PI * 1.8;
    const p = Math.min(progress / 100, 1);
    const currentAngle = startAngle + (endAngle - startAngle) * p;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
    ctx.lineWidth = 3;
    ctx.stroke();

    const gradient = ctx.createLinearGradient(centerX - radius, 0, centerX + radius, 0);
    gradient.addColorStop(0, 'rgba(0, 240, 255, 0.3)');
    gradient.addColorStop(0.5, 'rgba(189, 0, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(240, 147, 251, 0.6)');

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, currentAngle);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;

    const dotX = centerX + Math.cos(currentAngle) * radius;
    const dotY = centerY + Math.sin(currentAngle) * radius;

    ctx.beginPath();
    ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
    const dotGradient = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 8);
    dotGradient.addColorStop(0, '#fff');
    dotGradient.addColorStop(0.5, '#00F0FF');
    dotGradient.addColorStop(1, 'rgba(189, 0, 255, 0)');
    ctx.fillStyle = dotGradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(dotX, dotY, 12, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px',
        zIndex: 150,
        pointerEvents: 'none',
      }}
    />
  );
}

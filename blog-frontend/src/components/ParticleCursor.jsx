import { useRef, useEffect, useState } from 'react';

export default function ParticleCursor() {
  const canvasRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const trailRef = useRef([]);
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId;

    const trailLength = 12;
    for (let i = 0; i < trailLength; i++) {
      trailRef.current.push({ x: 0, y: 0, alpha: 1 - i / trailLength, size: 8 - i * 0.5 });
    }

    const handleMouseMove = (e) => {
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      mouseRef.current.vx = dx;
      mouseRef.current.vy = dy;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const target = e.target;
      if (target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        alpha: 0.8,
        maxRadius: 60,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = trailRef.current.length - 1; i >= 0; i--) {
        const p = trailRef.current[i];
        if (i === 0) {
          p.x += (mx - p.x) * 0.3;
          p.y += (my - p.y) * 0.3;
        } else {
          const prev = trailRef.current[i - 1];
          p.x += (prev.x - p.x) * 0.25;
          p.y += (prev.y - p.y) * 0.25;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${p.alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(189, 0, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      if (isHovering) {
        const head = trailRef.current[0];
        ctx.beginPath();
        ctx.arc(head.x, head.y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(head.x, head.y, 20, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(189, 0, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const r = ripplesRef.current[i];
        r.radius += 2;
        r.alpha -= 0.02;
        if (r.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(189, 0, 255, ${r.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="particle-cursor"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }}
    />
  );
}

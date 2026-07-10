import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles } from 'lucide-react';

export default function Lab() {
  const canvasRef = useRef(null);
  const [konamiActive, setKonamiActive] = useState(false);
  const konamiRef = useRef([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const columns = Math.floor(w / 20);
    const drops = Array(columns).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 18;

    let animId;
    const draw = () => {
      ctx.fillStyle = 'rgba(11, 12, 16, 0.05)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#00F0FF';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = drops[i] * fontSize > h * 0.9 ? '#fff' : `hsl(${180 + Math.random() * 60}, 100%, ${50 + Math.random() * 20}%)`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      konamiRef.current.push(e.key);
      konamiRef.current = konamiRef.current.slice(-10);
      if (konamiRef.current.join(',') === konamiCode.join(',')) {
        setKonamiActive((v) => !v);
        document.body.classList.toggle('konami-active');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="lab-page">
      <canvas ref={canvasRef} className="matrix-bg" />
      <div className="lab-content">
        <div className="lab-header">
          <Sparkles size={32} className="lab-icon" />
          <h1>实验室</h1>
          <p className="lab-subtitle">探索数字世界的边界</p>
        </div>

        <div className="lab-features">
          <div className="lab-feature-card">
            <h3>数字雨 Matrix</h3>
            <p>经典黑客帝国风格数字雨效果</p>
          </div>
          <div className="lab-feature-card">
            <h3>Konami 彩蛋</h3>
            <p>输入 ↑↑↓↓←→←→BA 开启反重力模式</p>
          </div>
          <div className="lab-feature-card">
            <h3>粒子宇宙</h3>
            <p>全页面粒子交互系统</p>
          </div>
          <div className="lab-feature-card">
            <h3>沉浸阅读</h3>
            <p>文章页开启专注黑洞模式</p>
          </div>
        </div>

        <Link to="/" className="lab-back">
          <Home size={18} />
          <span>返回首页</span>
        </Link>

        {konamiActive && (
          <div className="konami-notice">
            ⚡ Konami Code 激活！反重力模式开启 ⚡
          </div>
        )}
      </div>
    </div>
  );
}

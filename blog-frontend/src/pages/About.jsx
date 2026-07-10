import { useRef, useState, useEffect } from 'react';
import { generateAvatar } from '../utils/images';
import { Cpu, Mail, MapPin, Briefcase, Rocket, Sparkles } from 'lucide-react';

const skills = [
  { name: 'React / Vue', level: 90, color: '#00F0FF' },
  { name: 'TypeScript', level: 85, color: '#BD00FF' },
  { name: 'Node.js', level: 80, color: '#F093FB' },
  { name: 'UI/UX 设计', level: 85, color: '#00F0FF' },
  { name: 'Three.js', level: 70, color: '#BD00FF' },
  { name: 'Python', level: 75, color: '#F093FB' },
];

const experiences = [
  {
    year: '2024',
    title: '高级前端工程师',
    company: '某科技公司',
    desc: '负责核心产品前端架构设计，带领团队完成多个大型项目',
  },
  {
    year: '2022',
    title: '全栈开发工程师',
    company: '某互联网公司',
    desc: '独立完成多个 SaaS 产品的前后端开发',
  },
  {
    year: '2020',
    title: '前端开发工程师',
    company: '某创业公司',
    desc: '从零搭建前端工程化体系，推动团队技术升级',
  },
  {
    year: '2018',
    title: '踏上编程之路',
    company: '',
    desc: '开始系统学习 Web 开发，在代码中寻找诗意',
  },
];

export default function About() {
  const avatar = generateAvatar('TFX');
  const [glitch, setGlitch] = useState(false);
  const starRef = useRef(null);

  useEffect(() => {
    const canvas = starRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = 300);
    const h = (canvas.height = 300);
    const cx = w / 2;
    const cy = h / 2;
    const maxR = 120;
    const stars = [];

    skills.forEach((skill, i) => {
      const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
      const r = maxR * (0.5 + (skill.level / 100) * 0.5);
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      stars.push({ x, y, name: skill.name, level: skill.level, color: skill.color, ripples: [] });
    });

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(stars[j].x, stars[j].y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * (0.3 + i * 0.25), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(189, 0, 255, ${0.1 + i * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      stars.forEach((s, i) => {
        if (Math.random() < 0.01) s.ripples.push({ r: 8, alpha: 0.6 });

        for (let k = s.ripples.length - 1; k >= 0; k--) {
          const r = s.ripples[k];
          r.r += 1;
          r.alpha -= 0.02;
          if (r.alpha <= 0) {
            s.ripples.splice(k, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(s.x, s.y, r.r, 0, Math.PI * 2);
          ctx.strokeStyle = `${s.color}${Math.floor(r.alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 6);
        gradient.addColorStop(0, '#fff');
        gradient.addColorStop(0.5, s.color);
        gradient.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(s.x, s.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = 'rgba(224, 231, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, s.x, s.y + 18);
      });

      ctx.font = 'bold 16px Orbitron, Inter, sans-serif';
      ctx.fillStyle = '#00F0FF';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 10;
      ctx.fillText('SKILLS', cx, cy + 4);
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hologram-avatar">
          <img src={avatar} alt="avatar" className="about-avatar" />
          <div className="avatar-scanlines"></div>
          <div className="avatar-glow-ring"></div>
        </div>
        <h1
          className={`about-name glitch-name ${glitch ? 'glitching' : ''}`}
          onMouseEnter={() => setGlitch(true)}
          onMouseLeave={() => setGlitch(false)}
          data-text="TFX"
        >
          TFX
        </h1>
        <div className="about-tagline">
          <Cpu size={14} />
          <span>全栈开发者 / 设计爱好者 / 终身学习者</span>
        </div>
        <p className="about-bio">
          喜欢在代码里寻找诗意，在设计中探索边界。相信技术不仅是工具，更是表达创造力的语言。
          这里记录我的技术探索、生活感悟和成长轨迹。
        </p>
        <div className="contact-links">
          <a href="mailto:tfx@example.com" className="contact-link">
            <Mail size={16} />
            <span>联系我</span>
          </a>
          <a href="#" className="contact-link">
            <MapPin size={16} />
            <span>上海</span>
          </a>
        </div>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2 className="about-section-title">
            <Sparkles size={18} />
            技能星阵
          </h2>
          <div className="skills-starfield">
            <canvas ref={starRef} className="starfield-canvas"></canvas>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <Rocket size={18} />
            时空履历
          </h2>
          <div className="timeline-spiral">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-spiral-item" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="timeline-spiral-dot">
                  <span className="timeline-year">{exp.year}</span>
                </div>
                <div className="timeline-spiral-content">
                  <h3 className="timeline-title">{exp.title}</h3>
                  {exp.company && (
                    <div className="timeline-company">
                      <Briefcase size={12} />
                      {exp.company}
                    </div>
                  )}
                  <p className="timeline-desc">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <Sparkles size={18} />
            技术栈
          </h2>
          <div className="tech-stack">
            <span className="tech-badge">React</span>
            <span className="tech-badge">Vue</span>
            <span className="tech-badge">TypeScript</span>
            <span className="tech-badge">Node.js</span>
            <span className="tech-badge">Next.js</span>
            <span className="tech-badge">Three.js</span>
            <span className="tech-badge">Tailwind CSS</span>
            <span className="tech-badge">Python</span>
            <span className="tech-badge">Docker</span>
            <span className="tech-badge">PostgreSQL</span>
            <span className="tech-badge">Redis</span>
            <span className="tech-badge">GraphQL</span>
            <span className="tech-badge">Figma</span>
            <span className="tech-badge">Framer Motion</span>
          </div>
        </section>
      </div>
    </div>
  );
}

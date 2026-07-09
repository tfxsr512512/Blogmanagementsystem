import { Code2, Mail, BookOpen, Cpu, Sparkles, Coffee } from 'lucide-react';
import { generateAvatar } from '../utils/images';

export default function About() {
  const avatar = generateAvatar('TFX');

  return (
    <div className="about-page">
      <div className="about-hero">
        <img src={avatar} alt="头像" className="about-avatar" />
        <h1 className="about-name">TFX</h1>
        <p className="about-tagline">诗意科技 · 静谧未来主义</p>
        <p className="about-bio">
          一个热爱技术与设计的开发者，在代码与诗意之间寻找平衡。
          相信技术应该有温度，代码应该有美感。
        </p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2 className="about-section-title">
            <Sparkles size={20} />
            技能栈
          </h2>
          <div className="skills-grid">
            {[
              { name: 'React', level: 90 },
              { name: 'TypeScript', level: 85 },
              { name: 'Node.js', level: 80 },
              { name: 'CSS/Tailwind', level: 88 },
              { name: 'Python', level: 75 },
              { name: 'Docker', level: 70 },
            ].map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-fill" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <BookOpen size={20} />
            关于这个博客
          </h2>
          <p className="about-text">
            这个博客是我的个人技术空间，记录我在编程、设计和生活中的思考与探索。
            你会在这里找到技术教程、设计感悟、生活随笔等内容。
          </p>
          <p className="about-text">
            博客采用了「诗意科技 · 静谧未来主义」的设计风格，
            融合了东方禅意与数字科技元素，希望为读者带来独特的阅读体验。
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <Cpu size={20} />
            技术架构
          </h2>
          <div className="tech-stack">
            {['React 19', 'Vite 6', 'Tailwind CSS 4', 'React Router 7', 'Lucide Icons', 'Marked.js'].map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">
            <Coffee size={20} />
            联系我
          </h2>
          <p className="about-text">
            如果你有任何问题或想法，欢迎通过以下方式联系我：
          </p>
          <div className="contact-links">
            <a href="#" className="contact-link">
              <Code2 size={18} />
              <span>GitHub</span>
            </a>
            <a href="#" className="contact-link">
              <Mail size={18} />
              <span>Email</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

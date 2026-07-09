import { Link } from 'react-router-dom';
import { Code2, Send, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">
            <span className="logo-bracket">{'<'}</span>
            禅意编码
            <span className="logo-bracket">{'/>'}</span>
          </h3>
          <p className="footer-desc">诗意科技 · 静谧未来主义</p>
          <p className="footer-text">在代码与诗意之间，寻找技术的温度。</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">导航</h4>
          <ul className="footer-links">
            <li><Link to="/">首页</Link></li>
            <li><Link to="/category/全部">全部文章</Link></li>
            <li><Link to="/category/技术">技术</Link></li>
            <li><Link to="/category/设计">设计</Link></li>
            <li><Link to="/about">关于</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">标签</h4>
          <div className="footer-tags">
            {['React', '设计', '生活', 'CSS', '摄影', '极简主义'].map((tag) => (
              <Link key={tag} to={`/category/全部`} className="footer-tag">
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">关注</h4>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="GitHub">
              <Code2 size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <Send size={20} />
            </a>
            <a href="#" className="social-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          Made with <Heart size={12} className="heart-icon" /> by 禅意编码 · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

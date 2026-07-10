import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';

export default function ArticleCard3D({ article, index = 0, horizontal = false }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.02)`;
    card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    }
  };

  return (
    <Link
      ref={cardRef}
      to={`/article/${article.id}`}
      className={`article-card-3d ${horizontal ? 'horizontal' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-3d-inner">
        <div className="card-3d-cover">
          <img src={article.cover} alt={article.title} loading="lazy" />
          <div className="card-3d-overlay">
            <span className="article-category-badge">{article.category}</span>
          </div>
          {article.featured && (
            <div className="article-featured-badge">
              <span className="featured-dot"></span>
              精选
            </div>
          )}
          <div className="card-3d-shine" />
        </div>
        <div className="card-3d-body">
          <h3 className="card-3d-title">{article.title}</h3>
          <p className="card-3d-summary">{article.summary}</p>
          <div className="card-3d-tags">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="article-tag">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
          <div className="card-3d-meta">
            <span className="meta-date">{article.date}</span>
            <span className="meta-readtime">
              <Clock size={12} />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>
      <div className="card-3d-glow" />
    </Link>
  );
}

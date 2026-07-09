import { Link } from 'react-router-dom';
import { Clock, Tag } from 'lucide-react';

export default function ArticleCard({ article, index = 0 }) {
  return (
    <Link
      to={`/article/${article.id}`}
      className="article-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="article-card-cover">
        <img src={article.cover} alt={article.title} loading="lazy" />
        <div className="article-card-overlay">
          <span className="article-category-badge">{article.category}</span>
        </div>
        {article.featured && (
          <div className="article-featured-badge">
            <span className="featured-dot"></span>
            精选
          </div>
        )}
      </div>
      <div className="article-card-body">
        <h3 className="article-card-title">{article.title}</h3>
        <p className="article-card-summary">{article.summary}</p>
        <div className="article-card-tags">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="article-tag">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>
        <div className="article-card-meta">
          <span className="meta-date">{article.date}</span>
          <span className="meta-readtime">
            <Clock size={12} />
            {article.readTime}
          </span>
        </div>
      </div>
      <div className="article-card-glow"></div>
    </Link>
  );
}

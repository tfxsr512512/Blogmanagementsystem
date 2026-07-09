import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { marked } from 'marked';
import { ArrowLeft, Clock, Calendar, Tag, Heart, Bookmark, Share2, ChevronUp } from 'lucide-react';
import { getArticleById, articles } from '../data/articles';
import { generateAvatar } from '../utils/images';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = getArticleById(id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="not-found">
        <h2>文章未找到</h2>
        <Link to="/" className="back-link">返回首页</Link>
      </div>
    );
  }

  const htmlContent = marked(article.content);
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && (a.category === article.category || a.tags.some((t) => article.tags.includes(t))))
    .slice(0, 3);

  const authorAvatar = generateAvatar('TFX');

  return (
    <div className="article-detail-page">
      {/* Reading Progress Bar */}
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Back Button */}
      <div className="article-back">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>返回</span>
        </button>
      </div>

      {/* Article Header */}
      <header className="article-header">
        <div className="article-cover-wrap">
          <img src={article.cover} alt={article.title} className="article-cover-img" />
          <div className="article-cover-blur" />
        </div>
        <div className="article-header-content">
          <div className="article-category-badge large">{article.category}</div>
          <h1 className="article-title-detail">{article.title}</h1>
          <p className="article-summary-detail">{article.summary}</p>
          <div className="article-meta-detail">
            <div className="author-info">
              <img src={authorAvatar} alt="作者" className="author-avatar" />
              <span className="author-name">TFX</span>
            </div>
            <div className="meta-items">
              <span className="meta-item">
                <Calendar size={14} />
                {article.date}
              </span>
              <span className="meta-item">
                <Clock size={14} />
                {article.readTime}
              </span>
            </div>
          </div>
          <div className="article-tags-detail">
            {article.tags.map((tag) => (
              <span key={tag} className="article-tag-detail">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article
        ref={contentRef}
        className="article-content markdown-body"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Article Actions */}
      <div className="article-actions-bar">
        <button
          className={`action-btn ${liked ? 'active' : ''}`}
          onClick={() => setLiked(!liked)}
        >
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          <span>{liked ? '已点赞' : '点赞'}</span>
        </button>
        <button
          className={`action-btn ${bookmarked ? 'active' : ''}`}
          onClick={() => setBookmarked(!bookmarked)}
        >
          <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
          <span>{bookmarked ? '已收藏' : '收藏'}</span>
        </button>
        <button
          className="action-btn"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: article.title, url: window.location.href });
            }
          }}
        >
          <Share2 size={20} />
          <span>分享</span>
        </button>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="related-section">
          <h2 className="section-title">
            相关文章
          </h2>
          <div className="related-grid">
            {relatedArticles.map((rel) => (
              <Link key={rel.id} to={`/article/${rel.id}`} className="related-card">
                <img src={rel.cover} alt={rel.title} loading="lazy" />
                <div className="related-body">
                  <h4>{rel.title}</h4>
                  <span className="related-date">{rel.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back to Top */}
      {showBackToTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
}

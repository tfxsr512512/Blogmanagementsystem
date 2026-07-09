import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, BookOpen, Cpu } from 'lucide-react';
import { articles, getFeaturedArticles, categories, allTags } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [displayArticles, setDisplayArticles] = useState(articles);
  const heroRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const fullText = '在代码与诗意之间，寻找技术的温度';

  useEffect(() => {
    if (query) {
      const filtered = articles.filter(
        (a) =>
          a.title.includes(query) ||
          a.summary.includes(query) ||
          a.tags.some((t) => t.includes(query))
      );
      setDisplayArticles(filtered);
    } else {
      setDisplayArticles(articles);
    }
  }, [query]);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const featuredArticles = getFeaturedArticles();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>诗意科技 · 静谧未来主义</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-line">禅意编码</span>
            <span className="hero-line gradient-text">Zen Code</span>
          </h1>
          <p className="hero-subtitle">
            {typedText}
            <span className="cursor-blink">|</span>
          </p>
          <div className="hero-actions">
            <Link to="/category/全部" className="hero-btn primary">
              <BookOpen size={18} />
              <span>浏览文章</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="hero-btn secondary">
              <Cpu size={18} />
              <span>关于我</span>
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{articles.length}</span>
            <span className="stat-label">文章</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{categories.length - 1}</span>
            <span className="stat-label">分类</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">{allTags.length}</span>
            <span className="stat-label">标签</span>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">
            <Zap size={20} className="section-icon" />
            精选文章
          </h2>
          <Link to="/category/全部" className="section-more">
            查看全部 <ArrowRight size={14} />
          </Link>
        </div>
        <div className="featured-grid">
          {featuredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </section>

      {/* All Articles or Search Results */}
      <section className="all-articles-section">
        <div className="section-header">
          <h2 className="section-title">
            <BookOpen size={20} className="section-icon" />
            {query ? `搜索结果: "${query}"` : '最新文章'}
          </h2>
        </div>
        {displayArticles.length > 0 ? (
          <div className="articles-grid">
            {displayArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>未找到相关文章</p>
            <Link to="/" className="back-link">返回首页</Link>
          </div>
        )}
      </section>

      {/* Tags Cloud */}
      <section className="tags-section">
        <div className="section-header">
          <h2 className="section-title">
            <Sparkles size={20} className="section-icon" />
            标签云
          </h2>
        </div>
        <div className="tags-cloud">
          {allTags.map((tag) => (
            <Link key={tag} to="/category/全部" className="tag-cloud-item">
              {tag}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

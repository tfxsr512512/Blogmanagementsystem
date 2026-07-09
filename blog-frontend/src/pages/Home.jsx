import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, BookOpen, Cpu, TrendingUp, PenTool } from 'lucide-react';
import { articles, getFeaturedArticles, categories, allTags } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [displayArticles, setDisplayArticles] = useState(articles);
  const [typedText, setTypedText] = useState('');
  const fullText = '记录生活中的点滴思考与技术探索';

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
  const latestArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  const techArticles = articles.filter((a) => a.category === '技术');
  const lifeArticles = articles.filter((a) => a.category === '生活');

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg-grid"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>个人博客 · 技术与生活</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-line">TFX的</span>
            <span className="hero-line gradient-text">碎碎念</span>
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

      {/* Search Results */}
      {query ? (
        <section className="all-articles-section">
          <div className="section-header">
            <h2 className="section-title">
              <BookOpen size={20} className="section-icon" />
              搜索结果: "{query}"
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
      ) : (
        <>
          {/* Featured Articles - Hero Layout */}
          {featuredArticles.length > 0 && (
            <section className="featured-section">
              <div className="section-header">
                <h2 className="section-title">
                  <Zap size={20} className="section-icon" />
                  精选推荐
                </h2>
                <Link to="/category/全部" className="section-more">
                  查看全部 <ArrowRight size={14} />
                </Link>
              </div>
              <div className="featured-layout">
                {/* Large featured card */}
                <Link to={`/article/${featuredArticles[0].id}`} className="featured-hero-card">
                  <div className="featured-hero-cover">
                    <img src={featuredArticles[0].cover} alt={featuredArticles[0].title} />
                    <div className="featured-hero-overlay" />
                  </div>
                  <div className="featured-hero-content">
                    <span className="article-category-badge large">{featuredArticles[0].category}</span>
                    <h3 className="featured-hero-title">{featuredArticles[0].title}</h3>
                    <p className="featured-hero-summary">{featuredArticles[0].summary}</p>
                    <div className="featured-hero-meta">
                      <span>{featuredArticles[0].date}</span>
                      <span>·</span>
                      <span>{featuredArticles[0].readTime}</span>
                    </div>
                  </div>
                  <div className="featured-hero-glow" />
                </Link>

                {/* Small featured cards */}
                <div className="featured-side">
                  {featuredArticles.slice(1, 4).map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="featured-mini-card">
                      <img src={article.cover} alt={article.title} className="featured-mini-cover" />
                      <div className="featured-mini-body">
                        <span className="mini-category">{article.category}</span>
                        <h4 className="featured-mini-title">{article.title}</h4>
                        <span className="featured-mini-date">{article.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Two column layout: Latest + Sidebar */}
          <div className="home-main-layout">
            <div className="home-main-content">
              {/* Latest Articles */}
              <section className="latest-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <TrendingUp size={20} className="section-icon" />
                    最新文章
                  </h2>
                </div>
                <div className="articles-list">
                  {latestArticles.slice(0, 5).map((article, index) => (
                    <ArticleCard key={article.id} article={article} index={index} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="home-sidebar">
              {/* Tech Posts */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">
                  <Cpu size={16} />
                  技术笔记
                </h3>
                <div className="sidebar-list">
                  {techArticles.slice(0, 4).map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="sidebar-item">
                      <span className="sidebar-item-dot"></span>
                      <span className="sidebar-item-text">{article.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Life Posts */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">
                  <PenTool size={16} />
                  生活随笔
                </h3>
                <div className="sidebar-list">
                  {lifeArticles.slice(0, 4).map((article) => (
                    <Link key={article.id} to={`/article/${article.id}`} className="sidebar-item">
                      <span className="sidebar-item-dot"></span>
                      <span className="sidebar-item-text">{article.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tags Cloud */}
              <div className="sidebar-card">
                <h3 className="sidebar-title">
                  <Sparkles size={16} />
                  热门标签
                </h3>
                <div className="sidebar-tags">
                  {allTags.slice(0, 12).map((tag) => (
                    <Link key={tag} to="/category/全部" className="sidebar-tag">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}

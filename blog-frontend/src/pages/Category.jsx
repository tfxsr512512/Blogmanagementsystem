import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { articles, categories } from '../data/articles';
import ArticleCard from '../components/ArticleCard';

export default function Category() {
  const { name } = useParams();
  const [filtered, setFiltered] = useState(articles);
  const [activeCategory, setActiveCategory] = useState(name || '全部');

  useEffect(() => {
    if (name) {
      setActiveCategory(name);
      if (name === '全部') {
        setFiltered(articles);
      } else {
        setFiltered(articles.filter((a) => a.category === name));
      }
    }
  }, [name]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat.name);
    if (cat.name === '全部') {
      setFiltered(articles);
    } else {
      setFiltered(articles.filter((a) => a.category === cat.name));
    }
  };

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">
          <FileText size={28} className="category-icon" />
          {activeCategory === '全部' ? '全部文章' : activeCategory}
        </h1>
        <p className="category-count">共 {filtered.length} 篇文章</p>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-tab ${activeCategory === cat.name ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat.name}
            <span className="tab-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="articles-grid">
          {filtered.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>该分类下暂无文章</p>
        </div>
      )}
    </div>
  );
}

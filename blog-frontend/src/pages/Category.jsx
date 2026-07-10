import { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { articles, allTags, categories, getArticlesByCategory } from '../data/articles';
import ArticleCard3D from '../components/ArticleCard3D';

export default function Category() {
  const { name } = useParams();
  const [activeTag, setActiveTag] = useState('');
  const canvasRef = useRef(null);
  const sphereRef = useRef({ tags: [], rotationX: 0, rotationY: 0, mouseX: 0, mouseY: 0, targetRotX: 0, targetRotY: 0 });

  useEffect(() => {
    setActiveTag('');
  }, [name]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = (canvas.width = 300);
    const h = (canvas.height = 300);
    const cx = w / 2;
    const cy = h / 2;
    const radius = 110;

    const tagList = allTags.slice(0, 24);
    const positions = [];
    tagList.forEach((tag, i) => {
      const phi = Math.acos(-1 + (2 * i) / tagList.length);
      const theta = Math.sqrt(tagList.length * Math.PI) * phi;
      positions.push({
        tag,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
      });
    });
    sphereRef.current.tags = positions;

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      sphereRef.current.rotationX += (sphereRef.current.targetRotX - sphereRef.current.rotationX) * 0.05;
      sphereRef.current.rotationY += (sphereRef.current.targetRotY - sphereRef.current.rotationY) * 0.05;

      if (sphereRef.current.targetRotX === 0 && sphereRef.current.targetRotY === 0) {
        sphereRef.current.rotationY += 0.003;
      }

      const sorted = positions
        .map((p) => {
          const cosX = Math.cos(sphereRef.current.rotationX);
          const sinX = Math.sin(sphereRef.current.rotationX);
          const cosY = Math.cos(sphereRef.current.rotationY);
          const sinY = Math.sin(sphereRef.current.rotationY);

          const y1 = p.y * cosX - p.z * sinX;
          const z1 = p.y * sinX + p.z * cosX;
          const x2 = p.x * cosY + z1 * sinY;
          const z2 = -p.x * sinY + z1 * cosY;

          return { ...p, sx: cx + x2, sy: cy + y1, sz: z2 };
        })
        .sort((a, b) => a.sz - b.sz);

      sorted.forEach((p) => {
        const scale = (p.sz + radius) / (2 * radius);
        const opacity = 0.3 + scale * 0.7;
        const fontSize = 10 + scale * 6;

        ctx.font = `${fontSize}px Inter, sans-serif`;
        ctx.fillStyle = activeTag === p.tag ? '#BD00FF' : `rgba(0, 240, 255, ${opacity})`;
        ctx.textAlign = 'center';
        ctx.fillText(p.tag, p.sx, p.sy);
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      sphereRef.current.targetRotY = ((mx - rect.width / 2) / (rect.width / 2)) * 0.8;
      sphereRef.current.targetRotX = -((my - rect.height / 2) / (rect.height / 2)) * 0.4;
    };

    const handleMouseLeave = () => {
      sphereRef.current.targetRotX = 0;
      sphereRef.current.targetRotY = 0;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const sorted = sphereRef.current.tags
        .map((p) => {
          const cosX = Math.cos(sphereRef.current.rotationX);
          const sinX = Math.sin(sphereRef.current.rotationX);
          const cosY = Math.cos(sphereRef.current.rotationY);
          const sinY = Math.sin(sphereRef.current.rotationY);

          const y1 = p.y * cosX - p.z * sinX;
          const z1 = p.y * sinX + p.z * cosX;
          const x2 = p.x * cosY + z1 * sinY;
          const z2 = -p.x * sinY + z1 * cosY;

          return { ...p, sx: cx + x2, sy: cy + y1, sz: z2 };
        })
        .sort((a, b) => b.sz - a.sz);

      for (const p of sorted) {
        const dist = Math.sqrt((mx - p.sx) ** 2 + (my - p.sy) ** 2);
        if (dist < 30 && p.sz > -radius * 0.3) {
          setActiveTag(p.tag);
          return;
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, [activeTag]);

  let displayArticles = name === '全部' ? articles : getArticlesByCategory(name);
  if (activeTag) {
    displayArticles = displayArticles.filter((a) => a.tags.includes(activeTag));
  }

  const currentCat = categories.find((c) => c.name === name);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">
          <Sparkles size={24} className="category-icon" />
          {name}
        </h1>
        <p className="category-count">{displayArticles.length} 篇文章{activeTag && ` · 标签: ${activeTag}`}</p>
      </div>

      <div className="category-tabs">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category/${cat.name}`}
            className={`category-tab ${name === cat.name ? 'active' : ''}`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="tab-count">
              {cat.name === '全部' ? articles.length : getArticlesByCategory(cat.name).length}
            </span>
          </Link>
        ))}
      </div>

      <div className="category-body">
        <div className="tag-universe-section">
          <div className="tag-universe-title">
            <Sparkles size={14} />
            <span>标签宇宙</span>
          </div>
          <div className="tag-universe-container">
            <canvas ref={canvasRef} className="tag-universe-canvas"></canvas>
          </div>
          {activeTag && (
            <div className="active-tag-info">
              <span>当前标签: {activeTag}</span>
              <button onClick={() => setActiveTag('')}>清除</button>
            </div>
          )}
        </div>
      </div>

      <div className="articles-grid">
        {displayArticles.map((article, index) => (
          <ArticleCard3D key={article.id} article={article} index={index} />
        ))}
      </div>
    </div>
  );
}

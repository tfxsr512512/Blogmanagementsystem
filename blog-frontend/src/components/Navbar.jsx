import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, Tags, Info, Moon, Sun, Search, Menu, X, Code2, FlaskConical, Clock } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let lastScroll = 0;
    let timeoutId;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const speed = Math.abs(currentScroll - lastScroll);
      setScrollSpeed(Math.min(speed / 50, 1));
      setScrolled(currentScroll > 20);
      lastScroll = currentScroll;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setScrollSpeed(0), 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/category/全部', label: '文章', icon: FileText },
    { path: '/category/技术', label: '技术', icon: Code2 },
    { path: '/category/设计', label: '设计', icon: Tags },
    { path: '/category/生活', label: '生活', icon: Tags },
    { path: '/about', label: '关于', icon: Info },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      style={{
        boxShadow: scrolled ? `0 4px 30px rgba(0, 240, 255, ${0.05 + scrollSpeed * 0.1})` : 'none',
      }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">
            <span className="logo-bracket">{'<'}</span>
            TFX的碎碎念
            <span className="logo-bracket">{'/>'}</span>
          </span>
          <span className="logo-glow"></span>
        </Link>

        <div className="navbar-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="navbar-actions">
          <div className="time-indicator">
            <Clock size={14} />
            <span className="time-text">{currentTime}</span>
          </div>
          <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="搜索">
            <Search size={18} />
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label="切换主题">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="菜单">
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {searchOpen && (
          <form className="search-bar" onSubmit={handleSearch}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="搜索文章、标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <Link to="/lab" className="mobile-nav-link lab-link">
            <FlaskConical size={18} />
            <span>实验室 ✨</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

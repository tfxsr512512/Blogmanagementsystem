import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import ParticleCursor from './components/ParticleCursor';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Category from './pages/Category';
import About from './pages/About';
import Lab from './pages/Lab';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent({ theme, toggleTheme, cursorEnabled, setCursorEnabled }) {
  const location = useLocation();
  const isLab = location.pathname === '/lab';

  return (
    <div className="app-container">
      {!isLab && <ParticleBackground />}
      {cursorEnabled && <ParticleCursor />}
      {!isLab && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/about" element={<About />} />
          <Route path="/lab" element={<Lab />} />
        </Routes>
      </main>
      {!isLab && <Footer />}
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
  }, [theme]);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setCursorEnabled(false);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent
        theme={theme}
        toggleTheme={toggleTheme}
        cursorEnabled={cursorEnabled}
        setCursorEnabled={setCursorEnabled}
      />
    </BrowserRouter>
  );
}

export default App;

import { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

export default function TocNav({ headings, activeId }) {
  const [open, setOpen] = useState(false);

  if (!headings || headings.length === 0) return null;

  return (
    <div className={`toc-nav ${open ? 'open' : ''}`}>
      <button className="toc-toggle" onClick={() => setOpen(!open)}>
        <List size={16} />
        <span>目录</span>
      </button>
      <nav className="toc-list">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`toc-item level-${h.level} ${activeId === h.id ? 'active' : ''}`}
          >
            {h.level > 1 && <ChevronRight size={10} className="toc-arrow" />}
            <span>{h.text}</span>
            {activeId === h.id && <span className="toc-pulse"></span>}
          </a>
        ))}
      </nav>
    </div>
  );
}

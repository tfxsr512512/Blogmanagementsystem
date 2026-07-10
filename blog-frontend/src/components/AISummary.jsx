import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export default function AISummary({ summary }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!summary) return;
    let i = 0;
    setDisplayed('');
    const timer = setInterval(() => {
      if (i < summary.length) {
        setDisplayed(summary.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 25);
    const cursorTimer = setInterval(() => setShowCursor((s) => !s), 500);
    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, [summary]);

  if (!summary) return null;

  return (
    <div className="ai-summary-capsule">
      <div className="ai-summary-header">
        <Sparkles size={14} className="ai-icon" />
        <span>AI 摘要</span>
      </div>
      <p className="ai-summary-text">
        {displayed}
        <span className={`ai-cursor ${showCursor ? 'visible' : 'hidden'}`}>▍</span>
      </p>
    </div>
  );
}

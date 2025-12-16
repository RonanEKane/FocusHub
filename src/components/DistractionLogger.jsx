import { useState, useEffect } from 'react';
import './DistractionLogger.css';

const DistractionLogger = ({ onDistraction }) => {
  const [distractions, setDistractions] = useState([]);
  const [newDistraction, setNewDistraction] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('focushub_distractions');
    if (saved) {
      setDistractions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('focushub_distractions', JSON.stringify(distractions));
  }, [distractions]);

  const addDistraction = () => {
    if (!newDistraction.trim()) return;
    
    const distraction = {
      id: Date.now(),
      text: newDistraction,
      timestamp: new Date().toISOString()
    };
    
    setDistractions(prev => [...prev, distraction]);
    setNewDistraction('');
    onDistraction();
  };

  const removeDistraction = (id) => {
    setDistractions(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="card distraction-logger">
      <div className="card-header">
        <h3 className="card-title">🚫 DISTRACTION PARKING</h3>
        <span className="distraction-count">{distractions.length}</span>
      </div>
      
      <div className="card-content">
        <div className="distraction-input">
          <input
            type="text"
            className="input"
            placeholder="Park that distraction here..."
            value={newDistraction}
            onChange={(e) => setNewDistraction(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addDistraction()}
          />
          <button onClick={addDistraction} className="btn btn-primary">Park It</button>
        </div>

        <div className="distraction-list">
          {distractions.map(d => (
            <div key={d.id} className="distraction-item">
              <div className="distraction-text">{d.text}</div>
              <button onClick={() => removeDistraction(d.id)} className="distraction-remove">✕</button>
            </div>
          ))}
          {distractions.length === 0 && (
            <div className="empty-state-small">
              No distractions parked. Stay focused! 🎯
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistractionLogger;

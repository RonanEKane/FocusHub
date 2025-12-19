import { useState, useEffect } from 'react';
import './DistractionLogger.css';

const DistractionLogger = ({ onDistraction }) => {
  const [distractions, setDistractions] = useState([]);
  const [newDistraction, setNewDistraction] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

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

  const moveToHolding = (id) => {
    const distraction = distractions.find(d => d.id === id);
    if (!distraction) return;
    
    // Get existing tasks
    const tasks = JSON.parse(localStorage.getItem('focushub_tasks') || '{}');
    const newTask = {
      id: Date.now(),
      text: distraction.text,
      sprints: 0,
      createdAt: new Date().toISOString()
    };
    
    // Add to holding area
    tasks.holding = [...(tasks.holding || []), newTask];
    localStorage.setItem('focushub_tasks', JSON.stringify(tasks));
    
    // Remove from distractions
    removeDistraction(id);
    
    // Trigger a storage event to update TaskManager
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="card distraction-logger">
      <div className="card-header">
        <h3 className="card-title">🚫 DISTRACTION PARKING</h3>
        <div className="header-actions">
          <span className="distraction-count">{distractions.length}</span>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="collapse-btn"
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </div>
      </div>
      
      {isExpanded && (
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
                <div className="distraction-actions">
                  <button 
                    onClick={() => moveToHolding(d.id)} 
                    className="distraction-action-btn move-btn"
                    title="Move to Holding Area"
                  >
                    📦
                  </button>
                  <button 
                    onClick={() => removeDistraction(d.id)} 
                    className="distraction-action-btn delete-btn"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            {distractions.length === 0 && (
              <div className="empty-state-small">
                No distractions parked. Stay focused! 🎯
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistractionLogger;

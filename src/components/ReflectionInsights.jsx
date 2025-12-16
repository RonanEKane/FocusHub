import { useState, useEffect } from 'react';
import './ReflectionInsights.css';

const ReflectionInsights = () => {
  const [insights, setInsights] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('focushub_history') || '[]');
    setInsights(history.slice(-7).reverse());
  }, []);

  if (insights.length === 0) {
    return (
      <div className="card reflection-insights">
        <div className="card-header">
          <h3 className="card-title">💭 REFLECTION HISTORY</h3>
        </div>
        <div className="card-content">
          <div className="empty-state-small">
            No reflections yet. Complete your first day to start tracking!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card reflection-insights">
      <div className="card-header insights-header">
        <h3 className="card-title">💭 REFLECTION HISTORY</h3>
        <button onClick={() => setIsExpanded(!isExpanded)} className="collapse-button">
          {isExpanded ? '▼ Collapse' : '▶ Expand'}
        </button>
      </div>
      
      {isExpanded && (
        <div className="card-content">
          <div className="insights-list">
            {insights.map((insight, index) => (
              <div key={index} className="insight-item">
                <div className="insight-header">
                  <span className="insight-date">{new Date(insight.date).toLocaleDateString()}</span>
                  <span className={`insight-grade grade-${insight.grade}`}>{insight.grade}</span>
                </div>
                {insight.reflection && (
                  <div className="insight-reflection">{insight.reflection}</div>
                )}
                <div className="insight-stats">
                  {insight.sprintCount}/{insight.plannedSprints} sprints • 
                  {insight.tasksCompleted} tasks • 
                  {insight.distractionCount} distractions
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReflectionInsights;

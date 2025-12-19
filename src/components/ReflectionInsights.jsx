import { useState, useEffect } from 'react';
import './ReflectionInsights.css';

const ReflectionInsights = ({ sprintCount, plannedSprints, distractionCount }) => {
  const [insights, setInsights] = useState({
    focusRate: 0,
    consistencyRate: 0
  });

  useEffect(() => {
    // Calculate focus rate (inverse of distractions)
    const maxDistractions = 10;
    const focusRate = Math.max(0, Math.round((1 - (distractionCount / maxDistractions)) * 100));
    
    // Calculate consistency rate (how close to planned)
    let consistencyRate = 0;
    if (plannedSprints > 0) {
      consistencyRate = Math.min(100, Math.round((sprintCount / plannedSprints) * 100));
    }
    
    setInsights({ focusRate, consistencyRate });
  }, [sprintCount, plannedSprints, distractionCount]);

  return (
    <div className="card reflection-insights">
      <div className="card-header">
        <h3 className="card-title">🎯 REFLECTION INSIGHTS</h3>
        <div className="insight-actions">
          <button className="btn-insight">7 Days</button>
          <button className="btn-insight active">30 Days</button>
        </div>
      </div>
      
      <div className="card-content">
        <div className="insight-grid">
          <div className="insight-item">
            <div className="insight-percentage">{insights.focusRate}%</div>
            <div className="insight-label">FOCUS PERCENTAGE</div>
            <div className="insight-bar">
              <div 
                className="insight-bar-fill green" 
                style={{ width: `${insights.focusRate}%` }}
              />
            </div>
          </div>

          <div className="insight-item">
            <div className="insight-percentage">{insights.consistencyRate}%</div>
            <div className="insight-label">FOLLOW-THROUGH RATE</div>
            <div className="insight-bar">
              <div 
                className="insight-bar-fill blue" 
                style={{ width: `${insights.consistencyRate}%` }}
              />
            </div>
          </div>
        </div>

        <div className="insights-stats">
          <div className="stat-row">
            <span className="stat-label">Best Streak</span>
            <span className="stat-value">0 days</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Avg Distractions</span>
            <span className="stat-value">{distractionCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionInsights;

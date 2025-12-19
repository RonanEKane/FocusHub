import { useState, useEffect } from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ sprintCount, plannedSprints, tasksCompleted, distractionCount }) => {
  const [completionRate, setCompletionRate] = useState(0);

  useEffect(() => {
    if (plannedSprints > 0) {
      setCompletionRate(Math.round((sprintCount / plannedSprints) * 100));
    } else {
      setCompletionRate(0);
    }
  }, [sprintCount, plannedSprints]);

  return (
    <div className="card progress-tracker">
      <div className="card-header">
        <h3 className="card-title">📈 PROGRESS TRACKER</h3>
        <button className="btn-expand">Aug 8</button>
      </div>
      
      <div className="card-content">
        <div className="progress-metrics">
          <div className="metric-box">
            <div className="metric-icon">🎯</div>
            <div className="metric-content">
              <div className="metric-value">{sprintCount}</div>
              <div className="metric-label">Sprints</div>
            </div>
          </div>

          <div className="metric-box">
            <div className="metric-icon">✅</div>
            <div className="metric-content">
              <div className="metric-value">{tasksCompleted}</div>
              <div className="metric-label">Tasks</div>
            </div>
          </div>
        </div>

        <div className="progress-summary">
          <div className="summary-row">
            <span className="summary-label">Completion Rate</span>
            <span className="summary-value">{completionRate}%</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">Distractions</span>
            <span className="summary-value">{distractionCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;

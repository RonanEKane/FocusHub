import { useState, useEffect } from 'react';
import './GradeTracker.css';

const GradeTracker = ({ sprintCount, plannedSprints, distractionCount, tasksCompleted }) => {
  const [currentGrade, setCurrentGrade] = useState('');
  const [gradeColor, setGradeColor] = useState('');

  useEffect(() => {
    calculateGrade();
  }, [sprintCount, distractionCount, plannedSprints]);

  const calculateGrade = () => {
    if (plannedSprints === 0) {
      setCurrentGrade('—');
      setGradeColor('var(--text-tertiary)');
      return;
    }

    const sprintScore = Math.min((sprintCount / plannedSprints) * 100, 100);
    const distractionPenalty = distractionCount * 5;
    const finalScore = Math.max(sprintScore - distractionPenalty, 0);
    
    let grade, color;
    if (finalScore >= 90) {
      grade = 'A';
      color = '#10b981';
    } else if (finalScore >= 80) {
      grade = 'B';
      color = '#3b82f6';
    } else if (finalScore >= 70) {
      grade = 'C';
      color = '#f59e0b';
    } else if (finalScore >= 60) {
      grade = 'D';
      color = '#ef4444';
    } else {
      grade = 'F';
      color = '#7f1d1d';
    }
    
    setCurrentGrade(grade);
    setGradeColor(color);
  };

  const getPerformanceMessage = () => {
    switch(currentGrade) {
      case 'A': return 'Excellent work!';
      case 'B': return 'Solid performance';
      case 'C': return 'Room for improvement';
      case 'D': return 'Needs more focus';
      case 'F': return 'Time to refocus';
      default: return 'Start your day';
    }
  };

  return (
    <div className="card grade-tracker">
      <div className="card-header">
        <h3 className="card-title">📊 TODAY'S GRADE</h3>
      </div>
      
      <div className="card-content">
        <div className="current-grade" style={{ color: gradeColor }}>
          {currentGrade}
        </div>
        <div className="grade-message">{getPerformanceMessage()}</div>
        
        <div className="grade-breakdown">
          <div className="breakdown-item">
            <span className="breakdown-label">Sprint Progress</span>
            <span className="breakdown-value">{sprintCount}/{plannedSprints}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Tasks Done</span>
            <span className="breakdown-value">{tasksCompleted}</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-label">Distractions</span>
            <span className="breakdown-value">{distractionCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeTracker;

import { useState, useEffect } from 'react';
import './EndOfDayModal.css';

const EndOfDayModal = ({ sprintCount, plannedSprints, distractionCount, tasksCompleted, breakMinutes, meetingMinutes, onClose }) => {
  const [reflection, setReflection] = useState('');
  const [grade, setGrade] = useState('');

  const calculateGrade = () => {
    const sprintScore = Math.min((sprintCount / plannedSprints) * 100, 100);
    const distractionPenalty = distractionCount * 5;
    const finalScore = Math.max(sprintScore - distractionPenalty, 0);
    
    if (finalScore >= 97) return 'A+';
    if (finalScore >= 93) return 'A';
    if (finalScore >= 90) return 'A-';
    if (finalScore >= 87) return 'B+';
    if (finalScore >= 83) return 'B';
    if (finalScore >= 80) return 'B-';
    if (finalScore >= 77) return 'C+';
    if (finalScore >= 73) return 'C';
    if (finalScore >= 70) return 'C-';
    if (finalScore >= 67) return 'D+';
    if (finalScore >= 63) return 'D';
    if (finalScore >= 60) return 'D-';
    return 'F';
  };

  useEffect(() => {
    setGrade(calculateGrade());
  }, []);

  const handleSave = () => {
    const today = new Date().toDateString();
    
    // FIX: Tasks stay in their buckets, distractions persist
    // Only reset wins array for new day
    const tasks = JSON.parse(localStorage.getItem('focushub_tasks') || '{}');
    // Wins will be reset by App.jsx on new day, not here
    
    // Save end of day report
    const report = {
      date: today,
      sprintCount,
      plannedSprints,
      distractionCount,
      tasksCompleted,
      breakMinutes,
      meetingMinutes,
      grade,
      reflection,
      score: Math.min((sprintCount / plannedSprints) * 100, 100),
      timestamp: new Date().toISOString()
    };
    
    const history = JSON.parse(localStorage.getItem('focushub_history') || '[]');
    history.push(report);
    localStorage.setItem('focushub_history', JSON.stringify(history));
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal end-of-day-modal">
        <div className="modal-header">
          <h2>📊 End of Day Report</h2>
        </div>
        
        <div className="modal-body">
          <div className="day-stats">
            <div className="stat-card">
              <div className="stat-label">Sprints</div>
              <div className="stat-value">{sprintCount} / {plannedSprints}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Tasks</div>
              <div className="stat-value">{tasksCompleted}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Distractions</div>
              <div className="stat-value">{distractionCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Meetings</div>
              <div className="stat-value">{(meetingMinutes / 60).toFixed(1)}h</div>
            </div>
          </div>

          <div className="grade-display">
            <div className="grade-label">Today's Grade</div>
            <div className={`grade-value grade-${grade}`}>{grade}</div>
          </div>

          <div className="reflection-section">
            <label className="reflection-label">
              What went well? What could improve?
            </label>
            <textarea
              className="reflection-input"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Your thoughts..."
              rows={4}
            />
          </div>

          <div className="eod-note">
            ℹ️ Unfinished tasks and distractions will remain for tomorrow
          </div>
        </div>
        
        <div className="modal-footer">
          <button onClick={handleSave} className="btn btn-primary">
            Complete Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndOfDayModal;

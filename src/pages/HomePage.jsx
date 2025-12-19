import { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalSprints: 0,
    totalTasks: 0,
    avgGrade: 0,
    currentStreak: 0
  });

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('focushub_history');
    if (savedHistory) {
      const historyData = JSON.parse(savedHistory);
      setHistory(historyData);
      calculateStats(historyData);
    }
  }, []);

  const calculateStats = (historyData) => {
    if (historyData.length === 0) return;

    const totalSprints = historyData.reduce((sum, day) => sum + day.sprintCount, 0);
    const totalTasks = historyData.reduce((sum, day) => sum + day.tasksCompleted, 0);
    
    // Calculate average grade (convert letter to number)
    const gradeValues = {
      'A+': 4.3, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0
    };
    
    const avgGradeValue = historyData.reduce((sum, day) => {
      return sum + (gradeValues[day.userGrade || day.autoGrade] || 0);
    }, 0) / historyData.length;

    setStats({
      totalSprints,
      totalTasks,
      avgGrade: avgGradeValue.toFixed(1),
      currentStreak: calculateStreak(historyData)
    });
  };

  const calculateStreak = (historyData) => {
    // Calculate consecutive days with grade >= B
    let streak = 0;
    const gradeThreshold = ['A+', 'A', 'A-', 'B+', 'B'];
    
    for (let i = historyData.length - 1; i >= 0; i--) {
      const grade = historyData[i].userGrade || historyData[i].autoGrade;
      if (gradeThreshold.includes(grade)) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getLast7Days = () => {
    return history.slice(-7);
  };

  const getCurrentTime = () => {
    return new Date().toUTCString();
  };

  return (
    <div className="home-page">
      {/* Technical Status Bar */}
      <div className="status-bar">
        <div className="status-left">
          <img src="/logo.svg" alt="FocusHub" className="status-logo" />
          <span className="status-app-name">FOCUSHUB</span>
        </div>
        <div className="status-right">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">SYSTEM STATUS: ONLINE</span>
          </div>
          <div className="status-time">{getCurrentTime()}</div>
        </div>
      </div>

      {/* Mission Control Dashboard */}
      <div className="mission-control">
        <h1 className="mission-title">MISSION CONTROL</h1>
        
        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Activity Flow */}
          <div className="bento-card activity-flow">
            <div className="card-micro-label">LIVE_TICKER_01</div>
            <h3 className="card-title">Activity Flow</h3>
            <div className="activity-chart">
              <div className="chart-placeholder">
                <div className="metric-large">{stats.totalSprints}</div>
                <div className="metric-label">Total Sprints</div>
              </div>
            </div>
            <div className="activity-context">
              Total: {stats.totalSprints} <span className="trend-up">(↑ Last 7 days)</span>
            </div>
          </div>

          {/* Consistency Log */}
          <div className="bento-card consistency-log">
            <div className="card-micro-label">7_DAY_HIST</div>
            <h3 className="card-title">Consistency Log</h3>
            <div className="consistency-chart">
              <div className="bar-chart">
                {getLast7Days().map((day, index) => (
                  <div key={index} className="bar-container">
                    <div 
                      className="bar" 
                      style={{ 
                        height: `${Math.min((day.sprintCount / day.plannedSprints) * 100, 100)}%`,
                        background: day.sprintCount >= day.plannedSprints ? '#3b82f6' : '#ef4444'
                      }}
                    ></div>
                    <div className="bar-label">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Daily Score */}
          <div className="bento-card daily-score">
            <div className="card-micro-label">PERF_INDEX</div>
            <h3 className="card-title">Performance Index</h3>
            <div className="score-gauge">
              <div className="gauge-value">{((stats.avgGrade / 4.3) * 100).toFixed(0)}%</div>
              <div className="gauge-label">Avg Grade: {stats.avgGrade}</div>
            </div>
            <div className="score-context">
              Current Streak: <span className="streak-value">{stats.currentStreak} days</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bento-card quick-stats">
            <div className="card-micro-label">SUMMARY</div>
            <h3 className="card-title">Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{stats.totalTasks}</div>
                <div className="stat-name">Tasks Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{history.length}</div>
                <div className="stat-name">Days Logged</div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action */}
        <button 
          className="primary-action"
          onClick={() => window.location.href = '/app'}
        >
          <span className="action-icon">[ &gt; ]</span>
          <span className="action-text">INITIALIZE NEW SESSION</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;

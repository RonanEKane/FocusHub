import { useState } from 'react';
import './StartDayScreen.css';

const StartDayScreen = ({ onStart }) => {
  const [plannedSprints, setPlannedSprints] = useState(8);
  const [energyLevel, setEnergyLevel] = useState('medium');

  const handleStart = () => {
    onStart(plannedSprints, energyLevel);
  };

  return (
    <div className="start-day-screen">
      <div className="start-day-container">
        <div className="logo">⚡ FocusHub</div>
        <h1 className="start-title">Ready to Win Today?</h1>
        <p className="start-subtitle">Built for Brains That Wander, but Still Want to Win</p>

        <div className="start-form">
          <div className="form-group">
            <label className="form-label">How many sprints are you targeting?</label>
            <input
              type="number"
              min="1"
              max="16"
              value={plannedSprints}
              onChange={(e) => setPlannedSprints(Number(e.target.value))}
              className="input"
            />
            <div className="form-hint">Recommended: 6-10 sprints per day</div>
          </div>

          <div className="form-group">
            <label className="form-label">What's your energy level?</label>
            <div className="energy-options">
              <button
                onClick={() => setEnergyLevel('low')}
                className={`energy-btn ${energyLevel === 'low' ? 'active' : ''}`}
              >
                <div className="energy-emoji">🔋</div>
                <div>LOW</div>
                <div className="energy-desc">15min sprints</div>
              </button>
              <button
                onClick={() => setEnergyLevel('medium')}
                className={`energy-btn ${energyLevel === 'medium' ? 'active' : ''}`}
              >
                <div className="energy-emoji">⚡</div>
                <div>MEDIUM</div>
                <div className="energy-desc">20min sprints</div>
              </button>
              <button
                onClick={() => setEnergyLevel('high')}
                className={`energy-btn ${energyLevel === 'high' ? 'active' : ''}`}
              >
                <div className="energy-emoji">🔥</div>
                <div>HIGH</div>
                <div className="energy-desc">30min sprints</div>
              </button>
            </div>
          </div>

          <button onClick={handleStart} className="btn btn-primary btn-start">
            Start My Day
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartDayScreen;

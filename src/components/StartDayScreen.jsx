import { useState } from 'react';
import './StartDayScreen.css';

const StartDayScreen = ({ onStart }) => {
  const [energyLevel, setEnergyLevel] = useState('medium');
  const [baselineSprints, setBaselineSprints] = useState(5);

  const handleStart = () => {
    // Pass baseline sprints - tasks will add to this
    onStart(baselineSprints, energyLevel);
  };

  return (
    <div className="start-day-screen">
      <div className="start-day-container">
        <div className="logo">⚡ FocusHub</div>
        <h1 className="start-title">Ready to Win Today?</h1>
        <p className="start-subtitle">Built for Brains That Wander, but Still Want to Win</p>

        <div className="start-form">
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
            <div className="form-hint">Your sprint target will adjust based on your task plan</div>
          </div>

          <div className="form-group">
            <label className="form-label">Baseline Sprint Target</label>
            <div className="baseline-input-row">
              <button 
                className="baseline-btn" 
                onClick={() => setBaselineSprints(Math.max(0, baselineSprints - 1))}
              >
                −
              </button>
              <div className="baseline-value">{baselineSprints} sprints</div>
              <button 
                className="baseline-btn" 
                onClick={() => setBaselineSprints(baselineSprints + 1)}
              >
                +
              </button>
            </div>
            <div className="form-hint">Minimum sprints before task weights are added</div>
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

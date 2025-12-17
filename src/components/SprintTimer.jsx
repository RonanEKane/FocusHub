import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './SprintTimer.css';

const SprintTimer = ({ onSprintComplete, onBreakComplete, energyLevel, onTimerStateChange, onMeetingToggle, meetingMinutes }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timerType, setTimerType] = useState('focus');
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [inMeeting, setInMeeting] = useState(false);
  const [meetingStartTime, setMeetingStartTime] = useState(null);

  const durations = {
    low: { focus: 15, break: 5 },
    medium: { focus: 20, break: 5 },
    high: { focus: 30, break: 10 }
  };

  useEffect(() => {
    if (onTimerStateChange) {
      onTimerStateChange({ timeLeft, isRunning, timerType });
    }
  }, [timeLeft, isRunning, timerType, onTimerStateChange]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (timerType === 'focus') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onSprintComplete(selectedDuration);
      
      const breakDuration = durations[energyLevel].break;
      setTimerType('break');
      setTimeLeft(breakDuration * 60);
      setSelectedDuration(breakDuration);
    } else {
      onBreakComplete(selectedDuration);
      setTimerType('focus');
      setTimeLeft(0);
      setSelectedDuration(null);
    }
  };

  const startTimer = (duration) => {
    setTimeLeft(duration * 60);
    setSelectedDuration(duration);
    setIsRunning(true);
    setTimerType('focus');
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resumeTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setTimerType('focus');
    setSelectedDuration(null);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMeetingToggle = () => {
    if (!inMeeting) {
      // Starting meeting
      setInMeeting(true);
      setMeetingStartTime(Date.now());
    } else {
      // Ending meeting
      const duration = Math.floor((Date.now() - meetingStartTime) / 1000 / 60);
      onMeetingToggle(duration);
      setInMeeting(false);
      setMeetingStartTime(null);
    }
  };

  const progress = selectedDuration ? ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100 : 0;

  return (
    <div className="card sprint-timer">
      <div className="card-header">
        <h3 className="card-title">
          {timerType === 'focus' ? '🎯 SPRINT TIMER' : '☕ BREAK TIME'}
        </h3>
        <div className="meeting-toggle">
          <label className="meeting-checkbox">
            <input 
              type="checkbox" 
              checked={inMeeting} 
              onChange={handleMeetingToggle}
            />
            <span>In Meeting?</span>
          </label>
        </div>
      </div>
      
      <div className="card-content">
        {!isRunning && timeLeft === 0 ? (
          <div className="timer-setup">
            <div className="energy-display">
              Energy: <span className={`energy-${energyLevel}`}>{energyLevel.toUpperCase()}</span>
            </div>
            
            <div className="duration-options">
              {Object.entries(durations).map(([level, times]) => (
                <button
                  key={level}
                  onClick={() => startTimer(times.focus)}
                  className={`duration-btn ${energyLevel === level ? 'recommended' : ''}`}
                  disabled={energyLevel !== level}
                >
                  <div className="duration-time">{times.focus} min</div>
                  <div className="duration-label">{level}</div>
                  {energyLevel === level && <div className="recommended-badge">Recommended</div>}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="timer-active">
            <div className="timer-display">
              <div className="timer-time">{formatTime(timeLeft)}</div>
              <div className="timer-progress">
                <div className="progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>
            
            <div className="timer-controls">
              {isRunning ? (
                <button onClick={pauseTimer} className="btn btn-secondary">⏸ Pause</button>
              ) : (
                <button onClick={resumeTimer} className="btn btn-primary">▶️ Resume</button>
              )}
              <button onClick={resetTimer} className="btn btn-danger">🔄 Reset</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SprintTimer;

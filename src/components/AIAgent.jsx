import { useState, useEffect } from 'react';
import './AIAgent.css';

const AIAgent = ({ sprintCount, distractionCount, tasksCompleted, plannedSprints, meetingMinutes }) => {
  const [toughnessLevel, setToughnessLevel] = useState(2);
  const [message, setMessage] = useState('');

  const messages = {
    motivational: [
      "You're doing great! Keep the momentum going.",
      "One sprint at a time. You've got this.",
      "Progress is progress. Stay focused.",
      "Your consistency is paying off.",
      "Keep pushing forward. Every sprint counts."
    ],
    tactical: [
      "Sprint completed. What's your next target?",
      "Focus on high-priority tasks first.",
      "Break large tasks into smaller sprints.",
      "Check your distraction log. Any patterns?",
      "Time for a quick energy check."
    ],
    tough: [
      "Stop reading this. Start your next sprint.",
      "Distractions won't complete themselves. Focus.",
      "Your future self is counting on you. Move.",
      "Less thinking. More doing.",
      "The clock doesn't stop. Neither should you."
    ]
  };

  useEffect(() => {
    generateMessage();
  }, [sprintCount, distractionCount, tasksCompleted, meetingMinutes]);

  const generateMessage = () => {
    const now = new Date();
    const workStart = new Date(now);
    workStart.setHours(9, 0, 0);
    
    const hoursIntoWorkday = Math.max(0, (now - workStart) / (1000 * 60 * 60));
    const meetingHours = meetingMinutes / 60;
    const availableHours = Math.max(0, hoursIntoWorkday - meetingHours);
    
    // Expected sprints based on available work time (not meeting time)
    const expectedSprints = Math.floor((availableHours / 8) * plannedSprints);
    
    let messagePool;
    if (toughnessLevel === 1) {
      messagePool = messages.motivational;
    } else if (toughnessLevel === 2) {
      messagePool = messages.tactical;
    } else {
      messagePool = messages.tough;
    }
    
    // Adjust message based on performance
    if (sprintCount < expectedSprints - 2) {
      if (meetingHours > 2) {
        setMessage(`${sprintCount} sprints done. You've had ${meetingHours.toFixed(1)}h of meetings - that's ${(meetingHours / hoursIntoWorkday * 100).toFixed(0)}% of your day. Time to focus.`);
      } else {
        setMessage(messages.tough[Math.floor(Math.random() * messages.tough.length)]);
      }
    } else {
      setMessage(messagePool[Math.floor(Math.random() * messagePool.length)]);
    }
  };

  return (
    <div className="card ai-agent">
      <div className="card-header">
        <h3 className="card-title">🤖 AI COACH</h3>
        <select 
          value={toughnessLevel} 
          onChange={(e) => setToughnessLevel(Number(e.target.value))}
          className="toughness-selector"
        >
          <option value={1}>💚 Gentle</option>
          <option value={2}>⚡ Tactical</option>
          <option value={3}>🔥 Tough Love</option>
        </select>
      </div>
      
      <div className="card-content">
        <div className="agent-message">{message}</div>
        
        <div className="agent-stats">
          <div className="stat-item">
            <div className="stat-value">{sprintCount}</div>
            <div className="stat-label">Sprints</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{tasksCompleted}</div>
            <div className="stat-label">Tasks</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{distractionCount}</div>
            <div className="stat-label">Distractions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;

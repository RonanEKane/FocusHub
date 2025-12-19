import { useState, useEffect } from 'react';
import './AIAgent.css';

const AIAgent = ({ sprintCount, distractionCount, tasksCompleted, plannedSprints, meetingMinutes }) => {
  const [toughnessLevel, setToughnessLevel] = useState(2); // 1=Supportive, 2=Balanced, 3=Tough
  const [message, setMessage] = useState('');

  // Expanded message pools for variety
  const messagePools = {
    supportive: {
      motivational: [
        "You're doing great! Keep the momentum going.",
        "One sprint at a time. You've got this.",
        "Progress is progress. Stay focused.",
        "Your consistency is paying off.",
        "Keep pushing forward. Every sprint counts."
      ],
      encouragement: [
        "Taking breaks is part of the process.",
        "You're building good habits today.",
        "Every small win adds up over time.",
        "Progress beats perfection."
      ]
    },
    balanced: {
      tactical: [
        "Sprint completed. What's your next target?",
        "Focus on high-priority tasks first.",
        "Check your distraction log. Any patterns?",
        "Time for a quick energy check.",
        "Strategic thinking time - what's most important?"
      ],
      feedback: [
        "Good progress. Stay on track.",
        "You're moving forward. Keep the pace.",
        "Solid work so far. Don't lose momentum.",
        "On the right path. Execute consistently."
      ]
    },
    tough: {
      direct: [
        "Stop reading this. Start your next sprint.",
        "Distractions won't complete themselves. Focus.",
        "The clock doesn't stop. Neither should you.",
        "Less thinking. More doing.",
        "Your future self is counting on you. Move.",
        "Time waits for no one. Get to work.",
        "Enough scrolling. Execute.",
        "Winners are working right now. Join them."
      ],
      performance: [
        "Behind pace. Time to catch up.",
        "You planned better than this. Deliver.",
        "Distractions are winning. You going to allow that?",
        "This isn't a practice run. Make it count.",
        "Meetings don't build products. Focus time does.",
        "You set the target. Now hit it.",
        "Momentum is everything. Don't lose it.",
        "Excellence requires uncomfortable effort."
      ],
      accountability: [
        "You said you'd do 8 sprints. Where are they?",
        "Tasks don't complete themselves.",
        "What's your excuse going to be today?",
        "Someone else is outworking you right now.",
        "You've got time. You're choosing not to use it.",
        "Tomorrow you'll wish you started today.",
        "Comfortable people don't achieve difficult things."
      ]
    }
  };

  useEffect(() => {
    generateMessage();
  }, [sprintCount, distractionCount, tasksCompleted, meetingMinutes, toughnessLevel]);

  const generateMessage = () => {
    const now = new Date();
    const workStart = new Date(now);
    workStart.setHours(9, 0, 0);
    
    const hoursIntoWorkday = Math.max(0, (now - workStart) / (1000 * 60 * 60));
    const meetingHours = meetingMinutes / 60;
    const availableHours = Math.max(0, hoursIntoWorkday - meetingHours);
    
    // Expected sprints based on available work time
    const expectedSprints = Math.floor((availableHours / 8) * plannedSprints);
    
    let pool, category;
    
    if (toughnessLevel === 1) {
      // Supportive mode
      pool = messagePools.supportive;
      category = sprintCount >= expectedSprints ? pool.motivational : pool.encouragement;
    } else if (toughnessLevel === 2) {
      // Balanced mode
      pool = messagePools.balanced;
      category = sprintCount >= expectedSprints ? pool.feedback : pool.tactical;
    } else {
      // Tough mode (3)
      pool = messagePools.tough;
      if (sprintCount < expectedSprints - 2 && expectedSprints > 0) {
        category = pool.performance;
      } else if (distractionCount > sprintCount && distractionCount > 3) {
        category = pool.accountability;
      } else {
        category = pool.direct;
      }
    }
    
    // Meeting-specific override
    if (meetingHours > 2) {
      if (toughnessLevel === 1) {
        setMessage(`You've had ${meetingHours.toFixed(1)}h of meetings today. Time to focus on execution.`);
      } else if (toughnessLevel === 2) {
        setMessage(`${meetingHours.toFixed(1)}h in meetings = ${(meetingHours / hoursIntoWorkday * 100).toFixed(0)}% of your day. Shift to deep work now.`);
      } else {
        setMessage(`${meetingHours.toFixed(1)}h in meetings = ${(meetingHours / hoursIntoWorkday * 100).toFixed(0)}% of your day wasted talking instead of shipping. Get to work.`);
      }
      return;
    }
    
    const randomMessage = category[Math.floor(Math.random() * category.length)];
    setMessage(randomMessage);
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
          <option value={1}>💚 Supportive</option>
          <option value={2}>⚖️ Balanced</option>
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

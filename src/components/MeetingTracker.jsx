import { useState, useEffect } from 'react';
import './MeetingTracker.css';

const MeetingTracker = ({ onMeetingToggle, meetingMinutes }) => {
  const [inMeeting, setInMeeting] = useState(false);
  const [meetingStart, setMeetingStart] = useState(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedInMeeting = localStorage.getItem('focushub_in_meeting');
    const savedStart = localStorage.getItem('focushub_meeting_start');
    
    if (savedInMeeting === 'true' && savedStart) {
      setInMeeting(true);
      setMeetingStart(parseInt(savedStart));
    }
  }, []);

  // Auto-switch to WORKING when sprint/break starts
  useEffect(() => {
    const handleSprintStart = () => {
      if (inMeeting) {
        endMeeting();
      }
    };

    window.addEventListener('sprint-started', handleSprintStart);
    window.addEventListener('break-started', handleSprintStart);

    return () => {
      window.removeEventListener('sprint-started', handleSprintStart);
      window.removeEventListener('break-started', handleSprintStart);
    };
  }, [inMeeting]);

  const endMeeting = () => {
    if (inMeeting) {
      // Calculate duration and report it
      if (meetingStart) {
        const duration = Math.floor((Date.now() - meetingStart) / 1000 / 60);
        if (duration > 0) {
          onMeetingToggle(duration);
        }
      }
      
      setInMeeting(false);
      setMeetingStart(null);
      localStorage.removeItem('focushub_in_meeting');
      localStorage.removeItem('focushub_meeting_start');
    }
  };

  const toggleMeeting = () => {
    if (inMeeting) {
      endMeeting();
    } else {
      // Start meeting
      const now = Date.now();
      setInMeeting(true);
      setMeetingStart(now);
      localStorage.setItem('focushub_in_meeting', 'true');
      localStorage.setItem('focushub_meeting_start', now.toString());
    }
  };

  const getCurrentMeetingDuration = () => {
    if (!inMeeting || !meetingStart) return 0;
    return Math.floor((Date.now() - meetingStart) / 1000 / 60);
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const totalMinutes = meetingMinutes + getCurrentMeetingDuration();
  const totalHours = (totalMinutes / 60).toFixed(1);

  return (
    <div className="meeting-tracker card">
      <div className="card-header">
        <h3 className="card-title">MEETING TRACKER</h3>
        <div className="meeting-total">{totalHours}h today</div>
      </div>
      
      <div className="meeting-content">
        <button 
          className={`meeting-toggle ${inMeeting ? 'active' : ''}`}
          onClick={toggleMeeting}
        >
          <div className="toggle-icon">{inMeeting ? '👔' : '🎯'}</div>
          <div className="toggle-text">
            {inMeeting ? 'IN MEETING' : 'WORKING'}
          </div>
          {inMeeting && (
            <div className="toggle-duration">
              {formatDuration(getCurrentMeetingDuration())}
            </div>
          )}
        </button>

        <div className="meeting-hint">
          {inMeeting 
            ? 'Click to end meeting and return to work'
            : 'Click when entering a meeting'}
        </div>

        {totalMinutes > 0 && (
          <div className="meeting-summary">
            <div className="summary-label">Total Meeting Time Today:</div>
            <div className="summary-value">{formatDuration(totalMinutes)}</div>
          </div>
        )}

        <div className="meeting-info">
          <div className="info-icon">ℹ️</div>
          <div className="info-text">
            AI adjusts sprint expectations based on meeting time
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingTracker;

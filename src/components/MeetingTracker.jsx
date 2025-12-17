import { useState, useEffect } from 'react';
import './MeetingTracker.css';

const MeetingTracker = ({ onMeetingToggle, meetingMinutes }) => {
  const [inMeeting, setInMeeting] = useState(false);
  const [meetingStartTime, setMeetingStartTime] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('focushub_in_meeting');
    if (saved === 'true') {
      setInMeeting(true);
      const startTime = localStorage.getItem('focushub_meeting_start');
      if (startTime) {
        setMeetingStartTime(parseInt(startTime));
      }
    }
  }, []);

  useEffect(() => {
    // Auto-switch off when sprint starts
    const handleSprintStart = () => {
      if (inMeeting) {
        toggleMeeting();
      }
    };

    window.addEventListener('sprint-started', handleSprintStart);
    return () => window.removeEventListener('sprint-started', handleSprintStart);
  }, [inMeeting]);

  useEffect(() => {
    let interval;
    if (inMeeting && meetingStartTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - meetingStartTime) / 1000 / 60);
        // This will trigger parent to update meetingMinutes
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [inMeeting, meetingStartTime]);

  const toggleMeeting = () => {
    if (!inMeeting) {
      // Starting meeting
      const now = Date.now();
      setInMeeting(true);
      setMeetingStartTime(now);
      localStorage.setItem('focushub_in_meeting', 'true');
      localStorage.setItem('focushub_meeting_start', now.toString());
    } else {
      // Ending meeting
      const elapsed = Math.floor((Date.now() - meetingStartTime) / 1000 / 60);
      onMeetingToggle(elapsed);
      setInMeeting(false);
      setMeetingStartTime(null);
      localStorage.removeItem('focushub_in_meeting');
      localStorage.removeItem('focushub_meeting_start');
    }
  };

  const getCurrentMeetingDuration = () => {
    if (!inMeeting || !meetingStartTime) return 0;
    return Math.floor((Date.now() - meetingStartTime) / 1000 / 60);
  };

  return (
    <div className="card meeting-tracker">
      <div className="card-header">
        <h3 className="card-title">📅 MEETING TRACKER</h3>
      </div>
      
      <div className="card-content">
        <div className="meeting-status">
          <div className={`status-indicator ${inMeeting ? 'in-meeting' : 'working'}`}>
            {inMeeting ? '🔴 IN MEETING' : '🟢 WORKING'}
          </div>
          
          {inMeeting && (
            <div className="current-meeting-time">
              Current: {getCurrentMeetingDuration()} min
            </div>
          )}
        </div>

        <button 
          onClick={toggleMeeting}
          className={`btn btn-meeting ${inMeeting ? 'end-meeting' : 'start-meeting'}`}
        >
          {inMeeting ? 'End Meeting' : 'Start Meeting'}
        </button>

        <div className="meeting-total">
          Total Today: <span className="total-time">{meetingMinutes} min</span>
          {meetingMinutes > 0 && (
            <span className="total-hours"> ({(meetingMinutes / 60).toFixed(1)}h)</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingTracker;

import { useState, useEffect } from 'react';
import SprintTimer from './components/SprintTimer';
import TaskManager from './components/TaskManager';
import MeetingTracker from './components/MeetingTracker';
import AIAgent from './components/AIAgent';
import DistractionLogger from './components/DistractionLogger';
import EndOfDayModal from './components/EndOfDayModal';
import MorningReflection from './components/MorningReflection';
import GradeTracker from './components/GradeTracker';
import ReflectionInsights from './components/ReflectionInsights';
import StartDayScreen from './components/StartDayScreen';
import { initializeFirebase } from './firebase/config';

function App() {
  const [sprintCount, setSprintCount] = useState(0);
  const [distractionCount, setDistractionCount] = useState(0);
  const [meetingMinutes, setMeetingMinutes] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [plannedSprints, setPlannedSprints] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [showEndOfDay, setShowEndOfDay] = useState(false);
  const [energyLevel, setEnergyLevel] = useState('medium');
  const [theme, setTheme] = useState('dark');
  const [showMorningReflection, setShowMorningReflection] = useState(false);
  const [sprintStreak, setSprintStreak] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTimerState, setCurrentTimerState] = useState({ timeLeft: 0, isRunning: false, timerType: 'focus' });
  const [milestoneMessage, setMilestoneMessage] = useState(null);
  const [showMilestone, setShowMilestone] = useState(false);
  const [dayEnded, setDayEnded] = useState(false);
  const [currentSessionDate, setCurrentSessionDate] = useState(null);
  const [sessionState, setSessionState] = useState('not_started');

  useEffect(() => {
    initializeFirebase();
    
    const savedTheme = localStorage.getItem('focushub_theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const today = new Date().toDateString();
    
    const savedSessionState = localStorage.getItem('focushub_session_state');
    const lastSessionDate = localStorage.getItem('focushub_session_date');
    
    if (lastSessionDate !== today) {
      setSessionState('not_started');
      localStorage.setItem('focushub_session_state', 'not_started');
      localStorage.setItem('focushub_session_date', today);
      setCurrentSessionDate(today);
      setDayEnded(false);
    } else {
      setSessionState(savedSessionState || 'not_started');
      setCurrentSessionDate(lastSessionDate);
      if (savedSessionState === 'ended') {
        setDayEnded(true);
      }
    }

    const savedStats = localStorage.getItem('focushub_daily_stats');
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      if (stats.date === today) {
        setSprintCount(stats.sprintCount || 0);
        setDistractionCount(stats.distractionCount || 0);
        setMeetingMinutes(stats.meetingMinutes || 0);
        setTasksCompleted(stats.tasksCompleted || 0);
        setBreakMinutes(stats.breakMinutes || 0);
        setPlannedSprints(stats.plannedSprints || 0);
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FIX: Daily reset for wins and persistent data
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('focushub_last_date');
    
    if (lastDate !== today) {
      // New day detected - reset wins but keep other data
      const tasks = JSON.parse(localStorage.getItem('focushub_tasks') || '{}');
      if (tasks.wins && tasks.wins.length > 0) {
        tasks.wins = [];
        localStorage.setItem('focushub_tasks', JSON.stringify(tasks));
      }
      
      localStorage.setItem('focushub_last_date', today);
      
      // Reset daily stats
      localStorage.setItem('focushub_daily_stats', JSON.stringify({
        sprintCount: 0,
        distractionCount: 0,
        tasksCompleted: 0,
        breakMinutes: 0,
        meetingMinutes: 0,
        plannedSprints: 0,
        date: today
      }));
    }
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const stats = {
      sprintCount,
      distractionCount,
      meetingMinutes,
      tasksCompleted,
      breakMinutes,
      plannedSprints,
      date: today
    };
    localStorage.setItem('focushub_daily_stats', JSON.stringify(stats));
  }, [sprintCount, distractionCount, meetingMinutes, tasksCompleted, breakMinutes, plannedSprints]);

  const handleSprintComplete = (duration) => {
    setSprintCount(prev => prev + 1);
    setSprintStreak(prev => prev + 1);
    
    const milestones = [3, 5, 8, 10, 12, 15];
    if (milestones.includes(sprintCount + 1)) {
      setMilestoneMessage(`🎯 ${sprintCount + 1} sprints! You're crushing it!`);
      setShowMilestone(true);
      setTimeout(() => setShowMilestone(false), 3000);
    }
  };

  const handleBreakComplete = (duration) => {
    setBreakMinutes(prev => prev + duration);
  };

  const handleTaskComplete = () => {
    setTasksCompleted(prev => prev + 1);
  };

  const handleDistraction = () => {
    setDistractionCount(prev => prev + 1);
    setSprintStreak(0);
  };

  const handleMeetingToggle = (minutes) => {
    setMeetingMinutes(prev => prev + minutes);
  };

  const handleEndDay = () => {
    setShowEndOfDay(true);
  };

  const handleEndOfDayClose = () => {
    setShowEndOfDay(false);
    setSessionState('ended');
    setDayEnded(true);
    localStorage.setItem('focushub_session_state', 'ended');
  };

  const handleStartDay = (plannedCount, energy) => {
    setPlannedSprints(plannedCount);
    setEnergyLevel(energy);
    setSessionState('active');
    localStorage.setItem('focushub_session_state', 'active');
    
    const shouldShowMorning = !localStorage.getItem('focushub_morning_reflection_done');
    if (shouldShowMorning) {
      setShowMorningReflection(true);
    }
  };

  const handleMorningReflectionClose = () => {
    setShowMorningReflection(false);
    localStorage.setItem('focushub_morning_reflection_done', 'true');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('focushub_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (sessionState === 'not_started') {
    return <StartDayScreen onStart={handleStartDay} />;
  }

  if (dayEnded) {
    return (
      <div className="day-ended-screen">
        <div className="day-ended-content">
          <h1>📊 Day Complete</h1>
          <p>Your workday has ended. See you tomorrow!</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Refresh (for testing)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="app-title">
          <span>⚡</span> FocusHub
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={handleEndDay} className="btn btn-secondary">
            End Day
          </button>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {showMilestone && (
        <div className="milestone-banner">
          {milestoneMessage}
        </div>
      )}

      <div className="app-container">
        <div className="app-grid">
          <div>
            <SprintTimer
              onSprintComplete={handleSprintComplete}
              onBreakComplete={handleBreakComplete}
              energyLevel={energyLevel}
              onTimerStateChange={setCurrentTimerState}
            />
            <TaskManager onTaskComplete={handleTaskComplete} />
          </div>

          <div>
            <MeetingTracker 
              onMeetingToggle={handleMeetingToggle}
              meetingMinutes={meetingMinutes}
            />
            <AIAgent
              sprintCount={sprintCount}
              distractionCount={distractionCount}
              tasksCompleted={tasksCompleted}
              plannedSprints={plannedSprints}
              meetingMinutes={meetingMinutes}
            />
            <DistractionLogger onDistraction={handleDistraction} />
          </div>

          <div>
            <GradeTracker
              sprintCount={sprintCount}
              plannedSprints={plannedSprints}
              distractionCount={distractionCount}
              tasksCompleted={tasksCompleted}
            />
            <ReflectionInsights />
          </div>
        </div>
      </div>

      {showEndOfDay && (
        <EndOfDayModal
          sprintCount={sprintCount}
          plannedSprints={plannedSprints}
          distractionCount={distractionCount}
          tasksCompleted={tasksCompleted}
          breakMinutes={breakMinutes}
          meetingMinutes={meetingMinutes}
          onClose={handleEndOfDayClose}
        />
      )}

      {showMorningReflection && (
        <MorningReflection onClose={handleMorningReflectionClose} />
      )}
    </div>
  );
}

export default App;

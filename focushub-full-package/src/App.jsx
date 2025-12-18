import { useState, useEffect } from 'react';
import SprintTimer from './components/SprintTimer';
import TaskManager from './components/TaskManager';
import AIAgent from './components/AIAgent';
import DistractionLogger from './components/DistractionLogger';
import EndOfDayModal from './components/EndOfDayModal';
import MorningReflection from './components/MorningReflection';
import GradeTracker from './components/GradeTracker';
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
  const [currentTimerState, setCurrentTimerState] = useState({ timeLeft: 0, isRunning: false, timerType: 'focus' });
  const [dayEnded, setDayEnded] = useState(false);
  const [sessionState, setSessionState] = useState('not_started');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      console.log('App initializing...');
      initializeFirebase();
      
      const savedTheme = localStorage.getItem('focushub_theme') || 'dark';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);

      const today = new Date().toDateString();
      
      // Check session state
      const savedSessionState = localStorage.getItem('focushub_session_state');
      const lastSessionDate = localStorage.getItem('focushub_session_date');
      
      console.log('Session state:', savedSessionState, 'Date:', lastSessionDate);
      
      if (lastSessionDate !== today) {
        // New day - reset session
        setSessionState('not_started');
        localStorage.setItem('focushub_session_state', 'not_started');
        localStorage.setItem('focushub_session_date', today);
        setDayEnded(false);
      } else {
        setSessionState(savedSessionState || 'not_started');
        if (savedSessionState === 'ended') {
          setDayEnded(true);
        }
      }

      // Load daily stats
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
    } catch (err) {
      console.error('App initialization error:', err);
      setError(err.message);
    }
  }, []);

  // Separate effect for scroll listener with proper cleanup
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.app-header');
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // FIX: Daily reset for wins
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('focushub_last_date');
    
    if (lastDate !== today) {
      // New day detected - reset wins only
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

  // Save daily stats
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
  };

  const handleBreakComplete = (duration) => {
    setBreakMinutes(prev => prev + duration);
  };

  const handleTaskComplete = () => {
    setTasksCompleted(prev => prev + 1);
  };

  const handlePlannedSprintsChange = (newPlannedSprints) => {
    setPlannedSprints(newPlannedSprints);
  };

  const handleDistraction = () => {
    setDistractionCount(prev => prev + 1);
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
    try {
      console.log('Starting day:', plannedCount, energy);
      setPlannedSprints(plannedCount);
      setEnergyLevel(energy);
      setSessionState('active');
      localStorage.setItem('focushub_session_state', 'active');
      
      const shouldShowMorning = !localStorage.getItem('focushub_morning_reflection_done');
      if (shouldShowMorning) {
        setShowMorningReflection(true);
      }
      console.log('Day started successfully, session state:', 'active');
    } catch (err) {
      console.error('Error starting day:', err);
      setError(err.message);
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

  if (error) {
    return (
      <div style={{background: '#0a0e14', color: '#e0e0e0', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
        <div>
          <h1 style={{color: '#e3302f'}}>Error</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} style={{marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#2563EB', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>
            Reload
          </button>
        </div>
      </div>
    );
  }

  console.log('Render - sessionState:', sessionState, 'dayEnded:', dayEnded);

  if (sessionState === 'not_started') {
    console.log('Rendering StartDayScreen');
    return <StartDayScreen onStart={handleStartDay} />;
  }

  if (dayEnded) {
    console.log('Rendering day ended screen');
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

  console.log('Rendering main app, energyLevel:', energyLevel, 'plannedSprints:', plannedSprints);

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo-section">
          <img 
            src={theme === 'dark' ? '/logo.svg' : '/FocusHub_horinorm.svg'} 
            alt="FocusHub" 
            className="logo"
          />
          <p className="tagline">Built for Brains That Wander, but Still Want to Win</p>
        </div>
        
        <div className="header-controls">
          <a href="/index.html" className="btn-home">🏠 Home</a>
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={handleEndDay} className="btn-end-day">
            END DAY
          </button>
        </div>
      </header>

      <div className="app-container">
        <div className="main-content">
          <SprintTimer
            onSprintComplete={handleSprintComplete}
            onBreakComplete={handleBreakComplete}
            energyLevel={energyLevel}
            onTimerStateChange={setCurrentTimerState}
            onMeetingToggle={handleMeetingToggle}
            meetingMinutes={meetingMinutes}
          />
          
          <TaskManager 
            onTaskComplete={handleTaskComplete}
            onPlannedSprintsChange={handlePlannedSprintsChange}
          />
          
          <DistractionLogger onDistraction={handleDistraction} />
          
          <GradeTracker
            sprintCount={sprintCount}
            plannedSprints={plannedSprints}
            distractionCount={distractionCount}
            tasksCompleted={tasksCompleted}
          />
        </div>

        <div className="sidebar-sticky">
          <AIAgent
            sprintCount={sprintCount}
            distractionCount={distractionCount}
            tasksCompleted={tasksCompleted}
            energyLevel={energyLevel}
            plannedSprints={plannedSprints}
            meetingMinutes={meetingMinutes}
          />
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

      <footer className="app-footer">
        <a href="/index.html">Home</a>
        <span className="footer-separator">|</span>
        <a href="/faq.html">FAQ & Support</a>
        <span className="footer-separator">|</span>
        <a href="/how-to.html">How-To Guide</a>
      </footer>
    </div>
  );
}

export default App;

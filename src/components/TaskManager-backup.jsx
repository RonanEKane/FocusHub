import { useState, useEffect } from 'react';
import './TaskManager.css';

// Task weights for calculating sprint values
const TASK_WEIGHTS = {
  strategic: 3,   // Strategic tasks worth 3 sprints
  deepwork: 2,    // Deep work tasks worth 2 sprints
  urgent: 1,      // Urgent tasks worth 1 sprint
  holding: 0      // Holding area tasks not counted
};

const TaskManager = ({ onTaskComplete, onPlannedSprintsChange }) => {
  const [tasks, setTasks] = useState({ 
    holding: [],
    urgent: [], 
    deepwork: [], 
    strategic: [], 
    wins: [] 
  });
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('focushub_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('focushub_tasks', JSON.stringify(tasks));
    
    // Auto-calculate planned sprints based on weighted tasks
    const plannedSprints = calculatePlannedSprints();
    if (onPlannedSprintsChange) {
      onPlannedSprintsChange(plannedSprints);
    }
  }, [tasks, onPlannedSprintsChange]);

  const calculatePlannedSprints = () => {
    let total = 0;
    total += tasks.urgent.length * TASK_WEIGHTS.urgent;
    total += tasks.deepwork.length * TASK_WEIGHTS.deepwork;
    total += tasks.strategic.length * TASK_WEIGHTS.strategic;
    return total;
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => ({
      ...prev,
      holding: [...prev.holding, task]
    }));
    
    setNewTask('');
  };

  const handleDragStart = (e, category, taskId) => {
    setDraggedTask({ category, taskId });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    
    if (!draggedTask) return;
    
    const { category: sourceCategory, taskId } = draggedTask;
    
    if (sourceCategory === targetCategory) {
      setDraggedTask(null);
      return;
    }

    const task = tasks[sourceCategory].find(t => t.id === taskId);
    if (!task) {
      setDraggedTask(null);
      return;
    }
    
    setTasks(prev => ({
      ...prev,
      [sourceCategory]: prev[sourceCategory].filter(t => t.id !== taskId),
      [targetCategory]: [...prev[targetCategory], task]
    }));
    
    setDraggedTask(null);
  };

  const completeTask = (category, taskId) => {
    const task = tasks[category].find(t => t.id === taskId);
    if (!task) return;
    
    setTasks(prev => ({
      ...prev,
      [category]: prev[category].filter(t => t.id !== taskId),
      wins: [...prev.wins, { ...task, completedAt: new Date().toISOString() }]
    }));
    
    onTaskComplete();
  };

  const deleteTask = (category, taskId) => {
    setTasks(prev => ({
      ...prev,
      [category]: prev[category].filter(t => t.id !== taskId)
    }));
  };

  const renderTaskList = (category, title, color, icon) => (
    <div 
      className={`task-bucket ${color}`}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, category)}
    >
      <div className="bucket-header">
        <span className="bucket-icon">{icon}</span>
        <h3>{title}</h3>
        <span className="task-count">{tasks[category].length}</span>
      </div>
      <div className="task-list">
        {tasks[category].map(task => (
          <div
            key={task.id}
            className="task-item"
            draggable
            onDragStart={(e) => handleDragStart(e, category, task.id)}
          >
            <input
              type="checkbox"
              className="task-checkbox"
              onChange={() => completeTask(category, task.id)}
            />
            <span className="task-text">{task.text}</span>
            <button
              className="task-delete"
              onClick={() => deleteTask(category, task.id)}
              title="Delete task"
            >
              ×
            </button>
          </div>
        ))}
        {tasks[category].length === 0 && (
          <div className="empty-state">Drag tasks here</div>
        )}
      </div>
    </div>
  );

  const plannedSprints = calculatePlannedSprints();

  return (
    <div className="task-manager card">
      <div className="task-header">
        <h2>⚡ TASK COMMAND CENTER</h2>
        <div className="sprint-target">
          Target: <strong>{plannedSprints}</strong> sprints
        </div>
      </div>

      {/* Brain Dump */}
      <div 
        className="brain-dump"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'holding')}
      >
        <label>🧠 BRAIN DUMP</label>
        <div className="input-row">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Type anything on your mind..."
            className="task-input"
          />
          <button onClick={addTask} className="btn btn-primary">
            Add Task
          </button>
        </div>
        
        {tasks.holding.length > 0 && (
          <div className="holding-area">
            <div className="holding-header">
              <span>📋 HOLDING AREA</span>
              <span className="task-count">{tasks.holding.length}</span>
            </div>
            <div className="task-list">
              {tasks.holding.map(task => (
                <div
                  key={task.id}
                  className="task-item"
                  draggable
                  onDragStart={(e) => handleDragStart(e, 'holding', task.id)}
                >
                  <span className="drag-handle">⋮⋮</span>
                  <span className="task-text">{task.text}</span>
                  <button
                    className="task-delete"
                    onClick={() => deleteTask('holding', task.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Task Buckets */}
      <div className="task-buckets">
        {renderTaskList('urgent', 'URGENT', 'red', '🔥')}
        {renderTaskList('deepwork', 'DEEP WORK', 'blue', '🎯')}
        {renderTaskList('strategic', 'STRATEGIC', 'purple', '♟️')}
      </div>

      {/* Today's Wins */}
      {showCompleted && tasks.wins.length > 0 && (
        <div className="wins-section card-subtle">
          <div className="wins-header">
            <h3>✅ TODAY'S WINS</h3>
            <button
              className="toggle-btn"
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {showCompleted ? 'Hide' : 'Show'}
            </button>
          </div>
          <div className="wins-list">
            {tasks.wins.map((task, index) => (
              <div key={task.id || index} className="win-item">
                <span className="win-check">✓</span>
                <span className="win-text">{task.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="task-weights-legend">
        <small>
          <strong>Sprint Values:</strong> Strategic (3) · Deep Work (2) · Urgent (1)
        </small>
      </div>
    </div>
  );
};

export default TaskManager;

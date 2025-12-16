import { useState, useEffect } from 'react';
import './TaskManager.css';

const TaskManager = ({ onTaskComplete }) => {
  const [tasks, setTasks] = useState({ high: [], medium: [], low: [], wins: [] });
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('focushub_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('focushub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (priority) => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => ({
      ...prev,
      [priority]: [...prev[priority], task]
    }));
    
    setNewTask('');
  };

  const completeTask = (priority, taskId) => {
    const task = tasks[priority].find(t => t.id === taskId);
    if (!task) return;
    
    setTasks(prev => ({
      ...prev,
      [priority]: prev[priority].filter(t => t.id !== taskId),
      wins: [...prev.wins, { ...task, completedAt: new Date().toISOString() }]
    }));
    
    onTaskComplete();
  };

  const deleteTask = (priority, taskId) => {
    setTasks(prev => ({
      ...prev,
      [priority]: prev[priority].filter(t => t.id !== taskId)
    }));
  };

  const priorities = [
    { key: 'high', label: '🔥 HIGH', color: '#ef4444' },
    { key: 'medium', label: '⚡ MEDIUM', color: '#f59e0b' },
    { key: 'low', label: '💼 LOW', color: '#3b82f6' }
  ];

  return (
    <div className="card task-manager">
      <div className="card-header">
        <h3 className="card-title">📋 TASK PRIORITIES</h3>
      </div>
      
      <div className="card-content">
        <div className="task-input-section">
          <input
            type="text"
            className="input"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask('medium')}
          />
          <div className="priority-buttons">
            {priorities.map(p => (
              <button
                key={p.key}
                onClick={() => addTask(p.key)}
                className="btn btn-secondary"
                style={{ borderColor: p.color, color: p.color }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="priority-columns">
          {priorities.map(p => (
            <div key={p.key} className="priority-column">
              <div className="priority-header" style={{ borderColor: p.color }}>
                <span>{p.label}</span>
                <span className="task-count">{tasks[p.key].length}</span>
              </div>
              <div className="task-list">
                {tasks[p.key].map(task => (
                  <div key={task.id} className="task-item">
                    <div className="task-text">{task.text}</div>
                    <div className="task-actions">
                      <button onClick={() => completeTask(p.key, task.id)} className="task-btn complete">✓</button>
                      <button onClick={() => deleteTask(p.key, task.id)} className="task-btn delete">✕</button>
                    </div>
                  </div>
                ))}
                {tasks[p.key].length === 0 && (
                  <div className="empty-state-small">No tasks</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showCompleted && tasks.wins.length > 0 && (
          <div className="wins-section">
            <div className="wins-header">
              <span>🎉 Done Today (Your Wins)</span>
              <button onClick={() => setShowCompleted(!showCompleted)} className="btn-text">Hide</button>
            </div>
            <div className="wins-list">
              {tasks.wins.map(task => (
                <div key={task.id} className="win-item">
                  <span className={`win-priority priority-${task.priority}`}>
                    {priorities.find(p => p.key === task.priority)?.label.split(' ')[0]}
                  </span>
                  <span className="win-text">{task.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;

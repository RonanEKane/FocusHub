import { useState, useEffect } from 'react';
import './TaskManager.css';

const TaskManager = ({ onTaskComplete }) => {
  const [tasks, setTasks] = useState({ 
    holding: [],
    urgent: [], 
    deepwork: [], 
    strategic: [], 
    wins: [] 
  });
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

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task = {
      id: Date.now(),
      text: newTask,
      sprints: 0,
      createdAt: new Date().toISOString()
    };
    
    setTasks(prev => ({
      ...prev,
      holding: [...prev.holding, task]
    }));
    
    setNewTask('');
  };

  const moveTask = (from, to, taskId) => {
    const task = tasks[from].find(t => t.id === taskId);
    if (!task) return;
    
    setTasks(prev => ({
      ...prev,
      [from]: prev[from].filter(t => t.id !== taskId),
      [to]: [...prev[to], task]
    }));
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

  const updateSprints = (category, taskId, delta) => {
    setTasks(prev => ({
      ...prev,
      [category]: prev[category].map(t => 
        t.id === taskId ? { ...t, sprints: Math.max(0, (t.sprints || 0) + delta) } : t
      )
    }));
  };

  const categories = [
    { key: 'urgent', label: '🔥 URGENT', color: '#F45B07' },
    { key: 'deepwork', label: '🎯 DEEP WORK', color: '#2563EB' },
    { key: 'strategic', label: '💼 STRATEGIC', color: '#22C55E' }
  ];

  return (
    <div className="card task-manager">
      <div className="card-header">
        <h3 className="card-title">📋 TASK COMMAND CENTER</h3>
      </div>
      
      <div className="card-content">
        {/* Brain Dump Section */}
        <div className="brain-dump-section">
          <div className="section-label">BRAIN DUMP</div>
          <input
            type="text"
            className="input"
            placeholder="Dump that task here..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
            ADD TO HOLDING
          </button>
        </div>

        {/* Holding Area */}
        {tasks.holding.length > 0 && (
          <div className="holding-area">
            <div className="section-label">📦 HOLDING AREA</div>
            <div className="task-list">
              {tasks.holding.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-content">
                    <div className="task-text">{task.text}</div>
                    <div className="task-actions">
                      {categories.map(cat => (
                        <button
                          key={cat.key}
                          onClick={() => moveTask('holding', cat.key, task.id)}
                          className="task-move-btn"
                          style={{ borderColor: cat.color, color: cat.color }}
                          title={`Move to ${cat.label}`}
                        >
                          {cat.label.split(' ')[0]}
                        </button>
                      ))}
                      <button onClick={() => deleteTask('holding', task.id)} className="task-delete">✕</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Priority Columns */}
        <div className="task-categories">
          {categories.map(cat => (
            <div key={cat.key} className="task-category" style={{ borderLeftColor: cat.color }}>
              <div className="category-header">
                <span>{cat.label}</span>
                <span className="category-count">{tasks[cat.key].length}</span>
              </div>
              <div className="task-list">
                {tasks[cat.key].map(task => (
                  <div key={task.id} className="task-item">
                    <div className="task-content">
                      <div className="task-text">{task.text}</div>
                      <div className="task-actions-row">
                        {/* Sprint Counter with Arrows */}
                        <div className="sprint-counter">
                          <button 
                            className="sprint-arrow" 
                            onClick={() => updateSprints(cat.key, task.id, -1)}
                          >
                            ▼
                          </button>
                          <span className="sprint-count">{task.sprints || 0}</span>
                          <button 
                            className="sprint-arrow" 
                            onClick={() => updateSprints(cat.key, task.id, 1)}
                          >
                            ▲
                          </button>
                        </div>
                        <button onClick={() => completeTask(cat.key, task.id)} className="task-complete-btn">✓</button>
                        <button onClick={() => deleteTask(cat.key, task.id)} className="task-delete">✕</button>
                      </div>
                    </div>
                  </div>
                ))}
                {tasks[cat.key].length === 0 && (
                  <div className="empty-state-small">No tasks</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Today's Wins */}
        {showCompleted && tasks.wins.length > 0 && (
          <div className="wins-section">
            <div className="wins-header">
              <span>🎉 TODAY'S WINS</span>
              <button onClick={() => setShowCompleted(!showCompleted)} className="btn-text">Hide</button>
            </div>
            <div className="wins-list">
              {tasks.wins.map(task => (
                <div key={task.id} className="win-item">
                  <span className="win-text">{task.text}</span>
                  {task.sprints > 0 && <span className="win-sprints">{task.sprints} sprints</span>}
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

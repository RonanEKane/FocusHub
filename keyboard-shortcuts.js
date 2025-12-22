// ============================================
// KEYBOARD SHORTCUTS
// Power user productivity shortcuts
// ============================================

const KeyboardShortcuts = {
    shortcuts: {
        // Task Management
        'ctrl+n': { action: 'newTask', description: 'Add new task' },
        'ctrl+shift+n': { action: 'newTaskUrgent', description: 'Add urgent task' },
        
        // Sprint Timer
        'ctrl+s': { action: 'startSprint', description: 'Start sprint timer' },
        'space': { action: 'pauseResume', description: 'Pause/Resume timer' },
        'ctrl+shift+s': { action: 'stopTimer', description: 'Stop timer' },
        
        // Distractions
        'd': { action: 'logDistraction', description: 'Log distraction' },
        
        // Navigation
        'ctrl+h': { action: 'goHome', description: 'Go to dashboard' },
        'ctrl+shift+a': { action: 'goAdmin', description: 'Go to admin (if admin)' },
        
        // Help
        'ctrl+/': { action: 'showHelp', description: 'Show keyboard shortcuts' },
        '?': { action: 'showHelp', description: 'Show keyboard shortcuts' }
    },
    
    // Initialize keyboard shortcuts
    init() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in inputs
            if (e.target.tagName === 'INPUT' || 
                e.target.tagName === 'TEXTAREA' || 
                e.target.isContentEditable) {
                return;
            }
            
            const key = this.getKeyCombo(e);
            const shortcut = this.shortcuts[key];
            
            if (shortcut) {
                e.preventDefault();
                this.executeAction(shortcut.action);
            }
        });
        
        console.log('Keyboard shortcuts initialized');
    },
    
    // Get key combination string
    getKeyCombo(e) {
        let combo = '';
        
        if (e.ctrlKey || e.metaKey) combo += 'ctrl+';
        if (e.shiftKey) combo += 'shift+';
        if (e.altKey) combo += 'alt+';
        
        combo += e.key.toLowerCase();
        
        return combo;
    },
    
    // Execute shortcut action
    executeAction(action) {
        const actions = {
            // Task actions
            newTask: () => {
                const taskInput = document.getElementById('newTaskText');
                if (taskInput) {
                    taskInput.focus();
                    taskInput.select();
                }
            },
            
            newTaskUrgent: () => {
                const taskInput = document.getElementById('newTaskText');
                const bucketSelect = document.getElementById('taskBucket');
                if (taskInput && bucketSelect) {
                    bucketSelect.value = 'urgent';
                    taskInput.focus();
                    taskInput.select();
                }
            },
            
            // Timer actions
            startSprint: () => {
                const timerButtons = document.querySelectorAll('.duration-btn');
                if (timerButtons.length > 0) {
                    // Click the 25-minute button (typically first)
                    timerButtons[0].click();
                }
            },
            
            pauseResume: () => {
                const pauseBtn = document.getElementById('pauseBtn');
                const resumeBtn = document.getElementById('resumeBtn');
                
                if (pauseBtn && !pauseBtn.classList.contains('hidden')) {
                    pauseBtn.click();
                } else if (resumeBtn && !resumeBtn.classList.contains('hidden')) {
                    resumeBtn.click();
                }
            },
            
            stopTimer: () => {
                const skipBtn = document.getElementById('skipBtn');
                if (skipBtn && !skipBtn.classList.contains('hidden')) {
                    if (confirm('Stop the current sprint?')) {
                        skipBtn.click();
                    }
                }
            },
            
            // Distraction
            logDistraction: () => {
                const distractionInput = document.getElementById('distractionText');
                if (distractionInput) {
                    distractionInput.focus();
                }
            },
            
            // Navigation
            goHome: () => {
                if (window.location.pathname !== '/dashboard.html') {
                    window.location.href = 'dashboard.html';
                }
            },
            
            goAdmin: () => {
                if (window.currentUserProfile?.plan === 'admin') {
                    window.location.href = 'settings.html';
                }
            },
            
            // Help
            showHelp: () => {
                this.showShortcutsModal();
            }
        };
        
        const fn = actions[action];
        if (fn) {
            fn();
        }
    },
    
    // Show shortcuts help modal
    showShortcutsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <h2>⌨️ Keyboard Shortcuts</h2>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div style="display: grid; gap: 1rem;">
                        <div>
                            <h3 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 0.5rem;">TASKS</h3>
                            <div class="shortcut-list">
                                <div class="shortcut-item">
                                    <kbd>Ctrl + N</kbd>
                                    <span>Add new task</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Ctrl + Shift + N</kbd>
                                    <span>Add urgent task</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 0.5rem;">TIMER</h3>
                            <div class="shortcut-list">
                                <div class="shortcut-item">
                                    <kbd>Ctrl + S</kbd>
                                    <span>Start sprint</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Space</kbd>
                                    <span>Pause/Resume</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>Ctrl + Shift + S</kbd>
                                    <span>Stop timer</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h3 style="font-size: 14px; color: var(--text-secondary); margin-bottom: 0.5rem;">NAVIGATION</h3>
                            <div class="shortcut-list">
                                <div class="shortcut-item">
                                    <kbd>Ctrl + H</kbd>
                                    <span>Go to dashboard</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>D</kbd>
                                    <span>Log distraction</span>
                                </div>
                                <div class="shortcut-item">
                                    <kbd>?</kbd>
                                    <span>Show this help</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-primary">Got it</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
};

// Auto-initialize on page load
if (typeof window !== 'undefined') {
    window.KeyboardShortcuts = KeyboardShortcuts;
    
    window.addEventListener('load', () => {
        KeyboardShortcuts.init();
    });
}

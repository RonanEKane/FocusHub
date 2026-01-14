// FocusHub Keyboard Shortcuts (Premium Feature)
// Check if user has premium access before enabling

let shortcutsEnabled = false;

// Check premium status and enable shortcuts
async function initializeKeyboardShortcuts() {
    // Check if user is premium/beta
    try {
        const isPremium = await isPremiumUser();
        if (isPremium) {
            shortcutsEnabled = true;
            console.log('✅ Keyboard shortcuts enabled (Premium)');
            showShortcutsHint();
        } else {
            console.log('🔒 Keyboard shortcuts disabled (Premium only)');
        }
    } catch (err) {
        console.log('Could not check premium status for keyboard shortcuts');
    }
}

// Show hint that shortcuts are available
function showShortcutsHint() {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--industrial-orange);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    hint.innerHTML = '⌨️ Keyboard shortcuts enabled! Press <strong>?</strong> to see all';
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => hint.remove(), 300);
    }, 4000);
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeKeyboardShortcuts();
    
    document.addEventListener('keydown', function(e) {
        // Ignore if typing in input field
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Exit if shortcuts not enabled (not premium)
        if (!shortcutsEnabled) {
            return;
        }
        
        // ? - Show shortcuts help
        if (e.key === '?' && !e.shiftKey) {
            showShortcutsHelp();
            e.preventDefault();
            return;
        }
        
        // Space - Start/Pause sprint timer
        if (e.key === ' ' || e.code === 'Space') {
            const startBtn = document.getElementById('startBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            if (startBtn && !startBtn.classList.contains('hidden')) {
                startBtn.click();
            } else if (pauseBtn && !pauseBtn.classList.contains('hidden')) {
                pauseBtn.click();
            }
            e.preventDefault();
            return;
        }
        
        // Enter - Complete current sprint
        if (e.key === 'Enter') {
            const completeBtn = document.getElementById('completeSprintBtn');
            if (completeBtn && !completeBtn.classList.contains('hidden')) {
                completeBtn.click();
                e.preventDefault();
            }
            return;
        }
        
        // N - New task
        if (e.key === 'n' || e.key === 'N') {
            const taskInput = document.getElementById('taskInput');
            if (taskInput) {
                taskInput.focus();
                e.preventDefault();
            }
            return;
        }
        
        // D - Log distraction
        if (e.key === 'd' || e.key === 'D') {
            const distractionInput = document.getElementById('distractionInput');
            if (distractionInput) {
                distractionInput.focus();
                e.preventDefault();
            }
            return;
        }
        
        // G - Open grading (end of day)
        if (e.key === 'g' || e.key === 'G') {
            const endDayBtn = document.getElementById('endDayBtn');
            if (endDayBtn) {
                endDayBtn.click();
                e.preventDefault();
            }
            return;
        }
        
        // T - Toggle theme
        if (e.key === 't' || e.key === 'T') {
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.click();
                e.preventDefault();
            }
            return;
        }
        
        // 1-5 - Quick task completion (mark top 5 tasks done)
        if (['1','2','3','4','5'].includes(e.key)) {
            const taskIndex = parseInt(e.key) - 1;
            const taskItems = document.querySelectorAll('.task-item');
            if (taskItems[taskIndex]) {
                const checkbox = taskItems[taskIndex].querySelector('.task-checkbox');
                if (checkbox) {
                    checkbox.click();
                    e.preventDefault();
                }
            }
            return;
        }
        
        // Escape - Close modals
        if (e.key === 'Escape') {
            // Close any open modal
            const modals = document.querySelectorAll('.modal-overlay:not(.hidden)');
            modals.forEach(modal => {
                modal.classList.add('hidden');
            });
            return;
        }
    });
});

// Show keyboard shortcuts help modal
function showShortcutsHelp() {
    let modal = document.getElementById('shortcutsHelpModal');
    
    // Create modal if doesn't exist
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'shortcutsHelpModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <h2>⌨️ Keyboard Shortcuts</h2>
                    <button class="modal-close" onclick="closeShortcutsHelp()">×</button>
                </div>
                <div class="modal-body">
                    <div style="display: grid; gap: 1rem;">
                        <div class="shortcut-group">
                            <h3 style="color: var(--industrial-orange); margin-bottom: 0.5rem;">Timer Control</h3>
                            <div class="shortcut-item"><kbd>Space</kbd> Start/Pause sprint</div>
                            <div class="shortcut-item"><kbd>Enter</kbd> Complete sprint</div>
                        </div>
                        
                        <div class="shortcut-group">
                            <h3 style="color: var(--industrial-orange); margin-bottom: 0.5rem;">Task Management</h3>
                            <div class="shortcut-item"><kbd>N</kbd> New task (focus input)</div>
                            <div class="shortcut-item"><kbd>1-5</kbd> Complete tasks 1-5</div>
                        </div>
                        
                        <div class="shortcut-group">
                            <h3 style="color: var(--industrial-orange); margin-bottom: 0.5rem;">Focus Tools</h3>
                            <div class="shortcut-item"><kbd>D</kbd> Log distraction</div>
                            <div class="shortcut-item"><kbd>G</kbd> Grade day (end of day)</div>
                        </div>
                        
                        <div class="shortcut-group">
                            <h3 style="color: var(--industrial-orange); margin-bottom: 0.5rem;">App Controls</h3>
                            <div class="shortcut-item"><kbd>T</kbd> Toggle theme</div>
                            <div class="shortcut-item"><kbd>Esc</kbd> Close modals</div>
                            <div class="shortcut-item"><kbd>?</kbd> Show this help</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 1.5rem; padding: 1rem; background: var(--bg-primary); border-radius: 6px; font-size: 0.875rem; color: var(--text-secondary);">
                        <strong>💡 Pro Tip:</strong> Shortcuts won't work when typing in text fields. Press Esc to unfocus first.
                    </div>
                </div>
            </div>
        `;
        
        // Add styles for shortcuts
        const style = document.createElement('style');
        style.textContent = `
            .shortcut-group { padding: 0.5rem 0; }
            .shortcut-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                font-size: 0.9rem;
                color: var(--text-primary);
            }
            kbd {
                background: var(--bg-primary);
                border: 1px solid var(--border-medium);
                border-radius: 4px;
                padding: 0.25rem 0.5rem;
                font-family: monospace;
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--industrial-orange);
                box-shadow: 0 2px 0 var(--border-medium);
            }
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(modal);
    }
    
    modal.classList.remove('hidden');
}

// Close shortcuts help
function closeShortcutsHelp() {
    const modal = document.getElementById('shortcutsHelpModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Make functions globally accessible
window.closeShortcutsHelp = closeShortcutsHelp;

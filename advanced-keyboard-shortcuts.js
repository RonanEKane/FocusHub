// ============================================
// ADVANCED KEYBOARD SHORTCUTS (V20.4)
// Extended power-user shortcuts beyond the basic 4
// ============================================

const AdvancedKeyboardShortcuts = {
    
    // All available shortcuts
    shortcuts: {
        // EXISTING (from keyboard-shortcuts.js)
        'cmd+n': { action: 'newTask', description: 'Add new task' },
        'cmd+s': { action: 'startSprint', description: 'Start sprint' },
        'cmd+p': { action: 'parkDistraction', description: 'Park distraction (focus input)' },
        'cmd+k': { action: 'showShortcuts', description: 'Show keyboard shortcuts' },
        
        // NEW SHORTCUTS
        'cmd+d': { action: 'parkDistraction', description: 'Park distraction (quick)' },
        'cmd+m': { action: 'toggleMeeting', description: 'Toggle meeting mode' },
        'cmd+t': { action: 'cycleIntensity', description: 'Cycle AI intensity' },
        'cmd+r': { action: 'viewDashboard', description: 'View dashboard' },
        'cmd+e': { action: 'endDay', description: 'End day early' },
        'cmd+b': { action: 'takeBreak', description: 'Take break' },
        'cmd+/': { action: 'showShortcuts', description: 'Show this help' },
        'cmd+1': { action: 'focusBucket', description: 'Focus ADMIN bucket', bucket: 'admin' },
        'cmd+2': { action: 'focusBucket', description: 'Focus DEEP WORK bucket', bucket: 'deepwork' },
        'cmd+3': { action: 'focusBucket', description: 'Focus STRATEGIC bucket', bucket: 'strategic' },
        'cmd+shift+x': { action: 'exportData', description: 'Export data' },
        'cmd+shift+w': { action: 'weeklyReport', description: 'Generate weekly report' },
        'cmd+shift+s': { action: 'toggleTheme', description: 'Toggle dark/light theme' },
        'esc': { action: 'closeModal', description: 'Close modal/cancel' },
        '?': { action: 'showShortcuts', description: 'Show keyboard shortcuts' }
    },
    
    // Initialize shortcuts
    init() {
        console.log('⌨️ Initializing advanced keyboard shortcuts...');
        
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        console.log('✅ Keyboard shortcuts ready');
    },
    
    // Handle key press
    handleKeyPress(e) {
        // Build shortcut string
        const parts = [];
        if (e.metaKey || e.ctrlKey) parts.push('cmd');
        if (e.shiftKey) parts.push('shift');
        if (e.altKey) parts.push('alt');
        
        // Add key
        const key = e.key.toLowerCase();
        if (key !== 'meta' && key !== 'control' && key !== 'shift' && key !== 'alt') {
            parts.push(key);
        }
        
        const shortcut = parts.join('+');
        
        // Check if shortcut exists
        const action = this.shortcuts[shortcut];
        if (!action) return;
        
        // Don't trigger if user is typing in an input
        const activeElement = document.activeElement;
        const isInputField = activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.isContentEditable
        );
        
        // Allow some shortcuts even in input fields
        const allowInInput = ['cmd+s', 'cmd+k', 'cmd+/', 'esc', '?'];
        if (isInputField && !allowInInput.includes(shortcut)) return;
        
        // Prevent default and execute action
        e.preventDefault();
        this.executeAction(action);
    },
    
    // Execute shortcut action
    executeAction(action) {
        console.log(`⌨️ Shortcut: ${action.action}`);
        
        switch(action.action) {
            case 'newTask':
                this.newTask();
                break;
            case 'startSprint':
                this.startSprint();
                break;
            case 'parkDistraction':
                this.parkDistraction();
                break;
            case 'toggleMeeting':
                this.toggleMeeting();
                break;
            case 'cycleIntensity':
                this.cycleIntensity();
                break;
            case 'viewDashboard':
                window.location.href = 'dashboard.html';
                break;
            case 'endDay':
                this.endDay();
                break;
            case 'takeBreak':
                this.takeBreak();
                break;
            case 'showShortcuts':
                this.showShortcutsModal();
                break;
            case 'focusBucket':
                this.focusBucket(action.bucket);
                break;
            case 'exportData':
                if (typeof DataExport !== 'undefined') {
                    DataExport.showExportModal();
                }
                break;
            case 'weeklyReport':
                if (typeof WeeklyReports !== 'undefined') {
                    this.generateWeeklyReport();
                }
                break;
            case 'toggleTheme':
                this.toggleTheme();
                break;
            case 'closeModal':
                this.closeModal();
                break;
        }
    },
    
    // Action implementations
    newTask() {
        const input = document.getElementById('taskInput');
        if (input) {
            input.focus();
            input.select();
        }
    },
    
    startSprint() {
        const btn = document.getElementById('startSprintBtn');
        if (btn && !btn.disabled) {
            btn.click();
        }
    },
    
    parkDistraction() {
        const input = document.getElementById('distractionInput');
        if (input) {
            input.focus();
            input.select();
        }
    },
    
    toggleMeeting() {
        const toggle = document.getElementById('meetingToggle');
        if (toggle) {
            toggle.checked = !toggle.checked;
            toggle.dispatchEvent(new Event('change'));
            showToast(`Meeting mode ${toggle.checked ? 'ON' : 'OFF'}`, 'info');
        }
    },
    
    cycleIntensity() {
        const intensities = ['supportive', 'balanced', 'tough'];
        const buttons = document.querySelectorAll('.switch-btn');
        if (buttons.length === 0) return;
        
        // Find current active
        let currentIndex = 0;
        buttons.forEach((btn, idx) => {
            if (btn.classList.contains('active')) currentIndex = idx;
        });
        
        // Cycle to next
        const nextIndex = (currentIndex + 1) % intensities.length;
        buttons[nextIndex].click();
        
        showToast(`AI Intensity: ${intensities[nextIndex].toUpperCase()}`, 'info');
    },
    
    endDay() {
        const btn = document.getElementById('endDayBtn');
        if (btn) {
            if (confirm('End day now? This will trigger the grading flow.')) {
                btn.click();
            }
        }
    },
    
    takeBreak() {
        const btn = document.getElementById('takeBreakBtn');
        if (btn) {
            btn.click();
            showToast('Break started', 'success');
        }
    },
    
    focusBucket(bucket) {
        const bucketEl = document.getElementById(`${bucket}Bucket`);
        if (bucketEl) {
            bucketEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            showToast(`Focused: ${bucket.toUpperCase()}`, 'info');
        }
    },
    
    async generateWeeklyReport() {
        try {
            showToast('Generating weekly report...', 'info');
            const report = await WeeklyReports.generateReport();
            const markdown = WeeklyReports.formatReport(report);
            
            // Show in modal
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px; max-height: 80vh; overflow-y: auto;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <h2 style="font-family: 'JetBrains Mono', monospace;">📊 Weekly Report</h2>
                        <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">×</button>
                    </div>
                    <pre style="white-space: pre-wrap; font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; line-height: 1.6;">${markdown}</pre>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
                        <button onclick="DataExport.exportWeeklyReportMD()" class="btn btn-secondary">Export</button>
                        <button onclick="this.closest('.modal-overlay').remove()" class="btn btn-primary">Close</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
        } catch (error) {
            showToast('Failed to generate report', 'error');
        }
    },
    
    toggleTheme() {
        const currentTheme = localStorage.getItem('focushub_theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        localStorage.setItem('focushub_theme', newTheme);
        document.documentElement.className = `theme-${newTheme}`;
        
        showToast(`Theme: ${newTheme.toUpperCase()}`, 'success');
    },
    
    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    },
    
    // Show shortcuts modal
    showShortcutsModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        // Group shortcuts by category
        const categories = {
            'Core Actions': ['cmd+n', 'cmd+s', 'cmd+p', 'cmd+d', 'cmd+b'],
            'Navigation': ['cmd+r', 'cmd+1', 'cmd+2', 'cmd+3'],
            'Modes': ['cmd+m', 'cmd+t', 'cmd+e'],
            'Data & Reports': ['cmd+shift+w', 'cmd+shift+x'],
            'Interface': ['cmd+shift+s', 'cmd+/', '?', 'esc']
        };
        
        let shortcutsHTML = '';
        for (const [category, keys] of Object.entries(categories)) {
            shortcutsHTML += `
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 0.875rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.75rem;">${category}</h3>
                    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 0.5rem; font-size: 0.875rem;">
                        ${keys.map(key => {
                            const shortcut = this.shortcuts[key];
                            if (!shortcut) return '';
                            return `
                                <div style="display: flex; gap: 0.5rem; align-items: center;">
                                    <kbd style="background: var(--bg-secondary); border: 1px solid var(--border-light); padding: 0.25rem 0.5rem; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem;">${key.replace('cmd', '⌘').replace('shift', '⇧').toUpperCase()}</kbd>
                                </div>
                                <div style="color: var(--text-secondary);">${shortcut.description}</div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h2 style="font-family: 'JetBrains Mono', monospace;">⌨️ Keyboard Shortcuts</h2>
                    <button onclick="this.closest('.modal-overlay').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-secondary);">×</button>
                </div>
                ${shortcutsHTML}
                <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-light); text-align: center; color: var(--text-secondary); font-size: 0.75rem;">
                    Press <kbd style="background: var(--bg-secondary); border: 1px solid var(--border-light); padding: 0.25rem 0.5rem; border-radius: 4px;">ESC</kbd> to close
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on ESC
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
};

// Auto-initialize
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AdvancedKeyboardShortcuts.init());
    } else {
        AdvancedKeyboardShortcuts.init();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedKeyboardShortcuts;
}

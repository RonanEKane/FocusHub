// FocusHub Keyboard Shortcuts
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter: Complete current sprint
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const completeBtn = document.getElementById('completeSprintBtn');
            if (completeBtn && !completeBtn.classList.contains('hidden')) {
                completeBtn.click();
                e.preventDefault();
            }
        }
        
        // Ctrl/Cmd + P: Pause/Resume timer
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            const pauseBtn = document.getElementById('pauseBtn');
            if (pauseBtn && !pauseBtn.classList.contains('hidden')) {
                pauseBtn.click();
                e.preventDefault();
            }
        }
    });
});

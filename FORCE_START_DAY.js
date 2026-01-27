// ========================================
// EMERGENCY FIX: Force Start Day
// Copy/paste this into browser console on app.html
// ========================================

// Step 1: Check current state
console.log('=== CURRENT STATE ===');
let state = JSON.parse(localStorage.getItem('focushub_state') || '{}');
console.log('Day Active:', state.dayActive);
console.log('Last Day Started:', state.lastDayStarted);
console.log('Tasks:', state.tasks);

// Step 2: Force start the day
console.log('\n=== FORCING DAY START ===');
state.dayActive = true;
state.lastDayStarted = Date.now();
state.lastActivityTime = Date.now();
state.sessionState = 'idle';

// Ensure task buckets exist
if (!state.tasks) {
    state.tasks = {
        holding: [],
        admin: [],
        deepwork: [],
        strategic: [],
        wins: []
    };
}

// Ensure distractions array exists
if (!state.distractions) {
    state.distractions = [];
}

// Save back to localStorage
localStorage.setItem('focushub_state', JSON.stringify(state));
console.log('✅ Day force-started!');
console.log('✅ State saved to localStorage');

// Step 3: Reload page
console.log('\n=== RELOADING PAGE ===');
console.log('The page will reload in 2 seconds...');
setTimeout(() => {
    location.reload();
}, 2000);

// ========================================
// ALTERNATIVE: Start day properly (if modal exists)
// Run this instead if you want to use the modal
// ========================================

/*
// Click the start day button if it exists
const startBtn = document.getElementById('startDayBtn');
if (startBtn) {
    console.log('Found Start Day button, clicking it...');
    startBtn.click();
} else {
    console.log('❌ Start Day button not found - using force method above');
}
*/

// ========================================
// VERIFICATION: Run this after page reloads
// ========================================

/*
let state = JSON.parse(localStorage.getItem('focushub_state') || '{}');
console.log('=== VERIFICATION ===');
console.log('Day Active:', state.dayActive);  // Should be true
console.log('Event listeners should now be attached');
console.log('Try adding a task or starting a sprint');
*/

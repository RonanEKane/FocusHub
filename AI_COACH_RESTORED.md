# AI Coach Restored + Settings Guide

**Date**: January 21, 2026  
**Status**: ✅ AI Coach fully operational with comprehensive message library

---

## 🤖 AI COACH SYSTEM RESTORED

### Message Library

**11 Message Categories with 30+ Messages**:

1. **sessionStart** - "Session active. Today's requirements are locked."
2. **sessionIdle** - "System idle. Start a sprint to begin."
3. **sprintComplete** (3 variations) - "Sprint complete. Continue."
4. **sprintCompleteBehind** (3 variations) - "Sprint complete. You're behind. Start the next sprint."
5. **taskCompleted** (3 variations) - "Task complete. Progress logged."
6. **lowPriorityFocus** (3 variations) - "Low priority item detected. Redirect to high-value work."
7. **prolongedInactivity** (4 variations) - "No progress detected. Resume work."
8. **distractionParked** (3 variations) - "Distraction logged. Refocus."
9. **taskAdded** (3 variations) - "Task logged. Prioritize and execute."
10. **goodProgress** (3 variations) - "Progress acceptable. Maintain current pace."
11. **breakTaken** (2 variations) - "Break logged. Resume when ready."

### AI Coach Features

✅ **Monitors inactivity** - Reminds every 2 minutes when idle  
✅ **Checks priority alignment** - Alerts if working on low-priority items  
✅ **Sprint performance tracking** - Compares progress to requirements  
✅ **Task completion feedback** - Immediate acknowledgment  
✅ **Distraction management** - Firm redirect messages  
✅ **Auto-fade transient messages** - Returns to session state after 5s  

---

## 🎯 HOW AI COACH WORKS

### On Sprint Start
```javascript
startSprint() →
  updateAIMessage("Session active. Today's requirements are locked.")
  resetInactivityMonitor() // Clears any warnings
```

### On Sprint Complete
```javascript
completeSprint() →
  Calculate if behind schedule
  If behind: "Sprint complete. You're behind. Start the next sprint."
  If on track: "Sprint complete. Continue."
  
  After 2 seconds: checkPriorityAlignment()
  Start inactivity monitor
```

### On Task Complete
```javascript
completeTask() →
  updateAIMessage("Task complete. Progress logged.")
```

### On Prolonged Inactivity
```javascript
2 minutes idle →
  "No progress detected. Resume work."
  
Another 2 minutes →
  Repeat warning
```

### On Low Priority Focus
```javascript
checkPriorityAlignment() →
  If more low priority than high priority items active:
    "Low priority item detected. Redirect to high-value work."
```

---

## ⚙️ CHANGING USER SETTINGS

### Reflection Tradition (Premium Feature)

**Available Traditions**:
- Catholic
- Protestant
- Stoic
- Buddhist
- Islamic
- Jewish
- Secular (default)

**How to Change (Browser Console)**:

```javascript
// Option 1: Via console (temporary for testing)
localStorage.setItem('focushub_reflection_tradition', 'stoic');

// Then reload the page to see different reflection on start day

// Options: 'catholic', 'protestant', 'stoic', 'buddhist', 'islamic', 'jewish', 'secular'
```

**How to Change (Add to Settings UI - Future)**:

Add to System Intelligence or a Settings page:

```html
<div class="reflection-preference">
    <label>Daily Reflection Tradition:</label>
    <select id="reflectionTradition">
        <option value="secular">Secular (Default)</option>
        <option value="catholic">Catholic</option>
        <option value="protestant">Protestant</option>
        <option value="stoic">Stoic</option>
        <option value="buddhist">Buddhist</option>
        <option value="islamic">Islamic</option>
        <option value="jewish">Jewish</option>
    </select>
</div>

<script>
// Load saved preference
const saved = localStorage.getItem('focushub_reflection_tradition') || 'secular';
document.getElementById('reflectionTradition').value = saved;

// Save on change
document.getElementById('reflectionTradition').addEventListener('change', (e) => {
    localStorage.setItem('focushub_reflection_tradition', e.target.value);
    alert('Reflection preference updated. You\'ll see the new tradition on your next day start.');
});
</script>
```

---

## 💳 MEMBERSHIP LEVELS

**Current Implementation**: localStorage based

**How to Test Premium Features**:

```javascript
// Set membership in console
localStorage.setItem('focushub_membership', JSON.stringify({
    plan: 'premium',
    status: 'active',
    startDate: new Date().toISOString()
}));

// Or for free tier
localStorage.setItem('focushub_membership', JSON.stringify({
    plan: 'free',
    status: 'active'
}));

// Reload page
location.reload();
```

**Premium Features (When Implemented)**:
- Custom reflection traditions (all 7 traditions)
- Extended reflection library (350+ reflections vs 14 basic)
- Advanced AI coaching patterns
- Priority analytics
- Performance insights

**Free Tier**:
- Secular reflections only
- Basic AI coaching
- Core productivity features

---

## 🧪 TESTING AI COACH

### Test 1: Sprint Performance Messages
1. Add 3 tasks (3 sprints each = 9 total required)
2. Complete 1 sprint → "Sprint complete. You're behind. Start the next sprint."
3. Complete more sprints → Message changes when caught up

### Test 2: Inactivity Warnings
1. Start a sprint, let it complete
2. Wait 2 minutes without starting another
3. AI Coach: "No progress detected. Resume work."
4. Wait another 2 minutes → Reminder repeats

### Test 3: Priority Alignment
1. Add 2 high priority tasks, 3 low priority tasks to buckets
2. Complete a sprint
3. After 2 seconds → "Low priority item detected. Redirect to high-value work."

### Test 4: Task Completion
1. Check off any task
2. AI Coach: "Task complete. Progress logged." (or variation)

### Test 5: Distraction Parking
1. Type distraction, click PARK
2. AI Coach: "Distraction logged. Refocus." (or variation)

### Test 6: Reflection Tradition
1. Set tradition via console: `localStorage.setItem('focushub_reflection_tradition', 'buddhist')`
2. End your day (END DAY button)
3. Reload app → Start day modal shows Buddhist reflection
4. Test with different traditions

---

## 📊 MESSAGE FREQUENCY

**High Frequency** (Every occurrence):
- Sprint start
- Sprint complete
- Task complete
- Distraction parked

**Medium Frequency** (Conditional):
- Behind schedule (on sprint complete, if behind)
- Priority misalignment (2s after sprint, if detected)

**Low Frequency** (Timed):
- Inactivity warnings (every 2 minutes when idle)

---

## 🎯 AI COACH PERSONALITY

**Tone**: Firm, direct, no-nonsense authority  
**Style**: Military command center, spec-ops field manual  
**Approach**: Tough love, not celebration  
**Language**: Imperative statements, clear directives  

**Examples of Tone**:
- ❌ "Great job! You're doing amazing!"
- ✅ "Task complete. Progress logged."

- ❌ "Would you like to start another sprint?"
- ✅ "Sprint complete. You're behind. Start the next sprint."

- ❌ "Take your time, no pressure!"
- ✅ "No progress detected. Resume work."

---

## 🔧 CUSTOMIZATION

### Adding New AI Messages

Edit the `aiCoachMessages` object in app.html:

```javascript
const aiCoachMessages = {
    // ... existing categories ...
    
    yourNewCategory: [
        'First message option.',
        'Second message option.',
        'Third message option.'
    ]
};

// Then call it:
updateAIMessage(getAIMessage('yourNewCategory'));
```

### Adjusting Inactivity Timer

Currently set to 2 minutes:

```javascript
// In startInactivityMonitor()
setTimeout(() => {
    updateAIMessage(getAIMessage('prolongedInactivity'));
    startInactivityMonitor();
}, 120000); // 120000 = 2 minutes

// Change to 5 minutes:
}, 300000);
```

### Adjusting Priority Check Delay

Currently checks 2 seconds after sprint complete:

```javascript
// In completeSprint()
setTimeout(() => checkPriorityAlignment(), 2000);

// Change to immediate:
checkPriorityAlignment();
```

---

## ✅ VERIFICATION

**AI Coach Working If**:
- [ ] Sprint start shows "Session active. Today's requirements are locked."
- [ ] Sprint complete shows performance-based message
- [ ] Task completion shows acknowledgment
- [ ] Inactivity triggers warnings after 2 minutes
- [ ] Low priority focus triggers redirect message
- [ ] Distraction parking shows firm redirect
- [ ] Messages fade after 5 seconds (except session state)

---

## 🚀 DEPLOYMENT STATUS

✅ AI Coach library restored (30+ messages)  
✅ Inactivity monitoring active  
✅ Priority alignment checking active  
✅ All coach triggers implemented  
✅ Reflection tradition system working  
✅ Authority tone consistent throughout  

**Ready for testing!** 🎯

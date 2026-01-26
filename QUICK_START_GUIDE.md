# FocusHub V6 - Quick Start Guide

## 🎯 NEW IN THIS VERSION

### 1. Sticky Header with Timer
- Header now sticks to top when scrolling
- Timer appears in center of header when active + scrolled
- Header gets 50% more compact when scrolled
- **No more timer in browser tab**

### 2. Contextual AI Coach
The AI Coach now provides **situational tough love** with specific numbers:

**Examples**:
- Sprint complete: "Sprint 2/8 complete. You're 6 sprints behind. This gap won't close itself. Start now."
- Task complete (low priority): "Low-priority task closed. Question: Why wasn't this delegated or eliminated? 5 real tasks remain."
- Task complete (high value): "High-value item complete (+3 sprints). This is what winning looks like. Next."
- Prolonged inactivity: "4 minutes idle. You're 5 sprints behind. Every minute compounds the deficit. Move."
- Distraction #6: "Distraction #6 parked. Pattern detected. Address root cause or accept compromised output."

### 3. Settings Panel (⚙️ Button)
Click the ⚙️ gear icon in System Intelligence card to access:
- **Membership Level** - Switch between Free/Premium
- **Reflection Tradition** - Choose daily reflection source
- **AI Intensity** - Coaching style preference

---

## ⚙️ HOW TO USE SETTINGS

### Step 1: Open Settings
Click the **⚙️** button in the System Intelligence card (top right)

### Step 2: Set Membership
```
Membership Level dropdown:
- Free Tier (default)
- Premium (unlock all traditions)
```

### Step 3: Choose Reflection Tradition
```
Available options:
- Secular (default - works for everyone)
- Catholic
- Protestant
- Stoic
- Buddhist
- Islamic
- Jewish
```

### Step 4: AI Intensity
```
- Supportive (gentle)
- Balanced (default)
- Tough Love (recommended - full context, harsh truth)
```

Settings save automatically!

---

## 🤖 AI COACH BEHAVIORS

### When Sprint Completes
The AI calculates:
- How many sprints you've done
- How many total required
- How far behind you are
- How many tasks remain

Then gives you **specific feedback**:
- "Sprint 3/9 complete. You're 6 sprints behind..."
- "Sprint complete. 4 tasks remaining. Maintain momentum."

### When Task Completes
The AI looks at:
- Task priority (high/medium/low)
- Sprint value (1-5)
- Remaining task count

Then responds:
- High priority + 3 sprints: "High-value item complete (+3 sprints). This is what winning looks like. Next."
- Low priority: "Low-priority task closed. Question: Why wasn't this delegated or eliminated? 5 real tasks remain."

### When Idle Too Long
After 2 minutes of no activity:
- "4 minutes idle. You're 5 sprints behind. Every minute compounds the deficit. Move."

Repeats every 2 minutes until you start working.

### When Low Priority Focus Detected
If you have more low-priority than high-priority tasks active:
- "Alert: 3 low-priority items active vs 2 high-priority. Misaligned. Strategic work demands attention now."

---

## 💳 MEMBERSHIP SYSTEM

### How It Works Now

**Visual Settings Panel**:
1. Click ⚙️ in System Intelligence
2. Change "Membership Level" dropdown
3. Saves immediately
4. No page reload needed

**What Each Level Gets**:

**FREE TIER**:
- Core productivity features
- Secular reflections only
- Basic AI coaching
- All timer and task features

**PREMIUM**:
- All 7 reflection traditions
- Full reflection library (350+ messages)
- Advanced AI coaching patterns
- Priority analytics
- Performance insights

### Testing Different Traditions

1. Set membership to "Premium"
2. Choose tradition (e.g., "Stoic")
3. End your day (END DAY button)
4. Reload app
5. Start day modal shows your chosen tradition

**Example - Stoic**:
"You have power over your mind - not outside events. Realize this, and you will find strength." — Marcus Aurelius

**Example - Buddhist**:
"Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment." — Buddhist Wisdom

---

## 📱 STICKY HEADER

### How It Works

**Not Scrolled**:
- Full height header
- Logo + buttons visible
- No timer shown

**Scrolled Down**:
- Header sticks to top
- Gets 50% more compact (less padding)
- Timer appears in center (only if sprint active)
- Subtle shadow effect

**Timer Display**:
- Only shows when **sprint is running**
- Shows in **center** of header
- Format: `MM:SS` (e.g., "18:42")
- Orange color for visibility
- JetBrains Mono font (technical look)

---

## 🎯 AI COACH MESSAGE EXAMPLES

### Sprint Performance
```
Behind schedule:
"Sprint 2/8 complete. You're 6 sprints behind. This gap won't close itself. Start now."

Catching up:
"Sprint 5/8 logged. Still 3 behind target. Pick up the pace."

On track:
"Sprint complete. 2 tasks remaining. Maintain momentum."

Ahead:
"Sprint complete. Requirements met. Reassess if additional work warranted."
```

### Task Completion
```
Low priority task:
"Low-priority task closed. Question: Why wasn't this delegated or eliminated? 5 real tasks remain."

High-value task:
"High-value item complete (+3 sprints). This is what winning looks like. Next."

Medium task:
"Task done. 3 remain. Clock's running."
```

### Inactivity
```
2 minutes idle:
"4 minutes idle. You're 5 sprints behind. Every minute compounds the deficit. Move."

Caught up but idle:
"Work stopped. Session still active. Either continue or end day."
```

### Distractions
```
First few:
"Distraction parked. Refocus immediate."

Recurring pattern (5+):
"Distraction #6 parked. Pattern detected. Address root cause or accept compromised output."
```

---

## ✅ QUICK TEST CHECKLIST

### Test Sticky Header
- [ ] Scroll down page
- [ ] Header stays at top
- [ ] Header gets more compact
- [ ] Start a sprint
- [ ] Timer appears in center of header
- [ ] Timer updates every second
- [ ] Scroll back up - timer disappears

### Test AI Coach
- [ ] Add 3 tasks (3 sprints each = 9 total)
- [ ] Complete 1 sprint
- [ ] AI says: "Sprint 1/9 complete. You're 8 sprints behind..."
- [ ] Wait 2 minutes
- [ ] AI warns: "No progress detected..."
- [ ] Complete a low-priority task
- [ ] AI says: "Low-priority task closed. Question: Why..."

### Test Settings
- [ ] Click ⚙️ gear icon in System Intelligence
- [ ] Settings panel expands
- [ ] Change membership to "Premium"
- [ ] AI confirms: "Membership updated to PREMIUM"
- [ ] Change reflection to "Stoic"
- [ ] AI confirms: "Reflection tradition set to STOIC"
- [ ] End day, reload
- [ ] Start day shows Stoic reflection

---

## 🚀 DEPLOYMENT

Upload both files:
- app.html (contextual AI + settings)
- style.css (sticky header + settings panel)

Hard refresh: `Ctrl + Shift + R`

---

**Everything is now ready for tough love coaching!** 💪

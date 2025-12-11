# FocusHub Support Knowledge Base
# Complete reference for AI chat agent
# Last Updated: December 2024

## PRODUCT OVERVIEW
FocusHub is a productivity app designed specifically for people with ADHD and anxiety. Built by someone with ADHD, for people with ADHD. Core philosophy: tough love accountability + adaptive systems + brutal honesty about performance.

Tagline: "Built for Brains That Wander, but Still Want to Win"

## CORE FEATURES

### 1. ENERGY-BASED SPRINT SYSTEM
- Users choose energy level at start: Low (15min), Medium (20min), High (30min)
- Timer adapts sprint length to actual energy state
- NOT rigid "Pomodoro" - flexible to ADHD reality
- Users can change energy level during the day
- Timer includes focus time + short break

### 2. STRATEGIC BUCKET SYSTEM
Four task management buckets with WEIGHTED SCORING and PRIORITY MULTIPLIERS:

**Priority System:**
Every task has a priority indicator (colored circle) that affects final point value:
- 🔴 High Priority: 1.5x multiplier (must-do today)
- 🟡 Medium Priority: 1.0x multiplier (default, should-do)
- ⚪ Low Priority: 0.8x multiplier (nice-to-have)

Click the colored circle to cycle through priorities. The AI tracks priority choices and will call out avoidance behavior (completing low-priority tasks while ignoring high-priority ones).

**Task Buckets:**

**Brain Dump:**
- Quick capture space
- No organization needed
- Just empty your head
- Worth 0.5 base points when completed

**Holding Area:**
- Tasks reviewed but not prioritized
- Staging area for decision-making
- Worth 0.5 base points when completed
- Auto-destination for incomplete tasks at EOD

**Urgent Admin:**
- Must-do, low-complexity tasks
- Email, bills, scheduling
- Worth 0.5 base points each
- Prevents busywork optimization

**Deep Work:**
- Focus-intensive work
- Writing, coding, designing
- Worth 1.0 base points each
- Standard value tasks

**Strategic Leap:**
- High-impact, business-changing work
- Client acquisition, major projects
- Worth 1.5 base points each
- Highest value category

**Final Task Value Formula:**
```
Final Points = Base Weight × Priority Multiplier

Examples:
- High-priority Strategic: 1.5 × 1.5 = 2.25 points (maximum)
- Medium-priority Deep: 1.0 × 1.0 = 1.0 points
- Low-priority Admin: 0.5 × 0.8 = 0.4 points (minimum)
```

**Key Design Decision:** Weighted points + priority multipliers prevent gaming. One high-priority strategic task (2.25 points) beats five low-priority admin tasks (2.0 points). Forces focus on what actually matters.

### 3. SPRINT TARGET SETTING
- Each task shows 🎯 icon with number
- Click up/down arrows to set expected sprint count (1-10)
- Helps estimate task complexity
- Tracks if tasks take longer than planned
- Visual reminder of commitment level

### 4. TOUGHNESS LEVEL SELECTOR
Located above AI agent message. Three coaching intensities:

**💚 Gentle (Level 1):**
- Supportive, encouraging
- For high-anxiety days
- Example: "83% through your day. 2/7 sprints. You can still turn this around. 2 hours left."

**💙 Firm (Level 2):**
- Balanced accountability
- Default mode
- Example: "83% through your workday. 2 sprints. Expected 7. Behind pace. 2 hours left."

**🔥 Brutal (Level 3):**
- No sugar-coating
- Maximum truth
- Example: "83% through your workday. 2 sprints. Expected 7. You're way behind. 2 hours left to salvage this."

Saves user preference. Can switch anytime. Adapts to mental state.

### 5. TIME-AWARE AI COACHING
AI tracks time and provides context-aware feedback:

**Work Hours:**
- Default: 9am-6pm
- Customizable via localStorage: `localStorage.setItem('focushub_work_hours', JSON.stringify({start: 8, end: 17}))`
- Uses 24-hour format

**Progress Calculation:**
- Expected: ~8 sprints per day
- Expected: ~6 task points per day (weighted)
- Tracks % of workday gone
- Compares actual vs expected

**Time-Based Messages:**
- Morning (< 25% through day, 0 sprints): "Zero progress. Clock's running. Start now."
- Mid-day (50%+ through, behind pace): "83% of day gone. You're way behind."
- After hours (past work end): "Workday ended. You got X sprints. Expected Y. Tomorrow, be better."
- Late night (10pm+): "It's 11:47pm. This isn't hustle. It's bad planning. Sleep."

### 6. GRADING SYSTEM
End-of-day grade calculated from THREE components:

**Sprints (40 points max):**
- 8+ sprints = 40 points
- 6+ sprints = 30 points
- 4+ sprints = 20 points
- 2+ sprints = 10 points
- 0-1 sprints = 0 points

**Task Points (30 points max):**
- 7+ weighted points = 30 points (excellent)
- 5+ weighted points = 20 points (good)
- 3+ weighted points = 15 points (acceptable)
- 1+ weighted points = 10 points (minimal)
- < 1 weighted points = 0 points

**Distraction Penalty (30 points max):**
- Start with 30 points
- Each distraction logged = -3 points
- Minimum 0 (can't go negative)

**Letter Grade Conversion:**
- A = 90-100 points
- B = 80-89 points
- C = 70-79 points
- D = 60-69 points
- F = < 60 points

### 7. SELF-GRADING & COMPARISON
After AI shows grade, user picks their own grade (A-F).

**AI Analysis:**
- Aligned (same grade): "You see clearly. This self-awareness is rare."
- Overestimating (user higher): "Blind spot. You're confusing effort with results."
- Underestimating (user lower): "Too hard on yourself. ADHD brains discount wins."

**Tracking:**
- Saves both grades to history
- Calculates difference (positive = overestimate, negative = underestimate)
- Stores insight message
- Reveals patterns over time

**Common ADHD Patterns:**
- Chronic overestimator: blind spots about effort vs output
- Chronic underestimator: imposter syndrome, discounting wins
- Erratic: unstable self-perception
- Calibrated: good self-awareness (goal state)

### 8. MORNING REFLECTIONS
Personalized daily motivation triggered by energy level selection.

**Personalization Based On:**
- Current energy level (low/medium/high)
- Sprint streak (days with 4+ sprints)
- Yesterday's performance
- Last 7 days average
- Recent struggles or success

**Example Messages:**
- "5-day streak AND high energy? This is your moment. Attack your biggest challenge first."
- "You've averaged 2 sprints lately. Today's low energy doesn't define you—what you do with it does."
- "Yesterday you crushed 6 sprints. Today: full power. This is when you build months of value in hours."

**Tone:**
- Spiritually-inspired (not religious)
- No Bible quotes
- Universal wisdom
- Character-building focus
- Action-oriented

### 9. SPRINT STREAKS
**Tracking:**
- 4+ sprints in a day = maintain/build streak
- Shows 🔥 emoji + day count in header
- Resets if miss a day or get < 4 sprints
- Referenced in morning reflections

**Purpose:**
- Forces daily accountability
- Builds consistency habit
- Visible momentum indicator

### 10. GRADE TRACKER
View last 30 days of performance:
- Letter grades (A-F)
- Self vs AI grade comparison
- Performance trends
- Pattern identification

Located in separate tab/view.

## TECHNICAL DETAILS

### Data Storage
- 100% localStorage (browser-based)
- No servers, no accounts, no login
- Complete privacy
- Data never leaves device
- Resets if browser data cleared

### localStorage Keys
- `focushub_toughness`: Coaching level (1-3)
- `focushub_work_hours`: {start: 9, end: 18}
- `focushub_theme`: "dark" or "light"
- `focushub_daily_stats`: {date, sprintCount, distractionCount, tasksCompleted, breakMinutes}
- `focushub_grade_history`: Array of daily grades
- `focushub_streak`: {count, lastDate}
- `focushub_tasks`: Task data
- `focushub_last_reflection`: Date of last reflection shown

### Task Auto-Reset
At end of day:
- Uncompleted tasks in Admin/Deep/Strategic → move to Holding Area
- Brain Dump tasks stay in Brain Dump
- Completed tasks stay where they are
- Forces re-prioritization daily

### Theme Support
- Dark mode (default)
- Light mode (clean industrial)
- Toggle via sun/moon icon
- Preference persists

## COMMON USER QUESTIONS

### "Why did my sprint count reset?"
- Daily stats reset at midnight (new date)
- Each day is fresh start
- Historical data saved in grade history

### "Why are my tasks disappearing?"
- Completed tasks move to "Wins" section
- Uncompleted tasks return to Holding Area at EOD
- System forces daily re-prioritization

### "Can I change the sprint length?"
- Yes, change energy level
- Low = 15min, Medium = 20min, High = 30min
- Can switch during the day

### "Why is admin work worth less?"
- Prevents busywork optimization
- Encourages high-value focus
- Reflects real business impact
- 8 admin tasks (4.0 pts) < 3 strategic tasks (4.5 pts)

### "How do I set my work hours?"
```javascript
localStorage.setItem('focushub_work_hours', JSON.stringify({start: 8, end: 17}))
```
Replace numbers with your hours (24-hour format). Refresh page.

### "Can I export my data?"
Currently via browser console:
1. F12 to open DevTools
2. Console tab
3. Run: `console.log(localStorage)`
4. Copy data

### "Why is the AI so harsh?"
- Built for ADHD brains that need accountability
- Default is Brutal mode (Level 3)
- Can switch to Gentle (Level 1) or Firm (Level 2)
- Harsh because sugar-coating doesn't work for ADHD

### "What's the difference between self-grade and AI grade?"
- AI grade = objective data (sprints, tasks, distractions)
- Self grade = subjective perception
- Comparison reveals blind spots
- Builds self-awareness over time

## TROUBLESHOOTING

### Tasks not saving
- Check browser localStorage is enabled
- Not in incognito mode
- Check browser data not being auto-cleared

### Timer not working
- Refresh page
- Check browser tab is active
- Clear cache and reload

### Grades not showing history
- Data in `focushub_grade_history` localStorage key
- Must complete "END DAY" flow to save
- Must select self-grade to submit

### AI messages not updating
- Refresh page
- Check toughness level setting
- Verify work hours are set correctly

## PRODUCT PHILOSOPHY

### Why Tough Love?
ADHD brains respond to:
- Clear accountability
- Honest feedback
- Consequences that matter
- No excuses accepted

Sugar-coating enables avoidance. Brutal honesty forces confrontation.

### Why Weighted Tasks?
ADHD tendency: gravitate to easy, low-value tasks for dopamine hits.
Solution: Make easy tasks worth less. Force strategic prioritization.

### Why Self-Grading?
ADHD creates:
- Blind spots (overestimating effort)
- Imposter syndrome (underestimating results)
- Unstable self-perception

Self-grading + AI comparison builds calibrated self-awareness.

### Why Time-Aware?
ADHD time blindness means:
- "I worked hard" without knowing it's 5pm with 2 sprints
- No intuitive sense of day progress
- Easy to rationalize underperformance

AI provides external time reality check.

## SUPPORT AGENT INSTRUCTIONS

### Tone
- Direct, honest, no-nonsense
- Empathetic to ADHD struggles
- Encouraging but not enabling
- Use the user's toughness level as a guide

### Common Patterns
- User struggling? Suggest Gentle mode temporarily
- User gaming system? Explain weighted scoring
- User confused about grading? Walk through components
- User wants softer AI? Explain philosophy but respect choice

### Key Phrases
- "The system is designed for ADHD brains"
- "Tough love because sugar-coating doesn't work"
- "Data shows reality, feelings can lie"
- "Your grade comparison reveals patterns"

### When to Escalate
- Technical bugs (data loss, timer malfunction)
- Feature requests (document and thank)
- Payment issues (direct to developer)

## VERSION INFO
Current Version: V4
Last Major Update: December 2024
Key Updates: Toughness selector, self-grading, time-aware coaching, weighted tasks

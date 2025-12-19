# FOCUSHUB V4 - COMPREHENSIVE TODO LIST

## ✅ COMPLETED THIS SESSION:

1. **Header Fixes:**
   - Logo increased to 40px (was 24px)
   - Tagline now visible
   - Scrolled state shrinks to 32px
   - Day Complete screen has functional "Start New Day" button

2. **Layout Fixes:**
   - AI Agent no longer sticky/floating - now normal column in right sidebar
   - 2-column grid layout maintained

3. **End of Day Modal:**
   - Added self-grading with +/- buttons
   - Shows both System Grade and User Grade side-by-side
   - User can adjust their grade up/down
   - Saves both grades + difference to history for AI analysis

4. **Morning Reflection:**
   - Already integrated (Catholic focus)
   - Shows on first day start

5. **Task System:**
   - Weighted tasks already working (Strategic=3, Deep=2, Urgent=1)
   - Drag-and-drop between all areas functional
   - Auto sprint calculation from task weights
   - Checkboxes for completion

---

## 🚧 CRITICAL - STILL NEEDED TO MATCH SCREENSHOT:

### A. Missing Components from Screenshot:
Looking at Screenshot_2025-12-15_at_11_41_47_PM.png:

1. **Progress Tracker Card** (below Task Manager)
   - Shows sprint metrics in visual format
   - Needs charts/graphs
   - Component needs to be created

2. **Reflection Insights Card** (below Progress Tracker)
   - Shows percentages and metrics
   - Component needs to be created

3. **Distraction Parking Lot** (in screenshot)
   - May already exist in DistractionLogger but verify styling matches

### B. Task Priority System UI:
- Tasks have weights (Strategic=3, etc) but NO UI to set priority
- User needs way to assign priority when creating/editing tasks
- Add dropdown or buttons to set: Strategic/Deep Work/Urgent

### C. Baseline Minimum Sprints:
- Add minimum sprint baseline that tasks are added TO
- User sets baseline (e.g., 5 sprints minimum)
- Task weights add on top of baseline
- Helps with underestimation (#14 from your list)

---

## 🏠 HOME PAGE REDESIGN:

Complete redesign needed per your prompt (#9):

**Mission Control Dashboard with:**
- Swiss Technical aesthetic
- Light mode: bg-zinc-50, white cards, technical grays
- Monospace fonts (JetBrains Mono) for all numbers/dates
- Bento Grid layout (no floating elements)
- Technical header with "SYSTEM STATUS: ONLINE" + UTC time

**Components:**
1. Activity Flow (Line Chart - last 12 hours)
2. Consistency Log (Bar Chart - last 7 days)
3. Daily Score (Radial Gauge/Donut Chart)
4. Primary Action Button: `[ > ] INITIALIZE NEW SESSION`

Use Recharts library for visualizations.

---

## 📊 DATA PERSISTENCE & NAVIGATION:

### Page Structure Needed:
- **Landing Page** (`/index.html`) - Sales page for prospects
- **Home Page** (`/home.html`) - Dashboard with data viz (for returning users)
- **App** (`/app`) - Main productivity app
- **FAQ** (`/faq.html`) - Support + AI chat agent
- **How-To** (`/how-to.html`) - Feature guide + philosophy + PDF?

### Navigation Logic:
- First-time users: Landing → Start Day → Morning Reflection → App
- Returning users: Cookie drops them to Home page (not landing)
- Member login system? (your question #8)
- Navigation between pages WITHOUT resetting app state
- Only "End Day" button triggers data save and reset

### Day Continuation Logic:
- End Day button = user-triggered only (not midnight)
- If user hasn't clicked END DAY and opens app next day:
  → Show option: "Complete yesterday" or "Start new day"
- Auto-end if no interaction for 2+ hours after midnight (#10)
- Add "Reopen Day" option if user ended too soon (#12)

---

## 🤖 AI AGENT ENHANCEMENTS:

### Tough Love Toggle (your #16):
Add 3-level selector in AI Agent card:
- Level 1: Tough Love (brutal, direct)
- Level 2: Middle Ground (balanced)
- Level 3: Supportive (encouraging)

Changes AI commentary tone throughout app.

### Sprint Normalization (#14, #15):
- ADHD brains underestimate time
- Add automatic multiplier to user's sprint estimates
- OR show AI suggestion: "You said 2 sprints, I recommend 3"
- Make this part of AI card commentary

### End of Day AI Analysis:
- AI should comment on grade difference
- If user grades higher than system: "Interesting - you're being generous"
- If user grades lower: "You're being hard on yourself"
- Save this analysis in history

---

## 🐛 BUGS TO FIX:

1. **CSS Warning:** Extra closing brace around line 498 in index.css
2. **Day Complete Screen:** Currently just black with button - needs proper styling
3. **Test all drag-drop:** Ensure works in production
4. **Test Morning Reflection:** Verify shows on new day
5. **Verify localStorage clears properly** on new day

---

## 📁 FILE CLEANUP:

Delete these unused files:
- `/src/components/TaskManager-old.jsx`
- `/src/components/MeetingTracker.jsx` (integrated into SprintTimer)
- `/src/components/MeetingTracker.css`

---

## 🎨 STYLING VERIFICATION:

Compare every component to screenshot and fix:
- Card borders, shadows, spacing
- Color of bucket borders (red/blue/purple)
- Font sizes and weights
- Button styles
- Ensure EXACT match to screenshot

---

## 📦 DEPLOYMENT CHECKLIST:

When ready to deploy:
1. Run `npm run build`
2. Files auto-copy to `dist/`
3. Verify `_redirects` file exists (not wiped by build)
4. Upload `dist/` contents to GitHub
5. Cloudflare: Build command BLANK, output directory `/`
6. Test all URLs after deploy

---

## PRIORITY ORDER:

**Phase 1 (Critical - Match Screenshot):**
1. Create Progress Tracker component
2. Create Reflection Insights component
3. Add task priority UI
4. Verify all styling matches screenshot EXACTLY

**Phase 2 (Functionality):**
5. Home page with data visualizations
6. Navigation logic (cookies, no-reset)
7. Day continuation logic
8. Baseline minimum sprints

**Phase 3 (Enhancements):**
9. Tough love toggle
10. Sprint normalization
11. Reopen day feature
12. Member login system

**Phase 4 (Polish):**
13. Fix all bugs
14. Delete old files
15. Comprehensive testing
16. Final deployment

---

## FILES IN THIS PACKAGE:

Source: `/focushub-full-package/src/`
Build: `/focushub-full-package/dist/` (ready to deploy)
Docs: Multiple `.md` files with progress notes

**NEXT CHAT:** Start with Priority Order Phase 1.

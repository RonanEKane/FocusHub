# FocusHub V4 - Complete Rebuild Instructions

## CRITICAL: DO NOT CREATE NEW FILE STRUCTURE
This package contains the complete working source code. Modify these files in place.

## Current State
- React app with Vite build system
- All components and functionality working
- CSS theme system in place
- Currently displays as SINGLE COLUMN layout

## Required Changes

### 1. TWO-COLUMN LAYOUT (PRIMARY FIX)
**Reference Image:** See screenshot showing proper layout
- LEFT COLUMN (main content, wider): Sprint Timer, Task Command Center, Today's Wins, Progress Tracker, Reflection Insights
- RIGHT COLUMN (sidebar, ~300px): Daily Pace Ops panel (sticky)
- Currently everything is stacked in one column - needs grid layout

**CSS Changes Needed:**
```css
.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.sidebar-column {
  position: sticky;
  top: 2rem;
  align-self: start;
}
```

### 2. DRAG AND DROP - BIDIRECTIONAL
**Missing Feature:** Tasks should drag from Holding Area → Task Buckets AND back
- Currently no drag/drop implemented in components
- Need React DnD or native HTML5 drag/drop
- Tasks must move between: Holding Area ↔ Urgent Admin ↔ Deep Work ↔ Strategic Leap

### 3. HEADER BAR IMPROVEMENTS
**Current Issues:**
- Header too tall/loose
- Missing "Home" button (should link to landing page)
- Logo correct size but header padding excessive

**Required:**
- Compact header: reduce padding to `padding: 1rem 2rem`
- Add Home button next to logo
- Sticky header that shrinks on scroll with Sprint Timer visible in collapsed state

**Sticky Header Behavior:**
```javascript
// When scrolled down:
- Header shrinks to ~60px height
- Sprint timer becomes compact inline display
- Logo scales down slightly
```

### 4. MEETING TRACKER
**Current:** Separate card/section
**Required:** Small toggle switch inside Sprint Timer card
- Just a checkbox/toggle: "In Meeting? ☐"
- No separate UI component needed

## File Structure (DO NOT CHANGE)
```
focushub-complete-source/
├── src/
│   ├── App.jsx           # Main app component - ADD TWO-COLUMN LAYOUT HERE
│   ├── main.jsx          # Entry point
│   ├── index.css         # All styling - ALREADY COMPLETE
│   ├── components/       # All React components
│   │   ├── SprintTimer.jsx     # ADD meeting toggle here
│   │   ├── TaskManager.jsx     # ADD drag/drop here
│   │   └── [other components]
│   └── firebase/         # Config files
├── public/               # Static assets (logo, favicon)
├── index.html
├── package.json
└── vite.config.js
```

## Design Reference
The screenshot shows:
- Dark theme (#0a0e14 background)
- Large 20:00 timer display (left side of timer card)
- Energy pills horizontal (right side of timer card)
- 3-column task buckets with colored borders (red/blue/green)
- Sidebar with Daily Pace Ops stats
- Progress Tracker with grade display
- Reflection section at bottom

## Build Commands
```bash
npm install
npm run build
# Output: dist/ folder ready for deployment
```

## What's Already Working
✅ All CSS styling and theme system
✅ React component structure
✅ Firebase config
✅ Timer functionality
✅ Task data structure
✅ All dependencies installed

## What Needs Implementation
❌ Two-column grid layout (App.jsx)
❌ Drag and drop (TaskManager.jsx)
❌ Sticky shrinking header (App.jsx + CSS)
❌ Meeting toggle in timer (SprintTimer.jsx)
❌ Home button in header (App.jsx)

## Success Criteria
When done, the app should:
1. Match the screenshot layout exactly (2 columns)
2. Allow dragging tasks between all areas (bidirectional)
3. Have compact header with Home button
4. Shrink header on scroll with timer visible
5. Meeting tracker as simple toggle in timer

## IMPORTANT
- Preserve all existing functionality
- Don't rewrite CSS - it's complete and correct
- Focus ONLY on layout and missing features above
- Build should produce a single dist/ folder ready to deploy

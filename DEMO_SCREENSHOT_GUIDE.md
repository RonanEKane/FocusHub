# FocusHub Demo - Screenshot Capture Guide

## Overview
The new `demo-v2.html` is a professional, scroll-based demo page that tells the FocusHub story step by step. It needs actual screenshots from your working app to be complete.

---

## Screenshots Needed

### 1. Energy Check-In
**Filename:** `screenshots/energy-checkin.png`
**Capture:** The "Prepare your session" screen showing the three energy level buttons (High/Medium/Low)
**What to show:**
- FocusHub logo at top
- "Energy Check-In" section
- Three energy buttons with icons
- Sprint configuration controls

### 2. Three Buckets
**Filename:** `screenshots/three-buckets.png`
**Capture:** The task view showing all three buckets expanded
**What to show:**
- ADMIN bucket with tasks (colored red/orange)
- DEEP WORK bucket with tasks (colored blue)
- STRATEGIC bucket with tasks (colored orange/yellow)
- Task count badges
- Priority tags (HIGH/MED/LOW) visible

### 3. Sprint Timer
**Filename:** `screenshots/sprint-timer.png`
**Capture:** The active sprint timer screen
**What to show:**
- Large countdown timer (18:42 or similar)
- Current task being worked on
- Orange progress bar
- PAUSE and RESET buttons
- Energy level indicator

### 4. Distraction Parking
**Filename:** `screenshots/distraction-parking.png`
**Capture:** The distraction parking modal/overlay
**What to show:**
- "DISTRACTION PARKING" header
- Text input with example distraction
- "I'll handle this" checkbox
- "Park It" button
- The Agent's message: "It'll be there after the sprint. You won't forget."

### 5. End of Day Report
**Filename:** `screenshots/end-of-day.png`
**Capture:** The end-of-day grading screen
**What to show:**
- Sprint completion stats (7/8 or similar)
- Tasks closed count
- System Grade (B+ or similar)
- Your Grade (A- or similar)
- Today's Wins list with completed tasks

---

## How to Capture

### Option 1: Full-Screen Captures
1. Open FocusHub in browser
2. Navigate to each screen
3. Use Cmd+Shift+4 (Mac) or Snipping Tool (Windows)
4. Capture the entire screen or just the main content area
5. Save as PNG files with exact filenames above

### Option 2: Browser DevTools
1. Open browser DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Set viewport to 1920x1080 (desktop)
4. Capture screenshot using DevTools screenshot feature
5. Crop and save as needed

---

## Folder Structure

Create a `screenshots` folder in your FocusHub directory:

```
focushub/
├── demo-v2.html
├── screenshots/
│   ├── energy-checkin.png
│   ├── three-buckets.png
│   ├── sprint-timer.png
│   ├── distraction-parking.png
│   └── end-of-day.png
├── index.html
├── app.html
└── ... (other files)
```

---

## Screenshot Quality Guidelines

### Resolution
- Minimum: 1920x1080px
- Recommended: 2560x1440px (for retina displays)

### Content
- ✅ Show realistic data (not "Test Task 1, Test Task 2")
- ✅ Use actual task names like in your demo
- ✅ Include UI in natural state (not mid-click)
- ✅ Capture The Agent's messages when visible
- ❌ Don't include personal/sensitive information
- ❌ Don't show browser chrome (URL bar, bookmarks)

### File Format
- Format: PNG (for quality and transparency)
- Compression: Use TinyPNG or similar to reduce file size
- Target: Under 500KB per screenshot

---

## What the Demo Shows

The new demo is structured as a story:

1. **Hero** - The FocusHub promise
2. **Step 1** - Energy-adaptive sprints (with screenshot)
3. **Agent Quote** - "You said 20 minutes. You lasted 8."
4. **Step 2** - Three buckets system (with screenshot)
5. **Step 3** - Sprint timer in action (with screenshot)
6. **Agent Quote** - "Keep this going."
7. **Step 4** - Distraction parking (with screenshot)
8. **Step 5** - End of day grading (with screenshot)
9. **Comparison** - FocusHub vs other apps
10. **Final Quote** - Agent's tough love
11. **CTA** - Start free trial

---

## Temporary Solution

If you don't have screenshots ready yet, the demo gracefully handles missing images with `onerror="this.style.display='none'"`. The captions and descriptions still tell the story.

**But:** Real screenshots will make this 10x more effective for marketing!

---

## After Adding Screenshots

1. Test demo-v2.html locally
2. Verify all images load
3. Check responsive design on mobile
4. Deploy to production
5. Use for:
   - Landing page
   - Product Hunt launch
   - Reddit/HN posts
   - Email campaigns

---

**This demo tells the FocusHub story properly. Professional. Clean. Effective.** 🎯

# FocusHub V4 - Complete Rebuild Instructions

## OVERVIEW

You have the complete FocusHub V4 source code with ALL components:
1. **React App** (working, needs layout fixes)
2. **Landing Page** (index.html - complete)
3. **Home Page** (home.html - complete)
4. **How-To Guide** (how-to.html - complete)
5. **FAQ Page** (faq.html - needs AI chat widget)
6. **App Entry** (app.html - complete)

## PRIORITY TASKS

### Task 1: Fix React App Layout (CRITICAL)

The React app works but has layout issues. See target-layout-reference.png for correct design.

**Required Changes:**

1. **Two-Column Layout** - Currently single column, needs 2-column grid
   - Main content area (wider): Sprint Timer, Tasks, Wins, Progress, Reflection
   - Right sidebar (300px, sticky): Daily Pace Ops panel
   
2. **Bidirectional Drag & Drop** - Tasks must move both ways
   - From Holding Area → Task Buckets (Urgent/Deep/Strategic)
   - From Task Buckets → Back to Holding Area
   
3. **Compact Sticky Header** 
   - Add "Home" button linking to /index.html
   - Header shrinks on scroll
   - Timer visible when collapsed
   
4. **Meeting Tracker** - Move into Sprint Timer
   - Simple toggle/checkbox inside timer card
   - Remove separate meeting tracker component

**Implementation:**

```jsx
// App.jsx - Add 2-column grid
<div className="main-content">
  <div className="left-column">
    <SprintTimer />
    <TaskManager />
    <GradeTracker />
    {/* etc */}
  </div>
  <div className="right-column sidebar-sticky">
    <AIAgent /> {/* Daily Pace Ops */}
  </div>
</div>
```

### Task 2: Add AI Support Chat to FAQ Page

**Location:** `public-pages/faq.html`

**What to Add:** AI chat widget at bottom-right of FAQ page

The complete code is in COMPLETE_REBUILD_INSTRUCTIONS.md under "FAQ Page - AI Support Agent" section. Just copy/paste before `</body>` tag.

**Features:**
- Fixed position chat button: "💬 Need Help?"
- Popup chat window with Anthropic API integration
- System prompt: "You are a helpful support assistant for FocusHub..."
- Auto-closes with X button or background click

### Task 3: Deployment Build

After making changes:

```bash
# Build React app
npm run build

# Copy public pages to dist/
cp public-pages/*.html dist/
cp public-pages/*.jpg dist/
```

**Final dist/ structure:**
```
dist/
├── index.html          ← Landing page (ENTRY POINT)
├── home.html           ← Home page
├── app.html            ← Launches React app
├── how-to.html         ← Guide
├── faq.html            ← FAQ with AI chat
├── assets/             ← React app files
├── logo.svg
├── favicon.svg
└── ronan-headshot.jpg
```

## WHAT'S ALREADY DONE

✅ **All CSS is complete** (1870 lines in src/index.css)
✅ **React components work** (just need layout fixes)
✅ **Firebase config ready** (src/firebase/config.js)
✅ **Timer functionality complete**
✅ **All public pages written** (index, home, how-to, faq, app)
✅ **Build system configured** (Vite)
✅ **Dependencies installed** (node_modules ready)

## WHAT YOU NEED TO DO

1. **Read COMPLETE_REBUILD_INSTRUCTIONS.md** - Full technical details
2. **Fix React app layout** - 2-column grid, drag-drop, sticky header
3. **Add AI chat to FAQ** - Copy code from instructions
4. **Build and test** - npm run build, copy pages to dist/
5. **Provide dist/ folder** - Complete deployment package

## IMPORTANT NOTES

- **DO NOT rewrite CSS** - It's perfect, just fix layout structure
- **DO NOT create new files** - Modify existing source in place
- **DO NOT restructure folders** - Work with src/ as-is
- **Reference screenshot** - target-layout-reference.png shows correct layout
- **Public pages are done** - Just copy to dist/ after build

## QUICK START

```bash
# 1. Extract this zip
unzip focushub-full-package.zip
cd focushub-full-package

# 2. Fix the code (layout, drag-drop, chat widget)

# 3. Build
npm run build

# 4. Deploy
cp public-pages/*.html dist/
cp public-pages/*.jpg dist/

# 5. Zip dist/ and provide to user
```

## SUCCESS CRITERIA

When done:
1. ✅ React app has 2-column layout matching screenshot
2. ✅ Tasks drag between all areas bidirectionally
3. ✅ Header is compact, sticky, with Home button
4. ✅ Meeting tracker is toggle in timer
5. ✅ FAQ page has AI chat widget
6. ✅ All pages in dist/ ready to deploy
7. ✅ Build runs without errors

Read COMPLETE_REBUILD_INSTRUCTIONS.md for detailed implementation guidance.

# FocusHub V4 - Required Changes Summary

## Current Status
The app is deployed and loading, but needs the following fixes to match the reference screenshot.

## Priority Fixes Needed

### 1. Header - PARTIALLY DONE ✓
- [x] Logo shrunk to 24px
- [x] Home button added
- [ ] Sticky header that shrinks on scroll (CSS added, listener has bug)
- [ ] Timer visible when header is collapsed/scrolled

### 2. Task Management - IN PROGRESS
- [ ] Replace complete buttons with simple checkboxes
- [ ] Implement bidirectional drag & drop (Holding Area ↔ All Buckets)
- [x] Weighted task values (Strategic=3, Deep Work=2, Urgent=1)
- [x] Auto-calculate planned sprints from task weights
- [ ] Card styling for task sections

### 3. Start Day Screen - DONE ✓
- [x] Removed manual sprint planning input
- [x] Now only asks for energy level
- [x] Auto-calculates target from tasks

### 4. Sprint Timer
- [ ] Move meeting tracker INTO sprint timer card as simple toggle
- [ ] Remove standalone MeetingTracker component

### 5. Visual Styling
- [ ] All sections should be cards (matching screenshot)
- [ ] Proper card borders and shadows
- [ ] Consistent spacing

## Implementation Notes

### Task Weights
```javascript
const TASK_WEIGHTS = {
  strategic: 3,   // Worth 3 sprints
  deepwork: 2,    // Worth 2 sprints
  urgent: 1,      // Worth 1 sprint
  holding: 0      // Not counted
};
```

### Planned Sprints Calculation
Total = (# Strategic × 3) + (# Deep Work × 2) + (# Urgent × 1)

### Drag & Drop Pattern
```javascript
// Bidirectional between ALL areas:
- Holding Area → Urgent/Deep/Strategic
- Urgent → Holding Area/Deep/Strategic
- Deep → Holding Area/Urgent/Strategic  
- Strategic → Holding Area/Urgent/Deep
```

### Card Styling Pattern
```css
.card {
  background: var(--surface-elevated);
  border: 1px solid var(--border-medium);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}
```

## Files Modified
- [x] `/src/components/StartDayScreen.jsx` - Removed sprint input
- [x] `/src/components/TaskManager.jsx` - NEW version with weights & drag-drop
- [x] `/src/App.jsx` - Added onPlannedSprintsChange callback
- [x] `/src/index.css` - Added sticky header styles
- [ ] `/src/components/SprintTimer.jsx` - Need to add meeting toggle
- [ ] `/src/components/TaskManager.css` - Need card styling
- [ ] Remove `/src/components/MeetingTracker.jsx` (merge into timer)

## Testing Checklist
- [ ] Logo shrinks when scrolling
- [ ] Checkboxes complete tasks
- [ ] Drag from Holding Area to any bucket
- [ ] Drag from any bucket back to Holding Area
- [ ] Drag between buckets (Urgent ↔ Deep ↔ Strategic)
- [ ] Planned sprints auto-update when tasks are added/moved
- [ ] Strategic tasks count as 3 sprints
- [ ] Deep work tasks count as 2 sprints
- [ ] Urgent tasks count as 1 sprint
- [ ] Meeting toggle inside timer card
- [ ] All sections have card styling

## Known Issues
- Scroll listener cleanup not properly implemented (minor memory leak)
- Old TaskManager file still exists as TaskManager-old.jsx (needs deletion)
- MeetingTracker still renders separately (needs removal from App.jsx)

## Next Steps
1. Complete remaining fixes
2. Test drag & drop thoroughly
3. Verify card styling matches screenshot
4. Deploy and validate

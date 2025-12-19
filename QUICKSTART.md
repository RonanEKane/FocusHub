# ⚡ Quick Start - Test in 30 Seconds

## For the Impatient

**You want to see if this works RIGHT NOW. Here's how:**

---

## 🚀 **Option 1: Local Test (Easiest)**

1. **Download this folder**
2. **Double-click `index.html`**
3. **Done!**

⚠️ **Note**: Cookie redirect won't work on `file://` URLs. To test that:

```bash
# Mac/Linux - run in this folder:
python3 -m http.server 8000

# Windows - run in this folder:
python -m http.server 8000

# Then visit: http://localhost:8000
```

---

## 🌍 **Option 2: Deploy to Cloudflare (60 seconds)**

1. Go to: https://dash.cloudflare.com
2. Click "Pages" → "Create project" → "Upload assets"
3. Drag these 4 files:
   - index.html
   - home.html
   - app.html
   - style.css
4. Click "Deploy"
5. **Done!** Your site is live.

---

## 🎯 **What to Test**

### **Landing Page (index.html)**
- See the hero section
- Read the features
- Click "Start Working"

### **Start Day Flow**
- Pick energy level (try Medium)
- Set baseline sprints (leave at 5)
- Click "Start My Day"

### **Add a Task**
1. Type "Test task" in Brain Dump
2. Select "Deep Work (2 sprints)"
3. Click "Add"
4. Watch sprint target increase (5 → 7)

### **Run a Sprint**
1. Click "20 min" button
2. Click "Pause" (test pause/resume)
3. Click "Reset"
4. Click "20 min" again
5. **Wait 20 minutes** (or cheat: edit timer in dev tools)
6. See confetti! 🎉

### **Log a Distraction**
1. Type "Email notification" in distraction box
2. Check "I'll handle this" (intention tracking)
3. Click "Park It"
4. Click X to mark it handled
5. This feeds the Intention vs Reality metric

### **Change AI Agent**
1. Look at sidebar "TOUGH LOVE MODE"
2. Click "Tough" button
3. Complete another sprint
4. See the agent message change

### **End Your Day**
1. Click "END DAY" button (top right)
2. See your stats
3. Click letter grades to set your self-grade
4. Click "Complete Day"
5. You'll go to home.html dashboard

### **Dashboard (home.html)**
1. See your total sprints
2. See "Intention vs Reality" bars
3. Check the weekly chart
4. Click "INITIALIZE NEW SESSION" to start another day

---

## 🐛 **Troubleshooting Test Issues**

### **"Timer just shows 00:00"**
Check browser console (F12). Confetti CDN might be blocked.

**Fix**: 
- Check internet connection
- Or remove confetti import from app.html (line 987)

### **"Tasks aren't saving"**
Check if localStorage is enabled in browser.

**Fix**: 
- Use regular browsing mode (not private/incognito)
- Check browser settings allow localStorage

### **"Cookie redirect loops"**
This happens if testing on `file://`

**Fix**: Use local server (see Option 1 above)

### **"Stats don't show on home.html"**
You need to complete at least one day first.

**Fix**: Go through full workflow first (app.html → end day)

---

## ✅ **Checklist for Full Test**

- [ ] Open index.html
- [ ] Start a day
- [ ] Add 3 tasks (different priorities)
- [ ] Run 1 complete sprint (20 min)
- [ ] Log 1 distraction with intention
- [ ] Complete that distraction
- [ ] Change Tough Love mode
- [ ] End the day
- [ ] Check home.html dashboard
- [ ] Start a new day

**Time needed:** 25 minutes (mostly waiting for sprint timer)

---

## 🎮 **Advanced Testing**

### **Test Different Energy Levels**
- Low: 15 min sprints
- Medium: 20 min sprints  
- High: 30 min sprints

Each should trigger different timer durations.

### **Test Task Weights**
- Add 1 Urgent task → Target increases by 1
- Add 1 Deep Work → Target increases by 2
- Add 1 Strategic → Target increases by 3

### **Test Grading Formula**
Complete these scenarios and check grades:

**Scenario A: Perfect Day**
- Planned: 5 sprints
- Completed: 5 sprints
- Distractions: 0
- Expected Grade: **A+**

**Scenario B: Behind Pace**
- Planned: 8 sprints
- Completed: 6 sprints
- Distractions: 2
- Expected Grade: **B or B-**

**Scenario C: Distracted**
- Planned: 5 sprints
- Completed: 5 sprints
- Distractions: 8
- Expected Grade: **D or F**

### **Test Meeting Tracker**
1. Click "Meeting" button
2. Watch time increment
3. Click "End Meeting"
4. Check stats at end of day

---

## 📊 **Expected Behavior**

### **After 1 Day:**
- home.html shows basic stats
- No charts yet (need 7 days)
- Intention vs Reality shows if you added intentions

### **After 7 Days:**
- Weekly bar chart appears
- Streak calculation works
- Performance index accurate

### **After 30 Days:**
- You have a real productivity system
- Patterns become visible
- Dashboard is valuable

---

## 💡 **Pro Testing Tip**

Want to test without waiting 20 minutes?

**Cheat the timer:**
1. Open browser DevTools (F12)
2. Go to Console
3. Type: `state.timer.timeLeft = 5`
4. Hit Enter
5. Timer will complete in 5 seconds

---

## 🎯 **What Success Looks Like**

After testing, you should have:
- ✅ Completed at least 1 sprint
- ✅ Added and completed a task
- ✅ Logged a distraction
- ✅ Ended a day
- ✅ Seen the dashboard with your data

If all that works: **It's production-ready.** Deploy it.

---

## 🚨 **Known Issues (Not Bugs)**

1. **Timer stops in background tabs**  
   This is intentional (saves battery). The timer beeps when done.

2. **Data doesn't sync between browsers**  
   That's localStorage. Add backend for sync (see EXPANSION_GUIDE.md)

3. **Confetti uses CDN**  
   Only external dependency. Remove if you want 100% offline.

4. **No data export button**  
   Easy to add. Just haven't yet.

---

## 📝 **Test Notes Template**

Use this to record your testing:

```
TEST DATE: ___________
BROWSER: ___________
DEVICE: ___________

Landing Page: ☐ Pass ☐ Fail
Start Day: ☐ Pass ☐ Fail
Add Task: ☐ Pass ☐ Fail
Sprint Timer: ☐ Pass ☐ Fail
Meeting Tracker: ☐ Pass ☐ Fail
Distraction Log: ☐ Pass ☐ Fail
Tough Love Toggle: ☐ Pass ☐ Fail
End Day: ☐ Pass ☐ Fail
Dashboard: ☐ Pass ☐ Fail
Cookie Redirect: ☐ Pass ☐ Fail

NOTES:
_________________________
_________________________
```

---

## ✨ **Next Steps After Testing**

1. **Read README.md** - Full documentation
2. **Read DEPLOYMENT.md** - Deploy to real hosting
3. **Read EXPANSION_GUIDE.md** - Add backend if needed

Or just start using it. It works.

---

**Questions? Open index.html and start clicking. Everything is self-explanatory.**

# 🎯 FocusHub V20.3 - Source Code

**Built for Brains That Wander, but Still Want to Win**

**Version:** 20.3  
**Last Updated:** January 26, 2026  
**Developer:** John Waters (watersjb@gmail.com)  
**Pen Name:** Ronan E. Kane

---

## 📁 Directory Structure

```
focushub/
├── 📄 Core Application Files
│   ├── app.html                    # Main application
│   ├── style.css                   # Main stylesheet
│   ├── index.html                  # Landing page
│   ├── start.html                  # Login/signup entry
│   └── settings.html               # User settings
│
├── 🔐 Authentication & User Pages
│   ├── login.html                  # Login page
│   ├── signup.html                 # Signup page
│   ├── logout.html                 # Professional logout
│   └── subscription.html           # Subscription management
│
├── 👑 Admin & Analytics
│   ├── admin.html                  # Admin panel
│   ├── analytics-dashboard.html    # Analytics dashboard
│   └── dashboard.html              # Insight Center (user dashboard)
│
├── 📚 Marketing & Info Pages
│   ├── overview.html               # Product overview
│   ├── how-to.html                 # How-to guide
│   ├── guide.html                  # User guide
│   ├── faq.html                    # FAQ
│   ├── upgrade.html                # Upgrade page
│   └── privacy.html                # Privacy policy (GDPR/CCPA)
│
├── 🧠 JavaScript Libraries
│   ├── supabase-config.js          # Supabase connection
│   ├── analytics.js                # Event tracking
│   ├── keyboard-shortcuts.js       # Premium shortcuts
│   ├── dashboard-supabase-sync.js  # Dashboard sync
│   ├── weekly-reports.js           # Weekly reports (not integrated)
│   └── firestore-data.js           # Legacy (not used)
│
├── 🧘 Reflection Libraries
│   ├── reflections-expanded.js     # 50 universal reflections
│   ├── reflections-buddhist.js     # Buddhist tradition
│   ├── reflections-catholic.js     # Catholic tradition
│   ├── reflections-christian.js    # Christian tradition
│   ├── reflections-hindu.js        # Hindu tradition
│   ├── reflections-islamic.js      # Islamic tradition
│   └── reflections-jewish.js       # Jewish tradition
│
├── 🎨 Assets
│   ├── FocusHub_horiinv.svg        # Horizontal logo (dark)
│   ├── FocusHub_horinorm.svg       # Horizontal logo (light)
│   ├── FocusHub_vertinv.svg        # Vertical logo (dark)
│   ├── FocusHub_vertnorm.svg       # Vertical logo (light)
│   ├── ronan-headshot.jpg          # Author photo
│   ├── manifest.json               # PWA manifest
│   └── service-worker.js           # PWA service worker (not activated)
│
├── 📚 docs/                        # All documentation (43 files)
│   ├── README.md                   # Docs index
│   ├── RELEASE_NOTES_V20.3.md      # Current release notes
│   ├── DEPLOYMENT_CHECKLIST_V20.3.md
│   ├── TROUBLESHOOTING_V20.3.md
│   ├── QUICK_FIX_SUMMARY.md
│   └── [40 more documentation files...]
│
├── 🗄️ sql/                         # All SQL scripts (17 files)
│   ├── README.md                   # SQL index
│   ├── SUPABASE_MEMBERSHIP_SETUP.sql
│   ├── DASHBOARD_SCHEMA.sql
│   ├── ANALYTICS_SCHEMA.sql
│   ├── FIX_JOHNS_MEMBERSHIP.sql
│   └── [13 more SQL scripts...]
│
└── 🔧 Utility Scripts
    └── FORCE_START_DAY.js          # Emergency day start script
```

---

## 🚀 Quick Start

### 1. Deploy to Cloudflare Pages
Upload this entire directory to Cloudflare Pages or connect via GitHub.

### 2. Set Up Supabase Database
Run these SQL scripts in order:
```bash
sql/SUPABASE_MEMBERSHIP_SETUP.sql
sql/DASHBOARD_SCHEMA.sql
sql/ANALYTICS_SCHEMA.sql
```

### 3. Grant Admin Access
```bash
sql/FIX_JOHNS_MEMBERSHIP.sql
```

### 4. Configure Supabase Connection
Update `supabase-config.js` with your credentials (already configured).

### 5. Test Application
- Visit `/start.html` to log in
- Click "START DAY" modal on app.html
- Verify settings show "👑 ADMIN"

---

## 🐛 Known Issues & Fixes

### Issue: Settings Page SyntaxError
**Status:** ✅ FIXED in V20.3  
**Solution:** Removed duplicate `supabaseClient` declarations

### Issue: Tasks Not Appearing
**Cause:** Day not started  
**Solution:** Click "START DAY" modal or run `FORCE_START_DAY.js`

### Issue: Settings Shows "FREE TIER"
**Cause:** Membership record not in database  
**Solution:** Run `sql/FIX_JOHNS_MEMBERSHIP.sql`

See `docs/TROUBLESHOOTING_V20.3.md` for complete guide.

---

## 📊 Database Schema

### Tables
1. **memberships** - User plans & admin flags
2. **daily_history** - Daily performance tracking  
3. **task_history** - Task completion logs
4. **distraction_log** - Distraction tracking
5. **analytics_events** - User interaction events
6. **analytics_errors** - JavaScript error logs
7. **analytics_sessions** - Session tracking

---

## ✨ V20.3 Features

### Bug Fixes
- ✅ Sprint timer displays immediately
- ✅ Park It actually stores distractions
- ✅ Meeting mode fully functional
- ✅ Task holding area debug logging
- ✅ Settings page JavaScript error fixed

### UI Improvements
- ✅ "Energy Level" label (was "Energy")
- ✅ Break button outline style
- ✅ Modern meeting toggle switch
- ✅ Logo size increased (60px)
- ✅ Sticky header with backdrop blur

### Privacy Policy
- ✅ GDPR/CCPA compliant
- ✅ Analytics disclosure
- ✅ Subscription data disclosure
- ✅ Admin transparency

---

## 📦 File Count

- **HTML Pages:** 25+ files
- **JavaScript:** 10 libraries
- **Reflection Files:** 7 tradition libraries (350+ reflections)
- **Documentation:** 43 markdown files
- **SQL Scripts:** 17 database scripts
- **Assets:** 5 SVG logos + images

**Total:** ~145 files

---

## 🔐 Admin Access

**Current Admin:** watersjb@gmail.com  
**Plan:** Premium  
**Admin Panel:** `/admin.html`  
**Analytics:** `/analytics-dashboard.html`

---

## 📞 Support

**Bug Reports:** Use thumbs-down button in app  
**Privacy Questions:** privacy@focushub.app  
**General Support:** support@focushub.app

---

## 🎯 Deployment Checklist

See `docs/DEPLOYMENT_CHECKLIST_V20.3.md` for complete deployment guide.

**Quick Version:**
1. ✅ Deploy files to Cloudflare Pages
2. ✅ Run SQL scripts in Supabase
3. ✅ Hard refresh browser (Cmd+Shift+R)
4. ✅ Test: Settings shows "👑 ADMIN"
5. ✅ Test: Tasks add to holding area
6. ✅ Test: Timer starts immediately

---

**Next Version:** 20.4 - Additional polish and refinements

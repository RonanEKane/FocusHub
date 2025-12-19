# FocusHub - Complete Repository

## 🎯 What's Included

This is the COMPLETE repository for FocusHub. Delete everything in your current repo and upload these files.

### Directory Structure

```
focushub-complete-repo/
├── dist-github/              ← DEPLOY-READY FILES (upload these to Cloudflare Pages)
│   ├── app-react.html        ← Main React app
│   ├── index.html            ← Landing page
│   ├── faq.html              ← FAQ with AI chat
│   ├── how-to.html           ← How-to guide
│   ├── home.html             ← Home page
│   ├── assets/               ← JS and CSS bundles
│   └── *.svg, *.jpg          ← Images
│
├── src/                      ← SOURCE CODE (React components)
│   ├── components/           ← All React components
│   ├── App.jsx               ← Main app component
│   ├── main.jsx              ← Entry point
│   └── index.css             ← Global styles
│
├── public/                   ← PUBLIC ASSETS (logos, icons)
│   ├── logo.svg
│   ├── favicon.svg
│   └── FocusHub_*.svg
│
├── public-pages/             ← MARKETING PAGES (source for dist-github)
│   ├── index.html
│   ├── faq.html
│   ├── how-to.html
│   ├── home.html
│   └── ronan-headshot.jpg
│
├── package.json              ← Dependencies
├── package-lock.json         ← Locked dependencies
├── vite.config.js            ← Build configuration
├── index.html                ← Vite entry template
└── README.md                 ← This file
```

---

## 🚀 Quick Start - Upload to GitHub

### Option 1: Web Interface (Easiest)

1. **Go to your GitHub repository**
2. **Delete ALL existing files** (everything in the repo)
3. **Upload this entire folder**:
   - Drag all files/folders from `focushub-complete-repo/`
   - Commit message: "Complete repository reset - working version"
   - Push changes

4. **Configure Cloudflare Pages**:
   - Root directory: `/`
   - Build command: `npm run build`
   - Build output directory: `/dist`

### Option 2: Command Line (Git)

```bash
# Clone your repo (or navigate to it)
git clone https://github.com/RonanEKane/focushub-6ah.git
cd focushub-6ah

# DELETE EVERYTHING (be careful!)
rm -rf *
rm -rf .*  # Remove hidden files except .git

# Copy new files
cp -r /path/to/focushub-complete-repo/* .
cp -r /path/to/focushub-complete-repo/.* . 2>/dev/null || true

# Commit and push
git add .
git commit -m "Complete repository reset - working version"
git push origin main --force
```

---

## 🛠️ Local Development

If you want to run/modify the app locally:

```bash
# Install dependencies (first time only)
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

**Development URL:** http://localhost:5173

---

## 📦 What's Already Built

The `dist-github/` folder contains PRE-BUILT files ready to deploy:

- **app-react.html** - Your main app with all fixes
- **Landing page, FAQ, How-To** - All marketing pages
- **Latest CSS/JS bundles** - Includes all component updates

**You don't need to build anything!** Just upload the files.

---

## ✅ Features Included

### Layout
- Two-column grid: Main content (left) + AI Agent/Distraction Logger (right)
- Sticky header that shrinks on scroll
- Meeting toggle in Sprint Timer header

### Task Manager
- Horizontal task text (readable!)
- Sprint counters with ◀ ▶ buttons per task
- Drag-and-drop between buckets
- Individual sprint counts per task

### Components
- Sprint Timer with energy levels
- Task Manager with 3 priority buckets
- AI Agent (Daily Pace GPS)
- Distraction Logger
- Grade Tracker

### Marketing Pages
- Landing page with branding
- FAQ with AI chat support
- Contact form (mailto)
- How-To Guide

---

## 🌐 After Upload

**Your app will be live at:**
- Main app: `https://focushub-6ah.pages.dev/app-react`
- Landing page: `https://focushub-6ah.pages.dev/`

**Hard refresh** (Cmd/Ctrl + Shift + R) to see changes.

---

## 📝 Notes

- **node_modules/** not included (too large) - run `npm install` if developing locally
- **dist/** folder regenerates when you build - don't upload it to GitHub
- **dist-github/** is your deploy folder - this IS uploaded

---

## 🆘 If Something Breaks

If you need to rebuild from source:

```bash
npm install        # Install dependencies
npm run build      # Build the app
```

Then copy `dist/` contents to create a new deploy folder.

---

**This is the COMPLETE, WORKING repository. Upload everything and you're done!** 🎯

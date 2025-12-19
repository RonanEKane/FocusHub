# 🚀 DEPLOYMENT INSTRUCTIONS - READ THIS FIRST

## What You're About To Do

You're going to **DELETE your entire GitHub repository** and upload these fresh files.

---

## Step-by-Step Upload (Web Interface)

### 1. Go to Your GitHub Repository
`https://github.com/RonanEKane/focushub-6ah`

### 2. Delete EVERYTHING in the Repository
- Click on each file/folder
- Delete it
- Or use the GitHub web interface to bulk delete

**IMPORTANT:** Do NOT delete the repository itself, just the contents.

### 3. Upload New Files
- Click "Add file" → "Upload files"
- **Drag ALL files and folders from `focushub-complete-repo/`**
- This includes:
  - `dist-github/` folder
  - `src/` folder
  - `public/` folder
  - `public-pages/` folder
  - All config files (package.json, vite.config.js, etc.)
  - README.md
  - .gitignore

### 4. Commit Changes
- Commit message: "Complete repository reset - working version"
- Click "Commit changes"

### 5. Wait for Cloudflare Pages to Deploy
- Cloudflare will automatically detect the push
- Wait 1-2 minutes for build to complete
- Check deployment at: `https://focushub-6ah.pages.dev/app-react`

---

## Cloudflare Pages Settings (Double-Check)

**Build Configuration:**
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `/dist`
- Root directory: `/` (leave blank or set to root)

---

## After Upload - Test These URLs

✅ **Main App:** https://focushub-6ah.pages.dev/app-react
✅ **Landing Page:** https://focushub-6ah.pages.dev/
✅ **FAQ:** https://focushub-6ah.pages.dev/faq.html
✅ **How-To:** https://focushub-6ah.pages.dev/how-to.html

**Hard refresh each page:** Cmd/Ctrl + Shift + R

---

## What You Should See

### Main App (/app-react)
- ✅ Two columns: Main content (left) + AI Agent/Distraction (right)
- ✅ Small 24px logo in header
- ✅ Meeting toggle inside Sprint Timer card
- ✅ Task items with horizontal text
- ✅ Sprint counters (◀ 2 ▶) below each task
- ✅ No weird sticky behavior
- ✅ Readable, professional layout

---

## If Something Goes Wrong

### Issue: Still seeing old version
**Solution:** Hard refresh (Cmd/Ctrl + Shift + R)

### Issue: Build fails on Cloudflare
**Solution:** 
1. Check Cloudflare build logs
2. Make sure build output is set to `/dist`
3. Verify all files uploaded correctly

### Issue: 404 errors
**Solution:**
1. Make sure `dist-github/` folder uploaded correctly
2. Check that `app-react.html` exists in repo
3. Verify Cloudflare Pages is pointing to correct branch

---

## Need to Rebuild?

If you want to modify source and rebuild:

```bash
npm install        # Install dependencies (first time)
npm run build      # Build new version
```

Then update `dist-github/` with new `dist/` contents.

---

**YOU'VE GOT THIS! Just delete everything and upload these files.** 🎯

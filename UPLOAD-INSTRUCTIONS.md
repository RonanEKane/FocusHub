# UPLOAD TO GITHUB - SIMPLE INSTRUCTIONS

## What's In This Package

✅ **Two-column layout** - Main content left, AI Agent right (300px)  
✅ **Small 24px logo** - Shrinks to 20px on scroll  
✅ **Meeting toggle** - Inside Sprint Timer card header  
✅ **Filename: app-react.html** - Matches your redirect  
✅ **Fresh assets** - Latest CSS and JS bundles  

This is EXACTLY the layout from your reference image.

---

## Files Inside dist-github/

```
dist-github/
├── app-react.html          ← React app (your main app)
├── index.html              ← Landing page
├── faq.html                ← FAQ + AI Support + Contact
├── how-to.html             ← How-To Guide
├── home.html               ← Home page
├── favicon.svg, logo.svg   ← Icons
├── ronan-headshot.jpg      ← Your photo
└── assets/
    ├── index-WG-j_u6G.js   ← React bundle (231 KB)
    └── index-tQ7PTDfI.css  ← Styles (30 KB)
```

---

## Upload Steps

### On GitHub (Web Interface):

1. Go to: `https://github.com/RonanEKane/focushub-6ah`

2. **Delete old files** (to avoid conflicts):
   - Delete `dist/` folder
   - Delete `src/` folder
   - Delete `public-pages/` folder
   - Delete old `app-react.html` if it exists
   - Delete old `assets/` folder

3. **Upload new files**:
   - Extract `GITHUB-READY-FINAL.zip`
   - Drag entire `dist-github` folder contents into GitHub
   - Commit message: "Two-column layout with correct assets"

4. **Push to trigger Cloudflare Pages rebuild**

---

### Alternative: Git Command Line

```bash
cd /path/to/your/focushub-repo

# Extract the zip
unzip GITHUB-READY-FINAL.zip

# Clear old files
rm -rf dist/ src/ public-pages/ app-react.html assets/

# Copy new files from dist-github to root
cp -r dist-github/* .

# Remove the dist-github folder itself
rm -rf dist-github/

# Commit
git add .
git commit -m "Two-column layout - correct build"
git push origin main
```

---

## After Upload

**Visit:** `https://focushub-6ah.pages.dev/app-react`

**Hard refresh:** Cmd/Ctrl + Shift + R

You'll see:
- ✅ Two columns (main content + AI Agent sidebar)
- ✅ Small 24px logo in header
- ✅ Meeting toggle in Sprint Timer header
- ✅ All components properly styled

---

**This is the exact layout from your reference image!** 🎯

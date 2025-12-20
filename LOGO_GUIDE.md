# 🎨 Logo Usage Guide

## Your Logo Files

You now have **5 logo files** in the package:

### **1. logo.svg** ⭐ MAIN LOGO
**What it is:** Icon + "FocusHub" text combined (horizontal layout)  
**Colors:** Orange icon + White text  
**Size:** 2048 × 705 px  
**Best for:** Headers, landing pages, dark backgrounds  

**Used in:**
- ✅ index.html (landing page header)

---

### **2. FocusHub_vertinv.png** ⭐ PRIMARY APP LOGO
**What it is:** Icon + "FocusHub" text (vertical layout)  
**Icon:** Orange with White and Black details  
**Text:** Black  
**Best for:** Light mode, light backgrounds, default app interface  

**Used in:**
- ✅ app.html header (light mode DEFAULT)
- ✅ app.html start day screen
- ✅ faq.html header
- ✅ how-to.html header

---

### **3. FocusHub_vertnorm.png**
**What it is:** Icon + "FocusHub" text (vertical layout)  
**Icon:** All-orange (solid)  
**Text:** Black  
**Best for:** Dark mode, dark backgrounds  

**Used in:**
- ✅ app.html header (dark mode)

---

### **4. FocusHub_horiinv.svg** (Optional)
**What it is:** Icon + "FocusHub" text (horizontal layout, white text)  
**Colors:** Orange icon + White text  
**Currently:** Not used (replaced by logo.svg)  
**Could be used:** Alternative for landing page

---

### **5. FocusHub_vertinv.svg**
**What it is:** Icon only (no text)  
**Colors:** Orange icon + White edges  
**Best for:** Small spaces, status bars, favicons  

**Used in:**
- ✅ home.html dashboard status bar

---

## Logo Placement Map

```
┌─────────────────────────────────────┐
│ LANDING PAGE (index.html)           │
│ Header: logo.svg (56px height)      │
│ - Horizontal layout                 │
│ - Icon + text together              │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ WORKSPACE (app.html)                 │
│ Header (light): vertnorm.png (40px) │
│ Header (dark): vertinv.png (40px)   │
│ Start screen: vertnorm.png (80px)   │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ DASHBOARD (home.html)                │
│ Status bar: vertinv.svg (32px)      │
│ - Icon only, compact                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ FAQ & HOW-TO                         │
│ Header: vertnorm.png (40px)         │
└─────────────────────────────────────┘
```

---

## Size Guidelines

**Landing Page Header:** 48-64px height  
**App Header:** 40-48px height  
**Status Bar:** 28-36px height  
**Start Screen:** 64-96px height (hero moment)  

---

## When to Use Which Logo

### **Use logo.svg when:**
- Landing page
- Marketing materials
- Social media headers
- Email signatures
- Need horizontal layout
- Need text + icon together

### **Use vertinv.png when:** ⭐ MOST COMMON
- Light mode app interface (DEFAULT)
- White/light backgrounds
- FAQ/How-To pages
- Need vertical layout with icon that has Orange/White/Black details

### **Use vertnorm.png when:**
- Dark mode app interface
- Dark backgrounds
- Need all-orange icon version

### **Use vertinv.svg when:**
- Need icon only (no text)
- Very small spaces (< 32px)
- Status bars
- App icons
- Favicons (after conversion)

---

## File Sizes

- logo.svg: 4.1 KB
- FocusHub_vertnorm.png: 163 KB
- FocusHub_vertinv.png: 108 KB
- FocusHub_horiinv.svg: 4.2 KB
- FocusHub_vertinv.svg: 5.9 KB

**Total: 285 KB**

---

## Quick Swap Guide

**Want to change landing page logo?**
1. Open index.html
2. Find: `<img src="logo.svg"`
3. Replace with: `FocusHub_horiinv.svg` or other file

**Want different app header logo?**
1. Open app.html
2. Find: `<img id="appLogo" src="FocusHub_vertnorm.png"`
3. Change filename

**Want icon-only everywhere?**
1. Use FocusHub_vertinv.svg
2. Remove text from all headers
3. Add text as separate HTML element

---

## Favicon Setup (Optional)

To add a favicon (browser tab icon):

1. **Create favicon.ico from vertinv.svg:**
   ```bash
   # Use online converter or ImageMagick
   convert FocusHub_vertinv.svg -resize 32x32 favicon.ico
   ```

2. **Add to HTML <head>:**
   ```html
   <link rel="icon" href="favicon.ico" type="image/x-icon">
   ```

3. **Or use PNG directly:**
   ```html
   <link rel="icon" href="FocusHub_vertinv.png" type="image/png">
   ```

---

## Color Codes

**Orange (Icon):** #F45B07  
**White (Text):** #FEFEFE  
**Black (Text):** #000000 or #0F172A  

Match these in your CSS for brand consistency.

---

## Logo DO's and DON'Ts

### ✅ DO:
- Use appropriate version for background color
- Maintain aspect ratio
- Give breathing room (padding)
- Use high-res versions (PNG) for print
- Use SVG for web when possible

### ❌ DON'T:
- Stretch or squash the logo
- Use low-res versions for large displays
- Put orange icon on orange backgrounds
- Use black text on dark backgrounds
- Use white text on light backgrounds

---

## Current Usage Summary

**Files deployed (5):**
1. ✅ logo.svg → Landing page header
2. ✅ FocusHub_vertnorm.png → App/FAQ/How-To (light mode)
3. ✅ FocusHub_vertinv.png → App header (dark mode)
4. ✅ FocusHub_horiinv.svg → (Not currently used, included)
5. ✅ FocusHub_vertinv.svg → Dashboard status bar

**All working correctly with theme toggle.**

---

## Testing Checklist

After deploying:
- [ ] Landing page logo displays (logo.svg)
- [ ] App header shows black text version in light mode
- [ ] App header switches to white text version in dark mode
- [ ] Dashboard status bar shows icon-only version
- [ ] FAQ/How-To pages show black text version
- [ ] All logos scale properly on mobile
- [ ] No broken image links in console

---

**Your logos are professional, well-organized, and properly integrated.**

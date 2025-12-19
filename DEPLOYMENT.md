# 🚀 Deployment Guide

## Overview

Your FocusHub is **100% static files**. This means you can deploy to:
- Cloudflare Pages (Recommended)
- Netlify
- Vercel
- GitHub Pages
- Any web host (even a $5/month shared host)

**No server configuration needed. Just upload files.**

---

## ⚡ **Cloudflare Pages (Recommended)**

### **Why Cloudflare?**
- ✅ Unlimited bandwidth
- ✅ Free SSL
- ✅ Global CDN (fast everywhere)
- ✅ 500 builds/month (free tier)
- ✅ Custom domains included
- ✅ Instant cache invalidation

### **Deploy in 60 Seconds:**

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Click "Pages" in left sidebar

2. **Create Project**
   - Click "Create a project"
   - Choose "Upload assets"

3. **Upload Files**
   - Drag all 4 files from `focushub-flat` folder:
     - index.html
     - home.html
     - app.html
     - style.css
   - Click "Deploy site"

4. **Done!**
   - Your site is live at: `https://your-site-name.pages.dev`
   - Add custom domain in Pages settings if desired

### **Custom Domain Setup:**
1. Go to your Pages project
2. Click "Custom domains"
3. Add your domain (e.g., `focushub.com`)
4. Update DNS as instructed
5. SSL certificate auto-generated

### **Updates:**
To update your site:
1. Go to your Pages project
2. Click "Create new deployment"
3. Upload new files
4. Old version stays live until new one is ready

---

## 🟣 **Netlify**

### **Step 1: Drag & Drop Deploy**

1. Go to: https://app.netlify.com
2. Click "Add new site" → "Deploy manually"
3. Drag `focushub-flat` folder onto upload zone
4. Done! Live at: `https://random-name-12345.netlify.app`

### **Step 2: Custom Domain (Optional)**

1. Click "Domain settings"
2. Add custom domain
3. Update DNS records
4. SSL auto-configures

### **Step 3: Deploy Updates**

**Option A: Drag & Drop**
- Go to "Deploys" tab
- Drag new folder to "Deploy" zone

**Option B: Git Integration (Advanced)**
1. Push code to GitHub
2. Link repo in Netlify
3. Auto-deploy on push

### **netlify.toml Configuration (Optional)**

Create `netlify.toml` in your folder:

```toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

---

## ▲ **Vercel**

### **Quick Deploy:**

1. Go to: https://vercel.com
2. Click "Add New" → "Project"
3. Choose "Import Git Repository" or "Deploy"
4. Upload folder or connect repo
5. Deploy (takes ~30 seconds)

### **vercel.json Configuration (Optional)**

```json
{
  "version": 2,
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 🐙 **GitHub Pages**

### **Step 1: Create Repository**

1. Go to GitHub
2. Create new repo: `focushub`
3. Upload all files to main branch

### **Step 2: Enable Pages**

1. Go to repo Settings
2. Click "Pages" in sidebar
3. Source: Deploy from branch
4. Branch: `main` → `/ (root)`
5. Save

### **Step 3: Access Site**

Your site will be live at:
```
https://YOUR-USERNAME.github.io/focushub/
```

### **Custom Domain:**

1. Add `CNAME` file to repo:
   ```
   focushub.yourdomain.com
   ```

2. Update DNS records:
   ```
   CNAME focushub → YOUR-USERNAME.github.io
   ```

---

## 🖥️ **Traditional Web Host**

If you have shared hosting (GoDaddy, Bluehost, etc.):

### **Via FTP:**

1. Connect with FTP client (FileZilla)
2. Navigate to `public_html` or `www` folder
3. Upload all 4 files
4. Done! Access at: `https://yourdomain.com`

### **Via cPanel:**

1. Log into cPanel
2. Go to "File Manager"
3. Navigate to `public_html`
4. Click "Upload"
5. Select all 4 files
6. Done!

---

## 🔒 **HTTPS Setup**

All modern platforms (Cloudflare, Netlify, Vercel) provide free SSL automatically.

For traditional hosts:
- **Let's Encrypt**: Free SSL (most cPanel hosts have this)
- **Cloudflare SSL**: Put your domain behind Cloudflare (free)

---

## 🌍 **Environment-Specific Files**

### **Development (Local)**
No changes needed. Just open `index.html` in browser.

### **Staging**
Deploy to: `https://staging-focushub.pages.dev`

### **Production**
Deploy to: `https://focushub.com`

**All files are identical.** No environment variables needed for basic setup.

---

## 🚨 **Common Issues**

### **"Cookie redirect doesn't work locally"**
**Problem**: Cookies require a domain (not `file://`)  
**Solution**: 
```bash
# Use a local server:
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### **"Confetti doesn't work"**
**Problem**: CDN not loading  
**Solution**: Check internet connection, or remove confetti dependency

### **"localStorage data lost after deploy"**
**Problem**: Each domain has separate localStorage  
**Solution**: 
- Export data from old site
- Import to new site
- Or use backend (see EXPANSION_GUIDE.md)

### **"Site shows 404"**
**Problem**: Files not in root directory  
**Solution**: Ensure `index.html` is in root, not subfolder

---

## 📊 **Performance Optimization**

### **Already Optimized:**
- ✅ No build step (instant)
- ✅ Single CSS file (1 request)
- ✅ Inline JavaScript (no extra requests)
- ✅ No frameworks (small file size)

### **Optional Improvements:**

**1. Image Optimization (if you add images)**
```bash
# Use WebP format
convert logo.png -quality 80 logo.webp
```

**2. Enable Compression**
Most platforms do this automatically. For cPanel:

Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript
</IfModule>
```

**3. Cache Headers**
Cloudflare/Netlify handle this. For cPanel:

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
</IfModule>
```

---

## 🔄 **Continuous Deployment (Advanced)**

### **GitHub Actions Example:**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: focushub
          directory: .
```

---

## 🎯 **Deployment Checklist**

Before going live:

- [ ] Test all pages locally
- [ ] Complete a full work session
- [ ] Check end-of-day flow
- [ ] Verify cookie redirect works
- [ ] Test on mobile browser
- [ ] Check localStorage persists
- [ ] Verify timer works correctly
- [ ] Test distraction logger
- [ ] Complete a day and check home.html stats
- [ ] Clear localStorage and test fresh start

---

## 🌐 **Multiple Environments**

### **Development**
```
http://localhost:8000
```

### **Staging**
```
https://staging-focushub.pages.dev
```

### **Production**
```
https://focushub.com
```

**No code changes needed between environments!**

---

## 📱 **Progressive Web App (Optional)**

Want users to "install" FocusHub?

### **Step 1: Add manifest.json**

```json
{
  "name": "FocusHub",
  "short_name": "FocusHub",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#F8FAFC",
  "theme_color": "#2563EB",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### **Step 2: Link in HTML**

Add to `<head>` in all HTML files:
```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#2563EB">
```

### **Step 3: Add Service Worker (Optional)**

For offline functionality, create `sw.js`:
```javascript
const CACHE_NAME = 'focushub-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/home.html',
  '/app.html',
  '/style.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

Register in HTML:
```html
<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
</script>
```

---

## 🔐 **Security Headers**

Add to hosting platform:

### **Cloudflare (via _headers file)**

Create `_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### **Netlify (_headers file)**
Same as above

### **Vercel (vercel.json)**
See Vercel section above

---

## 📈 **Analytics (Optional)**

### **Cloudflare Web Analytics (Free)**
1. Enable in Cloudflare dashboard
2. Add script to HTML:
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

### **Google Analytics**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🆘 **Rollback Process**

### **Cloudflare Pages:**
1. Go to deployments
2. Click on previous successful deployment
3. Click "Rollback to this deployment"

### **Netlify:**
1. Go to "Deploys"
2. Find previous deploy
3. Click "..." → "Publish deploy"

### **Vercel:**
1. Go to deployments
2. Click previous deployment
3. Click "Promote to Production"

---

## ✅ **Post-Deploy Testing**

1. **Visit all pages:**
   - Landing (index.html)
   - Dashboard (home.html)
   - Workspace (app.html)

2. **Test core flows:**
   - Start day → Add task → Complete sprint → End day
   - Check home.html shows updated stats

3. **Test cookie:**
   - Clear cookies
   - Visit site (should see landing)
   - Start day
   - Reload (should go to home.html)

4. **Test across devices:**
   - Desktop browser
   - Mobile browser
   - Different browsers

5. **Check performance:**
   - Use Lighthouse in Chrome DevTools
   - Target: 90+ performance score

---

## 🎓 **Resources**

- **Cloudflare Pages Docs**: developers.cloudflare.com/pages
- **Netlify Docs**: docs.netlify.com
- **Vercel Docs**: vercel.com/docs
- **GitHub Pages**: pages.github.com

---

**You're ready to deploy!** Pick a platform and go live in 60 seconds.

Questions? Check the troubleshooting section or open an issue on GitHub.

# APP.HTML SUPABASE INTEGRATION INSTRUCTIONS

## STEP 1: Add Supabase SDK to app.html

**Find the `<head>` section and add these lines BEFORE the closing `</head>` tag:**

```html
    <!-- Supabase SDK -->
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <script src="supabase-config.js"></script>
</head>
```

---

## STEP 2: Replace Auth Check in app.html

**Find this code (around line 410-425):**

```javascript
// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('focushub_current_user') || 'null');

if (!currentUser) {
    // Not logged in, redirect to start page
    window.location.href = 'start.html';
}
```

**REPLACE IT WITH:**

```javascript
// Check if user is logged in (Supabase)
async function checkAuthAndInit() {
    const user = await getCurrentUser()
    
    if (!user) {
        // Not logged in, redirect to start page
        window.location.href = 'start.html'
        return
    }
    
    // User is authenticated
    console.log('✅ User authenticated:', user.email)
    
    // Load user profile and set mode
    const { data: profile } = await supabase
        .from('user_profiles')
        .select('mode, student_submode, theme')
        .eq('id', user.id)
        .single()
    
    if (profile) {
        localStorage.setItem('focushub_mode', profile.mode)
        if (profile.student_submode) {
            localStorage.setItem('focushub_student_submode', profile.student_submode)
        }
        if (profile.theme) {
            localStorage.setItem('focushub_theme', profile.theme)
        }
    }
    
    // Try to migrate from localStorage (one-time)
    await migrateFromLocalStorage()
    
    // Initialize the app
    init()
}

// Call on page load
checkAuthAndInit()
```

**IMPORTANT:** Delete the `init()` call if it exists elsewhere - we're calling it from `checkAuthAndInit()` now.

---

## STEP 3: Update Logout Handler

**Find the logout function (search for "handleFirebaseLogout" or "logout"):**

**REPLACE with:**

```javascript
window.handleFirebaseLogout = async function() {
    await signOut()  // This is from supabase-config.js
}
```

---

## THAT'S IT FOR BASIC AUTH!

**The app will now:**
- ✅ Require Supabase login
- ✅ Redirect to start.html if not logged in
- ✅ Load user profile on login
- ✅ Auto-migrate localStorage data once
- ✅ Logout properly

---

## OPTIONAL: Enable Cloud Sync (Do Later)

To enable cloud sync for data persistence, you'll need to update:
- `saveState()` function to use `saveTodaySession()`
- `loadState()` function to use `getTodaySession()`
- Task functions to use Supabase helpers

**This is OPTIONAL for beta testing. The app will work with localStorage for now.**

See `CLOUD_SYNC_GUIDE.md` for details (if you want to do this).

---

## TESTING CHECKLIST

After making these changes:

1. Deploy to Cloudflare Pages
2. Clear browser cache completely
3. Go to https://focushub-6ah.pages.dev/start.html
4. Sign up with a new account
5. Should redirect to app.html ✅
6. Should see "✅ User authenticated: [your email]" in console
7. Try logging out → should go back to start.html
8. Sign in again → should work ✅

---

## TROUBLESHOOTING

**"getCurrentUser is not defined"**
- Make sure `supabase-config.js` is loaded BEFORE your main app script
- Check the `<script>` tags order in `<head>`

**"supabase is not defined"**
- Make sure Supabase SDK script is loaded
- Check: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`

**Infinite redirect loop**
- Clear browser cache completely
- Check browser console for errors
- Make sure `checkAuthAndInit()` is being called

**"init is not defined"**
- Make sure the `init()` function exists in your app.html
- It should be defined somewhere around line 1700+

---

## QUICK REFERENCE

**Files you're modifying:**
1. app.html - Add SDK scripts, replace auth check, update logout

**Files you're adding:**
1. supabase-config.js - Already created with YOUR credentials ✅

**Files you're replacing:**
1. start.html - Already created ✅

---

**Once these 3 steps are done, deploy and test!** 🚀

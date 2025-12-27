# 🚀 FOCUSHUB SUPABASE - QUICK START

## YOU'RE READY TO DEPLOY!

Your Supabase is configured with:
- ✅ Project URL: https://zpbzursxjlhizminfvyd.supabase.co
- ✅ Database schema created
- ✅ Authentication configured
- ✅ Config files ready with YOUR credentials

---

## DEPLOYMENT IN 3 STEPS (15 minutes)

### STEP 1: Update Your Files (5 min)

**From your current FocusHub files:**

1. **ADD** `supabase-config.js` (from this package) to your project root
2. **REPLACE** your `start.html` with `start.html` (from this package)
3. **EDIT** your `app.html`:
   - Add Supabase SDK scripts to `<head>` (see APP_INTEGRATION_GUIDE.md)
   - Replace auth check (see APP_INTEGRATION_GUIDE.md)
   - Update logout handler (see APP_INTEGRATION_GUIDE.md)

**Detailed instructions in:** `APP_INTEGRATION_GUIDE.md`

---

### STEP 2: Deploy to Cloudflare Pages (5 min)

1. Zip all your files (including new supabase-config.js)
2. Go to Cloudflare Pages dashboard
3. Upload/drag & drop the zip file
4. Wait for deployment (~2 min)

---

### STEP 3: Test Authentication (5 min)

1. **Clear browser cache completely** (important!)
2. Go to: https://focushub-6ah.pages.dev/start.html
3. Click "Sign up"
4. Enter: test@example.com / password123
5. Choose Professional mode
6. Click "Create Account"
7. **Should redirect to app.html** ✅

**Verify in Supabase:**
- Dashboard → Authentication → Users
- Should see test@example.com ✅

**Test Login:**
- Logout from app
- Sign in with same credentials
- Should work! ✅

---

## FILES IN THIS PACKAGE

**Ready to Use:**
- ✅ `supabase-config.js` - Has YOUR credentials pre-configured
- ✅ `start.html` - Supabase authentication UI
- ✅ `SUPABASE_SCHEMA.sql` - Already ran this ✅

**Guides:**
- 📖 `APP_INTEGRATION_GUIDE.md` - How to update app.html (3 simple changes)
- 📖 `QUICK_START.md` - This file
- 📖 `DEPLOYMENT_GUIDE.md` - Detailed reference

---

## CURRENT STATUS

✅ Supabase project created
✅ Database schema installed
✅ Auth configured (email, no confirmation)
✅ Site URLs added
✅ Config files created with your credentials
⏳ **Next:** Deploy files and test!

---

## WHAT WORKS NOW

After deployment:
- ✅ Sign up / Sign in with email & password
- ✅ User data stored in Supabase (secure, bcrypt hashed)
- ✅ Session management (stays logged in across tabs)
- ✅ Professional / Student mode selection
- ✅ Automatic localStorage migration (one-time)
- ✅ Proper logout flow

---

## WHAT'S STILL LOCALSTORAGE

For beta testing, these still use localStorage (THAT'S OK):
- Sprint/timer data
- Tasks
- Distractions
- Daily stats

**This is intentional** - it keeps the app working while we test auth.

**Later** (optional): Migrate these to cloud sync for multi-device support.

---

## TROUBLESHOOTING

**Can't sign up:**
- Check browser console (F12 → Console)
- Look for error messages
- Most common: Credentials not updated in supabase-config.js

**Redirect loop:**
- Clear browser cache completely
- Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

**"supabase is not defined":**
- Make sure SDK script is in app.html `<head>`
- Check: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`

**Users not showing in Supabase:**
- Wait 30 seconds and refresh Supabase dashboard
- Check Supabase Logs for errors

---

## VERIFICATION CHECKLIST

Before deploying:
- [ ] supabase-config.js has YOUR project URL and anon key
- [ ] start.html is the Supabase version
- [ ] app.html has Supabase SDK scripts in `<head>`
- [ ] app.html has updated auth check
- [ ] app.html has updated logout handler

After deploying:
- [ ] Can access start.html
- [ ] Can sign up successfully
- [ ] Redirects to app.html after signup
- [ ] User appears in Supabase dashboard
- [ ] Can logout
- [ ] Can sign in again

---

## NEXT STEPS AFTER AUTH WORKS

1. **Test thoroughly** - Make sure signup/signin/logout work perfectly
2. **Beta test** - Invite a few users to try it
3. **Monitor Supabase** - Check dashboard for user activity
4. **Enable email verification** - Turn on for production launch
5. **Add password reset** - Already in supabase-config.js, just needs UI
6. **Cloud sync** (optional) - Migrate state to Supabase for multi-device

---

## ESTIMATED TIME

- File updates: 5 min
- Deploy: 5 min
- Testing: 5 min
- **Total: 15 minutes**

---

## SUPPORT

If stuck:
1. Check `APP_INTEGRATION_GUIDE.md` for detailed app.html changes
2. Check browser console for errors
3. Check Supabase dashboard → Logs
4. Verify all credentials are correct

**Most common issue:** Forgot to add SDK scripts to app.html!

---

**LET'S DEPLOY!** 🚀

Open `APP_INTEGRATION_GUIDE.md` and follow the 3 steps to update app.html.

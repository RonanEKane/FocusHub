# Onboarding Tutorial Improvements

## Changes Made

### 1. ✅ Tutorial Only for New Signups
**Before:** Tutorial showed to anyone who hadn't seen it, including returning users logging in
**After:** Tutorial only shows to users who just signed up (new accounts)

**How it works:**
- When someone signs up, we set `focushub_new_user = true`
- When app loads, we check if they're a new user AND haven't seen onboarding
- Returning users who log in will NOT see the tutorial

### 2. ✅ Inverted Theme for Tutorial
**Before:** Tutorial appeared in the same theme as the user's preference
**After:** Tutorial uses the OPPOSITE theme to make it visually distinct

**Benefits:**
- Clear visual indicator that you're in a special "tutorial mode"
- Users understand this is different from their normal workspace
- Creates a clear mental separation between learning and working

**How it works:**
- If user has dark theme → Tutorial shows in light theme
- If user has light theme → Tutorial shows in dark theme
- Original theme is restored when tutorial ends

### 3. ✅ Clean State Management
- New user flag is cleared after completing/skipping tutorial
- Original theme is always restored after tutorial
- No state pollution between sessions

---

## User Experience Flow

### New User (Signup):
1. Create account on signup.html ✅
2. Flag set: `focushub_new_user = true` ✅
3. Redirect to app.html ✅
4. App detects new user → Shows tutorial in inverted theme ✅
5. Complete/skip tutorial → Theme restored, flag cleared ✅
6. Ready to use FocusHub ✅

### Returning User (Login):
1. Log in on start.html ✅
2. No new user flag (because they signed up previously) ✅
3. Redirect to app.html ✅
4. No tutorial shown → Straight to session prep ✅
5. Start working immediately ✅

---

## Files Modified

1. **supabase-config.js**
   - `handleSignup()` now sets `focushub_new_user` flag

2. **app.html**
   - `checkOnboarding()` only runs for new users
   - `showOnboardingTutorial()` applies inverted theme
   - `hideOnboarding()` restores original theme
   - `finishOnboarding()` clears new user flag
   - `skipOnboarding()` clears new user flag

---

## Testing Scenarios

### Test 1: New User Signup
1. Go to signup page
2. Create new account
3. Should see tutorial in OPPOSITE theme
4. Complete tutorial
5. Theme should restore to original
6. Should never see tutorial again

### Test 2: Returning User Login
1. Go to login page
2. Log in with existing account
3. Should NOT see tutorial
4. Should go straight to session prep

### Test 3: Theme Preservation
1. Set theme to dark (or light)
2. Trigger tutorial (if testing as new user)
3. Tutorial should show in LIGHT (or dark)
4. Exit tutorial
5. Theme should restore to original dark (or light)

---

## Benefits

✅ **Cleaner UX** - No tutorial interrupting returning users
✅ **Visual Clarity** - Inverted theme makes tutorial mode obvious
✅ **Better Onboarding** - New users get guided start, veterans get straight to work
✅ **State Management** - Clean flag management, no pollution

---

**These changes make FocusHub feel more polished and professional!** 🎯

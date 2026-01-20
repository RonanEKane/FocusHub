# COMPLETE FIX PLAN - All Issues
**Date**: January 20, 2026

## CRITICAL ISSUES FOUND

### 1. LOGO WRONG ON APP LOAD ❌
**Location**: app.html line 397  
**Problem**: Hardcoded `FocusHub_horinorm.svg` (LIGHT mode logo)  
**Should Be**: `FocusHub_horiinv.svg` (DARK mode logo, since default is dark)  
**Impact**: Logo shows with BLACK text on DARK background (invisible)

### 2. LOGOUT FUNCTION BROKEN ❌
**Location**: app.html line 1097  
**Problem**: Calls `signOut()` which doesn't exist  
**Should Be**: Call `handleSignout()` from supabase-config.js

### 3. MEMBERSHIP SCHEMA WRONG ❌
**Location**: supabase-config.js multiple lines  
**Problem**: Uses `tier` and `is_beta_user` fields  
**Should Be**: Use `plan` and `status` fields

## FIXES TO APPLY

### Fix 1: Change default app logo to dark mode version
```html
<!-- OLD (line 397): -->
<img id="appLogo" src="FocusHub_horinorm.svg" alt="FocusHub" class="logo-img">

<!-- NEW: -->
<img id="appLogo" src="FocusHub_horiinv.svg" alt="FocusHub" class="logo-img">
```

### Fix 2: Update logout function
```javascript
// OLD (line 1097):
await signOut()

// NEW:
const result = await handleSignout();
if (result.success) {
    localStorage.clear();
    window.location.href = '/';
}
```

### Fix 3-8: Update all membership functions
See supabase-config.js changes below.

## LOGO NAMING CONVENTION (FOR REFERENCE)

**inv** = Inverse = White text = For DARK backgrounds  
**norm** = Normal = Black text = For LIGHT backgrounds

**vert** = Vertical logo  
**hori** = Horizontal logo

Examples:
- `FocusHub_horiinv.svg` = Horizontal, white text, DARK mode ✓
- `FocusHub_horinorm.svg` = Horizontal, black text, LIGHT mode ✓
- `FocusHub_vertinv.svg` = Vertical, white text, DARK mode ✓
- `FocusHub_vertnorm.svg` = Vertical, black text, LIGHT mode ✓

## FILES TO CHANGE

### app.html (2 changes)
1. Line 397: Change logo to `FocusHub_horiinv.svg`
2. Line 1097: Fix logout function

### supabase-config.js (6 changes)
1. getUserMembership() - use plan/status
2. isPremiumUser() - check plan/status
3. isProUser() - check plan/status
4. getUserTier() - return plan
5. handleSignup() - insert plan/status
6. checkTrialStatus() - remove (not used)

## WHAT SHOULD HAPPEN AFTER FIX

### On Fresh Load (Dark Mode Default)
1. Login page: Shows icon logo ✓
2. Signup page: Shows `FocusHub_vertinv.svg` (white text) ✓
3. Start page: Shows `FocusHub_vertinv.svg` (white text) ✓
4. App page: Shows `FocusHub_horiinv.svg` (white text) ✓

### After Switching to Light Mode
1. App logo: Changes to `FocusHub_horinorm.svg` (black text) ✓
2. Start logo: Changes to `FocusHub_vertnorm.svg` (black text) ✓

### Logout Flow
1. User clicks logout
2. Confirmation dialog appears
3. Calls `handleSignout()` successfully
4. Clears localStorage
5. Redirects to home page

### Membership Flow
1. New user signs up
2. Creates membership with `plan='beta'`, `status='active'`
3. isPremiumUser() returns TRUE
4. Premium features visible
5. Multi-device sync enabled

## VERIFICATION CHECKLIST

After deploying:
- [ ] App logo is white text (visible on dark background)
- [ ] Logout works without console errors
- [ ] Logout redirects to home page
- [ ] New users get beta membership
- [ ] Premium features show for beta users
- [ ] No "tier" or "signOut" errors in console
- [ ] Theme toggle changes logos correctly
- [ ] All pages use correct logo for theme

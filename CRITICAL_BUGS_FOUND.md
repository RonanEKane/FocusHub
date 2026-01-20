# CRITICAL BUGS FOUND - COMPLETE AUDIT

## SHOW STOPPER BUGS (App Breaking) 🔴

### BUG #1: signOut() function doesn't exist
**Location**: app.html line 1097
**Code**: `await signOut()`
**Error**: ReferenceError: signOut is not defined
**Fix**: Change to `await handleSignout()`

### BUG #2: Wrong logo on app load (invisible text)
**Location**: app.html line 397
**Code**: `src="FocusHub_horinorm.svg"` (black text)
**Problem**: Default theme is DARK, so black text is invisible
**Fix**: Change to `src="FocusHub_horiinv.svg"` (white text)

### BUG #3: membership.tier used everywhere
**Location**: supabase-config.js lines 57, 87, 109, 137
**Code**: `membership.tier`
**Problem**: Database table has `plan` field, not `tier`
**Fix**: Change all `.tier` to `.plan`

### BUG #4: Wrong field in membership insert
**Location**: supabase-config.js lines 36-37, 306-307
**Code**: `tier: 'free'` and `is_beta_user: false`
**Problem**: Database expects `plan` and `status`
**Fix**: Change to `plan: 'beta'` and `status: 'active'`

### BUG #5: membership.is_beta_user check
**Location**: supabase-config.js line 62
**Code**: `if (membership.is_beta_user)`
**Problem**: Field doesn't exist in database
**Fix**: Remove this check, rely on plan='beta'

## HIGH PRIORITY BUGS (Features Broken) 🟡

### BUG #6: getTierDisplayName references wrong field
**Location**: supabase-config.js line ~120
**Need to check**: Does it use `tier` parameter name?
**Fix**: Update parameter to `plan`

### BUG #7: getTierColor and getTierEmoji
**Location**: supabase-config.js
**Need to check**: Do they reference tier?
**Fix**: Update to use plan

### BUG #8: checkTrialStatus might fail
**Location**: supabase-config.js line 137
**Code**: Uses `membership.tier === 'lite'`
**Fix**: Update to `membership.plan === 'lite'` or remove

## MEDIUM PRIORITY (UI/UX) 🟢

### BUG #9: Theme switcher default
**Location**: app.html line 5161
**Code**: `const current = document.documentElement.getAttribute('data-theme') || 'light'`
**Problem**: Default should be 'dark' not 'light'
**Fix**: Change to `|| 'dark'`

### BUG #10: Potential race condition in init()
**Location**: app.html line 1091 vs 6014
**Problem**: init() called twice, could cause duplicate processes
**Need to verify**: Are background processes guarded?

## FILES REQUIRING CHANGES

1. **app.html** (4 changes minimum)
   - Line 397: Logo fix
   - Line 1097: signOut fix
   - Line 5161: Default theme fix
   - Line 1091: Check for duplicate init

2. **supabase-config.js** (10+ changes minimum)
   - Lines 36-37: Insert membership fix
   - Line 57: isPremiumUser tier check
   - Line 62: is_beta_user check removal
   - Line 87: isProUser tier check
   - Line 109: getUserTier return value
   - Line 137: checkTrialStatus tier check
   - Lines 306-307: handleSignup insert fix
   - Functions: getTierDisplayName, getTierColor, getTierEmoji

## TOTAL BUGS FOUND: 10 critical issues

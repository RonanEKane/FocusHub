# COMPLETE FIX LIST - ALL 14 BUGS

## app.html - 5 FIXES

### FIX 1: Change app logo to dark mode (line 397)
FROM: `<img id="appLogo" src="FocusHub_horinorm.svg"`
TO: `<img id="appLogo" src="FocusHub_horiinv.svg"`

### FIX 2: Fix logout function (line 1095-1099)
FROM:
```javascript
window.handleFirebaseLogout = async function() {
    if (confirm('Are you sure you want to logout?')) {
        await signOut()
    }
}
```
TO:
```javascript
window.handleFirebaseLogout = async function() {
    if (confirm('Are you sure you want to logout?')) {
        const result = await handleSignout();
        if (result.success) {
            localStorage.clear();
            window.location.href = '/';
        }
    }
}
```

### FIX 3: Fix theme toggle default (line 5161)
FROM: `const current = document.documentElement.getAttribute('data-theme') || 'light';`
TO: `const current = document.documentElement.getAttribute('data-theme') || 'dark';`

### FIX 4: Add guard to startWeeklyCleanupChecker (line 1349)
ADD: `let weeklyCleanupStarted = false;` before function
ADD: `if (weeklyCleanupStarted) return; weeklyCleanupStarted = true;` at start

### FIX 5: Add guards to other background functions
Same pattern for: startSyncPolling, startNewDayChecker, startProactiveAICoach

## supabase-config.js - 9 FIXES

### FIX 6: getUserMembership insert (lines 33-38)
FROM: `tier: 'free', is_beta_user: false`
TO: `plan: 'beta', status: 'active'`

### FIX 7: isPremiumUser tier check (line 57)
FROM: `if (membership.tier === 'premium' || membership.tier === 'beta')`
TO: `if (['beta', 'pro', 'premium'].includes(membership.plan) && membership.status === 'active')`

### FIX 8: isPremiumUser is_beta_user check (line 62)
REMOVE: `if (membership.is_beta_user) { return true; }`

### FIX 9: isPremiumUser expiry check (line 67)
ADD: `&& membership.status === 'active'` to expiry check

### FIX 10: isProUser tier check (line 87)
FROM: `if (membership.tier === 'pro' || membership.tier === 'premium' || membership.tier === 'beta')`
TO: `if (['pro', 'premium', 'beta'].includes(membership.plan) && membership.status === 'active')`

### FIX 11: getUserTier return (line 109)
FROM: `return membership.tier || 'free';`
TO: `return membership.plan || 'free';`
ALSO REMOVE trial check logic

### FIX 12: checkTrialStatus tier reference (line 137)
FROM: `const trialDays = membership.tier === 'lite' ? 7 : 14;`
TO: `const trialDays = membership.plan === 'lite' ? 7 : 14;`

### FIX 13: handleSignup insert (lines 303-308)
FROM: `tier: 'lite', is_beta_user: false`
TO: `plan: 'beta', status: 'active'`

### FIX 14: getTierDisplayName, getTierColor, getTierEmoji parameter names
FROM: `function getTierDisplayName(tier)`
TO: `function getTierDisplayName(plan)`
Update all 3 functions and their internal references

## TOTAL: 14 CRITICAL FIXES

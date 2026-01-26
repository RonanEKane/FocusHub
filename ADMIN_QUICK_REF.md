# Admin Quick Reference

## 🚀 GIVE YOURSELF PREMIUM ACCESS

### Step 1: Update app.html
Find this line in `app.html` (around line 548):
```javascript
const adminEmails = ['your@email.com']; // Replace with your actual email
```

Replace with YOUR actual email:
```javascript
const adminEmails = ['john@focushub.app']; // Your real email
```

### Step 2: Reload App
- Clear cache (Ctrl+Shift+R)
- Login
- Settings (⚙️) now shows "👑 ADMIN"
- All features unlocked automatically!

---

## 📊 MANAGE USERS IN SUPABASE

### Access Dashboard
1. Go to **https://supabase.com**
2. Sign in
3. Select **FocusHub** project

### Quick Admin Tasks

**View All Users**:
```
Left Sidebar → Authentication → Users
```

**Grant Premium to User**:
```sql
-- Go to: SQL Editor (left sidebar)
-- Paste this, replace email:

INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'user@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', status = 'active';
```

**Revoke Premium**:
```sql
UPDATE memberships
SET plan = 'free', status = 'active'
WHERE email = 'user@example.com';
```

**See All Premium Users**:
```sql
SELECT email, plan, started_at 
FROM memberships 
WHERE plan = 'premium' AND status = 'active';
```

---

## 🎯 POLICY UPDATES

### Refund Policy
✅ **Updated**: 5 days post-billing (was 30 days)
📄 **File**: upgrade.html line 416

### Beta Users
✅ **Updated**: 50% off first year (was free forever)
📄 **File**: upgrade.html line 421

---

## 👑 ADMIN FEATURES

### What You Get
- ✅ Automatic premium on login
- ✅ All 7 reflection traditions unlocked
- ✅ All 3 AI intensity modes
- ✅ Settings show "👑 ADMIN" badge
- ✅ No upgrade button shown
- ✅ Bypass all feature gates

### Other Admins
Add more admin emails:
```javascript
const adminEmails = [
    'john@focushub.app',
    'sarah@focushub.app',
    'admin@focushub.app'
];
```

---

## 📋 COMMON SQL QUERIES

### Total User Count
```sql
SELECT COUNT(*) FROM auth.users;
```

### Signups This Week
```sql
SELECT COUNT(*) 
FROM auth.users 
WHERE created_at > NOW() - INTERVAL '7 days';
```

### Active Users (logged in last 30 days)
```sql
SELECT COUNT(*) 
FROM auth.users 
WHERE last_sign_in_at > NOW() - INTERVAL '30 days';
```

### Premium Revenue
```sql
SELECT 
    COUNT(*) as premium_users,
    COUNT(*) * 29 as monthly_revenue
FROM memberships
WHERE plan = 'premium' AND status = 'active';
```

---

## 🔧 TROUBLESHOOTING

### "I don't see admin badge"
1. Check email in adminEmails array matches your login
2. Clear localStorage: `localStorage.clear()`
3. Hard refresh: Ctrl+Shift+R
4. Check browser console for errors

### "User has premium but app shows free"
```sql
-- Check their membership
SELECT * FROM memberships WHERE email = 'user@example.com';

-- If missing, create it
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'user@example.com';
```

### "Need to reset everything"
```sql
-- Development only! Deletes all memberships
TRUNCATE TABLE memberships;
```

---

## 📱 MOBILE ACCESS

Download **Supabase app** (iOS/Android):
- View users on the go
- Run quick SQL queries
- Check membership status
- Grant/revoke access

---

## 🎯 BETA TO LAUNCH CHECKLIST

- [x] Update refund policy (5 days)
- [x] Update beta user terms (50% off, not free)
- [x] Add admin override in app
- [ ] Create memberships table in Supabase
- [ ] Grant yourself admin
- [ ] Test all features unlocked
- [ ] Grant premium to beta testers
- [ ] Set up payment processor
- [ ] Configure webhooks

---

**See SUPABASE_ADMIN_GUIDE.md for complete details!**

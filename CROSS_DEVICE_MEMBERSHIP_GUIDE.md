# FocusHub - Cross-Device Membership System

## 🎯 THE PROBLEM YOU IDENTIFIED

**Before**: Membership stored in localStorage
- ❌ Only works on one device/browser
- ❌ Cleared when cache cleared
- ❌ Doesn't work across devices
- ❌ Not reliable for paid users

**Now**: Membership stored in Supabase database
- ✅ Works everywhere (phone, laptop, tablet)
- ✅ Persists forever
- ✅ Clears when browser closed
- ✅ Single source of truth

---

## 🔧 SETUP (ONE-TIME)

### Step 1: Create Membership Table in Supabase

1. Go to **https://supabase.com**
2. Open your FocusHub project
3. Click **SQL Editor** (left sidebar)
4. Upload or paste: **SUPABASE_MEMBERSHIP_SETUP.sql**
5. Click **Run**

**This creates**:
- `memberships` table with `is_admin` column
- Indexes for fast lookups
- Security policies
- Auto-grants you admin + premium

### Step 2: Verify It Worked

Run this query:
```sql
SELECT email, plan, status, is_admin 
FROM memberships 
WHERE email = 'watersjb@gmail.com';
```

**Should return**:
```
email: watersjb@gmail.com
plan: premium
status: active
is_admin: true
```

### Step 3: Deploy Updated App

Upload these files:
- ✅ app.html (now checks Supabase)
- ✅ settings.html (now checks Supabase)
- ✅ style.css (same)

---

## 🎯 HOW IT WORKS NOW

### When You Login (Any Device)

1. **App checks Supabase database**:
   ```javascript
   SELECT * FROM memberships WHERE user_id = 'your_id'
   ```

2. **Gets your membership**:
   - plan: 'premium'
   - is_admin: true

3. **Applies features**:
   - Shows "👑 ADMIN" badge
   - Unlocks all features
   - No upgrade button

4. **Caches locally** (for speed):
   - Stores in localStorage as backup
   - Only used if Supabase fails

### Benefits

**For You (Admin)**:
- Login on phone → See "👑 ADMIN"
- Login on laptop → See "👑 ADMIN"
- Login on tablet → See "👑 ADMIN"
- Works everywhere!

**For Premium Users**:
- Login on any device → Premium features work
- Buy on phone → Works on laptop instantly
- No manual sync needed

---

## 👥 MANAGING USERS

### Grant Premium to Beta User

**In Supabase SQL Editor**:
```sql
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', FALSE
FROM auth.users
WHERE email = 'betauser@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', status = 'active';
```

**What happens**:
- User logs in → App checks database
- Sees plan = 'premium'
- All features unlocked automatically
- Works on all their devices

### Grant Premium to Multiple Users

```sql
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', FALSE
FROM auth.users
WHERE email IN (
    'beta1@example.com',
    'beta2@example.com',
    'beta3@example.com'
)
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', status = 'active';
```

### Make Someone an Admin

```sql
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', TRUE
FROM auth.users
WHERE email = 'newadmin@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', is_admin = TRUE;
```

### Revoke Premium

```sql
UPDATE memberships
SET plan = 'free', status = 'active', is_admin = FALSE
WHERE email = 'user@example.com';
```

---

## 🔍 CHECKING STATUS

### View All Users with Memberships

```sql
SELECT 
    u.email,
    COALESCE(m.plan, 'no_membership') as plan,
    COALESCE(m.is_admin, FALSE) as is_admin,
    u.last_sign_in_at
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;
```

### View Only Premium Users

```sql
SELECT email, plan, is_admin, started_at
FROM memberships
WHERE plan = 'premium' AND status = 'active'
ORDER BY started_at DESC;
```

### Check Specific User

```sql
SELECT 
    u.email,
    m.plan,
    m.is_admin,
    u.last_sign_in_at
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
WHERE u.email = 'user@example.com';
```

---

## 🧪 TESTING CROSS-DEVICE

### Test as Admin (You)

1. **Login on laptop**:
   - Go to settings
   - Should see "👑 ADMIN"
   - All features unlocked

2. **Open on phone** (same account):
   - Login with watersjb@gmail.com
   - Go to settings
   - Should see "👑 ADMIN"
   - All features unlocked

3. **Try incognito/different browser**:
   - Still works!
   - Database is source of truth

### Test as Premium User

1. **Grant premium** to test account:
   ```sql
   UPDATE memberships 
   SET plan = 'premium' 
   WHERE email = 'test@example.com';
   ```

2. **Login on device 1**: ✅ Premium works
3. **Login on device 2**: ✅ Premium works
4. **Revoke premium**:
   ```sql
   UPDATE memberships 
   SET plan = 'free' 
   WHERE email = 'test@example.com';
   ```
5. **Refresh both devices**: ❌ Premium gone (both devices)

---

## 🔐 SECURITY

### Row Level Security (RLS)

**Enabled on memberships table**:
- Users can ONLY read their own membership
- Cannot see other users' data
- Cannot modify their own plan
- Only admins (service_role) can modify

### Policies

```sql
-- Users can view own membership
CREATE POLICY "Users view own membership" ON memberships
    FOR SELECT USING (auth.uid() = user_id);

-- Only service role can modify
CREATE POLICY "Service role full access" ON memberships
    FOR ALL USING (auth.role() = 'service_role');
```

**This means**:
- Users can't hack their own membership
- Only you (via SQL) can change plans
- Safe for production use

---

## 💳 PAYMENT INTEGRATION (FUTURE)

When you add Stripe/Lemon Squeezy:

**Webhook receives payment** →
```sql
INSERT INTO memberships (user_id, email, plan, status)
VALUES ('user_id', 'user@email.com', 'premium', 'active')
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', status = 'active';
```

**User refreshes app** →
- Checks database
- Sees premium
- Features unlocked instantly

---

## 📊 DATABASE STRUCTURE

```sql
memberships table:
┌─────────────┬──────────┬─────────┬────────────┬──────────┬──────────────┐
│ id          │ user_id  │ email   │ plan       │ status   │ is_admin     │
├─────────────┼──────────┼─────────┼────────────┼──────────┼──────────────┤
│ uuid        │ uuid     │ text    │ text       │ text     │ boolean      │
│ primary key │ unique   │ indexed │ free/prem  │ active   │ true/false   │
└─────────────┴──────────┴─────────┴────────────┴──────────┴──────────────┘
```

**Why this works**:
- `user_id`: Links to auth.users (Supabase auth)
- `email`: For admin queries
- `plan`: 'free', 'premium', 'beta'
- `is_admin`: TRUE = bypass all gates

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Run SUPABASE_MEMBERSHIP_SETUP.sql
- [ ] Verify your admin status (should show is_admin: true)
- [ ] Deploy updated app.html
- [ ] Deploy updated settings.html
- [ ] Test on laptop - see "👑 ADMIN"
- [ ] Test on phone - see "👑 ADMIN"
- [ ] Grant premium to a beta user
- [ ] Have them test on multiple devices

---

## 📱 WHAT USERS SEE

### Free User (Multiple Devices)
**Device 1**: Settings → "FREE TIER" + 🔒 badges
**Device 2**: Settings → "FREE TIER" + 🔒 badges
**Consistency**: Same everywhere ✅

### Premium User (Multiple Devices)
**Device 1**: Settings → "⭐ PREMIUM" + unlocked features
**Device 2**: Settings → "⭐ PREMIUM" + unlocked features
**Consistency**: Same everywhere ✅

### Admin (You - Multiple Devices)
**Laptop**: Settings → "👑 ADMIN" + everything unlocked
**Phone**: Settings → "👑 ADMIN" + everything unlocked
**Tablet**: Settings → "👑 ADMIN" + everything unlocked
**Consistency**: Same everywhere ✅

---

## 🔧 TROUBLESHOOTING

### "Still showing FREE TIER on phone"

1. Check database:
   ```sql
   SELECT * FROM memberships WHERE email = 'watersjb@gmail.com';
   ```
2. Verify is_admin = TRUE
3. Clear app cache on phone
4. Hard refresh (close/reopen)
5. Check browser console for errors

### "User has premium in database but not in app"

1. Check they're logged in: `await supabaseClient.auth.getUser()`
2. Check RLS policies are enabled
3. Check network tab for API errors
4. Verify user_id matches: `SELECT user_id FROM memberships WHERE email = '...'`

### "localStorage fallback being used"

- This means Supabase query failed
- Check console for errors
- Check internet connection
- Verify Supabase project is running

---

## ✅ FILES UPDATED

1. **SUPABASE_MEMBERSHIP_SETUP.sql** - Database setup
2. **MEMBERSHIP_MANAGEMENT_QUERIES.sql** - Admin queries
3. **app.html** - Now checks Supabase database
4. **settings.html** - Now checks Supabase database

---

**Now your membership system works across ALL devices!** 🎉

Users can login anywhere and their premium/admin status follows them.

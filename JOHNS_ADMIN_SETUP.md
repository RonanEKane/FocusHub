# John's Admin Setup - watersjb@gmail.com

## ✅ YOU'RE ALL SET!

Your email **watersjb@gmail.com** is now configured as admin in the app.

---

## 🎯 NEXT TIME YOU LOGIN

When you login with **watersjb@gmail.com**:

1. ✅ Automatic premium access
2. ✅ Settings show **"👑 ADMIN"** badge
3. ✅ All 7 reflection traditions unlocked
4. ✅ All 3 AI intensity modes available
5. ✅ No upgrade button (you don't need it)
6. ✅ Bypass all feature gates

---

## 💼 GRANT PREMIUM TO BETA TESTERS

### Via Supabase Dashboard

1. Go to **https://supabase.com**
2. Sign in (probably with watersjb@gmail.com)
3. Select **FocusHub** project
4. Left sidebar → **"SQL Editor"**
5. Paste this query (replace email):

```sql
-- Grant premium to a beta user
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'betauser@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium', 
    status = 'active',
    updated_at = NOW();
```

6. Click **"Run"**
7. Done! They now have premium.

---

## 📊 USEFUL QUERIES

### See All Beta Users
```sql
-- View everyone who signed up
SELECT 
    email, 
    created_at, 
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;
```

### Grant Premium to Multiple Users
```sql
-- Grant to multiple emails at once
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
)
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', status = 'active';
```

### Check Who Has Premium
```sql
SELECT 
    email,
    plan,
    status,
    started_at
FROM memberships
WHERE plan = 'premium' AND status = 'active'
ORDER BY started_at DESC;
```

### Revoke Someone's Premium (if needed)
```sql
UPDATE memberships
SET plan = 'free', status = 'active'
WHERE email = 'user@example.com';
```

---

## 🚀 FIRST-TIME SETUP IN SUPABASE

If you haven't created the memberships table yet:

1. Go to Supabase → SQL Editor
2. Paste this entire block:

```sql
-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'premium', 'beta'
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    started_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_email ON memberships(email);

-- Security: Enable Row Level Security
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own membership
CREATE POLICY "Users view own membership" ON memberships
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Service role (admin) has full access
CREATE POLICY "Service role full access" ON memberships
    FOR ALL USING (auth.role() = 'service_role');
```

3. Click "Run"
4. Table created!

---

## 👥 ADD MORE ADMINS (Optional)

If you want to give someone else admin access:

1. Open `app.html`
2. Find line ~548:
```javascript
const adminEmails = ['watersjb@gmail.com']; // John Waters - Admin
```

3. Add more emails:
```javascript
const adminEmails = [
    'watersjb@gmail.com',      // John Waters
    'cofounder@focushub.app',  // Co-founder
    'admin@focushub.app'       // Support admin
];
```

---

## 🎯 QUICK CHECKLIST

Before beta launch:
- [ ] Login to Supabase (https://supabase.com)
- [ ] Run membership table creation SQL (one time)
- [ ] Test your admin access (should see 👑 ADMIN)
- [ ] Grant premium to beta testers
- [ ] Send beta testers login info
- [ ] Monitor in Supabase dashboard

---

## 📱 MOBILE MANAGEMENT

Download **Supabase app** on your phone:
- iOS: App Store → "Supabase"
- Android: Play Store → "Supabase"

Then:
1. Login with watersjb@gmail.com
2. Select FocusHub project
3. View/manage users on the go
4. Run SQL queries from phone

---

## 🔧 TROUBLESHOOTING

### "I don't see the admin badge"
1. Make sure you're logged in with **watersjb@gmail.com**
2. Clear browser cache: Ctrl+Shift+R
3. Check console for errors (F12)

### "User has premium but it's not working"
```sql
-- Check their status
SELECT * FROM memberships WHERE email = 'user@example.com';

-- If it looks right, have them:
-- 1. Logout
-- 2. Clear cache
-- 3. Login again
```

### "Need to see all data"
```sql
-- Complete user overview
SELECT 
    u.email,
    u.created_at,
    u.last_sign_in_at,
    m.plan,
    m.status
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;
```

---

## 📞 SUPPORT

If you need help with Supabase or user management:
1. Check **SUPABASE_ADMIN_GUIDE.md** (comprehensive guide)
2. Supabase docs: https://supabase.com/docs
3. Ask me in our next conversation!

---

**You're all set, John! Your admin powers are active.** 👑

When you deploy the updated app.html, you'll automatically have full premium access whenever you login with watersjb@gmail.com.

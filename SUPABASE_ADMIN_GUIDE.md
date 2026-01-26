# FocusHub Admin Guide - User Management

**Your Role**: Admin/Owner  
**Platform**: Supabase  
**Goal**: Manage user access, memberships, and settings

---

## 🔐 ACCESSING SUPABASE DASHBOARD

### Step 1: Login
1. Go to **https://supabase.com**
2. Click "Sign in"
3. Use your account (likely Google/GitHub)
4. Select your **FocusHub** project

### Step 2: Navigate to Tables
1. Left sidebar → Click **"Table Editor"**
2. You'll see all your database tables

---

## 👥 USER MANAGEMENT

### View All Users

**Method 1: Authentication Tab**
1. Left sidebar → **"Authentication"**
2. Click **"Users"**
3. See list of all registered users with:
   - Email
   - Created date
   - Last sign in
   - User ID (UUID)

**Method 2: SQL Editor** (More Powerful)
```sql
-- See all users with their membership info
SELECT 
    u.email,
    u.created_at,
    u.last_sign_in_at,
    m.plan,
    m.status,
    m.started_at
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;
```

---

## 💳 MANAGING MEMBERSHIPS

### Create Memberships Table (If Not Exists)

```sql
-- Run this in SQL Editor (left sidebar → "SQL Editor")
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'premium', 'beta'
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    started_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    notes TEXT, -- Admin notes
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_email ON memberships(email);

-- Enable Row Level Security (important!)
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own membership
CREATE POLICY "Users can view own membership" ON memberships
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Service role (admin) can do everything
CREATE POLICY "Service role full access" ON memberships
    FOR ALL USING (auth.role() = 'service_role');
```

---

## ⚙️ GRANT USER PREMIUM ACCESS

### Method 1: Table Editor (Easy)

1. **Table Editor** → Select **"memberships"** table
2. Click **"Insert row"** button
3. Fill in:
   - `user_id`: Copy from Authentication → Users
   - `email`: User's email
   - `plan`: `premium`
   - `status`: `active`
   - `started_at`: Now (auto-filled)
4. Click **"Save"**

### Method 2: SQL Query (Faster)

```sql
-- Grant premium to specific user by email
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'user@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    status = 'active',
    updated_at = NOW();
```

### Method 3: Bulk Grant Premium

```sql
-- Grant premium to all beta users
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'beta', 'active'
FROM auth.users
WHERE email LIKE '%@yourdomain.com' -- Your test domain
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'beta',
    status = 'active',
    updated_at = NOW();
```

---

## 👑 GIVE YOURSELF ADMIN ACCESS

### Option 1: Create Admin Column

```sql
-- Add admin flag to memberships table
ALTER TABLE memberships ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Make yourself admin
UPDATE memberships
SET is_admin = TRUE
WHERE email = 'your@email.com';
```

### Option 2: Dedicated Admins Table

```sql
-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Add yourself as admin
INSERT INTO admins (user_id, email)
SELECT id, email FROM auth.users
WHERE email = 'your@email.com';
```

### Option 3: Use Service Role (Simplest for Now)

Just use Supabase dashboard with your login - you already have full access!

---

## 🎯 COMMON ADMIN TASKS

### 1. Grant Premium to Specific User

```sql
-- By email
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'john@example.com'
ON CONFLICT (user_id) DO UPDATE SET plan = 'premium', status = 'active';
```

### 2. Revoke Premium (Downgrade to Free)

```sql
UPDATE memberships
SET 
    plan = 'free',
    status = 'active',
    updated_at = NOW()
WHERE email = 'john@example.com';
```

### 3. Cancel Subscription

```sql
UPDATE memberships
SET 
    status = 'cancelled',
    expires_at = NOW() + INTERVAL '30 days', -- Grace period
    updated_at = NOW()
WHERE email = 'john@example.com';
```

### 4. Find All Premium Users

```sql
SELECT 
    m.email,
    m.plan,
    m.status,
    m.started_at,
    u.last_sign_in_at
FROM memberships m
JOIN auth.users u ON m.user_id = u.id
WHERE m.plan = 'premium' AND m.status = 'active'
ORDER BY m.started_at DESC;
```

### 5. See User Activity

```sql
SELECT 
    email,
    last_sign_in_at,
    created_at,
    EXTRACT(DAY FROM NOW() - last_sign_in_at) as days_since_login
FROM auth.users
ORDER BY last_sign_in_at DESC;
```

### 6. Delete Inactive Users

```sql
-- Find users who haven't logged in for 90+ days
SELECT email, last_sign_in_at
FROM auth.users
WHERE last_sign_in_at < NOW() - INTERVAL '90 days'
OR last_sign_in_at IS NULL;

-- Delete them (careful!)
-- DELETE FROM auth.users
-- WHERE last_sign_in_at < NOW() - INTERVAL '90 days';
```

---

## 🔍 CHECKING USER SETTINGS

### View User's Complete Profile

```sql
SELECT 
    u.email,
    u.created_at,
    u.last_sign_in_at,
    m.plan,
    m.status,
    m.started_at,
    m.notes
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
WHERE u.email = 'user@example.com';
```

### See What Features User Has Access To

```sql
-- Check if user should have premium features
SELECT 
    email,
    plan,
    status,
    CASE 
        WHEN plan IN ('premium', 'beta') AND status = 'active' THEN 'FULL ACCESS'
        ELSE 'FREE TIER'
    END as access_level
FROM memberships m
JOIN auth.users u ON m.user_id = u.id
WHERE email = 'user@example.com';
```

---

## 📊 ANALYTICS QUERIES

### Total Users by Plan

```sql
SELECT 
    plan,
    COUNT(*) as user_count
FROM memberships
WHERE status = 'active'
GROUP BY plan
ORDER BY user_count DESC;
```

### Monthly Signups

```sql
SELECT 
    DATE_TRUNC('month', created_at) as month,
    COUNT(*) as signups
FROM auth.users
GROUP BY month
ORDER BY month DESC;
```

### Revenue Potential (if all premium)

```sql
SELECT 
    COUNT(*) as premium_users,
    COUNT(*) * 29 as monthly_revenue_potential
FROM memberships
WHERE plan = 'premium' AND status = 'active';
```

---

## 🎨 ADMIN UI IN APP

### Add Admin Panel to app.html

You can create an admin-only page that checks if you're logged in as admin:

```javascript
// In app.html or new admin.html
async function checkAdminAccess() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    
    // Check if admin
    const { data } = await supabaseClient
        .from('admins')
        .select('*')
        .eq('email', user.email)
        .single();
    
    if (!data) {
        alert('Admin access required');
        window.location.href = 'app.html';
        return false;
    }
    return true;
}

// Load all users for admin management
async function loadAllUsers() {
    const { data, error } = await supabaseClient
        .from('memberships')
        .select(`
            *,
            user:auth.users(email, created_at, last_sign_in_at)
        `)
        .order('created_at', { ascending: false });
    
    return data;
}

// Grant premium to user
async function grantPremium(userId) {
    const { error } = await supabaseClient
        .from('memberships')
        .upsert({
            user_id: userId,
            plan: 'premium',
            status: 'active'
        });
    
    if (!error) alert('Premium granted!');
}
```

---

## 🚨 IMPORTANT SECURITY NOTES

### Row Level Security (RLS)

**CRITICAL**: Always enable RLS on tables:
```sql
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
```

**Policies**:
- Users can ONLY see their own membership
- Admin operations use service_role key (never exposed to client)

### Service Role Key

**Where to find**:
1. Supabase Dashboard
2. Settings → API
3. Copy "service_role" key (secret)

**NEVER** expose service_role in client code!  
Only use in:
- Backend webhooks
- Admin scripts
- Server-side operations

### Client vs Service Role

**anon/public key** (client):
- Users can only see their own data
- Limited by RLS policies

**service_role key** (server):
- Bypasses RLS
- Full database access
- Use for admin operations

---

## 🎯 QUICK REFERENCE

### Your Admin Email
```
your@email.com  ← Replace with your actual email
```

### Grant Yourself Full Access

```sql
-- Run once in SQL Editor
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', TRUE
FROM auth.users
WHERE email = 'your@email.com'
ON CONFLICT (user_id) DO UPDATE SET 
    plan = 'premium', 
    status = 'active', 
    is_admin = TRUE;
```

### Daily Admin Queries

```sql
-- See all users
SELECT email, created_at, last_sign_in_at FROM auth.users ORDER BY created_at DESC;

-- See all premium users
SELECT email, plan, started_at FROM memberships WHERE plan = 'premium';

-- Grant premium to someone
UPDATE memberships SET plan = 'premium' WHERE email = 'user@example.com';

-- Revoke premium
UPDATE memberships SET plan = 'free' WHERE email = 'user@example.com';
```

---

## 📱 MOBILE ACCESS

### Supabase Mobile App

1. Download "Supabase" app (iOS/Android)
2. Login with your account
3. Select FocusHub project
4. View/edit data on the go

---

## 🔧 TROUBLESHOOTING

### Can't See Membership Data?

**Problem**: User's membership not loading in app  
**Solution**:
```sql
-- Check if membership exists
SELECT * FROM memberships WHERE email = 'user@example.com';

-- If missing, create it
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'free', 'active'
FROM auth.users
WHERE email = 'user@example.com';
```

### User Has Premium But App Shows Free?

**Check**:
1. Clear browser cache
2. Logout and login again
3. Run query:
```sql
SELECT plan, status FROM memberships 
WHERE email = 'user@example.com';
```

### Need to Reset Everything?

```sql
-- DANGER: This deletes all membership data!
-- TRUNCATE TABLE memberships;
-- Only use in development!
```

---

## 📚 NEXT STEPS

1. ✅ Run membership table creation SQL
2. ✅ Grant yourself premium + admin
3. ✅ Test in app (should see PREMIUM badge)
4. ✅ Grant premium to beta testers
5. ⏳ Build admin panel UI (optional)
6. ⏳ Set up payment webhooks (when ready)

---

**You now have full control over user access!** 👑

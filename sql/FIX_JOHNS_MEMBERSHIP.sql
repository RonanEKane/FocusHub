-- ========================================
-- EMERGENCY FIX: John's Membership Setup
-- Run this in Supabase SQL Editor NOW
-- ========================================

-- Step 1: Check if membership exists
SELECT 
    m.user_id,
    m.email,
    m.plan,
    m.is_admin,
    m.created_at
FROM memberships m
WHERE m.email = 'watersjb@gmail.com';

-- If the above returns NOTHING, continue below:
-- ========================================

-- Step 2: Get John's user ID from auth
SELECT 
    id as user_id,
    email,
    created_at
FROM auth.users 
WHERE email = 'watersjb@gmail.com';

-- Copy the user_id from above, then run Step 3

-- ========================================
-- Step 3: Insert/Update membership
-- Replace 'PASTE_USER_ID_HERE' with actual ID from Step 2
-- ========================================

INSERT INTO memberships (
    user_id,
    email,
    plan,
    is_admin,
    subscription_status,
    created_at,
    updated_at
)
VALUES (
    'PASTE_USER_ID_HERE',  -- ⚠️ REPLACE THIS
    'watersjb@gmail.com',
    'premium',
    true,
    'active',
    NOW(),
    NOW()
)
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    is_admin = true,
    subscription_status = 'active',
    updated_at = NOW();

-- ========================================
-- Alternative: Auto-insert without needing to copy ID
-- (Use this if you don't want to copy/paste)
-- ========================================

INSERT INTO memberships (
    user_id,
    email,
    plan,
    is_admin,
    subscription_status,
    created_at,
    updated_at
)
SELECT 
    id,
    email,
    'premium',
    true,
    'active',
    NOW(),
    NOW()
FROM auth.users 
WHERE email = 'watersjb@gmail.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    is_admin = true,
    subscription_status = 'active',
    updated_at = NOW();

-- ========================================
-- Step 4: Verify it worked
-- ========================================

SELECT 
    m.user_id,
    m.email,
    m.plan,
    m.is_admin,
    m.subscription_status,
    m.created_at,
    u.email as auth_email
FROM memberships m
LEFT JOIN auth.users u ON u.id = m.user_id
WHERE m.email = 'watersjb@gmail.com';

-- Expected result:
-- plan = 'premium'
-- is_admin = true
-- subscription_status = 'active'
-- auth_email = 'watersjb@gmail.com'

-- ========================================
-- Step 5: Check RLS policies (if still not working)
-- ========================================

-- See what policies exist on memberships table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'memberships';

-- If you see restrictive policies, you may need to adjust them
-- Ensure users can read their own membership:

-- DROP old policies if needed
DROP POLICY IF EXISTS "Users can view own membership" ON memberships;

-- Create policy that allows users to see their own data
CREATE POLICY "Users can view own membership" 
ON memberships FOR SELECT 
USING (auth.uid() = user_id);

-- ========================================
-- AFTER RUNNING THIS:
-- 1. Go to app → Settings
-- 2. Hard refresh (Cmd+Shift+R)
-- 3. Should show "👑 ADMIN"
-- 4. "Admin Panel" button should appear
-- ========================================

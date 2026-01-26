-- =====================================================
-- FORGET THE VIEW - JUST USE THIS QUERY
-- Save this as a bookmark in Supabase SQL Editor
-- =====================================================

-- See all users with their membership info
SELECT 
    u.email,
    u.id as user_id,
    COALESCE(m.plan, 'free') as plan,
    COALESCE(m.is_admin, FALSE) as is_admin,
    COALESCE(m.status, 'active') as status,
    u.created_at as signup_date,
    u.last_sign_in_at as last_login,
    u.confirmed_at,
    m.started_at as premium_since
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;

-- =====================================================
-- HOW TO USE THIS
-- =====================================================
-- 1. Copy the SELECT query above
-- 2. Paste in SQL Editor
-- 3. Click "Save" to bookmark it
-- 4. Name it "View All Users & Memberships"
-- 5. Run it anytime to see everything!

-- =====================================================
-- TO EDIT USERS
-- =====================================================
-- Don't edit in the query results - go to:
-- Table Editor → memberships table → Click any row

-- Or use UPDATE commands:

-- Make watersjb@gmail.com admin:
UPDATE memberships
SET plan = 'premium', is_admin = TRUE, status = 'active'
WHERE email = 'watersjb@gmail.com';

-- Grant premium to someone:
UPDATE memberships
SET plan = 'premium', status = 'active'
WHERE email = 'user@example.com';

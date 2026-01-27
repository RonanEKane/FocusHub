-- =====================================================
-- ULTRA-SIMPLE COMMANDS FOR SUPABASE TABLE EDITOR
-- Copy/paste these into SQL Editor as needed
-- =====================================================

-- =====================================================
-- VIEW ALL USERS WITH MEMBERSHIP INFO
-- =====================================================
-- Use this to see everything at once
SELECT 
    u.email,
    COALESCE(m.plan, 'free') as plan,
    COALESCE(m.is_admin, FALSE) as is_admin,
    COALESCE(m.status, 'active') as status,
    u.last_sign_in_at,
    u.created_at as signup_date
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;


-- =====================================================
-- MAKE YOURSELF ADMIN
-- =====================================================
UPDATE memberships
SET plan = 'premium', is_admin = TRUE, status = 'active'
WHERE email = 'watersjb@gmail.com';

-- If row doesn't exist, insert it:
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, 'watersjb@gmail.com', 'premium', 'active', TRUE
FROM auth.users
WHERE email = 'watersjb@gmail.com'
ON CONFLICT (user_id) DO NOTHING;


-- =====================================================
-- GRANT PREMIUM TO USER
-- =====================================================
-- Replace 'user@example.com' with actual email
UPDATE memberships
SET plan = 'premium', status = 'active'
WHERE email = 'user@example.com';

-- If row doesn't exist:
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, 'user@example.com', 'premium', 'active', FALSE
FROM auth.users
WHERE email = 'user@example.com'
ON CONFLICT (user_id) DO NOTHING;


-- =====================================================
-- MAKE USER AN ADMIN
-- =====================================================
UPDATE memberships
SET plan = 'premium', is_admin = TRUE, status = 'active'
WHERE email = 'user@example.com';


-- =====================================================
-- REVOKE PREMIUM (BACK TO FREE)
-- =====================================================
UPDATE memberships
SET plan = 'free', is_admin = FALSE, status = 'active'
WHERE email = 'user@example.com';


-- =====================================================
-- CHECK SPECIFIC USER
-- =====================================================
SELECT 
    u.email,
    m.plan,
    m.is_admin,
    m.status,
    u.last_sign_in_at
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
WHERE u.email = 'watersjb@gmail.com';


-- =====================================================
-- SEE ALL ADMINS
-- =====================================================
SELECT email, plan, is_admin, started_at
FROM memberships
WHERE is_admin = TRUE;


-- =====================================================
-- SEE ALL PREMIUM USERS
-- =====================================================
SELECT email, plan, is_admin, started_at
FROM memberships
WHERE plan = 'premium' AND status = 'active'
ORDER BY started_at DESC;


-- =====================================================
-- EDIT IN TABLE EDITOR
-- =====================================================
-- Go to: Table Editor → memberships table
-- Click any row to edit directly:
-- - Change plan: 'free' or 'premium'
-- - Change is_admin: true or false
-- - Change status: 'active', 'cancelled', 'expired'

-- =====================================================
-- MANAGE USER MEMBERSHIPS
-- Common admin tasks for FocusHub
-- =====================================================

-- =====================================================
-- 1. GRANT PREMIUM TO A USER
-- =====================================================
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', FALSE
FROM auth.users
WHERE email = 'user@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    status = 'active',
    updated_at = NOW();


-- =====================================================
-- 2. GRANT PREMIUM TO MULTIPLE BETA USERS
-- =====================================================
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', FALSE
FROM auth.users
WHERE email IN (
    'beta1@example.com',
    'beta2@example.com',
    'beta3@example.com'
)
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    status = 'active',
    updated_at = NOW();


-- =====================================================
-- 3. MAKE SOMEONE AN ADMIN (+ PREMIUM)
-- =====================================================
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', TRUE
FROM auth.users
WHERE email = 'newadmin@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    status = 'active',
    is_admin = TRUE,
    updated_at = NOW();


-- =====================================================
-- 4. REVOKE PREMIUM (DOWNGRADE TO FREE)
-- =====================================================
UPDATE memberships
SET 
    plan = 'free',
    status = 'active',
    is_admin = FALSE,
    updated_at = NOW()
WHERE email = 'user@example.com';


-- =====================================================
-- 5. VIEW ALL USERS WITH THEIR MEMBERSHIP
-- =====================================================
SELECT 
    u.email,
    u.created_at as signup_date,
    u.last_sign_in_at,
    COALESCE(m.plan, 'none') as plan,
    COALESCE(m.status, 'none') as status,
    COALESCE(m.is_admin, FALSE) as is_admin,
    m.started_at as premium_since
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;


-- =====================================================
-- 6. VIEW ONLY PREMIUM USERS
-- =====================================================
SELECT 
    email,
    plan,
    status,
    is_admin,
    started_at
FROM memberships
WHERE plan = 'premium' AND status = 'active'
ORDER BY started_at DESC;


-- =====================================================
-- 7. VIEW ONLY ADMINS
-- =====================================================
SELECT 
    email,
    plan,
    status,
    is_admin,
    started_at
FROM memberships
WHERE is_admin = TRUE
ORDER BY started_at DESC;


-- =====================================================
-- 8. CHECK SPECIFIC USER'S MEMBERSHIP
-- =====================================================
SELECT 
    u.email,
    m.plan,
    m.status,
    m.is_admin,
    m.started_at,
    u.last_sign_in_at
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
WHERE u.email = 'user@example.com';


-- =====================================================
-- 9. COUNT USERS BY PLAN
-- =====================================================
SELECT 
    COALESCE(m.plan, 'no_membership') as plan,
    COUNT(*) as user_count
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
GROUP BY m.plan
ORDER BY user_count DESC;


-- =====================================================
-- 10. CREATE MEMBERSHIP FOR ALL EXISTING USERS
-- (Run once to initialize memberships for users who don't have one)
-- =====================================================
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT 
    u.id, 
    u.email, 
    'free', 
    'active', 
    FALSE
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1 FROM memberships m WHERE m.user_id = u.id
)
ON CONFLICT (user_id) DO NOTHING;


-- =====================================================
-- 11. REVENUE CALCULATION
-- =====================================================
SELECT 
    COUNT(*) as premium_users,
    COUNT(*) * 29 as monthly_revenue_usd,
    COUNT(*) * 29 * 12 as annual_revenue_usd
FROM memberships
WHERE plan = 'premium' AND status = 'active' AND is_admin = FALSE;


-- =====================================================
-- 12. CANCEL SUBSCRIPTION (KEEP UNTIL EXPIRES)
-- =====================================================
UPDATE memberships
SET 
    status = 'cancelled',
    expires_at = NOW() + INTERVAL '30 days',
    updated_at = NOW()
WHERE email = 'user@example.com';


-- =====================================================
-- 13. DELETE USER'S MEMBERSHIP (CAREFUL!)
-- =====================================================
-- DELETE FROM memberships WHERE email = 'user@example.com';


-- =====================================================
-- 14. FIND USERS WITHOUT MEMBERSHIPS
-- =====================================================
SELECT 
    u.email,
    u.created_at
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
WHERE m.id IS NULL
ORDER BY u.created_at DESC;


-- =====================================================
-- QUICK REFERENCE
-- =====================================================

-- Grant premium: Line 11-18
-- Make admin: Line 36-44
-- Revoke premium: Line 51-58
-- View all users: Line 65-76
-- Check specific user: Line 116-125

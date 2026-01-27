-- Common Admin SQL Queries
-- Copy individual queries as needed

-- =====================================================
-- GRANT PREMIUM TO A USER
-- =====================================================
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'user@example.com'
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', status = 'active', updated_at = NOW();


-- =====================================================
-- GRANT PREMIUM TO MULTIPLE USERS
-- =====================================================
INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email IN (
    'user1@example.com',
    'user2@example.com',
    'user3@example.com'
)
ON CONFLICT (user_id) 
DO UPDATE SET plan = 'premium', status = 'active', updated_at = NOW();


-- =====================================================
-- REVOKE PREMIUM (DOWNGRADE TO FREE)
-- =====================================================
UPDATE memberships
SET plan = 'free', status = 'active', updated_at = NOW()
WHERE email = 'user@example.com';


-- =====================================================
-- SEE ALL USERS
-- =====================================================
SELECT 
    email, 
    created_at, 
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;


-- =====================================================
-- SEE ALL PREMIUM USERS
-- =====================================================
SELECT 
    email,
    plan,
    status,
    started_at
FROM memberships
WHERE plan = 'premium' AND status = 'active'
ORDER BY started_at DESC;


-- =====================================================
-- SEE COMPLETE USER INFO
-- =====================================================
SELECT 
    u.email,
    u.created_at as signup_date,
    u.last_sign_in_at,
    m.plan,
    m.status,
    m.started_at as premium_since
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;


-- =====================================================
-- CHECK SPECIFIC USER'S MEMBERSHIP
-- =====================================================
SELECT * 
FROM memberships 
WHERE email = 'user@example.com';


-- =====================================================
-- TOTAL USER COUNTS
-- =====================================================
SELECT 
    COUNT(*) as total_users,
    COUNT(CASE WHEN last_sign_in_at > NOW() - INTERVAL '30 days' THEN 1 END) as active_users,
    COUNT(CASE WHEN last_sign_in_at > NOW() - INTERVAL '7 days' THEN 1 END) as weekly_active
FROM auth.users;


-- =====================================================
-- REVENUE POTENTIAL
-- =====================================================
SELECT 
    COUNT(*) as premium_users,
    COUNT(*) * 29 as monthly_revenue_usd
FROM memberships
WHERE plan = 'premium' AND status = 'active';


-- =====================================================
-- CANCEL SUBSCRIPTION (KEEP UNTIL EXPIRES)
-- =====================================================
UPDATE memberships
SET 
    status = 'cancelled',
    expires_at = NOW() + INTERVAL '30 days',
    updated_at = NOW()
WHERE email = 'user@example.com';


-- =====================================================
-- DELETE USER COMPLETELY (DANGEROUS!)
-- =====================================================
-- Uncomment to use - this deletes the user from auth
-- DELETE FROM auth.users WHERE email = 'user@example.com';

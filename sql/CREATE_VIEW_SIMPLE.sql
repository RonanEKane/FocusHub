-- First, drop the view if it exists (in case there's a conflict)
DROP VIEW IF EXISTS user_memberships;

-- Create a fresh view that combines users and memberships
CREATE VIEW user_memberships AS
SELECT 
    u.id as user_id,
    u.email,
    u.created_at as signup_date,
    u.last_sign_in_at,
    u.confirmed_at,
    COALESCE(m.plan, 'free') as plan,
    COALESCE(m.status, 'active') as status,
    COALESCE(m.is_admin, FALSE) as is_admin,
    m.started_at as premium_since,
    m.expires_at,
    m.notes
FROM auth.users u
LEFT JOIN memberships m ON u.id = m.user_id
ORDER BY u.created_at DESC;

-- Test it works
SELECT * FROM user_memberships;

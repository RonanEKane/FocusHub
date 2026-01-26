-- Create a VIEW that combines users and memberships
-- This makes it easy to see everything in one table in Supabase

CREATE OR REPLACE VIEW user_memberships AS
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

-- Now you can query this view like a table:
-- SELECT * FROM user_memberships;

-- To edit memberships, still use the memberships table:
-- UPDATE memberships SET plan = 'premium', is_admin = TRUE WHERE email = 'watersjb@gmail.com';

-- Verify the view works
SELECT * FROM user_memberships LIMIT 10;

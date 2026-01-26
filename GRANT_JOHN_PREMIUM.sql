-- Grant Premium to watersjb@gmail.com
-- Run this AFTER creating the memberships table

INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'watersjb@gmail.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium', 
    status = 'active',
    updated_at = NOW();

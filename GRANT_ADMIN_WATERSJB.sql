-- Grant Admin + Premium to John (watersjb@gmail.com)
-- Run this AFTER creating the memberships table

-- This will work cross-device, cross-browser
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT 
    id, 
    email, 
    'premium', 
    'active', 
    TRUE
FROM auth.users
WHERE email = 'watersjb@gmail.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    status = 'active',
    is_admin = TRUE,
    updated_at = NOW();

-- Verify it worked
SELECT 
    email,
    plan,
    status,
    is_admin,
    created_at
FROM memberships
WHERE email = 'watersjb@gmail.com';

-- Expected result:
-- email: watersjb@gmail.com
-- plan: premium
-- status: active
-- is_admin: true

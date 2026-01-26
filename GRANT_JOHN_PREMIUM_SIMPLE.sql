-- Grant Premium to watersjb@gmail.com
-- SIMPLE VERSION (no ON CONFLICT)
-- Run this AFTER fixing the table

INSERT INTO memberships (user_id, email, plan, status)
SELECT id, email, 'premium', 'active'
FROM auth.users
WHERE email = 'watersjb@gmail.com';


-- If you get "duplicate key" error, use this instead:
-- UPDATE memberships
-- SET plan = 'premium', status = 'active', updated_at = NOW()
-- WHERE email = 'watersjb@gmail.com';

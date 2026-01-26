-- Add is_admin column to existing memberships table
-- Run this if you get "column is_admin does not exist" error

ALTER TABLE memberships 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- Create index for fast admin lookups
CREATE INDEX IF NOT EXISTS idx_memberships_admin 
ON memberships(is_admin) 
WHERE is_admin = TRUE;

-- Verify column was added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'memberships' AND column_name = 'is_admin';

-- Now grant yourself admin
UPDATE memberships
SET is_admin = TRUE, plan = 'premium', status = 'active'
WHERE email = 'watersjb@gmail.com';

-- If no row exists yet, insert it
INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', TRUE
FROM auth.users
WHERE email = 'watersjb@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- Verify it worked
SELECT email, plan, status, is_admin 
FROM memberships 
WHERE email = 'watersjb@gmail.com';

-- Expected result:
-- email: watersjb@gmail.com
-- plan: premium
-- status: active
-- is_admin: true

-- FIX EXISTING MEMBERSHIPS TABLE
-- Choose ONE option below:

-- =====================================================
-- OPTION 1: ADD UNIQUE CONSTRAINT TO EXISTING TABLE
-- Use this if table already exists and has data
-- =====================================================
ALTER TABLE memberships 
ADD CONSTRAINT memberships_user_id_unique UNIQUE (user_id);


-- =====================================================
-- OPTION 2: DROP AND RECREATE (FRESH START)
-- WARNING: This deletes all existing membership data!
-- Only use if you're starting fresh or in development
-- =====================================================

-- Uncomment the lines below to use:
-- DROP TABLE IF EXISTS memberships CASCADE;
-- 
-- CREATE TABLE memberships (
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--     user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
--     email TEXT NOT NULL,
--     plan TEXT NOT NULL DEFAULT 'free',
--     status TEXT NOT NULL DEFAULT 'active',
--     started_at TIMESTAMP DEFAULT NOW(),
--     expires_at TIMESTAMP,
--     notes TEXT,
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP DEFAULT NOW()
-- );
-- 
-- CREATE INDEX idx_memberships_user_id ON memberships(user_id);
-- CREATE INDEX idx_memberships_email ON memberships(email);
-- 
-- ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Users view own membership" ON memberships
--     FOR SELECT USING (auth.uid() = user_id);
-- 
-- CREATE POLICY "Service role full access" ON memberships
--     FOR ALL USING (auth.role() = 'service_role');

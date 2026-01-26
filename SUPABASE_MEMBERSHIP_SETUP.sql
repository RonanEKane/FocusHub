-- =====================================================
-- FOCUSHUB MEMBERSHIP SYSTEM - CROSS-DEVICE ACCESS
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop existing table if you want to start fresh
-- DROP TABLE IF EXISTS memberships CASCADE;

-- Create memberships table with admin support
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'premium', 'beta'
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    is_admin BOOLEAN DEFAULT FALSE, -- ADMIN FLAG
    started_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_email ON memberships(email);
CREATE INDEX IF NOT EXISTS idx_memberships_is_admin ON memberships(is_admin);

-- Enable Row Level Security
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own membership
CREATE POLICY "Users view own membership" ON memberships
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Service role (admin) has full access
CREATE POLICY "Service role full access" ON memberships
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- GRANT ADMIN + PREMIUM TO JOHN (watersjb@gmail.com)
-- =====================================================

INSERT INTO memberships (user_id, email, plan, status, is_admin)
SELECT id, email, 'premium', 'active', TRUE
FROM auth.users
WHERE email = 'watersjb@gmail.com'
ON CONFLICT (user_id) 
DO UPDATE SET 
    plan = 'premium',
    status = 'active',
    is_admin = TRUE,
    updated_at = NOW();

-- =====================================================
-- VERIFY IT WORKED
-- =====================================================

SELECT 
    email,
    plan,
    status,
    is_admin,
    started_at
FROM memberships
WHERE email = 'watersjb@gmail.com';

-- Should show:
-- email: watersjb@gmail.com
-- plan: premium
-- status: active
-- is_admin: true

-- FocusHub Memberships Table Setup
-- Copy and paste this ENTIRE block into Supabase SQL Editor

-- Create memberships table
CREATE TABLE IF NOT EXISTS memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    plan TEXT NOT NULL DEFAULT 'free',
    status TEXT NOT NULL DEFAULT 'active',
    is_admin BOOLEAN DEFAULT FALSE,
    started_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_email ON memberships(email);
CREATE INDEX IF NOT EXISTS idx_memberships_admin ON memberships(is_admin) WHERE is_admin = TRUE;

-- Security: Enable Row Level Security
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own membership
CREATE POLICY "Users view own membership" ON memberships
    FOR SELECT USING (auth.uid() = user_id);

-- Policy: Service role (admin) has full access
CREATE POLICY "Service role full access" ON memberships
    FOR ALL USING (auth.role() = 'service_role');

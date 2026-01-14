-- ============================================
-- FOCUSHUB PREMIUM FEATURES - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Add premium columns to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS reflection_tradition VARCHAR(50) DEFAULT 'universal',
ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_beta_user BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS premium_expires_at TIMESTAMP WITH TIME ZONE;

-- Create user_memberships table
CREATE TABLE IF NOT EXISTS user_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
    tier VARCHAR(20) DEFAULT 'lite' CHECK (tier IN ('lite', 'pro', 'premium', 'beta')),
    is_beta_user BOOLEAN DEFAULT false,
    has_subscribed BOOLEAN DEFAULT false,
    premium_expires_at TIMESTAMP WITH TIME ZONE,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on user_memberships
ALTER TABLE user_memberships ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own membership
CREATE POLICY "Users can view own membership"
ON user_memberships FOR SELECT
USING (auth.uid() = user_id);

-- RLS Policy: Users can update their own membership
CREATE POLICY "Users can update own membership"
ON user_memberships FOR UPDATE
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_memberships_user_id ON user_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_user_memberships_tier ON user_memberships(tier);

-- Function to check if user is premium
CREATE OR REPLACE FUNCTION is_user_premium(user_id_param UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_memberships
        WHERE user_id = user_id_param
        AND (
            tier = 'premium' 
            OR tier = 'beta'
            OR is_beta_user = true
            OR (premium_expires_at IS NOT NULL AND premium_expires_at > NOW())
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark beta users (run once after launch)
-- This marks all users created before a specific date as beta
CREATE OR REPLACE FUNCTION mark_beta_users(launch_date TIMESTAMP WITH TIME ZONE)
RETURNS INTEGER AS $$
DECLARE
    beta_count INTEGER;
BEGIN
    INSERT INTO user_memberships (user_id, tier, is_beta_user)
    SELECT 
        id,
        'beta',
        true
    FROM auth.users
    WHERE created_at < launch_date
    ON CONFLICT (user_id) DO UPDATE
    SET 
        tier = 'beta',
        is_beta_user = true;
    
    GET DIAGNOSTICS beta_count = ROW_COUNT;
    RETURN beta_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Example: Mark all users before Feb 1, 2026 as beta
-- SELECT mark_beta_users('2026-02-01'::timestamp with time zone);

-- ============================================
-- ADMIN QUERIES (for watersjb@gmail.com)
-- ============================================

-- Check all user tiers
-- SELECT u.email, m.tier, m.is_beta_user, m.premium_expires_at
-- FROM auth.users u
-- LEFT JOIN user_memberships m ON u.id = m.user_id
-- ORDER BY m.tier, u.created_at;

-- Grant premium to specific user
-- INSERT INTO user_memberships (user_id, tier, is_beta_user)
-- SELECT id, 'premium', true
-- FROM auth.users
-- WHERE email = 'user@example.com'
-- ON CONFLICT (user_id) DO UPDATE
-- SET tier = 'premium', is_beta_user = true;

-- ============================================
-- CLEANUP (if needed)
-- ============================================

-- To remove premium columns (DO NOT RUN unless resetting)
-- ALTER TABLE user_profiles 
-- DROP COLUMN IF EXISTS reflection_tradition,
-- DROP COLUMN IF EXISTS is_premium,
-- DROP COLUMN IF EXISTS is_beta_user,
-- DROP COLUMN IF EXISTS premium_expires_at;

-- DROP TABLE IF EXISTS user_memberships CASCADE;

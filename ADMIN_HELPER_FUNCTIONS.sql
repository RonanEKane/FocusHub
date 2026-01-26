-- Helper functions for easy user management in Supabase
-- These make it easy to grant/revoke access without writing SQL

-- =====================================================
-- FUNCTION 1: Grant Premium to User
-- =====================================================
CREATE OR REPLACE FUNCTION grant_premium(user_email TEXT)
RETURNS TABLE(email TEXT, plan TEXT, is_admin BOOLEAN) AS $$
BEGIN
    INSERT INTO memberships (user_id, email, plan, status, is_admin)
    SELECT id, user_email, 'premium', 'active', FALSE
    FROM auth.users
    WHERE auth.users.email = user_email
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        plan = 'premium',
        status = 'active',
        updated_at = NOW();
    
    RETURN QUERY
    SELECT m.email, m.plan, m.is_admin
    FROM memberships m
    WHERE m.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage: SELECT * FROM grant_premium('user@example.com');


-- =====================================================
-- FUNCTION 2: Make User Admin
-- =====================================================
CREATE OR REPLACE FUNCTION make_admin(user_email TEXT)
RETURNS TABLE(email TEXT, plan TEXT, is_admin BOOLEAN) AS $$
BEGIN
    INSERT INTO memberships (user_id, email, plan, status, is_admin)
    SELECT id, user_email, 'premium', 'active', TRUE
    FROM auth.users
    WHERE auth.users.email = user_email
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        plan = 'premium',
        status = 'active',
        is_admin = TRUE,
        updated_at = NOW();
    
    RETURN QUERY
    SELECT m.email, m.plan, m.is_admin
    FROM memberships m
    WHERE m.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage: SELECT * FROM make_admin('watersjb@gmail.com');


-- =====================================================
-- FUNCTION 3: Revoke Premium (Downgrade to Free)
-- =====================================================
CREATE OR REPLACE FUNCTION revoke_premium(user_email TEXT)
RETURNS TABLE(email TEXT, plan TEXT, is_admin BOOLEAN) AS $$
BEGIN
    UPDATE memberships
    SET 
        plan = 'free',
        status = 'active',
        is_admin = FALSE,
        updated_at = NOW()
    WHERE memberships.email = user_email;
    
    RETURN QUERY
    SELECT m.email, m.plan, m.is_admin
    FROM memberships m
    WHERE m.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage: SELECT * FROM revoke_premium('user@example.com');


-- =====================================================
-- FUNCTION 4: Get User Summary
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_summary(user_email TEXT)
RETURNS TABLE(
    email TEXT,
    plan TEXT,
    is_admin BOOLEAN,
    status TEXT,
    signup_date TIMESTAMP,
    last_login TIMESTAMP,
    premium_since TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.email,
        COALESCE(m.plan, 'free')::TEXT as plan,
        COALESCE(m.is_admin, FALSE) as is_admin,
        COALESCE(m.status, 'active')::TEXT as status,
        u.created_at as signup_date,
        u.last_sign_in_at as last_login,
        m.started_at as premium_since
    FROM auth.users u
    LEFT JOIN memberships m ON u.id = m.user_id
    WHERE u.email = user_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Usage: SELECT * FROM get_user_summary('watersjb@gmail.com');


-- =====================================================
-- TEST ALL FUNCTIONS
-- =====================================================

-- Make yourself admin
SELECT * FROM make_admin('watersjb@gmail.com');

-- Check your status
SELECT * FROM get_user_summary('watersjb@gmail.com');

-- Grant premium to another user
-- SELECT * FROM grant_premium('user@example.com');

-- Revoke someone's premium
-- SELECT * FROM revoke_premium('user@example.com');

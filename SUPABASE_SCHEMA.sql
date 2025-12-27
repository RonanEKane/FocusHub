-- ============================================
-- FOCUSHUB SUPABASE DATABASE SCHEMA
-- ============================================
-- Run this in Supabase Dashboard > SQL Editor
-- Copy/paste entire file and click "Run"

-- ============================================
-- USER PROFILES TABLE
-- ============================================
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('professional', 'student')),
    student_submode TEXT CHECK (student_submode IN ('highschool', 'college', NULL)),
    theme TEXT DEFAULT 'light' CHECK (theme IN ('light', 'dark')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DAILY SESSIONS TABLE
-- ============================================
CREATE TABLE public.daily_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    session_date DATE NOT NULL,
    energy_level TEXT NOT NULL DEFAULT 'medium' CHECK (energy_level IN ('low', 'medium', 'high')),
    baseline_sprints INTEGER DEFAULT 5,
    planned_sprints INTEGER DEFAULT 5,
    sprints_completed INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    breaks_taken INTEGER DEFAULT 0,
    distractions_logged INTEGER DEFAULT 0,
    session_state TEXT DEFAULT 'not_started' CHECK (session_state IN ('not_started', 'active', 'completed')),
    current_grade TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, session_date)
);

-- ============================================
-- TASKS TABLE
-- ============================================
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    session_date DATE NOT NULL,
    content TEXT NOT NULL,
    priority TEXT DEFAULT 'holding' CHECK (priority IN ('urgent', 'deep', 'strategic', 'holding')),
    weight INTEGER DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- DISTRACTIONS TABLE
-- ============================================
CREATE TABLE public.distractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    session_date DATE NOT NULL,
    intention TEXT NOT NULL,
    reality TEXT,
    followed_through BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_daily_sessions_user_date ON public.daily_sessions(user_id, session_date);
CREATE INDEX idx_tasks_user_date ON public.tasks(user_id, session_date);
CREATE INDEX idx_tasks_completed ON public.tasks(user_id, completed);
CREATE INDEX idx_distractions_user_date ON public.distractions(user_id, session_date);

-- ============================================
-- ROW LEVEL SECURITY (RLS) - CRITICAL!
-- ============================================
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.distractions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - USER PROFILES
-- ============================================
CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ============================================
-- RLS POLICIES - DAILY SESSIONS
-- ============================================
CREATE POLICY "Users can view own sessions"
    ON public.daily_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
    ON public.daily_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions"
    ON public.daily_sessions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions"
    ON public.daily_sessions FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - TASKS
-- ============================================
CREATE POLICY "Users can view own tasks"
    ON public.tasks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
    ON public.tasks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
    ON public.tasks FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
    ON public.tasks FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - DISTRACTIONS
-- ============================================
CREATE POLICY "Users can view own distractions"
    ON public.distractions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own distractions"
    ON public.distractions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own distractions"
    ON public.distractions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own distractions"
    ON public.distractions FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS FOR AUTO-UPDATE TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_daily_sessions_updated_at
    BEFORE UPDATE ON public.daily_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- DONE! Schema created successfully
-- ============================================
-- Next steps:
-- 1. Go to Authentication > Providers
-- 2. Enable "Email" provider
-- 3. Disable "Confirm email" (for beta testing)
-- 4. Add Site URL: https://focushub-6ah.pages.dev
-- 5. Add Redirect URLs:
--    - https://focushub-6ah.pages.dev/app.html
--    - https://focushub-6ah.pages.dev/overview.html

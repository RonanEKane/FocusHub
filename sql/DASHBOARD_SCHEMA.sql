-- ============================================
-- DASHBOARD DATA SCHEMA
-- Tables for Insight Center dashboard stats
-- ============================================

-- Daily History: Track daily stats, grades, sprints
CREATE TABLE IF NOT EXISTS daily_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    sprints_completed INTEGER DEFAULT 0,
    sprints_target INTEGER DEFAULT 5,
    tasks_completed INTEGER DEFAULT 0,
    wins_count INTEGER DEFAULT 0,
    distractions_parked INTEGER DEFAULT 0,
    grade VARCHAR(2), -- A+, A, B+, B, C+, C, D, F
    focus_score INTEGER, -- 0-100
    intentions JSONB, -- Array of daily intentions
    session_stats JSONB, -- Timer stats, break times, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Task History: Track task completions over time
CREATE TABLE IF NOT EXISTS task_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    task_text TEXT NOT NULL,
    bucket VARCHAR(20), -- 'admin', 'deep_work', 'strategic'
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sprint_number INTEGER, -- Which sprint was this completed in
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Distraction Log: Track distractions with patterns
CREATE TABLE IF NOT EXISTS distraction_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    distraction_text TEXT NOT NULL,
    parked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    hour_of_day INTEGER, -- 0-23 for time patterns
    date DATE DEFAULT CURRENT_DATE,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_daily_history_user_date ON daily_history(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_task_history_user_date ON task_history(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_distraction_log_user_date ON distraction_log(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_distraction_log_hour ON distraction_log(user_id, hour_of_day);

-- Row Level Security
ALTER TABLE daily_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE distraction_log ENABLE ROW LEVEL SECURITY;

-- Policies: Users can only access their own data
CREATE POLICY "Users can view own daily history" ON daily_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily history" ON daily_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily history" ON daily_history
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own task history" ON task_history
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task history" ON task_history
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own distraction log" ON distraction_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own distraction log" ON distraction_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own distraction log" ON distraction_log
    FOR UPDATE USING (auth.uid() = user_id);

-- DELETE policies for data management
CREATE POLICY "Users can delete own task history" ON task_history
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own distraction log" ON distraction_log
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily history" ON daily_history
    FOR DELETE USING (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for daily_history
CREATE TRIGGER update_daily_history_updated_at
    BEFORE UPDATE ON daily_history
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Helper function to get user's weekly stats
CREATE OR REPLACE FUNCTION get_weekly_stats(user_uuid UUID)
RETURNS TABLE (
    total_sprints BIGINT,
    total_tasks BIGINT,
    total_wins BIGINT,
    avg_grade NUMERIC,
    streak_days BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        SUM(sprints_completed)::BIGINT as total_sprints,
        SUM(tasks_completed)::BIGINT as total_tasks,
        SUM(wins_count)::BIGINT as total_wins,
        AVG(focus_score)::NUMERIC as avg_grade,
        COUNT(DISTINCT date)::BIGINT as streak_days
    FROM daily_history
    WHERE user_id = user_uuid
        AND date >= CURRENT_DATE - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

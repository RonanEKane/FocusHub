-- ============================================
-- ANALYTICS SCHEMA
-- Event tracking and error monitoring
-- ============================================

-- Analytics Events: Track all user events
CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- page_view, sprint_start, task_complete, etc.
    event_data JSONB, -- Additional event details
    page VARCHAR(100), -- Which page the event occurred on
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Errors: Track JavaScript errors
CREATE TABLE IF NOT EXISTS analytics_errors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id UUID,
    error_message TEXT NOT NULL,
    error_stack TEXT,
    page VARCHAR(100),
    user_agent TEXT,
    context JSONB, -- Additional context (state, variables, etc.)
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Sessions: Track user sessions
CREATE TABLE IF NOT EXISTS analytics_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    page_views INTEGER DEFAULT 0,
    events_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_errors_user ON analytics_errors(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_errors_resolved ON analytics_errors(resolved, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_user ON analytics_sessions(user_id, session_start DESC);

-- Row Level Security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Policies: Users can access their own data
CREATE POLICY "Users can view own analytics events" ON analytics_events
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics events" ON analytics_events
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own analytics errors" ON analytics_errors
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics errors" ON analytics_errors
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own analytics sessions" ON analytics_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analytics sessions" ON analytics_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies: Admins can view all analytics
CREATE POLICY "Admins can view all analytics events" ON analytics_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM memberships
            WHERE user_id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Admins can view all analytics errors" ON analytics_errors
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM memberships
            WHERE user_id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Admins can update analytics errors" ON analytics_errors
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM memberships
            WHERE user_id = auth.uid() AND is_admin = true
        )
    );

-- Function to get analytics summary
CREATE OR REPLACE FUNCTION get_analytics_summary()
RETURNS TABLE (
    total_events BIGINT,
    total_errors BIGINT,
    active_sessions BIGINT,
    events_by_type JSONB,
    recent_errors JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        (SELECT COUNT(*) FROM analytics_events)::BIGINT,
        (SELECT COUNT(*) FROM analytics_errors WHERE NOT resolved)::BIGINT,
        (SELECT COUNT(*) FROM analytics_sessions WHERE session_end IS NULL)::BIGINT,
        (SELECT json_object_agg(event_type, count)
         FROM (
             SELECT event_type, COUNT(*) as count
             FROM analytics_events
             GROUP BY event_type
         ) sub)::JSONB,
        (SELECT json_agg(row_to_json(e))
         FROM (
             SELECT id, error_message, page, timestamp
             FROM analytics_errors
             WHERE NOT resolved
             ORDER BY timestamp DESC
             LIMIT 10
         ) e)::JSONB;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

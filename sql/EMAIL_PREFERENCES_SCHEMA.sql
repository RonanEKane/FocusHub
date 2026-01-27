-- ============================================
-- EMAIL NOTIFICATION PREFERENCES
-- Add columns to memberships table
-- ============================================

-- Add email preference columns
ALTER TABLE memberships 
ADD COLUMN IF NOT EXISTS email_daily_reminder BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS email_weekly_report BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS email_streak_alert BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS email_accountability BOOLEAN DEFAULT false;

-- Add last_email_sent tracking
ALTER TABLE memberships
ADD COLUMN IF NOT EXISTS last_daily_reminder_sent TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_weekly_report_sent TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_streak_alert_sent TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS last_accountability_sent TIMESTAMPTZ;

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_memberships_email_preferences 
ON memberships(email_daily_reminder, email_weekly_report, email_streak_alert);

-- Verify columns
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'memberships' 
AND column_name LIKE 'email%';

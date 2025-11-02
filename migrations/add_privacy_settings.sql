-- Add privacy settings and data export columns to users table

ALTER TABLE users
ADD COLUMN IF NOT EXISTS data_sharing_consent BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS analytics_consent BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS last_settings_update TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS account_deletion_requested TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS account_deletion_scheduled TIMESTAMPTZ;

-- Create index for scheduled deletions
CREATE INDEX IF NOT EXISTS idx_users_deletion_scheduled ON users(account_deletion_scheduled) WHERE account_deletion_scheduled IS NOT NULL;

-- Add comment
COMMENT ON COLUMN users.data_sharing_consent IS 'User consent for data sharing with third parties';
COMMENT ON COLUMN users.analytics_consent IS 'User consent for analytics tracking';
COMMENT ON COLUMN users.marketing_consent IS 'User consent for marketing communications';
COMMENT ON COLUMN users.account_deletion_requested IS 'Timestamp when user requested account deletion';
COMMENT ON COLUMN users.account_deletion_scheduled IS 'Timestamp when account will be permanently deleted (30 days after request)';

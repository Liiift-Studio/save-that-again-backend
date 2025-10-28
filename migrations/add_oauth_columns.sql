-- Migration: Add Google OAuth Support
-- Run this in your Vercel Postgres dashboard: 
-- https://vercel.com/dashboard > Your Project > Storage > Postgres > Query

-- Add OAuth columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS auth_provider TEXT DEFAULT 'email',
ADD COLUMN IF NOT EXISTS profile_picture TEXT;

-- Make password_hash nullable for OAuth-only users
ALTER TABLE users 
ALTER COLUMN password_hash DROP NOT NULL;

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

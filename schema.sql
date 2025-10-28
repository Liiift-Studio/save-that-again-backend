-- Save That Again Database Schema
-- Run this SQL in your Vercel Postgres dashboard after connecting the database

-- Create users table
CREATE TABLE IF NOT EXISTS users (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	email TEXT UNIQUE NOT NULL,
	password_hash TEXT, -- Nullable for OAuth-only users
	name TEXT,
	google_id TEXT UNIQUE, -- Google OAuth ID
	auth_provider TEXT DEFAULT 'email', -- 'email' or 'google'
	profile_picture TEXT, -- Store Google profile picture URL
	created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audio_clips table
CREATE TABLE IF NOT EXISTS audio_clips (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	user_id UUID REFERENCES users(id) ON DELETE CASCADE,
	title TEXT NOT NULL,
	timestamp TIMESTAMPTZ NOT NULL,
	duration INTEGER NOT NULL, -- in milliseconds
	blob_url TEXT NOT NULL,
	blob_pathname TEXT NOT NULL,
	file_size INTEGER NOT NULL,
	tags JSONB DEFAULT '[]'::jsonb,
	created_at TIMESTAMPTZ DEFAULT NOW(),
	updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clips_user_timestamp ON audio_clips(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_clips_created ON audio_clips(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create a trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_audio_clips_updated_at BEFORE UPDATE
ON audio_clips FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

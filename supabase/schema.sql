-- ============================================================
-- Supabase SQL Schema for Delivery Zones Application
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_name TEXT,
  answers         JSONB NOT NULL,
  missing_area_note TEXT,
  submitted_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for faster date-ordered queries
CREATE INDEX IF NOT EXISTS submissions_created_at_idx
  ON submissions (created_at DESC);

-- Index for restaurant name search
CREATE INDEX IF NOT EXISTS submissions_restaurant_name_idx
  ON submissions USING GIN (to_tsvector('arabic', COALESCE(restaurant_name, '')));

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow public (unauthenticated) users to INSERT only
-- This is what the public form uses
CREATE POLICY "Allow public insert"
  ON submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users (admin) to SELECT all submissions
CREATE POLICY "Allow admin read"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to do nothing else (no update/delete from client)
-- If you want admin to delete submissions, add a DELETE policy here.

-- ============================================================
-- Instructions
-- ============================================================
-- 1. Go to your Supabase project → SQL Editor
-- 2. Paste this entire file and click "Run"
-- 3. The submissions table will be created with proper RLS
-- 4. Public users can submit but not read other submissions
-- 5. Admin (authenticated via Supabase Auth) can read all


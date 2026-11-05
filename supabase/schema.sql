-- ============================================================
-- Supabase SQL Schema for Delivery Zones Multi-Store Application
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Stores Table (قائمة المحلات والروابط المخصصة)
CREATE TABLE IF NOT EXISTS stores (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  phone        TEXT,
  notes        TEXT,
  status       TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'submitted'
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

-- Index on slug for lightning-fast public link resolution
CREATE INDEX IF NOT EXISTS stores_slug_idx ON stores (slug);
CREATE INDEX IF NOT EXISTS stores_created_at_idx ON stores (created_at DESC);

-- 2. Submissions Table (بيانات التوصيل لكل محل)
CREATE TABLE IF NOT EXISTS submissions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id          UUID REFERENCES stores(id) ON DELETE CASCADE,
  store_slug        TEXT,
  restaurant_name   TEXT,
  answers           JSONB NOT NULL,
  missing_area_note TEXT,
  submitted_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for submissions
CREATE INDEX IF NOT EXISTS submissions_store_id_idx ON submissions (store_id);
CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON submissions (created_at DESC);

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Stores policies
-- 1) Public can read basic store info to open their customized link
CREATE POLICY "Allow public read stores by slug"
  ON stores
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 2) Admin full access to stores
CREATE POLICY "Allow admin full access to stores"
  ON stores
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 3) Public can update store status to 'submitted' when completing the form
CREATE POLICY "Allow public update store status"
  ON stores
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Submissions policies
-- 1) Public users can INSERT answers
CREATE POLICY "Allow public insert submissions"
  ON submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- 2) Admin can read all submissions
CREATE POLICY "Allow admin read submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- 3) Admin can delete submissions
CREATE POLICY "Allow admin delete submissions"
  ON submissions
  FOR DELETE
  TO authenticated
  USING (true);

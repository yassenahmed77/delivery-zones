-- ============================================================
-- Supabase SQL Schema for Delivery Zones (Multi-Store Edition)
-- الآمن للتشغيل عدة مرات دون أي أخطاء (Idempotent)
-- ============================================================

-- تفعيل ملحق الـ UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. جدول المحلات والروابط المخصصة
CREATE TABLE IF NOT EXISTS stores (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  phone        TEXT,
  notes        TEXT,
  status       TEXT NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS stores_slug_idx ON stores (slug);
CREATE INDEX IF NOT EXISTS stores_created_at_idx ON stores (created_at DESC);

-- 2. جدول إرسالات التغطية
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

-- التأكد من وجود أعمدة الربط في حال كان الجدول منشأ مسبقاً
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS store_id UUID REFERENCES stores(id) ON DELETE CASCADE;
ALTER TABLE submissions ADD COLUMN IF NOT EXISTS store_slug TEXT;

CREATE INDEX IF NOT EXISTS submissions_store_id_idx ON submissions (store_id);
CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON submissions (created_at DESC);

-- ============================================================
-- تفعيل حماية Row Level Security (RLS)
-- ============================================================

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- سياسات جدول المحلات (stores)
-- ============================================================

DROP POLICY IF EXISTS "Allow public read stores by slug" ON stores;
CREATE POLICY "Allow public read stores by slug"
  ON stores
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow admin full access to stores" ON stores;
CREATE POLICY "Allow admin full access to stores"
  ON stores
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public update store status" ON stores;
CREATE POLICY "Allow public update store status"
  ON stores
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- ============================================================
-- سياسات جدول الإرسالات (submissions)
-- ============================================================

-- حذف السياسات القديمة إن وجدت لمنع خطأ 42710
DROP POLICY IF EXISTS "Allow public insert" ON submissions;
DROP POLICY IF EXISTS "Allow public insert submissions" ON submissions;
CREATE POLICY "Allow public insert submissions"
  ON submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin read" ON submissions;
DROP POLICY IF EXISTS "Allow admin read submissions" ON submissions;
CREATE POLICY "Allow admin read submissions"
  ON submissions
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow admin delete submissions" ON submissions;
CREATE POLICY "Allow admin delete submissions"
  ON submissions
  FOR DELETE
  TO authenticated
  USING (true);

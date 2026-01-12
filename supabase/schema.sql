-- GenBots Platform Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('smart-home', 'robotics', 'drones', 'iot', 'ai')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image_url TEXT,
  bio TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact queries table
CREATE TABLE IF NOT EXISTS contact_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  organization TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_team_members_order ON team_members(order_index);
CREATE INDEX IF NOT EXISTS idx_contact_queries_status ON contact_queries(status);
CREATE INDEX IF NOT EXISTS idx_contact_queries_created_at ON contact_queries(created_at DESC);

-- Row Level Security Policies

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_queries ENABLE ROW LEVEL SECURITY;

-- Projects: Public read, authenticated write
CREATE POLICY "Projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Projects are editable by authenticated users" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Team members: Public read, authenticated write
CREATE POLICY "Team members are viewable by everyone" ON team_members FOR SELECT USING (true);
CREATE POLICY "Team members are editable by authenticated users" ON team_members FOR ALL USING (auth.role() = 'authenticated');

-- Contact queries: Public insert, authenticated read/write
CREATE POLICY "Anyone can submit contact queries" ON contact_queries FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact queries are viewable by authenticated users" ON contact_queries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Contact queries are editable by authenticated users" ON contact_queries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Contact queries are deletable by authenticated users" ON contact_queries FOR DELETE USING (auth.role() = 'authenticated');

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;

-- Storage policies
CREATE POLICY "Images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Authenticated users can upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

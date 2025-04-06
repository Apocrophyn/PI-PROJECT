-- SQL script for setting up Supabase database tables for the blog system

-- Create the posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT FALSE,
  image_url TEXT
);

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

-- Set up storage policy to allow public access to view images
CREATE POLICY "Public access to images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'images');

-- Create RLS policy for posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to manage posts
CREATE POLICY "Authenticated users can manage posts"
  ON posts
  USING (true)
  WITH CHECK (true);

-- Policy for public users to view published posts only
CREATE POLICY "Public users can view published posts"
  ON posts FOR SELECT
  TO public
  USING (published = true);
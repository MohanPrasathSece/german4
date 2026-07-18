-- SUPABASE STORAGE SETUP FOR BLOG IMAGES
-- Run this SQL in your Supabase SQL Editor to fix the 400 error

-- Step 1: Create the blog-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) 
DO UPDATE SET public = true;

-- Step 2: Enable public read access (anyone can view images)
CREATE POLICY "Public Access to Blog Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- Step 3: Allow authenticated users (admins) to upload images
CREATE POLICY "Authenticated users can upload blog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'blog-images');

-- Step 4: Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update blog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'blog-images');

-- Step 5: Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete blog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'blog-images');

-- Verify the bucket was created
SELECT * FROM storage.buckets WHERE id = 'blog-images';

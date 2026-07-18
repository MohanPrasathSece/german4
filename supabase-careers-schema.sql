-- CAREERS/JOBS TABLE SCHEMA
-- Run this SQL in your Supabase SQL Editor

-- Create the careers table
CREATE TABLE IF NOT EXISTS careers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('job', 'internship')),
    location TEXT NOT NULL,
    employment_type TEXT NOT NULL CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
    experience_level TEXT CHECK (experience_level IN ('entry', 'mid', 'senior', 'not-applicable')),
    description TEXT NOT NULL,
    requirements TEXT,
    responsibilities TEXT,
    salary_range TEXT,
    application_deadline TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active careers
CREATE POLICY "Public can view active careers"
ON careers FOR SELECT
USING (status = 'active');

-- Policy: Authenticated users (admins) can do everything
CREATE POLICY "Authenticated users can manage careers"
ON careers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_careers_updated_at
    BEFORE UPDATE ON careers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_careers_status ON careers(status);
CREATE INDEX IF NOT EXISTS idx_careers_type ON careers(type);
CREATE INDEX IF NOT EXISTS idx_careers_created_at ON careers(created_at DESC);

-- Insert sample data (optional)
INSERT INTO careers (title, type, location, employment_type, experience_level, description, requirements, responsibilities, status)
VALUES 
(
    'Associate Lawyer',
    'job',
    'Delhi, India',
    'full-time',
    'mid',
    'We are seeking an experienced Associate Lawyer to join our litigation team.',
    '• LLB/LLM from a recognized university
• 3-5 years of litigation experience
• Strong research and drafting skills
• Excellent communication abilities',
    '• Handle civil and criminal litigation matters
• Draft legal documents and pleadings
• Represent clients in court proceedings
• Conduct legal research and analysis',
    'active'
),
(
    'Legal Intern',
    'internship',
    'Delhi, India',
    'internship',
    'entry',
    'Exciting internship opportunity for law students to gain practical experience in a professional legal environment.',
    '• Currently pursuing LLB/LLM
• Strong academic record
• Interest in litigation and legal research
• Proficiency in MS Office',
    '• Assist in legal research and drafting
• Prepare case summaries and briefs
• Attend court proceedings
• Support senior lawyers in case preparation',
    'active'
);

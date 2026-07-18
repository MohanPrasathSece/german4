-- EXTENDED FEATURES SCHEMA
-- Run this SQL in your Supabase SQL Editor

-- ==========================================
-- 1. CAREER APPLICATIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS career_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    career_id UUID REFERENCES careers(id) ON DELETE CASCADE,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users (admins) can view applications
CREATE POLICY "Authenticated users can view applications"
ON career_applications FOR SELECT
TO authenticated
USING (true);

-- Policy: Anyone can submit an application
CREATE POLICY "Anyone can submit applications"
ON career_applications FOR INSERT
WITH CHECK (true);

-- Policy: Authenticated users can update applications
CREATE POLICY "Authenticated users can update applications"
ON career_applications FOR UPDATE
TO authenticated
USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_applications_career_id ON career_applications(career_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON career_applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON career_applications(created_at DESC);

-- ==========================================
-- 2. LEGAL DRAFTS/TEMPLATES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS legal_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('bail', 'agreements', 'petitions', 'notices', 'affidavits', 'contracts', 'other')),
    description TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL CHECK (file_type IN ('pdf', 'docx', 'doc')),
    file_size INTEGER, -- in bytes
    downloads_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE legal_drafts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active drafts
CREATE POLICY "Public can view active drafts"
ON legal_drafts FOR SELECT
USING (is_active = true);

-- Policy: Authenticated users can manage drafts
CREATE POLICY "Authenticated users can manage drafts"
ON legal_drafts FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_drafts_category ON legal_drafts(category);
CREATE INDEX IF NOT EXISTS idx_drafts_active ON legal_drafts(is_active);
CREATE INDEX IF NOT EXISTS idx_drafts_downloads ON legal_drafts(downloads_count DESC);


-- ==========================================
-- 4. COURT FEE STRUCTURE TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS court_fee_structure (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    case_type TEXT NOT NULL,
    court_type TEXT NOT NULL CHECK (court_type IN ('supreme-court', 'high-court', 'district-court', 'sessions-court', 'magistrate-court', 'tribunal')),
    min_claim_value DECIMAL(15,2),
    max_claim_value DECIMAL(15,2),
    fixed_fee DECIMAL(10,2),
    percentage_fee DECIMAL(5,2),
    additional_charges TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE court_fee_structure ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active fee structures
CREATE POLICY "Public can view active fee structures"
ON court_fee_structure FOR SELECT
USING (is_active = true);

-- Policy: Authenticated users can manage fee structures
CREATE POLICY "Authenticated users can manage fee structures"
ON court_fee_structure FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_fee_case_type ON court_fee_structure(case_type);
CREATE INDEX IF NOT EXISTS idx_fee_court_type ON court_fee_structure(court_type);

-- ==========================================
-- 5. POLICE STATIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS police_stations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    station_name TEXT NOT NULL,
    station_code TEXT,
    district TEXT NOT NULL,
    region TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT,
    phone TEXT,
    email TEXT,
    jurisdictional_court TEXT NOT NULL,
    court_address TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE police_stations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active police stations
CREATE POLICY "Public can view active police stations"
ON police_stations FOR SELECT
USING (is_active = true);

-- Policy: Authenticated users can manage police stations
CREATE POLICY "Authenticated users can manage police stations"
ON police_stations FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes for search
CREATE INDEX IF NOT EXISTS idx_ps_name ON police_stations USING gin(to_tsvector('english', station_name));
CREATE INDEX IF NOT EXISTS idx_ps_city ON police_stations(city);
CREATE INDEX IF NOT EXISTS idx_ps_state ON police_stations(state);
CREATE INDEX IF NOT EXISTS idx_ps_court ON police_stations USING gin(to_tsvector('english', jurisdictional_court));

-- ==========================================
-- TRIGGERS FOR UPDATED_AT
-- ==========================================

CREATE TRIGGER update_applications_updated_at
    BEFORE UPDATE ON career_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drafts_updated_at
    BEFORE UPDATE ON legal_drafts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();


CREATE TRIGGER update_fee_structure_updated_at
    BEFORE UPDATE ON court_fee_structure
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_police_stations_updated_at
    BEFORE UPDATE ON police_stations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- SAMPLE DATA
-- ==========================================

-- Sample Court Fee Structure
INSERT INTO court_fee_structure (case_type, court_type, min_claim_value, max_claim_value, fixed_fee, percentage_fee, description) VALUES
('Civil Suit', 'district-court', 0, 100000, 500, 2.5, 'For suits valued up to ₹1 lakh'),
('Civil Suit', 'district-court', 100001, 500000, 2500, 3.0, 'For suits valued between ₹1-5 lakhs'),
('Civil Suit', 'high-court', 0, 1000000, 5000, 3.5, 'For suits valued up to ₹10 lakhs'),
('Criminal Petition', 'sessions-court', NULL, NULL, 1000, NULL, 'Fixed fee for criminal petitions'),
('Bail Application', 'magistrate-court', NULL, NULL, 500, NULL, 'Fixed fee for bail applications'),
('Writ Petition', 'high-court', NULL, NULL, 10000, NULL, 'Fixed fee for writ petitions');


-- Comprehensive Delhi Police Stations Data
INSERT INTO police_stations (station_name, district, region, address, city, state, jurisdictional_court, court_address) VALUES
-- DISTRICT SOUTH - Saket Courts
('Ambedkar Nagar Police Station', 'South District', 'Delhi', 'Ambedkar Nagar, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Fatehpur Beri Police Station', 'South District', 'Delhi', 'Fatehpur Beri, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Hauz Khas Police Station', 'South District', 'Delhi', 'Hauz Khas, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('INA Metro Police Station', 'South District', 'Delhi', 'INA Metro Station, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Malviya Nagar Police Station', 'South District', 'Delhi', 'Malviya Nagar, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Mehrauli Police Station', 'South District', 'Delhi', 'Mehrauli, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Neb Sarai Police Station', 'South District', 'Delhi', 'Neb Sarai, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Qutab Minar Metro Police Station', 'South District', 'Delhi', 'Qutab Minar Metro, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Safdarjung Enclave Police Station', 'South District', 'Delhi', 'Safdarjung Enclave, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Saket Police Station', 'South District', 'Delhi', 'Saket, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Sangam Vihar Police Station', 'South District', 'Delhi', 'Sangam Vihar, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),

-- DISTRICT SOUTH-EAST - Saket Courts
('Amar Colony Police Station', 'South-East District', 'Delhi', 'Amar Colony, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Badar Pur Police Station', 'South-East District', 'Delhi', 'Badar Pur, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Chitranjan Park Police Station', 'South-East District', 'Delhi', 'Chitranjan Park, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Defence Colony Police Station', 'South-East District', 'Delhi', 'Defence Colony, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Govind Puri Police Station', 'South-East District', 'Delhi', 'Govind Puri, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Greater Kailash Police Station', 'South-East District', 'Delhi', 'Greater Kailash, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Hazrat Nizamuddin Police Station', 'South-East District', 'Delhi', 'Hazrat Nizamuddin, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Jaitpur Police Station', 'South-East District', 'Delhi', 'Jaitpur, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Jamia Nagar Police Station', 'South-East District', 'Delhi', 'Jamia Nagar, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Kalkaji Metro Police Station', 'South-East District', 'Delhi', 'Kalkaji Metro, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Kalkaji Police Station', 'South-East District', 'Delhi', 'Kalkaji, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Kotla Mubarak Pur Police Station', 'South-East District', 'Delhi', 'Kotla Mubarak Pur, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Lajpat Nagar Metro Police Station', 'South-East District', 'Delhi', 'Lajpat Nagar Metro, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Lajpat Nagar Police Station', 'South-East District', 'Delhi', 'Lajpat Nagar, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Lodhi Colony Police Station', 'South-East District', 'Delhi', 'Lodhi Colony, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('New Friends Colony Police Station', 'South-East District', 'Delhi', 'New Friends Colony, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Okhla Industrial Area Police Station', 'South-East District', 'Delhi', 'Okhla Industrial Area, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Pul Prahlad Pur Police Station', 'South-East District', 'Delhi', 'Pul Prahlad Pur, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Sarita Vihar Police Station', 'South-East District', 'Delhi', 'Sarita Vihar, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),
('Sunlight Colony Police Station', 'South-East District', 'Delhi', 'Sunlight Colony, New Delhi', 'New Delhi', 'Delhi', 'Saket District Courts', 'Saket, Delhi - 110017'),

-- DISTRICT EAST - Karkardooma Courts
('Gandhi Nagar Police Station', 'East District', 'Delhi', 'Gandhi Nagar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Gazi Pur Police Station', 'East District', 'Delhi', 'Gazi Pur, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Geeta Colony Police Station', 'East District', 'Delhi', 'Geeta Colony, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Kalyan Puri Police Station', 'East District', 'Delhi', 'Kalyan Puri, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Krishna Nagar Police Station', 'East District', 'Delhi', 'Krishna Nagar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Mandawali Police Station', 'East District', 'Delhi', 'Mandawali, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Mayur Vihar Police Station', 'East District', 'Delhi', 'Mayur Vihar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('New Ashok Nagar Police Station', 'East District', 'Delhi', 'New Ashok Nagar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Pandav Nagar Police Station', 'East District', 'Delhi', 'Pandav Nagar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Preet Vihar Police Station', 'East District', 'Delhi', 'Preet Vihar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Shakar Pur Police Station', 'East District', 'Delhi', 'Shakar Pur, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Yamuna Bank Metro Police Station', 'East District', 'Delhi', 'Yamuna Bank, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),

-- DISTRICT NORTH-EAST - Karkardooma Courts
('Bhajan Pura Police Station', 'North-East District', 'Delhi', 'Bhajan Pura, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Gokul Puri Police Station', 'North-East District', 'Delhi', 'Gokul Puri, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Karawal Nagar Police Station', 'North-East District', 'Delhi', 'Karawal Nagar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Khajoori Khas Police Station', 'North-East District', 'Delhi', 'Khajoori Khas, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('New Usman Pur Police Station', 'North-East District', 'Delhi', 'New Usman Pur, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Seelampur Police Station', 'North-East District', 'Delhi', 'Seelampur, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Shastri Park Metro Police Station', 'North-East District', 'Delhi', 'Shastri Park Metro, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Sonia Vihar Police Station', 'North-East District', 'Delhi', 'Sonia Vihar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),

-- DISTRICT SHAHDARA - Karkardooma Courts
('Anand Vihar Police Station', 'Shahdara District', 'Delhi', 'Anand Vihar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Anand Vihar Railway Police Station', 'Shahdara District', 'Delhi', 'Anand Vihar Railway, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Farash Bazar Police Station', 'Shahdara District', 'Delhi', 'Farash Bazar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('GTB Enclave Police Station', 'Shahdara District', 'Delhi', 'GTB Enclave, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Harsh Vihar Police Station', 'Shahdara District', 'Delhi', 'Harsh Vihar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Jagat Puri Police Station', 'Shahdara District', 'Delhi', 'Jagat Puri, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Jyoti Nagar Police Station', 'Shahdara District', 'Delhi', 'Jyoti Nagar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Madhu Vihar Police Station', 'Shahdara District', 'Delhi', 'Madhu Vihar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Mansarover Park Police Station', 'Shahdara District', 'Delhi', 'Mansarover Park, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Nand Nagri Police Station', 'Shahdara District', 'Delhi', 'Nand Nagri, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Seema Puri Police Station', 'Shahdara District', 'Delhi', 'Seema Puri, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Shahdara Police Station', 'Shahdara District', 'Delhi', 'Shahdara, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Vivek Vihar Police Station', 'Shahdara District', 'Delhi', 'Vivek Vihar, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Welcome Police Station', 'Shahdara District', 'Delhi', 'Welcome, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),
('Zafrabad Police Station', 'Shahdara District', 'Delhi', 'Zafrabad, Delhi', 'Delhi', 'Delhi', 'Karkardooma District Courts', 'Karkardooma, Delhi - 110032'),

-- DISTRICT NEW DELHI - Patiala House Courts
('Barakhamba Road Police Station', 'New Delhi District', 'Delhi', 'Barakhamba Road, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Chanakya Puri Police Station', 'New Delhi District', 'Delhi', 'Chanakya Puri, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Connaught Place Police Station', 'New Delhi District', 'Delhi', 'Connaught Place, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Delhi Cantt Police Station', 'New Delhi District', 'Delhi', 'Delhi Cantt, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('IGI Airport Police Station', 'New Delhi District', 'Delhi', 'IGI Airport, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('IGI Metro Police Station', 'New Delhi District', 'Delhi', 'IGI Metro, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Inder Puri Police Station', 'New Delhi District', 'Delhi', 'Inder Puri, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Mandir Marg Police Station', 'New Delhi District', 'Delhi', 'Mandir Marg, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Naraina Police Station', 'New Delhi District', 'Delhi', 'Naraina, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('North Avenue Police Station', 'New Delhi District', 'Delhi', 'North Avenue, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Parliament Street Police Station', 'New Delhi District', 'Delhi', 'Parliament Street, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('R.K. Puram Police Station', 'New Delhi District', 'Delhi', 'R.K. Puram, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Sagar Pur Police Station', 'New Delhi District', 'Delhi', 'Sagar Pur, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Sarojini Nagar Police Station', 'New Delhi District', 'Delhi', 'Sarojini Nagar, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('South Avenue Police Station', 'New Delhi District', 'Delhi', 'South Avenue, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('South Campus Police Station', 'New Delhi District', 'Delhi', 'South Campus, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Tilak Marg Police Station', 'New Delhi District', 'Delhi', 'Tilak Marg, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Tuglak Road Police Station', 'New Delhi District', 'Delhi', 'Tuglak Road, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Vasant Kunj North Police Station', 'New Delhi District', 'Delhi', 'Vasant Kunj North, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Vasant Kunj South Police Station', 'New Delhi District', 'Delhi', 'Vasant Kunj South, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),
('Vasant Vihar Police Station', 'New Delhi District', 'Delhi', 'Vasant Vihar, New Delhi', 'New Delhi', 'Delhi', 'Patiala House Courts', 'Patiala House, New Delhi - 110001'),

-- DISTRICT NORTH - Rohini Courts
('Adarsh Nagar Police Station', 'North District', 'Delhi', 'Adarsh Nagar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Ali Pur Police Station', 'North District', 'Delhi', 'Ali Pur, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Bawana Police Station', 'North District', 'Delhi', 'Bawana, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Bhalswa Dairy Police Station', 'North District', 'Delhi', 'Bhalswa Dairy, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Jahangir Puri Police Station', 'North District', 'Delhi', 'Jahangir Puri, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('K.N. Katju Marg Police Station', 'North District', 'Delhi', 'K.N. Katju Marg, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Mahendra Park Police Station', 'North District', 'Delhi', 'Mahendra Park, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Model Town Police Station', 'North District', 'Delhi', 'Model Town, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Mukherjee Nagar Police Station', 'North District', 'Delhi', 'Mukherjee Nagar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Narela Industrial Area Police Station', 'North District', 'Delhi', 'Narela Industrial Area, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Prashant Vihar Police Station', 'North District', 'Delhi', 'Prashant Vihar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Samai Pur Badli Police Station', 'North District', 'Delhi', 'Samai Pur Badli, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Shahabad Dairy Police Station', 'North District', 'Delhi', 'Shahabad Dairy, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Swaroop Nagar Police Station', 'North District', 'Delhi', 'Swaroop Nagar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),

-- DISTRICT NORTH-WEST - Rohini Courts
('Aman Vihar Police Station', 'North-West District', 'Delhi', 'Aman Vihar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Ashok Vihar Police Station', 'North-West District', 'Delhi', 'Ashok Vihar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Begum Pur Police Station', 'North-West District', 'Delhi', 'Begum Pur, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Bharat Nagar Police Station', 'North-West District', 'Delhi', 'Bharat Nagar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Kanjhawala Police Station', 'North-West District', 'Delhi', 'Kanjhawala, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Keshav Puram Police Station', 'North-West District', 'Delhi', 'Keshav Puram, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Mangol Puri Police Station', 'North-West District', 'Delhi', 'Mangol Puri, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Maurya Enclave Police Station', 'North-West District', 'Delhi', 'Maurya Enclave, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Rani Bagh Police Station', 'North-West District', 'Delhi', 'Rani Bagh, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Rithala Metro Police Station', 'North-West District', 'Delhi', 'Rithala Metro, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Rohini North Police Station', 'North-West District', 'Delhi', 'Rohini North, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Rohini South Police Station', 'North-West District', 'Delhi', 'Rohini South, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Shalimar Bagh Police Station', 'North-West District', 'Delhi', 'Shalimar Bagh, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Subhash Palace Police Station', 'North-West District', 'Delhi', 'Subhash Palace, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Sultan Puri Police Station', 'North-West District', 'Delhi', 'Sultan Puri, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Udyog Nagar Metro Police Station', 'North-West District', 'Delhi', 'Udyog Nagar Metro, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),
('Vijay Vihar Police Station', 'North-West District', 'Delhi', 'Vijay Vihar, Delhi', 'New Delhi', 'Delhi', 'Rohini District Courts', 'Rohini, Delhi - 110085'),

-- DISTRICT WEST - Tis Hazari Courts
('Anand Parbat Police Station', 'West District', 'Delhi', 'Anand Parbat, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Hari Nagar Police Station', 'West District', 'Delhi', 'Hari Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Janak Puri Metro Police Station', 'West District', 'Delhi', 'Janak Puri Metro, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Khayala Police Station', 'West District', 'Delhi', 'Khayala, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Kirti Nagar Police Station', 'West District', 'Delhi', 'Kirti Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Maya Puri Police Station', 'West District', 'Delhi', 'Maya Puri, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Mianwali Nagar Police Station', 'West District', 'Delhi', 'Mianwali Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Moti Nagar Police Station', 'West District', 'Delhi', 'Moti Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Mundka Police Station', 'West District', 'Delhi', 'Mundka, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Nangloi Police Station', 'West District', 'Delhi', 'Nangloi, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Nihal Vihar Police Station', 'West District', 'Delhi', 'Nihal Vihar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Paschim Vihar Police Station', 'West District', 'Delhi', 'Paschim Vihar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Patel Nagar Police Station', 'West District', 'Delhi', 'Patel Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Punjabi Bagh Police Station', 'West District', 'Delhi', 'Punjabi Bagh, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Rajouri Garden Police Station', 'West District', 'Delhi', 'Rajouri Garden, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Ranhola Police Station', 'West District', 'Delhi', 'Ranhola, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),

-- DISTRICT SOUTH-WEST - Dwarka Courts
('Baba Haridas Nagar Police Station', 'South-West District', 'Delhi', 'Baba Haridas Nagar, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Binda Pur Police Station', 'South-West District', 'Delhi', 'Binda Pur, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Chhawla Police Station', 'South-West District', 'Delhi', 'Chhawla, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Dabri Police Station', 'South-West District', 'Delhi', 'Dabri, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Dwarka North Police Station', 'South-West District', 'Delhi', 'Dwarka North, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Dwarka Sector-23 Police Station', 'South-West District', 'Delhi', 'Dwarka Sector-23, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Dwarka South Police Station', 'South-West District', 'Delhi', 'Dwarka South, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Jaffarpur Kalan Police Station', 'South-West District', 'Delhi', 'Jaffarpur Kalan, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Janak Puri Police Station', 'South-West District', 'Delhi', 'Janak Puri, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Kapashera Police Station', 'South-West District', 'Delhi', 'Kapashera, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Najafgarh Police Station', 'South-West District', 'Delhi', 'Najafgarh, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Palam Domestic Airport Police Station', 'South-West District', 'Delhi', 'Palam Airport, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Palam Village Police Station', 'South-West District', 'Delhi', 'Palam Village, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Uttam Nagar Police Station', 'South-West District', 'Delhi', 'Uttam Nagar, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),
('Vikas Puri Police Station', 'South-West District', 'Delhi', 'Vikas Puri, New Delhi', 'New Delhi', 'Delhi', 'Dwarka District Courts', 'Dwarka, New Delhi - 110075'),

-- DISTRICT CENTRAL - Tis Hazari Courts
('Bara Hindu Rao Police Station', 'Central District', 'Delhi', 'Bara Hindu Rao, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Burari Police Station', 'Central District', 'Delhi', 'Burari, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Chandni Mahal Police Station', 'Central District', 'Delhi', 'Chandni Mahal, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Civil Lines Police Station', 'Central District', 'Delhi', 'Civil Lines, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Darya Ganj Police Station', 'Central District', 'Delhi', 'Darya Ganj, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('DBG Road Police Station', 'Central District', 'Delhi', 'DBG Road, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Gulabi Bagh Police Station', 'Central District', 'Delhi', 'Gulabi Bagh, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Hauz Qazi Police Station', 'Central District', 'Delhi', 'Hauz Qazi, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('I.P. Estate Police Station', 'Central District', 'Delhi', 'I.P. Estate, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Jama Masjid Police Station', 'Central District', 'Delhi', 'Jama Masjid, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Kamla Market Police Station', 'Central District', 'Delhi', 'Kamla Market, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Karol Bagh Police Station', 'Central District', 'Delhi', 'Karol Bagh, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Kashmere Gate Police Station', 'Central District', 'Delhi', 'Kashmere Gate, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Kotwali Police Station', 'Central District', 'Delhi', 'Kotwali, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Lahori Gate Police Station', 'Central District', 'Delhi', 'Lahori Gate, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Maurice Nagar Police Station', 'Central District', 'Delhi', 'Maurice Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Nabi Karim Police Station', 'Central District', 'Delhi', 'Nabi Karim, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Pahar Ganj Police Station', 'Central District', 'Delhi', 'Pahar Ganj, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Prasad Nagar Police Station', 'Central District', 'Delhi', 'Prasad Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Rajinder Nagar Police Station', 'Central District', 'Delhi', 'Rajinder Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Roop Nagar Police Station', 'Central District', 'Delhi', 'Roop Nagar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Sadar Bazar Police Station', 'Central District', 'Delhi', 'Sadar Bazar, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Sarai Rohilla Police Station', 'Central District', 'Delhi', 'Sarai Rohilla, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Subzi Mandi Police Station', 'Central District', 'Delhi', 'Subzi Mandi, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054'),
('Timarpur Police Station', 'Central District', 'Delhi', 'Timarpur, Delhi', 'New Delhi', 'Delhi', 'Tis Hazari District Courts', 'Tis Hazari, Delhi - 110054');

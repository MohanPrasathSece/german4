-- PART 1: SCHEMA AND SAKET JURISDICTION
-- ==========================================

-- 1. DROP EXISTING TO AVOID COLUMN ERRORS
DROP TABLE IF EXISTS police_stations CASCADE;

-- 2. CREATE TABLE WITH FULL SCHEMA
CREATE TABLE police_stations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    station_name TEXT NOT NULL,
    district TEXT NOT NULL,
    region TEXT NOT NULL DEFAULT 'Delhi',
    address TEXT NOT NULL,
    jurisdictional_court TEXT NOT NULL,
    court_address TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ENABLE RLS
ALTER TABLE police_stations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public select" ON police_stations FOR SELECT USING (true);

-- 4. INSERT DISTRICT SOUTH (Saket Courts)
INSERT INTO police_stations (station_name, district, address, jurisdictional_court, court_address) VALUES
('Ambedkar Nagar', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Fatehpur Beri', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Hauz Khas', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('INA Metro', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Malviya Nagar', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Mehrauli', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Neb Sarai', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Qutab Minar Metro', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Safdarjung Enclave', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Saket', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Sangam Vihar', 'South', 'South District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017');

-- 5. INSERT DISTRICT SOUTH-EAST (Saket Courts)
INSERT INTO police_stations (station_name, district, address, jurisdictional_court, court_address) VALUES
('Amar Colony', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Badar Pur', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Chitranjan Park', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Defence Colony', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Govind Puri', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Greater Kailash', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Hazrat Nizamuddin', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Jaitpur', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Jamia Nagar', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Kalkaji Metro', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Kalkaji', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Kotla Mubarak Pur', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Lajpat Nagar Metro', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Lajpat Nagar', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Lodhi Colony', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('New Friends Colony', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Okhla Industrial Area', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Pul Prahlad Pur', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Sarita Vihar', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017'),
('Sunlight Colony', 'South-East', 'South-East District, Delhi', 'Saket District Courts', 'Saket Court Complex, Saket, New Delhi 110017');

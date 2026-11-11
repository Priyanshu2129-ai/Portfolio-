-- ==============================================================================
-- PRIYANSHU KUMAR — PERSONAL PORTFOLIO & DYNAMIC PLATFORM
-- Production Supabase PostgreSQL Schema, Strict RLS Policies & Storage Setup
-- Designated Administrator: prajapatipriyanshu@gmail.com
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ACHIEVEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (
        category IN (
            'Hackathons',
            'Certifications',
            'Awards',
            'Competitions',
            'Academic',
            'Projects',
            'Milestones'
        )
    ),
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    organization TEXT NOT NULL,
    location TEXT,
    certificate_url TEXT,
    external_url TEXT,
    is_published BOOLEAN DEFAULT true NOT NULL,
    display_order INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast ordering and public lookup
CREATE INDEX IF NOT EXISTS idx_achievements_published_order 
    ON public.achievements(is_published, display_order ASC, created_at DESC);

-- 3. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for ordering contact messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_created 
    ON public.contact_messages(created_at DESC);

-- 4. ROW LEVEL SECURITY (RLS) ACTIVATION
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Clean existing policies if re-running
DROP POLICY IF EXISTS "Public can view published achievements" ON public.achievements;
DROP POLICY IF EXISTS "Admin full access to achievements" ON public.achievements;
DROP POLICY IF EXISTS "Designated Admin full access to achievements" ON public.achievements;

DROP POLICY IF EXISTS "Anyone can submit contact message" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can delete contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Designated Admin can view contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Designated Admin can update contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Designated Admin can delete contact messages" ON public.contact_messages;

-- ==============================================================================
-- ACHIEVEMENTS RLS POLICIES
-- ==============================================================================

-- A) Public can view only published achievements
CREATE POLICY "Public can view published achievements" 
    ON public.achievements
    FOR SELECT 
    USING (
        is_published = true 
        OR (auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com')
    );

-- B) ONLY designated admin account (prajapatipriyanshu@gmail.com) has full management access
CREATE POLICY "Designated Admin full access to achievements" 
    ON public.achievements
    FOR ALL 
    TO authenticated 
    USING (auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com');

-- ==============================================================================
-- CONTACT MESSAGES RLS POLICIES
-- ==============================================================================

-- A) Public can insert validated contact messages
CREATE POLICY "Anyone can submit contact message" 
    ON public.contact_messages
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (
        char_length(name) >= 2 AND 
        char_length(email) >= 5 AND 
        char_length(subject) >= 2 AND 
        char_length(message) >= 10
    );

-- B) ONLY designated admin account (prajapatipriyanshu@gmail.com) can view contact messages
CREATE POLICY "Designated Admin can view contact messages" 
    ON public.contact_messages
    FOR SELECT 
    TO authenticated 
    USING (auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com');

-- C) ONLY designated admin account can update contact message status (mark read/unread)
CREATE POLICY "Designated Admin can update contact messages" 
    ON public.contact_messages
    FOR UPDATE 
    TO authenticated 
    USING (auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com')
    WITH CHECK (auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com');

-- D) ONLY designated admin account can delete contact messages
CREATE POLICY "Designated Admin can delete contact messages" 
    ON public.contact_messages
    FOR DELETE 
    TO authenticated 
    USING (auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com');

-- ==============================================================================
-- STORAGE CONFIGURATION (Bucket: 'certificates')
-- ==============================================================================

-- Create public bucket 'certificates'
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'certificates', 
    'certificates', 
    true,
    5242880, -- 5 MB limit
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'application/pdf'] -- Excludes SVG to prevent XSS
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];

-- Clean existing storage policies
DROP POLICY IF EXISTS "Public Read Access for Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Access for Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access for Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access for Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Designated Admin Upload Access for Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Designated Admin Update Access for Certificates" ON storage.objects;
DROP POLICY IF EXISTS "Designated Admin Delete Access for Certificates" ON storage.objects;

-- Public can read certificates
CREATE POLICY "Public Read Access for Certificates"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'certificates');

-- ONLY designated admin account can upload files to 'certificates'
CREATE POLICY "Designated Admin Upload Access for Certificates"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'certificates' AND 
        auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com'
    );

-- ONLY designated admin account can update files in 'certificates'
CREATE POLICY "Designated Admin Update Access for Certificates"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'certificates' AND 
        auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com'
    );

-- ONLY designated admin account can delete files from 'certificates'
CREATE POLICY "Designated Admin Delete Access for Certificates"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'certificates' AND 
        auth.jwt() ->> 'email' = 'prajapatipriyanshu@gmail.com'
    );

-- ==============================================================================
-- 5. INITIAL SEED DATA (Honest Records as Provided)
-- ==============================================================================
INSERT INTO public.achievements (
    title,
    category,
    organization,
    date,
    location,
    description,
    certificate_url,
    external_url,
    is_published,
    display_order
) VALUES 
(
    'NodeCraft Hackathon — Participation',
    'Hackathons',
    'GP Patna-7, Gulzarbagh',
    '13 October 2026',
    'Patna, Bihar',
    'Participated in the offline NodeCraft Hackathon at GP Patna-7 campus. Collaborated in a cross-functional student team to design, prototype, and present LOCAHELP — our voice-first hyperlocal service discovery concept.',
    '/images/certificates/nodecraft-hackathon-cert.svg',
    NULL,
    true,
    1
),
(
    'Spark Idea Hackathon — Participation',
    'Hackathons',
    'NGP Patna-13 Campus',
    '14 October 2026',
    'Patna, Bihar',
    'Participated in the Spark Idea Hackathon at NGP Patna-13 Campus. Presented the LOCAHELP platform architecture, Live Skill Map prototype, and frontend workflows to the jury.',
    '/images/certificates/spark-idea-hackathon-cert.svg',
    NULL,
    true,
    2
)
ON CONFLICT DO NOTHING;

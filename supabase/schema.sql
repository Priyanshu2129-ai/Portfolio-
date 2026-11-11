-- ==============================================================================
-- PRIYANSHU KUMAR — PERSONAL PORTFOLIO & DYNAMIC PLATFORM
-- Supabase PostgreSQL Schema, RLS Policies & Storage Setup
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

-- 4. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Achievements Policies:
-- A) Public can view published achievements
CREATE POLICY "Public can view published achievements" 
    ON public.achievements
    FOR SELECT 
    USING (is_published = true);

-- B) Authenticated administrators have full access (select, insert, update, delete)
CREATE POLICY "Admin full access to achievements" 
    ON public.achievements
    FOR ALL 
    TO authenticated 
    USING (true)
    WITH CHECK (true);

-- Contact Messages Policies:
-- A) Anyone can submit a contact message (with basic validation)
CREATE POLICY "Anyone can submit contact message" 
    ON public.contact_messages
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (
        char_length(name) > 0 AND 
        char_length(email) > 3 AND 
        char_length(subject) > 0 AND 
        char_length(message) > 0
    );

-- B) Authenticated administrators can read messages
CREATE POLICY "Admin can view contact messages" 
    ON public.contact_messages
    FOR SELECT 
    TO authenticated 
    USING (true);

-- C) Authenticated administrators can update message read status
CREATE POLICY "Admin can update contact messages" 
    ON public.contact_messages
    FOR UPDATE 
    TO authenticated 
    USING (true);

-- D) Authenticated administrators can delete messages
CREATE POLICY "Admin can delete contact messages" 
    ON public.contact_messages
    FOR DELETE 
    TO authenticated 
    USING (true);

-- 5. STORAGE BUCKET CONFIGURATION (for Certificates & Media)
-- Note: You can run this in Supabase SQL Editor to initialize the bucket and its policies
INSERT INTO storage.buckets (id, name, public)
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for 'certificates'
CREATE POLICY "Public Read Access for Certificates"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'certificates');

CREATE POLICY "Admin Upload Access for Certificates"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'certificates');

CREATE POLICY "Admin Update Access for Certificates"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (bucket_id = 'certificates');

CREATE POLICY "Admin Delete Access for Certificates"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'certificates');

-- 6. INITIAL SEED DATA (Honest Records as Provided)
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

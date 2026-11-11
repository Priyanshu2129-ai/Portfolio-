# PRIYANSHU KUMAR — PERSONAL PORTFOLIO & PLATFORM
> **BECOMING UNBEATABLE**  
> *Still learning. Always building.*

A complete, high-performance, futuristic personal portfolio and dynamic achievement management platform built for **Priyanshu Kumar**, 3rd Year Diploma in Computer Science Engineering student at **GP VAISHALI**.

---

## 🚀 Key Highlights & Architectural Features

1. **Cosmic Design System:**
   - Deep charcoal/near-black theme with electric neon lime (`#00ff87`) and subtle nebula violet (`#8b5cf6`).
   - Interactive HTML5 starfield canvas with cursor parallax and reduced-motion safety.
   - Editorial typography, subtle glowing accents, and fluid Framer Motion scroll reveals.
   - Non-intrusive desktop custom cursor, top gradient scroll progress bar, and mobile responsive drawer navigation.

2. **Honest Engineering Persona:**
   - Truthfully presented as a 3rd-year diploma student at GP VAISHALI.
   - Categorized skills (Programming, Frontend, Backend, Database, Tools) represented without fake proficiency percentages.
   - Highlighted featured projects:
     - **Student Resource Hub:** Live production web application ([Live Demo](https://student-resources-hq1anqjkr-student-resource-hub1.vercel.app/login)).
     - **Hospital Management System:** Patient access and queue-reduction concept architecture.
     - **LOCAHELP:** Voice-first hyperlocal service discovery hackathon spotlight (NodeCraft & Spark Idea hackathons), clearly emphasizing Priyanshu's role as Frontend Developer & PPT Maker.

3. **Dynamic Achievements & Admin Management System:**
   - Private, secure administration dashboard at `/admin/dashboard` protected by Next.js middleware and Supabase SSR session validation.
   - Full CRUD: Add, edit, delete, publish/unpublish, and reorder achievements.
   - Certificate uploader supporting PDF, PNG, JPG, and WebP directly to Supabase Storage.
   - Fallback resilience: Public website works immediately with initial hackathon data even before cloud credentials are provided.

4. **Security & Data Integrity:**
   - Zero hardcoded API secrets.
   - PostgreSQL Row Level Security (RLS) enforcing public read-only access for published milestones and write restrictions to authenticated admins.
   - Contact form with honeypot bot trap, validation, and direct storage in Supabase.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server & Client Components)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend & Auth:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`)
- **Deployment Platform:** [Vercel](https://vercel.com/)

---

## 📁 Project Structure

```
Priyanshu-portfolio/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── images/
│       ├── profile/          # Profile photos & placeholder
│       ├── projects/         # Student Resource Hub & Hospital System SVGs
│       └── certificates/     # Hackathon certificate SVG placeholders
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root HTML shell, fonts, metadata
│   │   ├── page.tsx          # Public home single-page experience
│   │   ├── globals.css       # Tailwind directives & cosmic scrollbars
│   │   ├── admin/
│   │   │   ├── login/        # Secure admin login form
│   │   │   └── dashboard/    # Milestone management dashboard
│   │   └── api/
│   │       └── contact/      # Contact submission endpoint with honeypot & RLS
│   ├── components/
│   │   ├── about/            # About me & journey trajectory
│   │   ├── achievements/     # Public dynamic milestones grid
│   │   ├── contact/          # Contact section, copy-email, social links
│   │   ├── hackathons/       # NodeCraft & Spark Idea hackathon cards
│   │   ├── hero/             # Kinetic headline, status badges, avatar
│   │   ├── locahelp/         # LocaHelp hyperlocal radar & voice simulation
│   │   ├── navigation/       # Sticky navbar & cosmic footer
│   │   ├── projects/         # Projects showcase & detail modal
│   │   ├── skills/           # Categorized skill cards
│   │   ├── ui/               # Button, Badge primitives
│   │   └── visual/           # CosmicBackground, CustomCursor, ScrollProgress
│   ├── data/                 # Portfolio, projects, hackathons, initial data
│   ├── lib/
│   │   ├── supabase/         # SSR Supabase client, server, middleware
│   │   └── utils.ts          # Class utilities & date formatters
│   ├── middleware.ts         # Server-side route guard for /admin/dashboard
│   └── types/                # TypeScript interfaces
└── supabase/
    └── schema.sql            # PostgreSQL schema, RLS policies, and storage setup
```

---

## ⚡ Getting Started Locally

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd Priyanshu-portfolio
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Supabase project parameters:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Initialize the Supabase Database & Storage
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Open the **SQL Editor**.
3. Copy the entire contents of `supabase/schema.sql` and run it.
4. This script creates:
   - The `achievements` table with preloaded initial hackathon records.
   - The `contact_messages` table.
   - RLS policies ensuring public read safety and admin-only modification.
   - The `certificates` public storage bucket.

### 4. Create the First Admin Account
1. In the Supabase Dashboard, navigate to **Authentication > Users**.
2. Click **Add User > Create User**.
3. Enter your email (e.g. `prajapatipriyanshu@gmail.com`) and choose a secure password.
4. Confirm user creation.
5. You can now log in at `http://localhost:3000/admin/login` to manage achievements!

### 5. Start the Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🖼️ Replacing Placeholders with Your Personal Assets

To personalize the website with your actual photograph and certificates:

1. **Profile Photograph:**
   - Drop your professional headshot into `public/images/profile/profile.jpg` (or `.png`).
   - In `src/components/hero/HeroSection.tsx`, update the image `src` to `/images/profile/profile.jpg`.

2. **Hackathon Certificates:**
   - Log into `/admin/dashboard` and click **Edit** on each hackathon record to upload your certificates directly to Supabase Storage, or save the files to `public/images/certificates/`.

3. **Project Screenshots:**
   - Place any new screenshots in `public/images/projects/` and update references in `src/data/projects.ts`.

---

## 🚢 Vercel Deployment Checklist

When ready to deploy:
1. Initialize a Git repository and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Priyanshu Kumar personal portfolio"
   ```
2. Push to your GitHub account:
   ```bash
   git remote add origin https://github.com/Priyanshu2129-ai/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
3. Connect your repository to **Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **Add New > Project**.
   - Import your portfolio repository.
   - In **Environment Variables**, add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_SITE_URL` (set to your Vercel production URL, e.g. `https://priyanshu-portfolio.vercel.app`)
   - Click **Deploy**.

---

## 🛡️ License
Private portfolio of **Priyanshu Kumar**. All rights reserved.

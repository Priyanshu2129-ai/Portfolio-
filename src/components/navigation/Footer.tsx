'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Instagram, Mail, ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-cosmic-950/90 pt-16 pb-12 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-lime-neon/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cosmic-800 border border-lime-neon/40 shadow-glow-lime">
                <span className="font-mono font-black text-sm text-lime-neon">P</span>
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                PRIYANSHU KUMAR
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {personalInfo.education.degree} ({personalInfo.education.year}) at{' '}
              <span className="text-slate-200 font-semibold">{personalInfo.institution}</span>.
              Dedicated to learning deeply, experimenting with modern technologies, and building software that solves real-world challenges.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-neon/10 border border-lime-neon/20 text-lime-neon text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-lime-neon animate-ping" />
              <span>STILL LEARNING. ALWAYS BUILDING.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-lime-neon transition-colors">
                  About &amp; Journey
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-lime-neon transition-colors">
                  Skills &amp; Technologies
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-lime-neon transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#locahelp" className="hover:text-lime-neon transition-colors">
                  LocaHelp Spotlight
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-lime-neon transition-colors">
                  Achievements &amp; Hackathons
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-lime-neon transition-colors">
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Connect &amp; Verification
            </h4>
            <div className="flex items-center gap-2.5">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-lime-neon/50 hover:bg-lime-neon/10 transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-lime-neon/50 hover:bg-lime-neon/10 transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-lime-neon/50 hover:bg-lime-neon/10 transition-all duration-200"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.socials.email}`}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-lime-neon/50 hover:bg-lime-neon/10 transition-all duration-200"
                aria-label="Send Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/login"
                className="text-xs font-mono text-slate-500 hover:text-lime-neon transition-colors flex items-center gap-1.5"
              >
                <span>→ Portal Admin Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Priyanshu Kumar. Built with Next.js, Tailwind &amp; Supabase.</span>
          </p>
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-lime-neon/50 text-slate-400 hover:text-lime-neon transition-all"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

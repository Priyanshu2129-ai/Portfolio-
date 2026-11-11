'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Terminal, Code2, ArrowUpRight, Upload } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Kinetic Typography & Hero Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
          {/* Identity Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex flex-wrap items-center gap-2.5"
          >
            <Badge variant="lime" size="md" className="gap-2">
              <span className="w-2 h-2 rounded-full bg-lime-neon animate-pulse" />
              <span>{personalInfo.motto}</span>
            </Badge>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              <Terminal className="w-3.5 h-3.5 text-violet-nebula" />
              <span>{personalInfo.institution} • {personalInfo.education.year} CSE</span>
            </span>
          </motion.div>

          {/* Core Master Headline: BECOMING UNBEATABLE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-1 mb-6"
          >
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.92]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                BECOMING
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lime-neon via-[#3bf39d] to-sky-400 filter drop-shadow-[0_0_35px_rgba(0,255,135,0.3)]">
                UNBEATABLE<span className="text-white">.</span>
              </span>
            </h1>
          </motion.div>

          {/* Introduction & Honest Persona */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 max-w-xl mb-8"
          >
            <p className="text-lg sm:text-xl font-medium text-slate-200 leading-snug">
              {personalInfo.heroIntro}
            </p>
            <p className="text-base text-slate-400 leading-relaxed font-sans">
              &quot;{personalInfo.heroSupporting}&quot;
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="primary"
              onClick={() => handleScroll('projects')}
              className="gap-2 group shadow-glow-lime w-full sm:w-auto"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => handleScroll('contact')}
              className="gap-2 group w-full sm:w-auto"
            >
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </motion.div>

          {/* Quick Metrics / Learning Pillars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/10 w-full grid grid-cols-3 gap-4"
          >
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Current Phase</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">3rd Year Diploma</p>
              <p className="text-[11px] text-lime-neon font-mono">GP VAISHALI</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Core Focus</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">Modern Web &amp; AI</p>
              <p className="text-[11px] text-slate-400 font-mono">Full-Stack Dev</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase text-slate-400">Mindset</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">Learn by Building</p>
              <p className="text-[11px] text-violet-nebula font-mono">Always Experimenting</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Professionally Positioned Profile Element & Placeholder Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center lg:justify-end z-10"
        >
          <div className="relative w-full max-w-sm sm:max-w-md">
            {/* Glowing Backdrop Ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-lime-neon/30 via-violet-nebula/30 to-sky-500/30 blur-xl opacity-75 animate-pulse-slow pointer-events-none" />

            {/* Profile Frame Card */}
            <div className="relative rounded-3xl bg-cosmic-900/90 border border-white/15 p-4 sm:p-5 backdrop-blur-2xl shadow-2xl overflow-hidden">
              {/* Header inside frame */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-lime-neon" />
                  <span>IDENTITY_PROFILE</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-lime-neon/10 text-lime-neon border border-lime-neon/30 font-bold">
                  VERIFIED STUDENT
                </span>
              </div>

              {/* Profile Image Viewport */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-cosmic-950 border border-white/10 flex items-center justify-center group">
                <Image
                  src="/images/profile/placeholder-avatar.svg"
                  alt="Priyanshu Kumar - Profile"
                  width={400}
                  height={400}
                  priority
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Overlay Instruction Badge */}
                <div className="absolute bottom-3 inset-x-3 bg-cosmic-950/85 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-lime-neon/10 border border-lime-neon/30 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-lime-neon" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-slate-200 truncate">
                      Priyanshu Kumar
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">
                      Place photo in /public/images/profile/
                    </p>
                  </div>
                </div>
              </div>

              {/* Status pill beneath photo */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-neon opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime-neon" />
                  </span>
                  <span className="text-xs font-mono text-slate-300">Open for Collaboration</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Patna / Vaishali</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


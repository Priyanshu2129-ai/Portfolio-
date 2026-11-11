'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles, Code, Film, Bot, Layers, Compass, BookOpen } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';

export default function AboutSection() {
  const journeyMilestones = [
    {
      phase: "Foundational Exploration",
      title: "Discovering Code & Computer Science",
      description: "Started with core programming languages — C, Java, and Python — developing foundational algorithmic logic and computational thinking.",
      tag: "Logic & Core Languages"
    },
    {
      phase: "Frontend & Full-Stack Expansion",
      title: "Turning Code into Interactive Interfaces",
      description: "Explored the web stack: HTML, CSS, modern JavaScript, and React. Learned how state, components, and responsive design work together to create accessible applications.",
      tag: "React & Modern Web"
    },
    {
      phase: "Hackathons & Real-World Prototyping",
      title: "Building LOCAHELP & Resource Platforms",
      description: "Collaborated under intense offline hackathon deadlines at NodeCraft (GP Patna-7) and Spark Idea (NGP Patna-13), building LOCAHELP and deploying the live Student Resource Hub.",
      tag: "Team Hackathons & Deployments"
    },
    {
      phase: "Present & Future Horizon",
      title: "3rd Year at GP VAISHALI & AI Tools",
      description: "Currently in 3rd year Diploma CSE. Actively experimenting with AI APIs, video editing workflows, and full-stack cloud databases with Supabase and Vercel.",
      tag: "Becoming Unbeatable"
    }
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Background glow element */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-violet-nebula/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <div className="flex items-center gap-2">
            <Badge variant="violet" size="sm">
              <Compass className="w-3.5 h-3.5 text-violet-300" />
              <span>THE JOURNEY</span>
            </Badge>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            About Priyanshu Kumar<span className="text-lime-neon">.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
            A transparent look into my academic journey, technical curiosities, and dedication to building with purpose.
          </p>
        </div>

        {/* Top Grid: Editorial Narrative & Official Education Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Complete Personal Introduction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl bg-cosmic-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-lime-neon/5 blur-[80px] pointer-events-none" />

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2.5">
                <span>Passionate Student. Active Builder.</span>
              </h3>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
                {personalInfo.bio.map((paragraph, index) => (
                  <p key={index} className="text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Personal Manifesto Quote */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <div className="w-1.5 h-12 bg-lime-neon rounded-full" />
                <div>
                  <p className="font-mono text-xs text-lime-neon uppercase tracking-widest font-bold">
                    IDENTITY PHILOSOPHY
                  </p>
                  <p className="text-base sm:text-lg font-bold text-white italic">
                    &quot;{personalInfo.quote}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Education & Focus Pillars */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            <div className="rounded-3xl bg-gradient-to-b from-cosmic-800/80 to-cosmic-900/80 border border-lime-neon/30 p-6 sm:p-7 backdrop-blur-xl shadow-glow-lime/10 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-lime-neon/10 border border-lime-neon/30 text-lime-neon">
                  <GraduationCap className="w-6 h-6" />
                </span>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-lime-neon/15 text-lime-neon border border-lime-neon/30">
                  {personalInfo.education.status}
                </span>
              </div>

              <div className="space-y-1.5 mb-5">
                <h4 className="text-xl font-extrabold text-white">
                  {personalInfo.education.degree}
                </h4>
                <p className="text-sm font-semibold text-lime-neon font-mono">
                  {personalInfo.education.year}
                </p>
                <p className="text-base text-slate-300 flex items-center gap-2 pt-1">
                  <span className="font-bold text-white tracking-wide">{personalInfo.institution}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
                <p>• Department: Computer Science &amp; Engineering</p>
                <p>• Practical hands-on coursework &amp; programming labs</p>
                <p>• Active participation in inter-college tech hackathons</p>
              </div>
            </div>

            {/* Core Curiosities / Special Interests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-cosmic-900/60 border border-white/10 p-4 backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-3">
                  <Bot className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">Modern AI Tools</h5>
                <p className="text-xs text-slate-400 leading-snug">
                  Exploring practical LLM integrations, AI APIs, and developer workflows.
                </p>
              </div>

              <div className="rounded-2xl bg-cosmic-900/60 border border-white/10 p-4 backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-violet-nebula/10 border border-violet-nebula/30 text-violet-300 flex items-center justify-center mb-3">
                  <Film className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-bold text-white mb-1">Video Editing</h5>
                <p className="text-xs text-slate-400 leading-snug">
                  Crafting visual pacing, narrative rhythm, and engaging digital video stories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Timeline Visualization */}
        <div className="mt-8 rounded-3xl bg-cosmic-900/40 border border-white/10 p-6 sm:p-10 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 mb-8">
            <BookOpen className="w-5 h-5 text-lime-neon" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Learning &amp; Growth Trajectory
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {journeyMilestones.map((milestone, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-2xl bg-cosmic-950/70 border border-white/10 p-5 hover:border-lime-neon/40 transition-colors duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-lime-neon font-bold">
                      PHASE 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5">
                      {milestone.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 leading-snug">
                    {milestone.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

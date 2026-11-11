'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Globe,
  Server,
  Database,
  Wrench,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { skillCategories, SkillCategoryGroup } from '@/data/skills';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categoryIcons: Record<string, React.ReactNode> = {
    Programming: <Code className="w-4 h-4" />,
    Frontend: <Globe className="w-4 h-4" />,
    Backend: <Server className="w-4 h-4" />,
    Database: <Database className="w-4 h-4" />,
    Tools: <Wrench className="w-4 h-4" />,
  };

  const filteredCategories =
    selectedCategory === 'All'
      ? skillCategories
      : skillCategories.filter((cat) => cat.category === selectedCategory);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-lime-neon/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <Badge variant="lime" size="sm">
              <Terminal className="w-3.5 h-3.5 text-lime-neon" />
              <span>TECHNICAL REPERTOIRE</span>
            </Badge>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Skills &amp; Technologies<span className="text-lime-neon">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
              Technologies and tools I have actively learned, explored, and built projects with throughout my diploma coursework and personal experiments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-cosmic-900/80 border border-white/10 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory('All')}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200',
                selectedCategory === 'All'
                  ? 'bg-lime-neon text-cosmic-950 font-bold shadow-glow-lime'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              All Categories
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategory(cat.category)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5',
                  selectedCategory === cat.category
                    ? 'bg-lime-neon text-cosmic-950 font-bold shadow-glow-lime'
                    : 'text-slate-400 hover:text-white'
                )}
              >
                <span>{categoryIcons[cat.category]}</span>
                <span>{cat.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((group) => (
            <div
              key={group.category}
              className="rounded-3xl bg-cosmic-900/60 border border-white/10 hover:border-lime-neon/40 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-lime-neon group-hover:border-lime-neon/40 transition-colors">
                      {categoryIcons[group.category]}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-lime-neon transition-colors">
                        {group.title}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {group.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5">
                    {group.skills.length} Techs
                  </span>
                </div>

                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills within Category */}
                <div className="space-y-2.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-cosmic-950/60 border border-white/5 hover:border-white/20 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime-neon shrink-0" />
                          <span>{skill.name}</span>
                        </span>
                        <span className="text-[10px] font-mono text-lime-neon/90 bg-lime-neon/10 border border-lime-neon/20 px-2 py-0.5 rounded-full">
                          {skill.levelTag}
                        </span>
                      </div>
                      {skill.description && (
                        <p className="text-[11px] text-slate-400 pl-5 leading-relaxed">
                          {skill.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom tag */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Practiced &amp; Implemented</span>
                <span className="text-lime-neon">● Active</span>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Ethos Notice */}
        <div className="mt-12 rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-lime-neon/10 border border-lime-neon/30 flex items-center justify-center text-lime-neon shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              <span className="font-bold text-white">Honest Skill Representation:</span> Rather than arbitrary percentages, each technology represents active coursework, personal building, and hackathon prototypes.
            </p>
          </div>
          <span className="text-xs font-mono text-lime-neon whitespace-nowrap">
            STILL LEARNING. ALWAYS BUILDING.
          </span>
        </div>
      </div>
    </section>
  );
}


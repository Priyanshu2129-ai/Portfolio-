'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mic,
  Navigation,
  MapPin,
  Radio,
  Users,
  Compass,
  Sparkles,
  Volume2,
  FileSpreadsheet,
  Monitor
} from 'lucide-react';
import { locaHelpData } from '@/data/hackathons';
import { Badge } from '@/components/ui/Badge';

export default function LocaHelpFeature() {
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  return (
    <section id="locahelp" className="relative py-24 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Background glow radial */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-lime-neon/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-nebula/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header with Team Hackathon Disclosure */}
        <div className="space-y-3 mb-14">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="lime" size="sm">
              <Radio className="w-3.5 h-3.5 text-lime-neon animate-pulse" />
              <span>HACKATHON INNOVATION SPOTLIGHT</span>
            </Badge>
            <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              Team Hackathon Project • NodeCraft &amp; Spark Idea
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            LOCAHELP<span className="text-lime-neon">.</span>
          </h2>
          <p className="text-base sm:text-xl font-medium text-lime-neon max-w-3xl">
            {locaHelpData.tagline}
          </p>
        </div>

        {/* Main Feature Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vision, Description & Priyanshu's Role */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl bg-cosmic-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
              <h3 className="text-xl font-bold text-white mb-4">
                The Hyperlocal Vision
              </h3>
              
              <blockquote className="p-4 rounded-2xl bg-white/5 border-l-4 border-lime-neon text-slate-200 italic text-sm sm:text-base font-sans mb-6">
                &quot;{locaHelpData.vision}&quot;
              </blockquote>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {locaHelpData.description}
              </p>

              {/* Explicit Contribution Box */}
              <div className="p-5 rounded-2xl bg-cosmic-950 border border-lime-neon/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-lime-neon font-bold uppercase tracking-wider">
                    MY CONTRIBUTION &amp; RESPONSIBILITY
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                    Team Hackathon
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-lime-neon/15 border border-lime-neon/30 flex items-center justify-center text-lime-neon shrink-0">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {locaHelpData.role}
                    </h4>
                    <p className="text-xs text-slate-400">
                      Co-created during offline hackathons at GP Patna-7 and NGP Patna-13
                    </p>
                  </div>
                </div>

                <ul className="space-y-1.5 pt-2 text-xs text-slate-300">
                  {locaHelpData.contributions.map((item, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-lime-neon font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Hyperlocal Radar & Voice Simulation Interface */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-3xl bg-cosmic-900/70 border border-white/15 p-6 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              {/* Radar Simulation Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-neon opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-neon" />
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-200">
                    LIVE SKILL MAP SIMULATION
                  </span>
                </div>
                <span className="text-[11px] font-mono text-lime-neon bg-lime-neon/10 border border-lime-neon/30 px-2.5 py-0.5 rounded-full">
                  2–5 KM RADIUS
                </span>
              </div>

              {/* Interactive Voice Query Mockup */}
              <div className="p-4 rounded-2xl bg-cosmic-950 border border-white/10 mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-lime-neon" />
                    <span>VOICE SEARCH (LOCAL LANGUAGE)</span>
                  </span>
                  <span className="text-[10px] text-slate-500">CONCEPT UI</span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <button
                    onClick={() => setActiveQueryIndex((prev) => (prev + 1) % locaHelpData.simulatedWorkers.length)}
                    className="w-10 h-10 rounded-full bg-lime-neon text-cosmic-950 flex items-center justify-center shrink-0 shadow-glow-lime hover:scale-105 transition-transform"
                    aria-label="Cycle simulated voice command"
                  >
                    <Mic className="w-5 h-5 animate-pulse" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-mono">Simulated Voice Query:</p>
                    <p className="text-sm font-semibold text-white truncate">
                      &quot;{locaHelpData.simulatedWorkers[activeQueryIndex].voiceQuery}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulated Nearby Resource Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>DISCOVERED LOCAL WORKERS</span>
                  <span>CLICK MIC TO ROTATE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {locaHelpData.simulatedWorkers.map((worker, wIdx) => {
                    const isSelected = wIdx === activeQueryIndex;
                    return (
                      <div
                        key={wIdx}
                        onClick={() => setActiveQueryIndex(wIdx)}
                        className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-lime-neon/10 border-lime-neon shadow-glow-lime/40'
                            : 'bg-cosmic-950/70 border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                            {worker.category}
                          </span>
                          <span className="text-xs font-mono font-bold text-lime-neon flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {worker.distance}
                          </span>
                        </div>
                        <h5 className="text-sm font-bold text-white mb-1">
                          {worker.title}
                        </h5>
                        <p className="text-xs text-slate-400 font-mono">
                          ● {worker.status}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Concept Transparency Disclaimer */}
              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono text-slate-500 leading-relaxed">
                * Note: LOCAHELP is a hackathon innovation concept developed collaboratively for NodeCraft &amp; Spark Idea. The map radar and worker tiles above are visual UI simulations illustrating the 2–5 km discovery thesis and are not a live transactional platform.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

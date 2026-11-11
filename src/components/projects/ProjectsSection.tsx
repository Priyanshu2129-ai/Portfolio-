'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Layers,
  CheckCircle2,
  X,
  Sparkles,
  Info,
  Calendar,
  AlertCircle,
  FolderGit2
} from 'lucide-react';
import { projectsData } from '@/data/projects';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-lime-neon/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <Badge variant="lime" size="sm">
            <FolderGit2 className="w-3.5 h-3.5 text-lime-neon" />
            <span>FEATURED WORK</span>
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Projects Showcase<span className="text-lime-neon">.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
            Real software built for real needs — ranging from live production tools for diploma peers to architectural healthcare access concepts.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => {
            const isLive = project.category === 'Live Project';
            return (
              <div
                key={project.id}
                className="group relative rounded-3xl bg-cosmic-900/60 border border-white/10 hover:border-lime-neon/50 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Glowing border highlight on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-lime-neon/5 blur-[90px] group-hover:bg-lime-neon/10 transition-colors pointer-events-none" />

                <div>
                  {/* Card Header & Badge */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="font-mono text-xs font-bold text-lime-neon">
                      PROJECT 0{index + 1}
                    </span>
                    <Badge
                      variant={isLive ? 'pulse' : 'slate'}
                      size="sm"
                    >
                      {isLive && <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-ping" />}
                      <span>{project.category}</span>
                    </Badge>
                  </div>

                  {/* Visual Preview */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-cosmic-950 border border-white/10 mb-6 group/img">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {isLive && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-lime-neon text-cosmic-950 text-[10px] font-mono font-bold shadow-glow-lime">
                        LIVE DEMO READY
                      </div>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-2 mb-4">
                    <h3 className="font-display font-extrabold text-2xl text-white group-hover:text-lime-neon transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Features Preview (Top 3) */}
                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Key Highlights:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {project.features.slice(0, 3).map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime-neon shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-500">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs"
                  >
                    View Details &amp; Architecture
                  </Button>

                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button size="sm" variant="primary" className="gap-1.5 text-xs">
                        <span>Launch Live Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-slate-400" />
                      <span>Concept Architecture</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal / Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl rounded-3xl bg-cosmic-900 border border-white/20 p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <Badge variant={selectedProject.category === 'Live Project' ? 'pulse' : 'slate'}>
                    {selectedProject.category}
                  </Badge>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm font-mono text-lime-neon mt-1">
                    {selectedProject.tagline}
                  </p>
                </div>

                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-cosmic-950 border border-white/10">
                  <Image
                    src={selectedProject.thumbnail}
                    alt={selectedProject.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300">
                    Project Overview
                  </h4>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {selectedProject.longDescription || selectedProject.description}
                  </p>
                </div>

                {/* All Features Checklist */}
                <div className="space-y-3">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300">
                    System Architecture &amp; Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProject.features.map((feature, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-lime-neon shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Grid */}
                <div className="space-y-3">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-slate-300">
                    Complete Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg bg-cosmic-800 border border-white/10 text-xs font-mono text-lime-neon font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Development Information & Disclosure */}
                <div className="p-4 rounded-xl bg-cosmic-950 border border-white/10 text-xs text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-200">Engineering Disclosure:</p>
                  <p>{selectedProject.developmentInfo}</p>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                  </Button>

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="md" variant="primary" className="gap-2">
                        <span>Open Live Project</span>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


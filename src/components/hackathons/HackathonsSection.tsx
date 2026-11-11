'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Users,
  Eye,
  X,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { hackathonsData, HackathonEvent } from '@/data/hackathons';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function HackathonsSection() {
  const [activeCertificate, setActiveCertificate] = useState<HackathonEvent | null>(null);

  return (
    <section id="hackathons" className="relative py-24 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Background glow element */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-violet-nebula/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="space-y-3 mb-16">
          <Badge variant="violet" size="sm">
            <Award className="w-3.5 h-3.5 text-violet-300" />
            <span>HACKATHON EXPERIENCES</span>
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Hackathons &amp; Competitions<span className="text-lime-neon">.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
            In-person innovation hackathons where ideas were pushed from whiteboard sketches into working prototypes under rigorous timelines.
          </p>
        </div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hackathonsData.map((event, index) => (
            <div
              key={event.id}
              className="rounded-3xl bg-cosmic-900/60 border border-white/10 hover:border-violet-nebula/50 p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                {/* Event Top Badge */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="font-mono text-xs font-bold text-violet-400">
                    EVENT 0{index + 1}
                  </span>
                  <Badge variant="violet" size="sm">
                    {event.mode} Mode
                  </Badge>
                </div>

                {/* Event Name */}
                <h3 className="font-display font-extrabold text-2xl text-white group-hover:text-violet-300 transition-colors mb-3">
                  {event.name}
                </h3>

                {/* Date & Venue meta */}
                <div className="space-y-1.5 mb-6 text-xs text-slate-300 font-mono">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-lime-neon" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-violet-400" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    <span>Team Project: <strong className="text-white">{event.teamProject}</strong></span>
                  </div>
                </div>

                {/* Event Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* Certificate Thumbnail Preview */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-cosmic-950 border border-white/10 mb-6 group/cert">
                  <Image
                    src={event.certificatePlaceholder}
                    alt={`${event.name} Certificate`}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover group-hover/cert:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-cosmic-950/40 backdrop-blur-[1px] flex items-center justify-center opacity-0 group-hover/cert:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => setActiveCertificate(event)}
                      className="gap-1.5 shadow-glow-lime text-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Official Record</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Card Footer: Achievement Status & Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-lime-neon" />
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    {event.achievement}
                  </span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveCertificate(event)}
                  className="text-xs gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Lightbox Modal */}
      <AnimatePresence>
        {activeCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertificate(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl rounded-3xl bg-cosmic-900 border border-white/20 p-6 sm:p-8 shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveCertificate(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close certificate viewer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div>
                  <Badge variant="violet">Official Verification View</Badge>
                  <h3 className="font-display font-extrabold text-2xl text-white mt-2">
                    {activeCertificate.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {activeCertificate.venue} • {activeCertificate.date}
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-cosmic-950 border border-white/15">
                  <Image
                    src={activeCertificate.certificatePlaceholder}
                    alt={activeCertificate.name}
                    width={800}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-mono">
                  <span>Recipient: <strong>PRIYANSHU KUMAR</strong> ({activeCertificate.achievement})</span>
                  <span className="text-lime-neon font-semibold">
                    Document preserved • Replaceable via Admin Dashboard
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

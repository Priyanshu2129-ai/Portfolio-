'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  Eye,
  Filter,
  Layers,
  Sparkles,
  X,
  FileCheck2,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { Achievement, AchievementCategory } from '@/types/achievement';
import { initialAchievements } from '@/data/initial-achievements';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const categories: ('All' | AchievementCategory)[] = [
  'All',
  'Hackathons',
  'Certifications',
  'Awards',
  'Competitions',
  'Academic',
  'Projects',
  'Milestones',
];

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [selectedCategory, setSelectedCategory] = useState<'All' | AchievementCategory>('All');
  const [activeCertUrl, setActiveCertUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const supabase = createClient();
        if (!supabase) {
          // Fallback to static initial data
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('achievements')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setAchievements(data as Achievement[]);
          setIsLiveConnected(true);
        }
      } catch (err) {
        console.warn('Supabase not yet configured or reachable; using initial records.', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadAchievements();
  }, []);

  const filtered =
    selectedCategory === 'All'
      ? achievements
      : achievements.filter((item) => item.category === selectedCategory);

  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-lime-neon/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header with Dynamic Status Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Badge variant="lime" size="sm">
                <Trophy className="w-3.5 h-3.5 text-lime-neon" />
                <span>DYNAMIC RECORDS</span>
              </Badge>
              {isLiveConnected ? (
                <span className="text-[10px] font-mono text-lime-neon bg-lime-neon/10 border border-lime-neon/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-neon animate-pulse" />
                  <span>SUPABASE SYNCED</span>
                </span>
              ) : (
                <span className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                  INITIAL DATA PRESERVED
                </span>
              )}
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Achievements &amp; Milestones<span className="text-lime-neon">.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
              Verified hackathon participations, certifications, and technical accomplishments. Dynamically managed via my private portal.
            </p>
          </div>

          {/* Manage Button */}
          <Link href="/admin/dashboard" className="self-start md:self-auto">
            <Button size="sm" variant="secondary" className="gap-2 text-xs">
              <Lock className="w-3.5 h-3.5 text-lime-neon" />
              <span>Admin Management Portal</span>
            </Button>
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 select-none whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-lime-neon text-cosmic-950 font-bold shadow-glow-lime'
                  : 'bg-cosmic-900/60 text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-cosmic-900/40 border border-white/10">
            <p className="text-slate-400 text-sm">
              No milestones currently listed in the &quot;{selectedCategory}&quot; category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-cosmic-900/60 border border-white/10 hover:border-lime-neon/40 p-6 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Category & Date */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-xs font-mono">
                    <span className="text-lime-neon font-semibold px-2 py-0.5 rounded bg-lime-neon/10">
                      {item.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-lime-neon transition-colors">
                    {item.title}
                  </h3>

                  {/* Organization & Location */}
                  <div className="space-y-1 text-xs text-slate-400 font-mono mb-4">
                    <p className="flex items-center gap-1.5 text-slate-300">
                      <Building className="w-3.5 h-3.5 text-lime-neon shrink-0" />
                      <span>{item.organization}</span>
                    </p>
                    {item.location && (
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span>{item.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  {item.certificate_url ? (
                    <button
                      onClick={() => setActiveCertUrl(item.certificate_url || null)}
                      className="text-xs font-mono text-lime-neon hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Document</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">
                      Document pending upload
                    </span>
                  )}

                  {item.external_url && (
                    <a
                      href={item.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-lime-neon flex items-center gap-1 transition-colors"
                    >
                      <span>Verify Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Viewer Lightbox */}
      <AnimatePresence>
        {activeCertUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCertUrl(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl bg-cosmic-900 border border-white/20 p-6 shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveCertUrl(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close document viewer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <Badge variant="lime">Verified Milestone Document</Badge>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-cosmic-950 border border-white/10">
                  <Image
                    src={activeCertUrl}
                    alt="Milestone Certificate"
                    width={800}
                    height={500}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="pt-2 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveCertUrl(null)}
                  >
                    Close Viewer
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

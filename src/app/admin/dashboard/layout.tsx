'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, LogOut, ArrowLeft, Home, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          setUserEmail(user.email ?? null);
        }
      });
    }
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-cosmic-950 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-cosmic-900/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cosmic-800 border border-lime-neon/40 text-lime-neon shadow-glow-lime">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-extrabold text-sm text-white">
                PRIYANSHU ADMIN
              </span>
              <span className="text-[10px] font-mono text-lime-neon block -mt-0.5">
                ACHIEVEMENT MANAGER
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors hidden sm:flex"
            >
              <Home className="w-3.5 h-3.5" />
              <span>View Public Site</span>
            </Link>

            {userEmail && (
              <span className="text-xs font-mono text-slate-300 hidden md:inline px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                {userEmail}
              </span>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="text-xs gap-1.5 border-red-500/30 text-red-300 hover:border-red-400 hover:text-red-200"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}


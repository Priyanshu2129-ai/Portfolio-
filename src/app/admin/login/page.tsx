'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Lock, Mail, ArrowLeft, AlertCircle, Sparkles, Terminal } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get('redirectedFrom') || '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [supabaseConfigured, setSupabaseConfigured] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      setSupabaseConfigured(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const supabase = createClient();
    if (!supabase) {
      setErrorMessage(
        'Supabase is not configured yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
      );
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (data.session) {
        router.push(redirectedFrom);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto">
      {/* Card */}
      <div className="rounded-3xl bg-cosmic-900/80 border border-white/10 p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        {/* Logo / Badge */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-2xl bg-cosmic-800 border border-lime-neon/40 shadow-glow-lime text-lime-neon mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-white">
            Administrator Portal
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            PRIYANSHU KUMAR — ACHIEVEMENT MANAGEMENT SYSTEM
          </p>
        </div>

        {!supabaseConfigured && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Supabase Configuration Notice</span>
            </div>
            <p className="leading-relaxed">
              Supabase environment variables are not yet present in <code>.env.local</code>.
              Refer to <code>README.md</code> and <code>supabase/schema.sql</code> to create your Supabase project and add credentials.
            </p>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="prajapatipriyanshu@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-slate-300">
              Admin Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isLoading}
              className="w-full justify-center shadow-glow-lime text-sm"
            >
              Sign In to Dashboard
            </Button>
          </div>
        </form>

        {/* Safe First-Admin Setup Info */}
        <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-2">
          <p className="font-mono text-[11px] text-slate-300 font-semibold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-lime-neon" />
            <span>First-Time Admin Setup Procedure:</span>
          </p>
          <p className="text-[11px] leading-relaxed text-slate-400">
            In accordance with security requirements, public self-registration is permanently disabled.
            To create your admin account, invite or create your user under <strong>Supabase Dashboard &gt; Authentication &gt; Users</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-cosmic-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-lime-neon/5 blur-[160px] pointer-events-none" />

      {/* Top return link */}
      <div className="max-w-md w-full mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-lime-neon transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Portfolio</span>
        </Link>
      </div>

      <Suspense fallback={
        <div className="max-w-md w-full mx-auto p-8 rounded-3xl bg-cosmic-900/60 border border-white/10 text-center text-sm font-mono text-slate-400">
          Loading Admin Portal...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}


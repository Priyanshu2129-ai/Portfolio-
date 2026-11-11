'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Instagram,
  MessageSquare,
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseState, setResponseState] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseState({ type: null, message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponseState({
          type: 'error',
          message: data.error || 'Failed to submit message. Please try again or email directly.',
        });
      } else {
        setResponseState({
          type: 'success',
          message: data.message || 'Your message has been delivered successfully!',
        });
        setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      }
    } catch {
      setResponseState({
        type: 'error',
        message: 'Network error communicating with the server. Please check your connection or reach out via direct email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-8 border-t border-white/10 overflow-hidden">
      {/* Glow elements */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-lime-neon/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-violet-nebula/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-3 mb-16">
          <Badge variant="lime" size="sm">
            <Mail className="w-3.5 h-3.5 text-lime-neon" />
            <span>LET&apos;S CONNECT</span>
          </Badge>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Get in Touch<span className="text-lime-neon">.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl">
            Interested in collaborating on a hackathon, discussing web development, or exploring tech opportunities? Reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info & Verified Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-cosmic-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold text-white">
                Contact Details &amp; Channels
              </h3>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-2xl bg-cosmic-950 border border-white/10 space-y-2">
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm sm:text-base font-mono font-semibold text-lime-neon truncate">
                    {personalInfo.socials.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-lime-neon/50 text-slate-300 hover:text-white transition-all shrink-0"
                    title="Copy Email Address"
                    aria-label="Copy Email Address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-lime-neon" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-[11px] font-mono text-lime-neon animate-in fade-in">
                    ✓ Email address copied to clipboard!
                  </p>
                )}
              </div>

              {/* Social Channels List */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Verified Social Profiles
                </span>

                <div className="space-y-2">
                  {/* GitHub */}
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-lime-neon/50 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-cosmic-800 text-white">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-lime-neon transition-colors">
                          GitHub
                        </p>
                        <p className="text-[11px] font-mono text-slate-400">
                          @Priyanshu2129-ai
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-lime-neon/50 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-lime-neon transition-colors">
                          LinkedIn
                        </p>
                        <p className="text-[11px] font-mono text-slate-400">
                          priyanshu-prajapati
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </a>

                  {/* Instagram */}
                  <a
                    href={personalInfo.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-lime-neon/50 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#e1306c]/20 text-[#e1306c] border border-[#e1306c]/30">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-lime-neon transition-colors">
                          Instagram
                        </p>
                        <p className="text-[11px] font-mono text-slate-400">
                          @over_thinker0002
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="pt-2 text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime-neon" />
                <span>Response time: Usually within 24–48 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Submission Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-cosmic-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in the details below. Messages are routed directly to my secure database.
              </p>

              {/* Feedback Alert */}
              {responseState.type && (
                <div
                  className={`p-4 rounded-2xl mb-6 text-xs sm:text-sm flex items-start gap-3 ${
                    responseState.type === 'success'
                      ? 'bg-lime-neon/15 border border-lime-neon/30 text-lime-neon'
                      : 'bg-red-500/15 border border-red-500/30 text-red-300'
                  }`}
                >
                  {responseState.type === 'success' ? (
                    <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <p className="leading-relaxed">{responseState.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-bot spam prevention */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Your Name <span className="text-lime-neon">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-slate-300">
                      Your Email <span className="text-lime-neon">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300">
                    Subject <span className="text-lime-neon">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hackathon Collaboration / Project Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-slate-300">
                    Message <span className="text-lime-neon">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your message or opportunity in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-950 border border-white/10 focus:border-lime-neon focus:outline-none text-sm text-white placeholder-slate-500 transition-colors resize-y"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full justify-center gap-2 shadow-glow-lime"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


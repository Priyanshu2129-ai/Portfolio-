'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8',
        isScrolled
          ? 'bg-cosmic-950/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cosmic-800 border border-lime-neon/40 shadow-glow-lime group-hover:border-lime-neon group-hover:scale-105 transition-all duration-200">
            <span className="font-mono font-black text-sm text-lime-neon tracking-tighter">
              P
            </span>
            <div className="absolute inset-0 rounded-xl bg-lime-neon/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-wider text-slate-100 group-hover:text-white transition-colors">
              PRIYANSHU<span className="text-lime-neon">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1 group-hover:text-lime-neon/80 transition-colors">
              BECOMING UNBEATABLE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-cosmic-900/60 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 select-none',
                  isActive
                    ? 'text-lime-neon'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-lime-neon rounded-full shadow-[0_0_8px_#00ff87]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action / CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/admin/login"
            className="p-2 text-slate-400 hover:text-lime-neon rounded-lg hover:bg-white/5 transition-colors text-xs flex items-center gap-1.5"
            title="Admin Dashboard"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px] font-mono text-slate-400">Admin</span>
          </Link>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <Button size="sm" variant="primary" className="gap-1.5 shadow-glow-lime">
              <span>Let&apos;s Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="/admin/login"
            className="p-2 text-slate-400 hover:text-lime-neon rounded-lg"
            title="Admin Login"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-lime-neon hover:bg-white/5 rounded-lg focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-4 pb-6 px-4 bg-cosmic-950/95 border border-white/10 rounded-2xl backdrop-blur-2xl shadow-2xl flex flex-col gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-1">
            <span className="text-xs font-mono text-slate-400">NAVIGATION MENU</span>
            <span className="text-[10px] font-mono text-lime-neon px-2 py-0.5 rounded-full bg-lime-neon/10 border border-lime-neon/20">
              STILL LEARNING
            </span>
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  'flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-lime-neon/10 text-lime-neon border border-lime-neon/20'
                    : 'text-slate-200 hover:bg-white/5'
                )}
              >
                <span>{item.name}</span>
                {isActive && <Sparkles className="w-4 h-4 text-lime-neon" />}
              </a>
            );
          })}
          <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full"
            >
              <Button size="md" variant="primary" className="w-full justify-center gap-2">
                <span>Let&apos;s Connect</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


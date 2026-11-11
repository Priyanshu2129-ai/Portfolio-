import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'lime' | 'violet' | 'slate' | 'outline' | 'pulse';
  size?: 'sm' | 'md';
}

export function Badge({
  className,
  variant = 'lime',
  size = 'md',
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    lime: 'bg-lime-neon/10 text-lime-neon border-lime-neon/30 shadow-[0_0_12px_rgba(0,255,135,0.15)]',
    violet: 'bg-violet-nebula/10 text-violet-300 border-violet-nebula/30 shadow-[0_0_12px_rgba(139,92,246,0.15)]',
    slate: 'bg-white/5 text-slate-300 border-white/10',
    outline: 'border border-white/20 text-slate-200 hover:border-lime-neon/50',
    pulse: 'bg-lime-neon/15 text-lime-neon border border-lime-neon/40 shadow-glow-lime animate-pulse',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold',
    md: 'text-xs px-2.5 py-1 tracking-wider uppercase font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md transition-all duration-200',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}


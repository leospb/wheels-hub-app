import React from 'react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { cn } from '@/lib/utils';

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  contentClassName?: string;
}

export function GlowingCard({ children, className, contentClassName, ...props }: GlowingCardProps) {
  return (
    <div className={cn("relative h-full rounded-[1.35rem] border border-slate-200 dark:border-slate-800/40 p-0.5 md:p-[2px] bg-slate-50 dark:bg-slate-900/40 list-none", className)} {...props}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={120}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className={cn("relative flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-slate-200/50 dark:border-slate-700/60 bg-white/95 dark:bg-[#0c1222]/90 shadow-sm", contentClassName)}>
        {children}
      </div>
    </div>
  );
}

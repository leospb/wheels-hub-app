'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn('w-16 h-8 rounded-full bg-slate-800 border border-slate-700', className)} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div
      className={cn(
        'flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300',
        isDark 
          ? 'bg-zinc-950 border border-zinc-800' 
          : 'bg-white border border-zinc-200 shadow-sm',
        className
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      role="button"
      tabIndex={0}
      title="Toggle Theme"
    >
      <div className="flex justify-between items-center w-full relative">
        <div
          className={cn(
            'absolute left-0 flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300',
            isDark 
              ? 'transform translate-x-0 bg-zinc-800' 
              : 'transform translate-x-8 bg-gray-100'
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
          )}
        </div>
        
        {/* Underlay icons (what shows when switch is on the other side) */}
        <div className="flex justify-between w-full px-1">
          <Moon className={cn('w-4 h-4 text-black transition-opacity', isDark ? 'opacity-0' : 'opacity-100')} strokeWidth={1.5} />
          <Sun className={cn('w-4 h-4 text-gray-500 transition-opacity', isDark ? 'opacity-100' : 'opacity-0')} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

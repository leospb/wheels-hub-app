'use client';

import React from 'react';
import { Calculator, CircleDashed, Aperture, Hexagon, ShoppingCart } from 'lucide-react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserDropdown } from '@/components/ui/user-dropdown';
import { CitySelector } from '@/components/ui/city-selector';
import Link from 'next/link';

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" stroke="#00d4aa" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="10" stroke="#4a9eff" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
        <circle cx="17" cy="17" r="3.5" fill="#00d4aa" />
        {[0, 72, 144, 216, 288].map((a) => {
          const r = (a * Math.PI) / 180;
          const x1 = (17 + 5 * Math.cos(r)).toFixed(4);
          const y1 = (17 + 5 * Math.sin(r)).toFixed(4);
          const x2 = (17 + 9.5 * Math.cos(r)).toFixed(4);
          const y2 = (17 + 9.5 * Math.sin(r)).toFixed(4);
          return (
            <line key={a}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div>
        <div className="text-[18px] font-black text-white leading-none tracking-tight">WheelsHub</div>
        <div className="text-[9px] text-slate-500 font-mono tracking-[0.2em] uppercase">МАРКЕТПЛЕЙС</div>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  const navItems = [
    { name: "Калькулятор", link: "/", icon: <Calculator className="w-4 h-4" /> },
    { name: "Шины", link: "/tires", icon: <CircleDashed className="w-4 h-4" /> },
    { name: "Диски", link: "/wheels", icon: <Aperture className="w-4 h-4" /> },
    { name: "Болты", link: "/bolts", icon: <Hexagon className="w-4 h-4" /> },
  ];

  return (
    <FloatingNav 
      logo={<div className="scale-[0.8] origin-left"><Logo /></div>}
      navItems={navItems}
      actionButton={
        <div className="flex items-center gap-4">
          <div className="hidden md:block"><CitySelector /></div>
          <Link href="/cart" className="relative text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-[1.2rem] h-[1.2rem]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
          </Link>
          <ThemeToggle />
          <UserDropdown />
        </div>
      }
    />
  );
}

'use client';

import React from 'react';
import WheelSizeTopBar from '@/components/Catalog/WheelSizeTopBar';
import WheelFilters from '@/components/Catalog/WheelFilters';
import WheelCatalog from '@/components/Catalog/WheelCatalog';

export default function WheelsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500 pb-20">
      
      {/* ── Background Elements ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-blue-500/5 dark:bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vh] bg-cyan-500/5 dark:bg-cyan-500/5 blur-[100px] rounded-full mix-blend-screen"></div>
      </div>

      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-24 space-y-8">
        
        {/* ── Page Header ── */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
            Каталог дисков
            <div className="h-10 px-4 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 flex items-center justify-center -translate-y-1">
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wider">PREMIUM ALLOY</span>
            </div>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl">
            Подберите идеальные литые и кованые диски для вашего автомобиля. 
            Лучшие цены от проверенных поставщиков.
          </p>
        </div>

        {/* ── Top Size Parameters Bar ── */}
        <WheelSizeTopBar />

        {/* ── Layout Grid (Sidebar + Main Content) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-24">
            <WheelFilters />
          </div>

          {/* Main Content (Catalog Grid) */}
          <div className="lg:col-span-3">
             <WheelCatalog />
          </div>
          
        </div>

      </main>
    </div>
  );
}

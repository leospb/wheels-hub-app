import React from 'react';
import TireFilters from '@/components/Catalog/TireFilters';
import TireCatalog from '@/components/Catalog/TireCatalog';

export const metadata = {
  title: 'Купить шины — Каталог и актуальные цены | WheelsHub',
  description: 'Агрегатор лучших предложений на шины. Сравните цены на летнюю и зимнюю резину.'
};

export default function TiresAggregatorPage() {
  return (
    <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 pt-32 space-y-8 min-h-screen text-slate-900 dark:text-slate-200">
      
      {/* ── Heading ── */}
      <div className="flex flex-col gap-2 relative z-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
          Каталог шин
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-lg">
          Умный агрегатор предложений. Находите лучшие цены от проверенных поставщиков с учетом доставки.
        </p>
      </div>
      
      {/* ── Layout Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-start relative z-10">
        
        {/* Sidebar */}
        <aside className="lg:col-span-1 xl:col-span-1 hidden lg:block sticky top-32">
          <TireFilters />
        </aside>
        
        {/* Main Content */}
        <div className="lg:col-span-3 xl:col-span-4">
          <TireCatalog />
        </div>

      </div>
      
      {/* Decorative Glows */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10 translate-y-[-50%]"></div>
    </main>
  );
}

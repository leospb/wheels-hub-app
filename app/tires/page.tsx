import React from 'react';
import TireFilters from '@/components/Catalog/TireFilters';
import TireCatalog from '@/components/Catalog/TireCatalog';
import TireSizeTopBar from '@/components/Catalog/TireSizeTopBar';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Купить шины — Каталог и актуальные цены | WheelsHub',
  description: 'Агрегатор лучших предложений на шины. Сравните цены на летнюю и зимнюю резину.',
};

export default function TiresAggregatorPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-24 pb-24 text-slate-900 dark:text-slate-200">
      <div className="w-full md:w-[calc(100%-2rem)] max-w-screen-2xl mx-auto px-4 md:px-0">

        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-6">
          <Link href="/" className="hover:text-cyan-500 transition-colors">Главная</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">Шины</span>
        </nav>

        {/* ── Heading ── */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Каталог шин
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-lg">
            Умный агрегатор предложений. Находите лучшие цены от проверенных поставщиков с учётом доставки.
          </p>
        </div>

        {/* ── Size Sliders ── */}
        <div className="mb-8">
          <TireSizeTopBar />
        </div>

        {/* ── Layout: sidebar + catalog ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[280px_1fr] gap-6 items-start">

          {/* Sidebar */}
          <aside className="hidden lg:block sticky top-28">
            <TireFilters />
          </aside>

          {/* Main catalog */}
          <div>
            <TireCatalog />
          </div>
        </div>

      </div>

      {/* Decorative glow */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-cyan-500/5 dark:bg-cyan-500/8 blur-[120px] rounded-full pointer-events-none -z-10 -translate-y-1/2" />
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import WheelCard, { WheelProduct } from './WheelCard';
import { LayoutGrid, List, ChevronDown } from 'lucide-react';

const mockWheels: WheelProduct[] = [
  {
    id: 1,
    brand: 'Vossen',
    model: 'HF-5',
    type: 'Flow Forming',
    color: 'Satin Bronze',
    price: 45000,
    rating: 4.9,
    reviews: 124,
    image: '/wheels/vossen.png',
    specs: { diameter: 19, width: 8.5, pcd: '5x112', et: 35, dia: 66.6 },
    country: { name: 'США', flag: '🇺🇸' },
    offers: 8,
    isHot: true,
  },
  {
    id: 2,
    brand: 'BBS',
    model: 'Super RS',
    type: 'Кованые',
    color: 'Silver with Gold Face',
    price: 85000,
    rating: 5.0,
    reviews: 56,
    image: '/wheels/bbs.png',
    specs: { diameter: 19, width: 8.5, pcd: '5x112', et: 45, dia: 66.6 },
    country: { name: 'Германия', flag: '🇩🇪' },
    offers: 3,
  },
  {
    id: 3,
    brand: 'OZ Racing',
    model: 'Superturismo LM',
    type: 'Литые',
    color: 'Matte Graphite',
    price: 28000,
    rating: 4.8,
    reviews: 210,
    image: '/wheels/oz.png', // We'll put the third generated image here
    specs: { diameter: 18, width: 8.0, pcd: '5x112', et: 48, dia: 73.1 },
    country: { name: 'Италия', flag: '🇮🇹' },
    offers: 12,
  },
  {
    id: 4,
    brand: 'Vossen',
    model: 'HF-2',
    type: 'Flow Forming',
    color: 'Gloss Black',
    price: 43000,
    rating: 4.7,
    reviews: 89,
    image: '/wheels/vossen.png',
    specs: { diameter: 20, width: 9.0, pcd: '5x112', et: 30, dia: 66.6 },
    country: { name: 'США', flag: '🇺🇸' },
    offers: 5,
  },
];

const SORT_OPTIONS = ['По популярности', 'Сначала дешевые', 'Сначала дорогие', 'Высокий рейтинг'];

export default function WheelCatalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Найдено <span className="text-slate-900 dark:text-white">420</span> моделей
        </p>

        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          <div className="relative hidden sm:block">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 cursor-pointer"
            >
              {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Плитка"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Список"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Cards ── */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockWheels.map(wheel => (
             <WheelCard key={wheel.id} viewMode="grid" wheel={wheel} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {mockWheels.map(wheel => (
             <WheelCard key={wheel.id} viewMode="list" wheel={wheel} />
          ))}
        </div>
      )}

      {/* ── Load more ── */}
      <div className="flex justify-center mt-2">
        <button className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors shadow-sm">
          Показать ещё 20 моделей
        </button>
      </div>
    </div>
  );
}

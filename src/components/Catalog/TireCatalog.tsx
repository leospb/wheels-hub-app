'use client';

import React, { useState } from 'react';
import TireCard, { TireProduct } from './TireCard';
import { LayoutGrid, List, ChevronDown } from 'lucide-react';

// Mock catalog data
const MOCK_CATALOG: TireProduct[] = [
  {
    id: '1',
    manufacturer: 'Michelin',
    model: 'Pilot Sport 4 S',
    flag: '🇫🇷',
    photo: '/tires/michelin.png',
    category: 'Летняя',
    badge: 'UHP',
    season: 'summer',
    rating: 4.9,
    reviews: 128,
    specs: '245/40 R18',
    specParts: ['245', '40', 'R18', '97Y'],
    minPrice: 15450,
    offersCount: 12,
    featured: true,
  },
  {
    id: '2',
    manufacturer: 'Pirelli',
    model: 'P Zero PZ4',
    flag: '🇮🇹',
    photo: '/tires/pirelli.png',
    category: 'Летняя',
    badge: 'Sport',
    season: 'summer',
    rating: 4.8,
    reviews: 84,
    specs: '245/40 R18',
    specParts: ['245', '40', 'R18', '97Y'],
    minPrice: 14200,
    offersCount: 8,
  },
  {
    id: '3',
    manufacturer: 'Continental',
    model: 'PremiumContact 7',
    flag: '🇩🇪',
    photo: '/tires/continental.png',
    category: 'Летняя',
    badge: 'Touring',
    season: 'summer',
    rating: 4.9,
    reviews: 215,
    specs: '245/40 R18',
    specParts: ['245', '40', 'R18', '97Y'],
    minPrice: 13900,
    offersCount: 18,
  },
  {
    id: '4',
    manufacturer: 'Hankook',
    model: 'Ventus S1 evo3',
    flag: '🇰🇷',
    photo: '/tires/hankook.png',
    category: 'Летняя',
    badge: 'Performance',
    season: 'summer',
    rating: 4.7,
    reviews: 320,
    specs: '245/40 R18',
    specParts: ['245', '40', 'R18', '97Y'],
    minPrice: 11500,
    offersCount: 24,
  },
  {
    id: '5',
    manufacturer: 'Michelin',
    model: 'X-Ice North 4',
    flag: '🇫🇷',
    photo: '/tires/michelin.png',
    category: 'Зимняя',
    badge: 'Шипы',
    season: 'winter',
    rating: 4.9,
    reviews: 512,
    specs: '245/40 R18',
    specParts: ['245', '40', 'R18', '97T'],
    minPrice: 18100,
    offersCount: 5,
  },
  {
    id: '6',
    manufacturer: 'Pirelli',
    model: 'Ice Zero 2',
    flag: '🇮🇹',
    photo: '/tires/pirelli.png',
    category: 'Зимняя',
    badge: 'Шипы',
    season: 'winter',
    rating: 4.6,
    reviews: 190,
    specs: '245/40 R18',
    specParts: ['245', '40', 'R18', '97H'],
    minPrice: 16500,
    offersCount: 9,
  },
];

const SORT_OPTIONS = ['По популярности', 'Сначала дешевые', 'Сначала дорогие', 'Высокий рейтинг'];

export default function TireCatalog() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState(SORT_OPTIONS[0]);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Найдено <span className="text-slate-900 dark:text-white">{MOCK_CATALOG.length}</span> моделей
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
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Плитка"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Список"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Cards ── */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MOCK_CATALOG.map(product => (
            <TireCard key={product.id} product={product} view="grid" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {MOCK_CATALOG.map(product => (
            <TireCard key={product.id} product={product} view="list" />
          ))}
        </div>
      )}

      {/* ── Load more ── */}
      <div className="flex justify-center mt-2">
        <button className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors shadow-sm">
          Показать ещё 24 модели
        </button>
      </div>
    </div>
  );
}

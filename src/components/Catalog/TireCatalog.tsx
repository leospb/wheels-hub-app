'use client';

import React, { useState } from 'react';
import TireCard, { TireProduct } from './TireCard';
import { LayoutGrid, List } from 'lucide-react';

// Имитация базы данных шин
const MOCK_CATALOG: TireProduct[] = [
  {
    id: '1',
    manufacturer: 'Michelin',
    model: 'Pilot Sport 4 S',
    flag: '🇫🇷',
    photo: '/tires/michelin.png',
    category: 'Летняя, Ultra High Performance',
    rating: 4.9,
    reviews: 128,
    specs: '245/40 R18 97Y',
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
    category: 'Летняя, Sport',
    rating: 4.8,
    reviews: 84,
    specs: '245/40 R18 97Y',
    minPrice: 14200,
    offersCount: 8,
  },
  {
    id: '3',
    manufacturer: 'Continental',
    model: 'PremiumContact 7',
    flag: '🇩🇪',
    photo: '/tires/continental.png',
    category: 'Летняя, Premium Touring',
    rating: 4.9,
    reviews: 215,
    specs: '245/40 R18 97Y',
    minPrice: 13900,
    offersCount: 18,
  },
  {
    id: '4',
    manufacturer: 'Hankook',
    model: 'Ventus S1 evo3',
    flag: '🇰🇷',
    photo: '/tires/hankook.png',
    category: 'Летняя, Performance',
    rating: 4.7,
    reviews: 320,
    specs: '245/40 R18 97Y',
    minPrice: 11500,
    offersCount: 24,
  },
  {
    id: '5',
    manufacturer: 'Michelin',
    model: 'X-Ice North 4',
    flag: '🇫🇷',
    photo: '/tires/michelin.png',
    category: 'Зимняя, Шипованная',
    rating: 4.9,
    reviews: 512,
    specs: '245/40 R18 97T',
    minPrice: 18100,
    offersCount: 5,
  },
  {
    id: '6',
    manufacturer: 'Pirelli',
    model: 'Ice Zero 2',
    flag: '🇮🇹',
    photo: '/tires/pirelli.png',
    category: 'Зимняя, Шипованная',
    rating: 4.6,
    reviews: 190,
    specs: '245/40 R18 97H',
    minPrice: 16500,
    offersCount: 9,
  },
];

export default function TireCatalog() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between flex-wrap gap-4 px-2">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Найдено <span className="text-slate-900 dark:text-white font-bold">{MOCK_CATALOG.length}</span> моделей
        </span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-sm hidden sm:flex">
            <span className="text-slate-400">Сортировка:</span>
            <select className="bg-transparent text-slate-900 dark:text-white font-medium outline-none cursor-pointer">
              <option>По популярности</option>
              <option>Сначала дешевые</option>
              <option>Сначала дорогие</option>
              <option>Высокий рейтинг</option>
            </select>
          </div>
          {/* ── View Toggle ── */}
          <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl">
            <button 
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'grid' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Плитка"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-colors ${view === 'list' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Список"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className={view === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" 
        : "flex flex-col gap-4"
      }>
        {MOCK_CATALOG.map((product) => (
          <TireCard key={product.id} product={product} view={view} />
        ))}
      </div>
      
      <div className="flex items-center justify-center mt-6">
        <button className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]/50 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors shadow-sm">
          Показать еще 24 модели
        </button>
      </div>
    </div>
  );
}

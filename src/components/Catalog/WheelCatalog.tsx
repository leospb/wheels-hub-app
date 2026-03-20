'use client';

import React, { useState } from 'react';
import WheelCard from './WheelCard';
import { LayoutGrid, List } from 'lucide-react';

const mockWheels = [
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

export default function WheelCatalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* ── Тулбар управления (Сортировка и Вид) ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50 dark:bg-[#0f172a]/50 backdrop-blur-md p-2 pl-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        <div className="text-sm font-medium text-slate-500">
          Найдено <span className="font-bold text-slate-900 dark:text-white">420</span> моделей
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Сортировка:</span>
            <select className="bg-transparent text-sm font-bold text-slate-900 dark:text-white outline-none cursor-pointer">
              <option>Сначала популярные</option>
              <option>Сначала дешевые</option>
              <option>Сначала дорогие</option>
              <option>Высокий рейтинг</option>
            </select>
          </div>
          
          <div className="hidden sm:block w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 text-blue-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Сетка"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 text-blue-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
              title="Список"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Сетка товаров ── */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          : "flex flex-col gap-6"
      }>
        {mockWheels.map(wheel => (
          <WheelCard key={wheel.id} viewMode={viewMode} wheel={wheel} />
        ))}
      </div>

      {/* ── Пагинация (Mock) ── */}
      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 text-slate-600 dark:text-slate-400 font-bold text-sm transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20">
          Показать еще 20 товаров
        </button>
      </div>

    </div>
  );
}

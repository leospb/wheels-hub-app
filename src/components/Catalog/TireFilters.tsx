'use client';

import React, { useState } from 'react';
import { Sun, Snowflake, CloudRain, Check, Car, SlidersHorizontal } from 'lucide-react';

export default function TireFilters() {
  const [season, setSeason] = useState('summer');

  const brands = [
    { name: 'Michelin', count: 142 },
    { name: 'Pirelli', count: 98 },
    { name: 'Continental', count: 110 },
    { name: 'Hankook', count: 85 },
    { name: 'Bridgestone', count: 76 },
    { name: 'Goodyear', count: 64 },
  ];

  const countries = [
    { name: 'Китай', flag: '🇨🇳', count: 184 },
    { name: 'Южная Корея', flag: '🇰🇷', count: 112 },
    { name: 'Япония', flag: '🇯🇵', count: 95 },
    { name: 'Германия', flag: '🇩🇪', count: 76 },
    { name: 'Россия', flag: '🇷🇺', count: 54 },
  ];

  return (
    <div className="w-full flex flex-col gap-6 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]/50 shadow-sm">
      
      {/* ── Заголовок ── */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-500" />
          Фильтры
        </h3>
        <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          СБРОСИТЬ
        </button>
      </div>

      {/* ── Автомобиль ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Подбор по авто</label>
        <button className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 transition-colors text-sm font-medium">
          <Car className="w-4 h-4" />
          Выбрать марку и модель
        </button>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Сезонность ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Сезонность</label>
        <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl">
          <button 
            onClick={() => setSeason('summer')}
            className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-xl transition-all duration-200 ${
              season === 'summer' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span className="text-[10px] font-bold">Летние</span>
          </button>
          <button 
            onClick={() => setSeason('winter')}
            className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-xl transition-all duration-200 ${
              season === 'winter' ? 'bg-white dark:bg-[#1e293b] text-blue-500 shadow-sm border border-blue-500/20' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <Snowflake className="w-4 h-4" />
            <span className="text-[10px] font-bold">Зимние</span>
          </button>
          <button 
            onClick={() => setSeason('all')}
            className={`flex-1 py-2 flex flex-col items-center gap-1 rounded-xl transition-all duration-200 ${
              season === 'all' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span className="text-[10px] font-bold">Всесезон</span>
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Похожие размеры (Plus Sizing) ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Похожие размеры</label>
        <div className="flex flex-wrap gap-2">
          {['235/40 R18', '245/35 R19', '255/35 R19', '225/45 R18', '205/50 R17'].map((size, idx) => (
            <button 
              key={idx}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-[11px] font-mono font-medium text-slate-600 dark:text-slate-300 transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Бренды ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Популярные бренды</label>
        <div className="flex flex-col gap-2">
          {brands.map((brand, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  i < 2 
                  ? 'bg-cyan-500 border-cyan-500 text-white' 
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-cyan-400'
                }`}>
                  {i < 2 && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {brand.name}
                </span>
              </div>
              <span className="text-xs text-slate-400">{brand.count}</span>
            </label>
          ))}
        </div>
        <button className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-1 text-left hover:underline">
          Показать все бренды (48)
        </button>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Страны-производители ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Страны-производители</label>
        <div className="flex flex-col gap-2">
          {countries.map((country, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-cyan-400`}>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{country.flag}</span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {country.name}
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400">{country.count}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}

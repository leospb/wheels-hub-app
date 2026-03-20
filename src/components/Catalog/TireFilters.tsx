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

      {/* ── Параметры ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Параметры</label>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 px-1">Ширина</span>
            <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2 text-sm text-slate-700 dark:text-slate-200 outline-none focus:border-cyan-500">
              <option>Любая</option>
              <option>205</option>
              <option>225</option>
              <option>245</option>
              <option>275</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 px-1">Профиль</span>
            <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2 text-sm text-slate-700 dark:text-slate-200 outline-none focus:border-cyan-500">
              <option>Любой</option>
              <option>35</option>
              <option>40</option>
              <option>45</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-slate-400 px-1">Диаметр</span>
            <select className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2 text-sm text-slate-700 dark:text-slate-200 outline-none focus:border-cyan-500">
              <option>Любой</option>
              <option>R17</option>
              <option>R18</option>
              <option>R19</option>
              <option>R20</option>
            </select>
          </div>
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

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Target, Check, Car, SlidersHorizontal, Settings2 } from 'lucide-react';

export default function WheelFilters() {
  const [wheelType, setWheelType] = useState('cast'); // cast, forged, flow

  const colors = [
    { id: 'Silver', color: '#e2e8f0', border: '#cbd5e1' },
    { id: 'Black', color: '#0f172a', border: '#334155' },
    { id: 'Graphite', color: '#475569', border: '#64748b' },
    { id: 'Bronze', color: '#b45309', border: '#d97706' },
    { id: 'Machined', color: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)', border: '#94a3b8' },
  ];

  const brands = [
    { name: 'BBS', count: 142 },
    { name: 'Vossen', count: 98 },
    { name: 'Enkei', count: 110 },
    { name: 'OZ Racing', count: 85 },
    { name: 'MAK', count: 76 },
    { name: 'K&K', count: 64 },
  ];

  const countries = [
    { name: 'Германия', flag: '🇩🇪', count: 184 },
    { name: 'Япония', flag: '🇯🇵', count: 112 },
    { name: 'США', flag: '🇺🇸', count: 95 },
    { name: 'Италия', flag: '🇮🇹', count: 76 },
    { name: 'Китай', flag: '🇨🇳', count: 54 },
    { name: 'Россия', flag: '🇷🇺', count: 32 },
  ];

  const [et, setEt] = useState(35);
  const [dia, setDia] = useState(66.6);

  return (
    <div className="w-full flex flex-col gap-6 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]/50 shadow-sm">
      
      {/* ── Заголовок ── */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-blue-500" />
          Фильтры
        </h3>
        <button className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          СБРОСИТЬ
        </button>
      </div>

      {/* ── Автомобиль ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Подбор по авто</label>
        <button className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 transition-colors text-sm font-medium">
          <Car className="w-4 h-4" />
          Выбрать марку и модель
        </button>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Тип диска ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Тип диска</label>
        <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1.5 rounded-2xl">
          <button 
            onClick={() => setWheelType('cast')}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
              wheelType === 'cast' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 font-medium'
            }`}
          >
            <span className="text-xs">Литые</span>
          </button>
          <button 
            onClick={() => setWheelType('forged')}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
              wheelType === 'forged' ? 'bg-white dark:bg-[#1e293b] text-blue-500 shadow-sm border border-blue-500/20 font-bold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 font-medium'
            }`}
          >
            <span className="text-xs text-center leading-tight">Кованые</span>
          </button>
          <button 
            onClick={() => setWheelType('flow')}
            className={`flex-1 py-1.5 flex flex-col items-center justify-center rounded-xl transition-all duration-200 ${
              wheelType === 'flow' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 font-medium'
            }`}
          >
            <span className="text-[10px] text-center leading-tight">Flow Forming</span>
          </button>
        </div>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Параметры (ET, DIA) ── */}
      <div className="flex flex-col gap-5">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Settings2 className="w-3.5 h-3.5" /> Тонкая настройка
        </label>
        
        {/* Вылет ET */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-600 dark:text-slate-400">Вылет (ET)</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">{et}</span>
          </div>
          <input 
            type="range" 
            min={10} max={60} step={1}
            value={et}
            onChange={(e) => setEt(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none outline-none accent-slate-400 dark:accent-slate-500 cursor-pointer"
          />
        </div>

        {/* ЦО DIA */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-600 dark:text-slate-400">Центр. отв (DIA)</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono">{dia}</span>
          </div>
          <input 
            type="range" 
            min={54.1} max={110} step={0.1}
            value={dia}
            onChange={(e) => setDia(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none outline-none accent-slate-400 dark:accent-slate-500 cursor-pointer"
          />
        </div>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Цвет ── */}
      <div className="flex flex-col gap-4">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          Цвет
          <span className="text-[10px] font-normal text-slate-400">Любой</span>
        </label>
        <div className="flex flex-wrap gap-3">
          {colors.map((c) => (
             <button 
               key={c.id} 
               title={c.id}
               className="w-7 h-7 rounded-full bg-cover relative group focus:outline-none"
               style={{ background: c.color, border: `2px solid ${c.border}` }}
             >
               <div className="absolute -inset-1 rounded-full border border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </button>
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Страны-производители ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Страны-производители</label>
        <div className="flex flex-col gap-2">
          {countries.map((country, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-blue-400 text-transparent group-hover:text-blue-500/50`}>
                  <Check className="w-3.5 h-3.5" />
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

      <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80"></div>

      {/* ── Бренды ── */}
      <div className="flex flex-col gap-3">
        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          Популярные бренды
          <Target className="w-3.5 h-3.5 text-slate-400" />
        </label>
        <div className="flex flex-col gap-2">
          {brands.map((brand, i) => (
            <label key={i} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  i < 2 
                  ? 'bg-blue-500 border-blue-500 text-white' 
                  : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 group-hover:border-blue-400 text-transparent group-hover:text-blue-500/50'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  {brand.name}
                </span>
              </div>
              <span className="text-xs text-slate-400">{brand.count}</span>
            </label>
          ))}
        </div>
        <button className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-1 text-left hover:underline">
          Показать все бренды (34)
        </button>
      </div>

    </div>
  );
}

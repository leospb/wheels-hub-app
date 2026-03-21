'use client';

import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

export interface WheelProduct {
  id: number;
  brand: string;
  model: string;
  type: string;
  color: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  specs: {
    diameter: number;
    width: number;
    pcd: string;
    et: number;
    dia: number;
  };
  country: { name: string; flag: string };
  offers: number;
  isHot?: boolean;
}

// ─── Grid Card ────────────────────────────────────────────────────────────────
function WheelCardGrid({ wheel }: { wheel: WheelProduct }) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-cyan-500/40">
      {/* Image area */}
      <Link href={`/wheels/${wheel.id}`} className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70%] h-[70%] bg-white/60 dark:bg-white/5 rounded-full blur-2xl" />
        </div>

        <img
          src={wheel.image}
          alt={`${wheel.brand} ${wheel.model}`}
          className="relative z-10 w-[75%] h-[75%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.08]"
        />

        {/* Featured badge */}
        {wheel.isHot && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30">
            <span className="text-[9px] font-black text-white uppercase tracking-wider">Хит продаж</span>
          </div>
        )}

        {/* Flag */}
        <span className="absolute top-3 right-3 z-20 text-xl drop-shadow-sm" title={wheel.country.name}>{wheel.country.flag}</span>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + rating */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Диски</span>
            <span className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 rounded-md text-[9px] font-black uppercase tracking-wide">{wheel.type}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{wheel.rating}</span>
            <span className="text-[10px] text-slate-400">({wheel.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <Link href={`/wheels/${wheel.id}`}>
          <h3 className="font-black text-sm text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            <span className="font-medium">{wheel.brand} </span>{wheel.model}
          </h3>
        </Link>
        <p className="text-[10px] text-slate-400 line-clamp-1">{wheel.color}</p>

        {/* Spec chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-black font-mono text-slate-600 dark:text-slate-300">{wheel.specs.width}J</span>
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-black font-mono text-slate-600 dark:text-slate-300">R{wheel.specs.diameter}</span>
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-black font-mono text-slate-600 dark:text-slate-300">{wheel.specs.pcd}</span>
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-black font-mono text-slate-600 dark:text-slate-300">ET{wheel.specs.et}</span>
        </div>

        {/* Price + cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] text-slate-400 mb-0.5">от {wheel.offers} предложений</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">
              {wheel.price.toLocaleString('ru-RU')} <span className="text-sm font-bold">₽</span>
            </p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white transition-colors shadow-md flex-shrink-0">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── List Card ────────────────────────────────────────────────────────────────
function WheelCardList({ wheel }: { wheel: WheelProduct }) {
  return (
    <div className="group flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-cyan-500/30 hover:shadow-lg transition-all">
      {/* Thumb */}
      <Link href={`/wheels/${wheel.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
        <img src={wheel.image} alt={wheel.brand} className="w-[80%] h-[80%] object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-400" />
        <span className="absolute top-1 right-1 text-base">{wheel.country.flag}</span>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Диски</span>
          <span className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 rounded-md text-[9px] font-black uppercase">{wheel.type}</span>
          {wheel.isHot && (
            <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase">Хит</span>
          )}
        </div>
        <Link href={`/wheels/${wheel.id}`}>
          <h3 className="font-black text-sm text-slate-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {wheel.brand} {wheel.model}
          </h3>
        </Link>
        <p className="text-[10px] text-slate-400 truncate mb-1">{wheel.color}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black font-mono text-slate-600 dark:text-slate-300">{wheel.specs.width}J R{wheel.specs.diameter}</span>
          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black font-mono text-slate-600 dark:text-slate-300">{wheel.specs.pcd}</span>
          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black font-mono text-slate-600 dark:text-slate-300">ET{wheel.specs.et}</span>
          
          <div className="flex items-center gap-1 ml-auto">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{wheel.rating}</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline-block">({wheel.reviews})</span>
          </div>
        </div>
      </div>

      {/* Price + cart */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400">от {wheel.offers} предл.</p>
          <p className="text-base font-black text-slate-900 dark:text-white">
            {wheel.price.toLocaleString('ru-RU')} <span className="text-xs">₽</span>
          </p>
        </div>
        <button className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white transition-colors shadow-md">
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function WheelCard({ viewMode = 'grid', wheel }: { wheel: WheelProduct; viewMode?: 'grid' | 'list' }) {
  return viewMode === 'list' ? <WheelCardList wheel={wheel} /> : <WheelCardGrid wheel={wheel} />;
}

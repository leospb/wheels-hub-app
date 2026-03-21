'use client';

import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

export interface TireProduct {
  id: string;
  manufacturer: string;
  model: string;
  flag: string;
  photo: string;
  category: string;
  badge?: string;
  season?: 'summer' | 'winter' | 'allseason';
  rating: number;
  reviews: number;
  specs: string;
  specParts?: string[];
  minPrice: number;
  offersCount: number;
  featured?: boolean;
}

const SEASON_COLORS: Record<string, string> = {
  summer:    'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400',
  winter:    'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400',
  allseason: 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400',
};

// ─── Grid Card ────────────────────────────────────────────────────────────────
function TireCardGrid({ product }: { product: TireProduct }) {
  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40 hover:-translate-y-1 hover:border-cyan-500/40">
      {/* Image area */}
      <Link href={`/tires/${product.id}`} className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} />

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[70%] h-[70%] bg-white/60 dark:bg-white/5 rounded-full blur-2xl" />
        </div>

        <img
          src={product.photo}
          alt={`${product.manufacturer} ${product.model}`}
          className="relative z-10 w-[75%] h-[75%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.08]"
        />

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full shadow-lg shadow-blue-500/30">
            <span className="text-[9px] font-black text-white uppercase tracking-wider">Хит продаж</span>
          </div>
        )}

        {/* Flag */}
        <span className="absolute top-3 right-3 z-20 text-xl drop-shadow-sm">{product.flag}</span>

        {/* Season pill bottom-left */}
        {product.season && (
          <div className={`absolute bottom-3 left-3 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-sm border border-white/30 dark:border-white/10 ${SEASON_COLORS[product.season]}`}>
            {product.season === 'summer' ? 'Лето' : product.season === 'winter' ? 'Зима' : 'Всесезон'}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + rating */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{product.category}</span>
            {product.badge && (
              <span className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 rounded-md text-[9px] font-black uppercase tracking-wide">{product.badge}</span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviews})</span>
          </div>
        </div>

        {/* Name */}
        <Link href={`/tires/${product.id}`}>
          <h3 className="font-black text-sm text-slate-900 dark:text-white leading-snug group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            <span className="font-medium">{product.manufacturer} </span>{product.model}
          </h3>
        </Link>

        {/* Spec chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {(product.specParts ?? product.specs.split(' ')).map((s, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-black font-mono text-slate-600 dark:text-slate-300">{s}</span>
          ))}
        </div>

        {/* Price + cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-[10px] text-slate-400 mb-0.5">от {product.offersCount} предложений</p>
            <p className="text-lg font-black text-slate-900 dark:text-white">
              {product.minPrice.toLocaleString('ru-RU')} <span className="text-sm font-bold">₽</span>
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
function TireCardList({ product }: { product: TireProduct }) {
  return (
    <div className="group flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 hover:border-cyan-500/30 hover:shadow-lg transition-all">
      {/* Thumb */}
      <Link href={`/tires/${product.id}`} className="relative w-20 h-20 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center overflow-hidden">
        <img src={product.photo} alt={product.manufacturer} className="w-[80%] h-[80%] object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-400" />
        <span className="absolute top-1 right-1 text-base">{product.flag}</span>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{product.category}</span>
          {product.badge && (
            <span className="px-1.5 py-0.5 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-400 rounded-md text-[9px] font-black uppercase">{product.badge}</span>
          )}
          {product.featured && (
            <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 rounded-md text-[9px] font-black uppercase">Хит</span>
          )}
        </div>
        <Link href={`/tires/${product.id}`}>
          <h3 className="font-black text-sm text-slate-900 dark:text-white truncate group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            {product.manufacturer} {product.model}
          </h3>
        </Link>
        <div className="flex items-center gap-3 mt-1.5">
          {(product.specParts ?? product.specs.split(' ')).map((s, i) => (
            <span key={i} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black font-mono text-slate-600 dark:text-slate-300">{s}</span>
          ))}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviews})</span>
          </div>
        </div>
      </div>

      {/* Price + cart */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-400">от {product.offersCount} предл.</p>
          <p className="text-base font-black text-slate-900 dark:text-white">
            {product.minPrice.toLocaleString('ru-RU')} <span className="text-xs">₽</span>
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
export default function TireCard({ product, view = 'grid' }: { product: TireProduct; view?: 'grid' | 'list' }) {
  return view === 'list' ? <TireCardList product={product} /> : <TireCardGrid product={product} />;
}

'use client';

import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';
import Link from 'next/link';

export interface TireProduct {
  id: string;
  manufacturer: string;
  model: string;
  flag: string;
  photo: string;
  category: string; // e.g. "Летняя, Ultra High Performance"
  rating: number;
  reviews: number;
  specs: string; // e.g. "245/40 R18 97Y"
  minPrice: number;
  offersCount: number;
  featured?: boolean;
}

export default function TireCard({ product, view = 'grid' }: { product: TireProduct, view?: 'grid' | 'list' }) {
  if (view === 'list') {
    return (
      <GlowingCard className="w-full flex group relative overflow-visible" contentClassName="p-0 flex flex-col sm:flex-row w-full h-full">
        {/* Изображение */}
        <Link href={`/tires/${product.id}`} className="relative w-full sm:w-48 h-48 bg-slate-100 dark:bg-slate-800/40 rounded-t-[1.3rem] sm:rounded-l-[1.3rem] sm:rounded-tr-none overflow-hidden flex shrink-0 items-center justify-center p-4 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-cyan-500/5 dark:to-cyan-500/10 pointer-events-none"></div>
          <img 
            src={product.photo} 
            alt={`${product.manufacturer} ${product.model}`} 
            className="relative z-10 w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
          {product.featured && (
            <div className="absolute top-3 left-3 z-20 px-2 py-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg shadow-blue-500/30">
              <span className="text-[8px] font-black text-white uppercase tracking-wider">Хит</span>
            </div>
          )}
        </Link>

        {/* Контент */}
        <div className="flex flex-col sm:flex-row flex-grow justify-between p-5 border-l border-transparent sm:border-slate-100 dark:sm:border-slate-800/60">
          
          <div className="flex flex-col justify-between flex-grow">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm" title="Страна бренда">{product.flag}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider line-clamp-1">{product.category}</span>
              </div>
              <Link href={`/tires/${product.id}`} className="hover:underline decoration-cyan-500 cursor-pointer">
                <h3 className="text-[19px] font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  <span className="font-medium mr-1">{product.manufacturer}</span>
                  {product.model}
                </h3>
              </Link>
              <div className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded mb-4 self-start">
                <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
                  {product.specs}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{product.rating}</span>
              <span className="text-[11px] text-slate-400">({product.reviews} отзывов)</span>
            </div>
          </div>

          <div className="flex flex-col justify-end sm:items-end mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800/60 sm:pl-6 min-w-[200px]">
             <span className="text-[11px] text-slate-400 leading-none mb-1">от <span className="text-slate-900 dark:text-white font-medium">{product.offersCount} предложений</span></span>
             <div className="flex items-baseline gap-1 mb-4">
                <span className="text-[24px] font-black font-mono tracking-tighter text-slate-900 dark:text-white leading-none">
                  {product.minPrice.toLocaleString('ru-RU')}
                </span>
                <span className="text-[16px] font-bold text-slate-900 dark:text-white">₽</span>
             </div>
             <button className="w-full h-11 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center gap-2 hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-500 transition-colors shadow-md text-sm font-bold">
               В корзину
               <ShoppingCart className="w-4 h-4" />
             </button>
          </div>

        </div>
      </GlowingCard>
    );
  }

  // Grid layout
  return (
    <GlowingCard className="h-full flex flex-col group relative" contentClassName="p-0 flex flex-col h-full">
      
      {/* ── Изображение и бейджи ── */}
      <Link href={`/tires/${product.id}`} className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800/40 rounded-t-[1.3rem] overflow-hidden flex items-center justify-center p-6 cursor-pointer">
        {/* Subtle radial glow behind tire */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-cyan-500/5 dark:to-cyan-500/10 pointer-events-none"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[80%] bg-white/50 dark:bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <img 
          src={product.photo} 
          alt={`${product.manufacturer} ${product.model}`} 
          className="relative z-10 w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
        />

        {product.featured && (
          <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-lg shadow-blue-500/30">
            <span className="text-[9px] font-black text-white uppercase tracking-wider">Хит продаж</span>
          </div>
        )}
        
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 items-end">
          <span className="text-xl" title="Страна бренда">{product.flag}</span>
        </div>
      </Link>

      {/* ── Информация ── */}
      <div className="flex flex-col flex-grow p-5 border-t border-slate-100 dark:border-slate-800/60">
        
        {/* Категория и рейтинг */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider line-clamp-1">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{product.rating}</span>
            <span className="text-[10px] text-slate-400">({product.reviews})</span>
          </div>
        </div>

        {/* Название */}
        <Link href={`/tires/${product.id}`} className="hover:underline decoration-cyan-500 cursor-pointer">
          <h3 className="text-[17px] font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
            <span className="font-medium mr-1">{product.manufacturer}</span>
            {product.model}
          </h3>
        </Link>

        {/* Спецификация (размер) */}
        <div className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded mb-auto self-start">
          <span className="text-[11px] font-mono font-medium text-slate-600 dark:text-slate-400">
            {product.specs}
          </span>
        </div>

        {/* Цена и кнопка */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 leading-none mb-1">от <span className="text-slate-900 dark:text-white font-medium">{product.offersCount} предложений</span></span>
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] font-black font-mono tracking-tighter text-slate-900 dark:text-white leading-none">
                {product.minPrice.toLocaleString('ru-RU')}
              </span>
              <span className="text-[14px] font-bold text-slate-900 dark:text-white">₽</span>
            </div>
          </div>
          
          <button className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-500 transition-colors shadow-md">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

      </div>
    </GlowingCard>
  );
}

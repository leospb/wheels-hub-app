'use client';

import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';

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

export default function TireCard({ product }: { product: TireProduct }) {
  return (
    <GlowingCard className="h-full flex flex-col group relative" contentClassName="p-0 flex flex-col h-full">
      
      {/* ── Изображение и бейджи ── */}
      <div className="relative w-full aspect-square bg-slate-100 dark:bg-slate-800/40 rounded-t-[1.3rem] overflow-hidden flex items-center justify-center p-6">
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
      </div>

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
        <h3 className="text-[17px] font-black text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
          <span className="font-medium mr-1">{product.manufacturer}</span>
          {product.model}
        </h3>

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

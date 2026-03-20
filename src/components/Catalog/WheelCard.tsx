'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Disc, Box, Flame } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';

interface WheelCardProps {
  viewMode?: 'grid' | 'list';
  wheel: {
    id: number;
    brand: string;
    model: string;
    type: string; // Литые, Кованые, Flow Forming
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
  };
}

export default function WheelCard({ viewMode = 'grid', wheel }: WheelCardProps) {
  const isGrid = viewMode === 'grid';
  
  return (
    <GlowingCard className="h-full">
      <div className={`p-5 flex ${isGrid ? 'flex-col' : 'flex-col sm:flex-row gap-6 lg:gap-8'} h-full `}>
        
        {/* ── Изображение и бейджи ── */}
        <div className={`relative ${isGrid ? 'w-full aspect-square mb-6' : 'w-full sm:w-[260px] lg:w-[300px] aspect-square shrink-0'} bg-slate-50 dark:bg-slate-800/30 rounded-2xl flex flex-col items-center justify-center p-4 overflow-hidden border border-slate-100 dark:border-slate-800/60`}>
          
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {wheel.isHot && (
              <div className="bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 backdrop-blur-md">
                <Flame className="w-3 h-3" /> Хит
              </div>
            )}
            <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md">
              {wheel.type}
            </div>
          </div>
          
          <div className="absolute top-3 right-3 text-lg z-10 drop-shadow-sm" title={wheel.country.name}>
            {wheel.country.flag}
          </div>
          
          <Link href={`/wheels/${wheel.id}`} className="relative w-full h-full transform transition-transform duration-500 hover:scale-[1.05] flex items-center justify-center mix-blend-multiply dark:mix-blend-normal">
            <Image 
              src={wheel.image} 
              alt={`${wheel.brand} ${wheel.model}`} 
              fill
              className="object-contain drop-shadow-2xl"
              sizes={isGrid ? "(max-width: 768px) 100vw, 33vw" : "300px"}
            />
          </Link>
        </div>

        {/* ── Информация о товаре ── */}
        <div className={`flex flex-col flex-1 ${!isGrid && 'justify-center'}`}>
          
          <div className={!isGrid ? 'max-w-md' : ''}>
            <Link href={`/wheels/${wheel.id}`} className="block group">
              <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-blue-500 transition-colors">
                {wheel.brand} <span className="text-blue-600 dark:text-blue-400">{wheel.model}</span>
              </h4>
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">{wheel.rating}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">{wheel.reviews} отзывов</span>
              <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
              <span className="text-xs text-slate-500 font-medium line-clamp-1">{wheel.color}</span>
            </div>

            {/* Параметры диска */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 bg-slate-50 dark:bg-[#1e293b]/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
               <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-slate-400">Ширина / Диам.</span>
                 <span className="text-sm font-black font-mono text-slate-700 dark:text-slate-200">
                   {wheel.specs.width}J R{wheel.specs.diameter}
                 </span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-slate-400">Сверловка</span>
                 <span className="text-sm font-black font-mono text-slate-700 dark:text-slate-200">
                   {wheel.specs.pcd}
                 </span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-slate-400">Вылет (ET)</span>
                 <span className="text-sm font-black font-mono text-slate-700 dark:text-slate-200">
                   {wheel.specs.et}
                 </span>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] uppercase font-bold text-slate-400">ЦО (DIA)</span>
                 <span className="text-sm font-black font-mono text-slate-700 dark:text-slate-200">
                   {wheel.specs.dia}
                 </span>
               </div>
            </div>
          </div>
          
          <div className="mt-auto"></div>

          {/* ── Цены и кнопки (List mode: align to right if needed, but here just inline) ── */}
          <div className={`flex ${isGrid ? 'flex-col gap-4 mt-2' : 'flex-col sm:flex-row items-center justify-between sm:ml-auto w-full sm:w-auto p-5 sm:p-0 rounded-2xl sm:bg-transparent bg-slate-50 dark:bg-[#1e293b]/50 border sm:border-transparent border-slate-100 dark:border-slate-800'}`}>
            
            <div className={isGrid ? '' : 'sm:mr-8 mb-4 sm:mb-0 text-center sm:text-left'}>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                от {wheel.offers} предложений
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                {wheel.price.toLocaleString('ru-RU')} ₽
              </div>
            </div>

            <button className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white transition-colors rounded-xl font-bold shadow-lg shadow-blue-500/20 ${isGrid ? 'w-full py-3 h-12' : 'w-full sm:w-auto px-6 py-3 h-12'}`}>
              <ShoppingCart className="w-4 h-4" />
              <span>В корзину</span>
            </button>
            
          </div>
          
        </div>

      </div>
    </GlowingCard>
  );
}

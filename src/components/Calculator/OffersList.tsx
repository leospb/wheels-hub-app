'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextShimmer } from '@/components/ui/text-shimmer';
import type { WheelSpec } from '@/utils/wheelMath';
import { ShoppingCart, ShieldCheck, Zap, ArrowRight, ChevronRight } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';

interface OffersListProps {
  customSpec: WheelSpec;
}

const MOCK_OFFERS = [
  {
    manufacturer: 'Michelin',
    model: 'Pilot Sport 4 S',
    flag: '🇫🇷',
    photo: '/tires/michelin.png',
    store: 'Колесо.ру',
    price: '9 450',
    oldPrice: '11 200 ₽',
    stock: 'В наличии (>4)',
    delivery: 'Завтра',
    featured: true,
  },
  {
    manufacturer: 'Pirelli',
    model: 'P Zero PZ4',
    flag: '🇮🇹',
    photo: '/tires/pirelli.png',
    store: 'Шинсервис',
    price: '9 680',
    oldPrice: null,
    stock: 'Под заказ (2-3 дня)',
    delivery: '27 октября',
    featured: false,
  },
  {
    manufacturer: 'Continental',
    model: 'PremiumContact 7',
    flag: '🇩🇪',
    photo: '/tires/continental.png',
    store: 'Vianor',
    price: '9 900',
    oldPrice: '10 500 ₽',
    stock: 'Осталось 2 шт.',
    delivery: 'Сегодня',
    featured: false,
  },
  {
    manufacturer: 'Hankook',
    model: 'Ventus S1 evo3',
    flag: '🇰🇷',
    photo: '/tires/hankook.png',
    store: 'Эксклюзив',
    price: '10 150',
    oldPrice: null,
    stock: 'В наличии',
    delivery: 'Завтра',
    featured: false,
  }
];

export default function OffersList({ customSpec }: OffersListProps) {
  const [isSearching, setIsSearching] = useState(true);
  const [offerType, setOfferType] = useState<'tires' | 'wheels'>('tires');

  // Симуляция поиска при изменении параметров
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSearching(true);
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 2500); // 2.5 секунды имитации поиска

    return () => clearTimeout(timer);
  }, [customSpec]);

  const sizeString = `${customSpec.sectionWidth}/${customSpec.aspectRatio} R${customSpec.rimDiameter}`;

  return (
    <GlowingCard contentClassName="p-0">
      <div className="flex flex-col w-full text-slate-800 dark:text-slate-200 px-5 pb-5">
      {/* ── Шапка Поиска (из скриншота) ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-y border-slate-200 dark:border-slate-800 mb-6 gap-4 sm:gap-0">
        <h2 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-500 dark:text-cyan-400 fill-cyan-500/20" />
          Поиск предложений
        </h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Переключатель Шины / Диски */}
          <div className="flex bg-slate-100/80 dark:bg-slate-800/60 p-1 rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-700/50">
            <button 
              onClick={() => { setOfferType('tires'); setIsSearching(true); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                offerType === 'tires' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Шины
            </button>
            <button 
              onClick={() => { setOfferType('wheels'); setIsSearching(true); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                offerType === 'wheels' 
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              Диски
            </button>
          </div>

          <div className="text-[11px] font-mono px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#0f172a]/50 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 tracking-wide">
            Размер: <span className="font-bold text-cyan-600 dark:text-cyan-400">{sizeString}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full relative min-h-[300px]">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div
              key="searching"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center gap-6 mt-10"
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-cyan-500 rounded-full border-t-transparent animate-spin"></div>
                <ShoppingCart className="w-6 h-6 text-slate-400" />
              </div>
              
              <div className="flex flex-col gap-2">
                <TextShimmer 
                  className="font-mono text-lg font-medium" 
                  duration={1.5}
                  spread={1}
                >
                  Анализ прайс-листов поставщиков...
                </TextShimmer>
                <div className="text-xs text-slate-500">
                  Ищем лучшие цены для размера <span className="font-mono text-cyan-400">{sizeString}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.1 }}
              className="flex flex-col w-full gap-4"
            >
              <h3 className="text-[15px] font-medium text-slate-800 dark:text-slate-200 mb-1">
                Найдено 4 лучших предложения:
              </h3>
              
              {MOCK_OFFERS.map((offer, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative flex items-center justify-between py-3 px-4 rounded-xl border transition-all duration-300 ${
                    offer.featured 
                      ? 'bg-blue-50/50 dark:bg-[#0f172a] border-cyan-500/30' 
                      : 'bg-white dark:bg-[#0f172a]/50 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {offer.featured && (
                    <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-blue-500 text-[9px] font-bold text-white uppercase tracking-wider flex items-center gap-1 shadow-md shadow-blue-500/20">
                      <ShieldCheck className="w-3 h-3" />
                      Выбор профи
                    </div>
                  )}
                  
                  {/* Левая часть: Фото + Инфо */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={offer.photo} 
                      alt={offer.model}
                      className="w-12 h-12 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
                    />
                    
                    <div className="flex flex-col justify-center">
                      <h4 className="text-[15px] font-bold text-slate-900 dark:text-slate-100 leading-tight mb-1 flex items-center gap-2">
                        {offer.manufacturer} {offer.model}
                        <span className="text-[14px]" title="Страна бренда">{offer.flag}</span>
                      </h4>
                      
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{offer.store}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        <span className={`flex items-center gap-1 ${offer.stock.includes('наличии') ? 'text-emerald-500 dark:text-emerald-400' : 'text-amber-500 dark:text-amber-400'}`}>
                          {offer.stock}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                        <span className="text-slate-500 dark:text-slate-400 hidden sm:flex items-center gap-1">
                          Доставка: <span className="font-medium text-slate-700 dark:text-slate-300">{offer.delivery}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Правая часть: Цена + Кнопка-иконка */}
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end justify-center min-w-[70px]">
                      {offer.oldPrice ? (
                        <div className="text-[10px] text-slate-400 line-through mb-0 font-mono tracking-tight h-[14px]">
                          {offer.oldPrice}
                        </div>
                      ) : (
                        <div className="h-[14px]"></div>
                      )}
                      
                      <div className="flex items-baseline gap-1 whitespace-nowrap">
                        <span className={`text-[20px] font-black font-mono tracking-tighter ${offer.featured ? 'text-cyan-600 dark:text-[#5bc2dc]' : 'text-slate-800 dark:text-slate-100'}`}>
                          {offer.price}
                        </span>
                        <span className={`text-[14px] font-bold ${offer.featured ? 'text-cyan-600 dark:text-[#5bc2dc]' : 'text-slate-800 dark:text-slate-100'}`}>
                          ₽
                        </span>
                      </div>
                    </div>
                    
                    <button className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 shrink-0 ${
                      offer.featured 
                        ? 'bg-cyan-500 dark:bg-[#5bc2dc] hover:bg-cyan-400 dark:hover:bg-[#4ab1cb] text-white dark:text-slate-900 shadow-md shadow-cyan-500/20' 
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 hover:border-cyan-200'
                    }`}>
                      <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-2 flex flex-col gap-4"
              >
                <button className="w-full py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-[14px] font-semibold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2">
                  Смотреть все предложения
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href="#" className="flex items-center justify-between p-4 px-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]/30 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-colors group">
                    <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Колесные болты под эти диски
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                  </a>
                  <a href="#" className="flex items-center justify-between p-4 px-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a]/30 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-colors group">
                    <span className="text-[13px] font-medium text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      Ступинаторы на эти диски
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 transition-colors" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </GlowingCard>
  );
}

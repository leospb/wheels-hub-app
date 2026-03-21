'use client';

import React from 'react';
import { GlowingCard } from '@/components/ui/glowing-card';
import { Star, ShieldCheck, CheckCircle2, ChevronRight, Share2, Heart, Scale } from 'lucide-react';
import WheelSpecs from '@/components/Product/WheelSpecs';
import WheelVideoReviews from '@/components/Product/WheelVideoReviews';
import WheelUserReviews from '@/components/Product/WheelUserReviews';

export default function WheelProductPage({ params }: { params: { id: string } }) {
  // Mock data for the specific wheel
  const wheel = {
    manufacturer: 'Vossen',
    model: 'HF-5',
    category: 'Flow Forming',
    flag: '🇺🇸',
    specs: '8.5J R19 5x112 ET35 DIA66.6',
    color: 'Satin Bronze',
    rating: 4.9,
    reviews: 124,
    minPrice: 45000,
    offersCount: 8,
    photo: '/wheels/vossen.png',
    description: 'Премиальные литые диски Vossen HF-5 серии Hybrid Forged производятся по технологии Flow Forming. Эта технология позволяет сделать обод более легким и прочным, приближая характеристики диска к кованым аналогам.',
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-8">
          <a href="/" className="hover:text-cyan-500 transition-colors">Главная</a>
          <ChevronRight className="w-3 h-3" />
          <a href="/wheels" className="hover:text-cyan-500 transition-colors">Диски</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">{wheel.manufacturer}</span>
        </div>

        {/* ── Hero Section ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Main Visual & Details (Left/Center) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <GlowingCard className="w-full flex" contentClassName="p-0 flex flex-col md:flex-row h-full items-stretch">
              
              {/* Product Image */}
              <div className="relative w-full md:w-1/2 p-8 flex items-center justify-center bg-slate-100 dark:bg-slate-800/40 border-r border-transparent mdborder-slate-100 dark:md:border-slate-800/60 rounded-t-[1.3rem] md:rounded-l-[1.3rem] md:rounded-tr-none">
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-cyan-500/10 pointer-events-none"></div>
                {/* Action buttons overlay */}
                <div className="absolute top-4 right-4 flex flex-col items-center gap-2 z-20">
                  <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors" title="В избранное">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center text-slate-400 hover:text-cyan-500 transition-colors" title="Сравнить">
                    <Scale className="w-4 h-4" />
                  </button>
                </div>
                {/* Big Image */}
                <img 
                  src={wheel.photo} 
                  alt={`${wheel.manufacturer} ${wheel.model}`} 
                  className="relative z-10 w-full max-w-[360px] object-contain drop-shadow-max"
                />
              </div>

              {/* Product Header Info */}
              <div className="flex-1 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg" title="Страна бренда">{wheel.flag}</span>
                  <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded">
                    {wheel.category}
                  </span>
                  <span className="px-2.5 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 text-[10px] font-black uppercase tracking-widest rounded">
                    {wheel.color}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4">
                  <span className="block text-2xl md:text-3xl font-bold text-slate-500 mb-1">{wheel.manufacturer}</span>
                  {wheel.model}
                </h1>
                
                <div className="inline-block px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6 self-start border border-slate-200 dark:border-slate-700 shadow-sm">
                  <span className="text-sm font-mono font-bold text-slate-700 dark:text-slate-300 tracking-wider">
                    {wheel.specs}
                  </span>
                </div>

                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500 drop-shadow-sm" />
                    <span className="text-xl font-black text-slate-900 dark:text-white">{wheel.rating}</span>
                    <a href="#reviews" className="text-sm text-slate-400 hover:text-cyan-500 underline decoration-slate-300 dark:decoration-slate-700 underline-offset-4 transition-colors">
                      {wheel.reviews} отзывов
                    </a>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                  <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-500">
                    <ShieldCheck className="w-4 h-4" />
                    Гарантия 2 года
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {wheel.description}
                </p>

                {/* Quick Metrics (Visual Bars) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-auto">
                  {[
                    { label: 'Вес', val: 92, invert: false },
                    { label: 'Прочность', val: 95, invert: false },
                    { label: 'Стиль', val: 98, invert: true },
                    { label: 'Аэродинамика', val: 85, invert: false },
                  ].map((metric, i) => (
                    <div key={i} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase">
                        {metric.label}
                        <span className="font-mono text-slate-900 dark:text-white">{metric.val}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${metric.invert ? 'bg-amber-500' : 'bg-cyan-500'}`} 
                          style={{ width: `${metric.val}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </GlowingCard>
          </div>

          {/* Pricing Aggregator Panel (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="sticky top-32">
              <GlowingCard className="w-full flex flex-col" contentClassName="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {wheel.offersCount} предложений
                  </span>
                </div>

                <div className="flex flex-col mb-8 text-center bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <span className="text-sm text-slate-500 mb-2">Лучшая цена за 1 шт.</span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black font-mono tracking-tighter text-slate-900 dark:text-white">
                      {wheel.minPrice.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-2xl font-bold text-slate-400">₽</span>
                  </div>
                </div>

                {/* Best Offers List */}
                <div className="flex flex-col gap-3 mb-8">
                  {[
                    { name: 'Koleso.ru', price: 45000, delivery: 'Завтра', tag: 'Лучшая цена' },
                    { name: 'Vossen Russia', price: 48000, delivery: 'Сегодня', tag: 'Прямо сейчас' },
                    { name: 'Римзона', price: 46500, delivery: 'Чт, 24 марта', tag: null },
                  ].map((offer, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border ${idx === 0 ? 'border-cyan-500/30 bg-cyan-50/50 dark:bg-cyan-950/20' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          {offer.name}
                          {offer.tag && (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-widest ${idx === 0 ? 'bg-cyan-500 text-white' : 'bg-amber-500 text-white'}`}>
                              {offer.tag}
                            </span>
                          )}
                        </span>
                        <span className="text-[11px] text-slate-500">{offer.delivery}</span>
                      </div>
                      <span className="text-base font-black font-mono text-slate-900 dark:text-white">{offer.price} ₽</span>
                    </div>
                  ))}
                </div>

                <button className="w-full h-14 rounded-2xl bg-cyan-600 text-white dark:bg-cyan-500 dark:text-slate-900 flex items-center justify-center gap-2 hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors shadow-xl shadow-cyan-500/20 text-base font-black uppercase tracking-widest mt-auto shrink-0">
                  <span className="text-2xl mb-1">🛒</span>
                  Сравнить все цены
                </button>
                <div className="mt-4 flex flex-col items-center gap-2 text-center">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Безопасная оплата через партнеров
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">
                    <Share2 className="w-3 h-3" />
                    <button className="hover:text-cyan-500 underline">Поделиться моделью</button>
                  </span>
                </div>
              </GlowingCard>
            </div>
          </div>
        </div>

        {/* ── Tabs & Content Area ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            <section id="specs">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Характеристики</h2>
              </div>
              <WheelSpecs />
            </section>

            <section id="videos">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Обзоры и тесты</h2>
              </div>
              <WheelVideoReviews />
            </section>

            <section id="reviews">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Отзывы покупателей</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                  124
                </span>
              </div>
              <WheelUserReviews />
            </section>

          </div>
        </div>

      </div>
    </div>
  );
}

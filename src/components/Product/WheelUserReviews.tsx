'use client';

import React from 'react';
import { Star, ThumbsUp, ThumbsDown, ShieldCheck } from 'lucide-react';

export default function WheelUserReviews() {
  const reviews = [
    {
      id: 1,
      author: 'Александр В.',
      date: '12 марта 2024',
      rating: 5,
      car: 'BMW 5 Series (G30)',
      pros: 'Смотрятся феноменально, машина преобразилась, прочные.',
      cons: 'Легко поцарапать о бордюр, цена кусается.',
      text: 'Отличные диски, смотрятся феноменально. Машина преобразилась.',
      likes: 14,
      dislikes: 1
    },
    {
      id: 2,
      author: 'Михаил',
      date: '28 октября 2023',
      rating: 4,
      car: 'Audi A4 (B9)',
      pros: 'Отличное сцепление, тормозной путь минимальный, красивый рисунок и боковина.',
      cons: 'Жестковата при давлении выше 2.4 бар, быстро стирается при агрессивной езде.',
      text: 'Резина для тех, кто понимает зачем она ему нужна. На трек я не езжу, но для динамичной городской езды — топ. Звезду снял за быстрый износ (хватило на 2 сезона).',
      likes: 8,
      dislikes: 3
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ── Summary Column ── */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-800 text-center">
           <span className="text-6xl font-black font-mono text-slate-900 dark:text-white leading-none mb-2">
             4.9
           </span>
           <div className="flex items-center gap-1 text-amber-500 mb-2">
             {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
           </div>
           <span className="text-sm text-slate-500 font-medium">На основе 142 отзывов</span>
           
           <div className="w-full h-px bg-slate-200 dark:bg-slate-700 my-6"></div>

           <div className="w-full flex flex-col gap-2">
             {[
               { stars: 5, pct: 85 },
               { stars: 4, pct: 10 },
               { stars: 3, pct: 3 },
               { stars: 2, pct: 1 },
               { stars: 1, pct: 1 }
             ].map((row) => (
               <div key={row.stars} className="flex items-center gap-3 text-sm">
                 <span className="w-3 text-slate-400 font-medium">{row.stars}</span>
                 <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                 <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 rounded-full" style={{ width: `${row.pct}%` }}></div>
                 </div>
                 <span className="w-8 text-right text-slate-400 text-xs">{row.pct}%</span>
               </div>
             ))}
           </div>
        </div>

        <button className="w-full py-4 rounded-xl border-2 border-cyan-500 text-cyan-600 dark:text-cyan-400 font-bold hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-colors">
          Оставить отзыв
        </button>
      </div>

      {/* ── Reviews List ── */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col p-6 rounded-3xl bg-white dark:bg-[#0f172a]/50 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/50 flex items-center justify-center text-cyan-700 dark:text-cyan-400 font-bold text-lg">
                  {review.author[0]}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 dark:text-white">{review.author}</span>
                  <span className="text-xs text-slate-400">{review.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded text-amber-600">
                <span className="font-bold text-sm tracking-tighter">{review.rating}.0</span>
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md self-start mb-5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Подтвержденный покупатель • {review.car}
            </div>

            <div className="flex flex-col gap-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-emerald-500">+</span> Достоинства
                </span>
                <p>{review.pros}</p>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-red-500">-</span> Недостатки
                </span>
                <p>{review.cons}</p>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-900 dark:text-white">Комментарий</span>
                <p>{review.text}</p>
              </div>
            </div>

            <div className="w-full h-px bg-slate-100 dark:bg-slate-800/80 my-4"></div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 select-none">
               <span>Отзыв был полезен?</span>
               <button className="flex items-center gap-1.5 hover:text-emerald-500 transition-colors">
                 <ThumbsUp className="w-3.5 h-3.5" />
                 {review.likes}
               </button>
               <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                 <ThumbsDown className="w-3.5 h-3.5" />
                 {review.dislikes}
               </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-2">
          <button className="text-sm font-bold text-slate-500 hover:text-cyan-500 transition-colors">
            Показать следующие отзывы
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Play } from 'lucide-react';

export default function TireVideoReviews() {
  const videos = [
    {
      id: 1,
      title: 'Большой тест летних UHP шин 2024: Michelin против всех',
      channel: 'AutoReview',
      duration: '14:20',
      thumbnail: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Michelin Pilot Sport 4 S - Отзыв владельца после 20 000 км',
      channel: 'Drive2 Blog',
      duration: '08:45',
      thumbnail: 'https://images.unsplash.com/photo-1620857754395-8ba948ac7ab1?w=600&h=400&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'Tyre Tests 2024: The Ultimate Performance Assessment',
      channel: 'TyreReviews.com',
      duration: '22:10',
      thumbnail: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=600&h=400&fit=crop&q=80',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <a key={video.id} href="#" className="group relative block overflow-hidden rounded-3xl cursor-pointer">
          <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-cyan-900/40 transition-colors z-10 pointer-events-none"></div>
          
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-slate-900/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-red-600 dark:text-cyan-500 fill-current ml-1" />
          </div>

          <div className="absolute bottom-2 right-2 z-20 px-2 py-1 bg-black/70 text-white text-[10px] font-mono font-bold rounded">
            {video.duration}
          </div>

          {/* Info Area below image but inside card */}
          <div className="bg-white dark:bg-slate-800 p-4 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-3xl absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
             <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight mb-2">
               {video.title}
             </h4>
             <span className="text-[11px] text-slate-500 font-medium">{video.channel}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

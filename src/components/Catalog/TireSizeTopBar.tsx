'use client';

import React, { useState } from 'react';

export default function TireSizeTopBar() {
  const [width, setWidth] = useState(245);
  const [profile, setProfile] = useState(40);
  const [diameter, setDiameter] = useState(18);

  return (
    <div className="w-full relative z-20">
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 shadow-sm backdrop-blur-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Ширина */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ширина</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none tracking-tighter">{width}</span>
            </div>
            <input 
              type="range" 
              min={155} max={355} step={5}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none outline-none accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>155</span>
              <span>355</span>
            </div>
          </div>

          {/* Профиль */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Профиль</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none tracking-tighter">{profile}</span>
            </div>
            <input 
              type="range" 
              min={25} max={85} step={5}
              value={profile}
              onChange={(e) => setProfile(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none outline-none accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>25</span>
              <span>85</span>
            </div>
          </div>

          {/* Диаметр */}
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Диаметр</span>
              <span className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none tracking-tighter">R{diameter}</span>
            </div>
            <input 
              type="range" 
              min={13} max={24} step={1}
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none outline-none accent-cyan-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>R13</span>
              <span>R24</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

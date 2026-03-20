'use client';

import React, { useState } from 'react';
import { SearchAnimatedButton } from '@/components/ui/search-animated-button';
import { ChevronDown } from 'lucide-react';

export default function WheelSizeTopBar() {
  const [diameter, setDiameter] = useState(19);
  const [width, setWidth] = useState(8.5);
  const [pcd, setPcd] = useState('5x112');

  const pcdOptions = ['4x100', '4x114.3', '5x100', '5x108', '5x112', '5x114.3', '5x120', '6x139.7'];

  return (
    <div className="w-full relative z-20">
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 shadow-sm backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 w-full">
          
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
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none outline-none accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>R13</span>
                <span>R24</span>
              </div>
            </div>

            {/* Ширина */}
            <div className="flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ширина</span>
                <span className="text-2xl font-black font-mono text-slate-900 dark:text-white leading-none tracking-tighter">{width}J</span>
              </div>
              <input 
                type="range" 
                min={4.5} max={13} step={0.5}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none outline-none accent-blue-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>4.5J</span>
                <span>13J</span>
              </div>
            </div>

            {/* Сверловка PCD */}
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Сверловка (PCD)</span>
              </div>
              <div className="relative group">
                <select 
                  value={pcd}
                  onChange={(e) => setPcd(e.target.value)}
                  className="w-full appearance-none bg-slate-100 dark:bg-[#1e293b] border-2 border-transparent hover:border-slate-300 dark:hover:border-slate-700 outline-none focus:border-blue-500 dark:focus:border-blue-500 rounded-xl h-[40px] px-4 font-mono font-bold text-slate-900 dark:text-white cursor-pointer transition-colors"
                >
                  {pcdOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
          
          <div className="w-full lg:w-auto shrink-0 flex justify-end mt-6 lg:mt-0">
             <SearchAnimatedButton className="w-full lg:w-[160px] h-full min-h-[48px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

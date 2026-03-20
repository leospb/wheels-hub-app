import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ChevronDown } from 'lucide-react';
import { GlowingCard } from '@/components/ui/glowing-card';

export default function VehicleSelector() {
  return (
    <GlowingCard contentClassName="flex flex-col md:flex-row items-center gap-3 p-4">
      <div className="flex-1 w-full flex flex-col md:flex-row gap-3">
        {/* Make */}
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-md px-3 mt-0 py-2.5 outline-none focus:ring-2 focus:ring-cyan-600/50 transition-all cursor-pointer">
            <option value="" disabled selected>Марка авто</option>
            <option value="toyota">Toyota</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes-Benz</option>
            <option value="audi">Audi</option>
            <option value="honda">Honda</option>
            <option value="ford">Ford</option>
            <option value="hyundai">Hyundai</option>
            <option value="kia">Kia</option>
            <option value="nissan">Nissan</option>
            <option value="vw">Volkswagen</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4 opacity-50" />
          </div>
        </div>
        
        {/* Model */}
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-md px-3 py-2.5 outline-none focus:ring-2 focus:ring-cyan-600/50 transition-all cursor-pointer">
            <option value="" disabled selected>Модель</option>
            <option value="camry">Camry</option>
            <option value="corolla">Corolla</option>
            <option value="rav4">RAV4</option>
            <option value="3-series">3 Series</option>
            <option value="5-series">5 Series</option>
            <option value="x5">X5</option>
            <option value="e-class">E-Class</option>
            <option value="a4">A4</option>
            <option value="civic">Civic</option>
            <option value="focus">Focus</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4 opacity-50" />
          </div>
        </div>

        {/* Year */}
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-md px-3 py-2.5 outline-none focus:ring-2 focus:ring-cyan-600/50 transition-all cursor-pointer">
            <option value="" disabled selected>Год выпуска</option>
            {Array.from({ length: 25 }).map((_, i) => {
              const year = new Date().getFullYear() - i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4 opacity-50" />
          </div>
        </div>

        {/* Modification */}
        <div className="relative flex-1">
          <select className="w-full appearance-none bg-slate-800/50 border border-slate-700/50 text-slate-200 text-sm rounded-md px-3 py-2.5 outline-none focus:ring-2 focus:ring-cyan-600/50 transition-all cursor-pointer">
            <option value="" disabled selected>Модификация (Двигатель)</option>
            <option value="2.0">2.0 AT (150 л.с.)</option>
            <option value="2.5">2.5 AT (200 л.с.)</option>
            <option value="3.5">3.5 AT (249 л.с.)</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4 opacity-50" />
          </div>
        </div>
      </div>

      <Button className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-600/90 text-white gap-2 px-6 shadow-[0_0_15px_rgba(8,145,178,0.3)] hover:shadow-[0_0_20px_rgba(8,145,178,0.5)] transition-shadow">
        <Search className="w-4 h-4" />
        Найти размеры
      </Button>
    </GlowingCard>
  );
}

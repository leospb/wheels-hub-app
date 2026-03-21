'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, CarFront, ArrowDownAz } from 'lucide-react';
import { carMakes, alphabets, CarMake } from '@/data/carMakes';

export default function CarMakesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  // Filtered and grouped brands
  const filteredMakes = useMemo(() => {
    let filtered = carMakes;

    if (searchQuery) {
      filtered = filtered.filter(make => 
        make.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedLetter) {
      filtered = filtered.filter(make => 
        make.name.startsWith(selectedLetter)
      );
    }

    // Grouping
    const grouped = filtered.reduce((acc, make) => {
      if (!acc[make.category]) {
        acc[make.category] = [];
      }
      acc[make.category].push(make);
      return acc;
    }, {} as Record<string, CarMake[]>);

    return grouped;
  }, [searchQuery, selectedLetter]);

  // For unique brands rendering (deduplicating across categories for A-Z if needed, but the original UI splits them)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020817] pt-28 pb-20 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full md:w-[calc(100%-2rem)] max-w-screen-2xl mx-auto px-4 md:px-0 relative z-10">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-slate-500 mb-8 mt-6">
          <a href="/" className="hover:text-cyan-500 transition-colors">Главная</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white">Автомобильные марки</span>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-4 flex items-center gap-4">
            <CarFront className="w-10 h-10 text-cyan-500" />
            Каталог марок автомобилей
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
            Выберите марку вашего автомобиля, чтобы начать подбор шин и дисков с гарантированной совместимостью по параметрам завода-изготовителя.
          </p>
        </div>

        {/* Search & Filter Section */}
        <div className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-[2rem] p-6 md:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none mb-12">
          
          {/* Main Search */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-14 pr-16 py-5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-sm"
              placeholder="Введите название марки (например, Toyota)"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLetter(null); // Reset letter when searching
              }}
            />
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none text-slate-300 dark:text-slate-600">
              <ArrowDownAz className="h-5 w-5" />
            </div>
          </div>

          {/* Alphabet Filter */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">
              Алфавитный указатель:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => { setSelectedLetter(null); setSearchQuery(''); }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all
                  ${!selectedLetter && !searchQuery 
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                Все
              </button>
              {alphabets.map((letter) => (
                <button
                  key={letter}
                  onClick={() => { setSelectedLetter(letter); setSearchQuery(''); }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all
                    ${selectedLetter === letter 
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories / Brands Grid */}
        <div className="flex flex-col gap-12 relative z-10">
          {Object.entries(filteredMakes).length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <CarFront className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-xl">По вашему запросу ничего не найдено.</p>
            </div>
          ) : (
            Array.from(new Set(['Popular', 'American', 'European', ...Object.keys(filteredMakes)])).map(category => {
              const makesRaw = filteredMakes[category];
              if (!makesRaw || makesRaw.length === 0) return null;

              const makes = [...makesRaw].sort((a,b) => a.name.localeCompare(b.name));

              return (
                <section key={category} className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-cyan-500 rounded-full"></div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                      {category === 'Popular' && 'Популярные'}
                      {category === 'American' && 'Американские'}
                      {category === 'European' && 'Европейские'}
                      {category === 'Asian' && 'Азиатские'}
                      {category === 'Russian' && 'Отечественные'}
                      {!['Popular', 'American', 'European', 'Asian', 'Russian'].includes(category) && 'Остальные'}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                      {makes.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                    {makes.map(make => (
                      <a 
                        key={make.id} 
                        href={`/makes/${make.id}`}
                        className="group flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-cyan-500/50 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer text-center gap-3"
                      >
                        {make.bgPos && make.bgPos !== '-999px -999px' ? (
                          <div 
                            className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0 grayscale group-hover:grayscale-0"
                            style={{
                              backgroundImage: "url('/images/car-makes-sprite.png')",
                              backgroundPosition: make.bgPos,
                              backgroundSize: '456px 456px',
                              backgroundRepeat: 'no-repeat'
                            }}
                          />
                        ) : (
                          <CarFront className="w-8 h-8 text-slate-300 dark:text-slate-600 group-hover:text-cyan-500 transition-colors" />
                        )}
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 tracking-wide transition-colors">
                          {make.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

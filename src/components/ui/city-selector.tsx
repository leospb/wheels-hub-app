'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TOP_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Красноярск',
  'Челябинск',
  'Самара',
  'Уфа',
  'Ростов-на-Дону',
  'Омск',
  'Краснодар',
  'Воронеж',
  'Пермь',
  'Волгоград'
];

export function CitySelector() {
  const [city, setCity] = useState('Москва');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Показываем промпт при первой загрузке
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Блокируем скролл при открытом модальном окне
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup if component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  const handleConfirmPrompt = () => {
    setShowPrompt(false);
  };

  const handleOpenModal = () => {
    setShowPrompt(false);
    setShowModal(true);
  };

  const handleSelectCity = (selectedCity: string) => {
    setCity(selectedCity);
    setShowModal(false);
    setShowPrompt(false);
  };

  const filteredCities = TOP_CITIES.filter(c => 
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative z-[60]">
      {/* Кнопка в шапке */}
      <button 
        onClick={handleOpenModal}
        className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <MapPin className="w-4 h-4 text-cyan-500" />
        <span className="truncate max-w-[120px]">{city}</span>
      </button>

      {/* Промпт подтверждения */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-3 left-0 w-[280px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl p-4 flex flex-col gap-3"
          >
            {/* Имитация треугольничка меню (честного css) */}
            <div className="absolute -top-[7px] left-6 w-3 h-3 bg-white dark:bg-slate-900 border-l border-t border-slate-200 dark:border-slate-800 rotate-45"></div>

            <div className="text-[13px] font-medium text-slate-800 dark:text-slate-200 relative z-10 leading-snug">
              Ваш город — <span className="font-bold text-cyan-600 dark:text-cyan-400">{city}</span>?
            </div>
            
            <div className="flex items-center gap-2 mt-1 relative z-10">
              <button 
                onClick={handleConfirmPrompt}
                className="flex-1 px-3 py-2 bg-cyan-500 hover:bg-cyan-400 dark:bg-[#5bc2dc] dark:hover:bg-[#4ab1cb] text-white dark:text-slate-900 text-[12px] font-bold rounded-lg transition-colors shadow-sm"
              >
                Да, верно
              </button>
              <button 
                onClick={handleOpenModal}
                className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[12px] font-bold rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
              >
                Другой
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно выбора */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm"
              style={{ zIndex: 100 }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, top: '45%', x: '-50%', y: '-50%' }}
              animate={{ opacity: 1, scale: 1, top: '50%', x: '-50%', y: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, top: '55%', x: '-50%', y: '-50%' }}
              className="fixed left-1/2 w-[90vw] max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]"
              style={{ zIndex: 101 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-[#0a0e1f]/50">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Выберите город</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 border-b border-slate-100 dark:border-slate-800/50 bg-white dark:bg-[#0f172a] shrink-0">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Поиск по городам России..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-[14px] focus:ring-2 focus:ring-cyan-500/50 outline-none text-slate-800 dark:text-slate-200 transition-all placeholder:text-slate-500"
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-3 flex-1 custom-scrollbar">
                {filteredCities.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {filteredCities.map(c => (
                      <button
                        key={c}
                        onClick={() => handleSelectCity(c)}
                        className={`text-left px-4 py-2.5 rounded-xl text-[13px] transition-colors flex items-center justify-between group ${
                          c === city 
                            ? 'bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-[#5bc2dc] font-bold' 
                            : 'border border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:border-slate-200 dark:hover:border-slate-700/50'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 flex flex-col items-center justify-center gap-2">
                    <MapPin className="w-8 h-8 text-slate-300 dark:text-slate-700" />
                    <span className="text-sm font-medium text-slate-500">Город не найден</span>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

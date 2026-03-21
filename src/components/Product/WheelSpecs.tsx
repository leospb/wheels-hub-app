import React from 'react';

export default function WheelSpecs() {
  const specs = [
    { label: 'Бренд', value: 'Vossen' },
    { label: 'Модель', value: 'HF-5' },
    { label: 'Тип диска', value: 'Flow Forming (Гибридно-кованый)' },
    { label: 'Диаметр (R)', value: '19"' },
    { label: 'Ширина (J)', value: '8.5J' },
    { label: 'Сверловка (PCD)', value: '5x112' },
    { label: 'Вылет (ET)', value: '35 мм' },
    { label: 'Центральное отверстие (DIA)', value: '66.6 мм' },
    { label: 'Цвет', value: 'Satin Bronze (Матовая бронза)' },
    { label: 'Макс. нагрузка (Max Load)', value: '850 кг' },
    { label: 'Вес диска', value: '10.2 кг' },
    { label: 'Страна бренда', value: 'США 🇺🇸' },
    { label: 'Производство', value: 'Тайвань 🇹🇼' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {specs.map((item, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 relative group">
            <span className="text-sm font-medium text-slate-500 mb-1 sm:mb-0 relative z-10 group-hover:text-cyan-500 transition-colors">
              {item.label}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white/90 text-left sm:text-right relative z-10">
              {item.value}
            </span>
            {/* Hover dash line effect for wider screens */}
            <div className="hidden sm:block absolute left-0 right-0 top-1/2 -translate-y-1/2 border-b border-dashed border-slate-200 dark:border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
          </div>
        ))}
      </div>
      
      {/* Brand Badge */}
      <div className="mt-8 flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl font-bold font-serif text-slate-900 dark:text-white">
            V
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900 dark:text-white">Оригинальные диски Vossen</span>
            <span className="text-xs text-slate-500">Прямые поставки от официального дистрибьютора</span>
          </div>
        </div>
        <img src="https://flagcdn.com/us.svg" alt="USA" className="h-4 rounded-sm drop-shadow opacity-80" />
      </div>
    </div>
  );
}

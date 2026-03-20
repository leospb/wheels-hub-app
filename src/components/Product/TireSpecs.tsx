'use client';

import React from 'react';

export default function TireSpecs() {
  const specs = [
    { label: 'Ширина', value: '245 мм' },
    { label: 'Профиль', value: '40 %' },
    { label: 'Диаметр', value: 'R18' },
    { label: 'Индекс нагрузки', value: '97 (до 730 кг)' },
    { label: 'Индекс скорости', value: 'Y (до 300 км/ч)' },
    { label: 'Сезонность', value: 'Летняя' },
    { label: 'Шипы', value: 'Нет' },
    { label: 'Технология RunFlat', value: 'Нет (Стандартная)' },
    { label: 'Усиление (XL)', value: 'Да' },
    { label: 'Омологация', value: 'Porsche (N0)' },
    { label: 'Глубина протектора', value: '7.8 мм' },
    { label: 'Вес', value: '10.5 кг' },
    { label: 'Страна производства', value: 'Франция, Германия' },
    { label: 'Treadwear', value: '300' },
  ];

  return (
    <div className="bg-white dark:bg-[#0f172a]/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {specs.map((spec, i) => (
          <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0 md:[&:nth-last-child(2)]:border-0 md:[&:nth-last-child(1)]:border-0">
            <span className="text-sm text-slate-500">{spec.label}</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white text-right">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

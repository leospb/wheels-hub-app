'use client';

/**
 * PlusSizingTable.tsx — Redesigned
 * Таблица в стиле референса 1: группировка по ширине (195/205/215/225/235 мм),
 * строки по диаметру диска (+0/+1/+2), цветовые бейджи статусов.
 */

import React, { useMemo, useState } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import { generatePlusSizingTable, calcTotalDiameter } from '@/utils/wheelMath';
import type { PlusSizingEntry, WheelSpec } from '@/utils/wheelMath';

// ─────────────────────────────────────────────
// Конфигурация цветов
// ─────────────────────────────────────────────

const STATUS = {
  recommended: { bg: 'rgba(0,212,170,0.18)', border: '#00d4aa', text: '#00d4aa', label: '✓' },
  acceptable:  { bg: 'rgba(255,193,7,0.12)',  border: '#ffc107', text: '#ffd060', label: '~' },
  warning:     { bg: 'rgba(255,120,0,0.12)',  border: '#ff7800', text: '#ff9900', label: '!' },
  blocked:     { bg: 'rgba(220,60,60,0.10)',  border: '#dc3c3c', text: '#ff6666', label: '✕' },
} as const;

// ─────────────────────────────────────────────
// Компонент ячейки варианта
// ─────────────────────────────────────────────

interface EntryBadgeProps {
  entry: PlusSizingEntry;
  isOe: boolean;
  onSelect: (e: PlusSizingEntry) => void;
}

function EntryBadge({ entry, isOe, onSelect }: EntryBadgeProps) {
  const s = STATUS[entry.status as keyof typeof STATUS];
  const devSign = entry.deviationPercent >= 0 ? '+' : '';
  return (
    <button
      onClick={() => !isOe && entry.status !== 'blocked' && onSelect(entry)}
      disabled={entry.status === 'blocked'}
      title={`Ø ${entry.totalDiameter.toFixed(0)} мм · ${devSign}${entry.deviationPercent.toFixed(1)}%`}
      className={`
        relative text-left px-2 py-1.5 rounded text-[11px] font-mono leading-tight w-full mb-1 transition-all
        ${entry.status === 'blocked' ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:brightness-125'}
        ${isOe ? 'ring-2' : ''}
      `}
      style={{
        background: isOe ? 'rgba(74,158,255,0.22)' : s.bg,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: isOe ? '#4a9eff' : s.border,
        color: isOe ? '#4a9eff' : s.text,
      }}
    >
      <span className="font-bold">
        {entry.sectionWidth}/{entry.aspectRatio}R{entry.rimDiameter}
      </span>
      <span className="opacity-60 ml-0.5">×{entry.rimDiameter > 17 ? ' 7.5' : ' 6.5'}</span>
      <span className="block text-[10px] opacity-70">
        {devSign}{entry.deviationPercent.toFixed(1)}%
        {isOe && <span className="ml-1 bg-blue-500/30 px-1 rounded text-[9px]">ШТАТ</span>}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────
// Главный компонент
// ─────────────────────────────────────────────

export default function PlusSizingTable() {
  const { oeSpec, setCustomSpec } = useCalculatorStore();
  const [isOpen, setIsOpen] = useState(true);
  const [activeRim, setActiveRim] = useState<number | 'all'>('all');

  const entries = useMemo(() => generatePlusSizingTable(oeSpec), [oeSpec]);
  const oeDiam  = useMemo(() => calcTotalDiameter(oeSpec), [oeSpec]);

  // Уникальные диаметры из результатов
  const rims = useMemo(() => {
    const set = new Set(entries.map((e: PlusSizingEntry) => e.rimDiameter));
    return Array.from(set).sort((a, b) => a - b);
  }, [entries]);

  // Видимые ширины профиля (5 групп вокруг OE)
  const widths = useMemo(() => {
    const base = oeSpec.sectionWidth;
    const candidates = [base - 20, base - 10, base, base + 10, base + 20];
    const allWidths = Array.from(new Set(entries.map((e: PlusSizingEntry) => e.sectionWidth)));
    return candidates.filter((w) => allWidths.includes(w)).slice(0, 5);
  }, [entries, oeSpec.sectionWidth]);

  // Отфильтрованные диаметры
  const visibleRims = activeRim === 'all' ? rims : [activeRim];

  // Статистика
  const stats = useMemo(() => ({
    ok:      entries.filter((e: PlusSizingEntry) => e.status === 'recommended').length,
    warn:    entries.filter((e: PlusSizingEntry) => e.status === 'acceptable').length,
    blocked: entries.filter((e: PlusSizingEntry) => e.status === 'blocked').length,
  }), [entries]);

  const handleSelect = (entry: PlusSizingEntry) => {
    setCustomSpec({ sectionWidth: entry.sectionWidth, aspectRatio: entry.aspectRatio, rimDiameter: entry.rimDiameter });
  };

  // Найти OE-запись (сам OE)
  const isOeEntry = (e: PlusSizingEntry) =>
    e.sectionWidth === oeSpec.sectionWidth &&
    e.aspectRatio  === oeSpec.aspectRatio  &&
    e.rimDiameter  === oeSpec.rimDiameter;

  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/40 bg-slate-900/50 backdrop-blur-md">
      {/* Заголовок */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-800/40 transition-colors border-b border-slate-700/40"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white uppercase tracking-wider">⊕ Таблица Plus Sizing</span>
          <div className="flex gap-1.5 text-[10px]">
            <span className="px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,212,170,0.15)', color: '#00d4aa' }}>✓ {stats.ok}</span>
            <span className="px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,193,7,0.12)', color: '#ffd060' }}>~ {stats.warn}</span>
            <span className="px-1.5 py-0.5 rounded" style={{ background: 'rgba(220,60,60,0.1)', color: '#ff6666' }}>✕ {stats.blocked}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            OE Ø {oeDiam.toFixed(0)} мм · {oeSpec.sectionWidth}/{oeSpec.aspectRatio}R{oeSpec.rimDiameter}
          </span>
        </div>
        <span className="text-slate-500 text-xs">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <>
          {/* Фильтр по диаметру диска */}
          <div className="flex items-center gap-2 px-5 py-2.5 border-b border-slate-800/50 bg-slate-900/30 overflow-x-auto">
            <span className="text-[10px] text-slate-600 shrink-0">Диск:</span>
            {(['all', ...rims] as (number | 'all')[]).map((r) => (
              <button
                key={String(r)}
                onClick={() => setActiveRim(r)}
                className={`px-2.5 py-1 text-xs rounded-md font-mono transition-all shrink-0 cursor-pointer ${
                  activeRim === r
                    ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-600/40'
                    : 'text-slate-500 hover:text-slate-300 border border-transparent hover:border-slate-700'
                }`}
              >
                {r === 'all'
                  ? 'Все'
                  : `R${r} +${(r as number) - oeSpec.rimDiameter}`}
              </button>
            ))}
          </div>

          {/* Таблица */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left table-fixed" style={{ minWidth: 680 }}>
              {/* Заголовки колонок — ширина профиля */}
              <colgroup>
                <col style={{ width: 90 }} />
                {widths.map((w) => <col key={w} />)}
              </colgroup>
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="px-4 py-2.5 text-[10px] text-slate-600 font-normal uppercase tracking-widest sticky left-0 bg-slate-900/90">
                    Диск / Вариант
                  </th>
                  {widths.map((w) => (
                    <th
                      key={w}
                      className="px-3 py-2.5 text-center text-sm font-bold"
                      style={{ color: w === oeSpec.sectionWidth ? '#4a9eff' : '#7a84a8' }}
                    >
                      {w} мм
                      {w === oeSpec.sectionWidth && (
                        <span className="ml-1 text-[9px] bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded">OE</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRims.map((rim) => {
                  const plusN = rim - oeSpec.rimDiameter;
                  const label = plusN === 0 ? 'штатный' : plusN > 0 ? `+${plusN} дюйм` : `−${Math.abs(plusN)} дюйм`;
                  return (
                    <tr key={rim} className="border-b border-slate-800/50 align-top hover:bg-slate-800/20 transition-colors">
                      {/* Тег строки */}
                      <td className="px-4 py-3 sticky left-0 bg-slate-900/95 border-r border-slate-800/50">
                        <div className="font-bold text-sm text-slate-200 font-mono">R{rim}</div>
                        <div
                          className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono border"
                          style={{
                            background: plusN === 0 ? 'rgba(74,158,255,0.1)' : plusN > 0 ? 'rgba(0,212,170,0.1)' : 'rgba(255,193,7,0.1)',
                            borderColor: plusN === 0 ? '#4a9eff44' : plusN > 0 ? '#00d4aa44' : '#ffc10744',
                            color: plusN === 0 ? '#4a9eff' : plusN > 0 ? '#00d4aa' : '#ffd060',
                          }}
                        >
                          {label}
                        </div>
                      </td>

                      {/* Ячейки по ширине */}
                      {widths.map((w) => {
                        const wEntries = entries.filter(
                          (e: PlusSizingEntry) => e.rimDiameter === rim && e.sectionWidth === w
                        );
                        return (
                          <td key={w} className="px-2 py-3 align-top" style={{ minWidth: 120 }}>
                            {wEntries.slice(0, 4).map((e: PlusSizingEntry, i: number) => (
                              <EntryBadge
                                key={`${e.aspectRatio}_${i}`}
                                entry={e}
                                isOe={isOeEntry(e)}
                                onSelect={handleSelect}
                              />
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Легенда */}
          <div className="px-5 py-3 border-t border-slate-800/50 flex flex-wrap gap-4 text-[10px] text-slate-500">
            {Object.entries(STATUS).map(([key, s]) => (
              key !== 'warning' && (
                <span key={key} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm inline-block" style={{ background: s.bg, border: `1px solid ${s.border}` }} />
                  <span style={{ color: s.text }}>
                    {key === 'recommended' ? 'Рекомендован ≤2%' : key === 'acceptable' ? 'Допустим ≤3%' : 'Заблокирован >3%'}
                  </span>
                </span>
              )
            ))}
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(74,158,255,0.22)', border: '1px solid #4a9eff' }} />
              <span style={{ color: '#4a9eff' }}>OE (исходный заводской)</span>
            </span>
            <span className="ml-auto text-slate-700">Нажмите вариант — применить к «Новой конфигурации»</span>
          </div>
        </>
      )}
    </div>
  );
}

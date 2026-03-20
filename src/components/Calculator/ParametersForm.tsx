'use client';

/**
 * ParametersForm.tsx — Redesigned
 * Два блока: OE (штатные) и Custom (новые), со слайдерами + числовыми инпутами.
 * Без блока Specify your parameters (Fender/Suspension/Scrub).
 */

import React from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';
import type { WheelSpec } from '@/utils/wheelMath';
import { GlowingCard } from '@/components/ui/glowing-card';

// ─────────────────────────────────────────────
// Диапазоны параметров
// ─────────────────────────────────────────────

const RANGES = {
  sectionWidth: { min: 155, max: 335, step: 5 },
  aspectRatio:  { min: 25,  max: 80,  step: 5 },
  rimDiameter:  { min: 13,  max: 23,  step: 1 },
  rimWidth:     { min: 5,   max: 11,  step: 0.5 },
  offset:       { min: -25, max: 125, step: 5 },
};

// ─────────────────────────────────────────────
// SliderRow
// ─────────────────────────────────────────────

interface SliderRowProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  color: 'blue' | 'cyan';
  onChange: (v: number) => void;
}

function SliderRow({ label, value, min, max, step, unit, color, onChange }: SliderRowProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const accent = color === 'blue' ? '#4a9eff' : '#00d4aa';

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] text-slate-400 font-medium tracking-wide">{label}</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v) && v >= min && v <= max) onChange(v);
            }}
            className="w-14 text-right text-[13px] font-mono font-bold bg-transparent border-0 outline-none"
            style={{ color: accent }}
          />
          <span className="text-[10px] text-slate-600">{unit}</span>
        </div>
      </div>
      {/* Метки шкалы */}
      <div className="flex justify-between text-[9px] text-slate-700 font-mono mb-1 px-0.5">
        <span>{min}</span>
        <span>{Math.round((min + max) / 2)}</span>
        <span>{max}</span>
      </div>
      {/* Слайдер */}
      <div className="relative h-1.5 rounded-full bg-slate-800">
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: accent, opacity: 0.7 }}
        />
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 shadow-lg transition-all pointer-events-none"
          style={{ left: `calc(${pct}% - 6px)`, borderColor: accent, background: '#0d1020' }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Блок параметров (один)
// ─────────────────────────────────────────────

interface SpecPanelProps {
  title: string;
  subtitle: string;
  spec: WheelSpec;
  color: 'blue' | 'cyan';
  onUpdate: (p: Partial<WheelSpec>) => void;
}

function SpecPanel({ title, subtitle, spec, color, onUpdate }: SpecPanelProps) {
  const accent = color === 'blue' ? '#4a9eff' : '#00d4aa';
  const borderColor = color === 'blue' ? 'border-blue-500/30' : 'border-cyan-500/30';
  const bgColor = color === 'blue' ? 'rgba(74,158,255,0.04)' : 'rgba(0,212,170,0.04)';

  return (
    <GlowingCard contentClassName="p-4" style={{ background: bgColor }}>
      {/* Шапка */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
        <div>
          <div className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{title}</div>
          <div className="text-[10px] text-slate-600">{subtitle}</div>
        </div>
        {/* Бейдж размера */}
        <div
          className="ml-auto text-[11px] font-mono font-bold px-2 py-0.5 rounded"
          style={{ color: accent, background: `${accent}18` }}
        >
          {spec.sectionWidth}/{spec.aspectRatio}R{spec.rimDiameter}
        </div>
      </div>

      <SliderRow label="Ширина шины" value={spec.sectionWidth} unit="мм" color={color}
        {...RANGES.sectionWidth} onChange={(v) => onUpdate({ sectionWidth: v })} />
      <SliderRow label="Профиль шины" value={spec.aspectRatio} unit="%" color={color}
        {...RANGES.aspectRatio} onChange={(v) => onUpdate({ aspectRatio: v })} />
      <SliderRow label="Диаметр диска" value={spec.rimDiameter} unit='″' color={color}
        {...RANGES.rimDiameter} onChange={(v) => onUpdate({ rimDiameter: v })} />
      <SliderRow label="Ширина диска" value={spec.rimWidth} unit='″' color={color}
        {...RANGES.rimWidth} onChange={(v) => onUpdate({ rimWidth: v })} />
      <SliderRow label="Вылет (ET)" value={spec.offset} unit="мм" color={color}
        {...RANGES.offset} onChange={(v) => onUpdate({ offset: v })} />
    </GlowingCard>
  );
}

// ─────────────────────────────────────────────
// Главный компонент
// ─────────────────────────────────────────────

export default function ParametersForm() {
  const { oeSpec, setOeSpec, customSpec, setCustomSpec, resetCustomToOe } = useCalculatorStore();

  const swap = () => {
    const tmp = { ...oeSpec };
    setOeSpec({ ...customSpec });
    setCustomSpec({ ...tmp });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SpecPanel
        title="Штатная конфигурация"
        subtitle="OE — заводские параметры"
        spec={oeSpec}
        color="blue"
        onUpdate={(p) => setOeSpec(p)}
      />
      <SpecPanel
        title="Новая конфигурация"
        subtitle="Замена шин и дисков"
        spec={customSpec}
        color="cyan"
        onUpdate={(p) => setCustomSpec(p)}
      />

      {/* Кнопки управления */}
      <div className="sm:col-span-2 flex gap-2 pt-1">
        <button
          onClick={resetCustomToOe}
          className="flex-1 py-2 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50"
        >
          Сбросить к штатным
        </button>
        <button
          onClick={swap}
          className="flex-1 py-2 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors border border-slate-700/50"
        >
          ⇄ Поменять местами
        </button>
      </div>
    </div>
  );
}

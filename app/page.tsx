'use client';

import { useCalculatorStore } from '@/store/calculatorStore';
import { calcWheelGeometry, calcFitmentClearances, calcTotalDiameter } from '@/utils/wheelMath';
import type { WheelSpec } from '@/utils/wheelMath';
import SvgRenderer from '@/components/Calculator/SvgRenderer';
import ParametersForm from '@/components/Calculator/ParametersForm';
import PlusSizingTable from '@/components/Calculator/PlusSizingTable';
import { Calculator, LayoutGrid, Briefcase, ShoppingCart, User, HelpCircle, Bell, Mail, BarChart2, Settings, CircleDashed, Aperture, Hexagon } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { UserDropdown } from '@/components/ui/user-dropdown';
import { CitySelector } from '@/components/ui/city-selector';
import OffersList from '@/components/Calculator/OffersList';
import VehicleSelector from '@/components/Calculator/VehicleSelector';
import { GlowingCard } from '@/components/ui/glowing-card';
import { FloatingNav } from '@/components/ui/floating-navbar';

// ─────────────────────────────────────────────
// Блок результатов
// ─────────────────────────────────────────────

function ResultsSection({ oeSpec, customSpec }: { oeSpec: WheelSpec; customSpec: WheelSpec }) {
  const oeGeom  = calcWheelGeometry(oeSpec);
  const newGeom = calcWheelGeometry(customSpec);
  const oeDiam  = calcTotalDiameter(oeSpec);
  const newDiam = calcTotalDiameter(customSpec);
  const devPct  = ((newDiam - oeDiam) / oeDiam) * 100;
  const devMm   = newDiam - oeDiam;

  const rows = [
    { label: 'Диаметр (штат)',  val: `${oeDiam.toFixed(0)} мм`,                    color: '#4a9eff' },
    { label: 'Диаметр (новый)', val: `${newDiam.toFixed(0)} мм`,                   color: '#00d4aa' },
    { label: 'Высота боковины (OE)',  val: `${(oeSpec.sectionWidth * oeSpec.aspectRatio / 100).toFixed(0)} мм`,  color: '#7a84a8' },
    { label: 'Высота боковины (новый)', val: `${(customSpec.sectionWidth * customSpec.aspectRatio / 100).toFixed(0)} мм`, color: '#7a84a8' },
    { label: 'Задняя база (OE)',  val: `${oeGeom.backspace.toFixed(0)} мм`,           color: '#7a84a8' },
    { label: 'Задняя база (новый)', val: `${newGeom.backspace.toFixed(0)} мм`,          color: '#7a84a8' },
  ];

  // Спидометр-поправка (изменение внешнего диаметра = изменение показаний)
  const speedError = devPct;
  const speedAt60  = 60 / (1 + devPct / 100);

  // Статус
  const statusFlags = [
    {
      ok: Math.abs(devPct) <= 2,
      warn: Math.abs(devPct) <= 3,
      text: Math.abs(devPct) <= 2
        ? '✓ Совместимо: в пределах нормы'
        : Math.abs(devPct) <= 3
        ? '⚠ Может влиять на точность спидометра'
        : '⛔ Критическое отклонение — не рекомендуется',
    },
    {
      ok: Math.abs(devMm) < 30,
      warn: Math.abs(devMm) < 50,
      text: Math.abs(devMm) < 30 ? '✓ Безопасная высота профиля' : '⚠ Проверьте позиционирование в арке',
    },
  ];

  return (
    <GlowingCard contentClassName="overflow-hidden">
      {/* Заголовок */}
      <div className="px-5 py-3 border-b border-slate-700/40 bg-slate-800/30">
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Результаты сравнения</h2>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {/* Три главных метрики */}
        {[
          {
            label: 'Разница диаметра',
            value: `${devPct >= 0 ? '+' : ''}${devPct.toFixed(1)}%`,
            sub: `${devMm >= 0 ? '+' : ''}${devMm.toFixed(0)} мм`,
            color: Math.abs(devPct) <= 2 ? '#00d4aa' : Math.abs(devPct) <= 3 ? '#ffd060' : '#ff6666',
          },
          {
            label: 'Поправка спидометра',
            value: `${speedError >= 0 ? '+' : ''}${speedError.toFixed(1)}%`,
            sub: `60→ ${speedAt60.toFixed(1)} км/ч`,
            color: Math.abs(speedError) < 2 ? '#4a9eff' : '#ffd060',
          },
          {
            label: 'Задняя база Δ',
            value: `${newGeom.backspace >= oeGeom.backspace ? '+' : ''}${(newGeom.backspace - oeGeom.backspace).toFixed(0)} мм`,
            sub: `Новый: ${newGeom.backspace.toFixed(0)} мм`,
            color: '#a070ff',
          },
        ].map((m) => (
          <div key={m.label} className="px-4 py-4 border-r border-b border-slate-800/50 last:border-r-0">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{m.label}</div>
            <div className="text-2xl font-black font-mono" style={{ color: m.color }}>{m.value}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Таблица параметров */}
      <div className="px-5 py-3 border-t border-slate-800/50">
        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between py-0.5 border-b border-slate-800/30">
              <span className="text-[10px] text-slate-500">{r.label}</span>
              <span className="text-[11px] font-mono font-semibold" style={{ color: r.color }}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Статус-флаги */}
      <div className="px-5 pb-4 flex flex-col gap-1.5">
        {statusFlags.map((f, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
            style={{
              background: f.ok ? 'rgba(0,212,170,0.08)' : f.warn ? 'rgba(255,208,60,0.08)' : 'rgba(255,80,80,0.08)',
              color: f.ok ? '#00d4aa' : f.warn ? '#ffd060' : '#ff6666',
              border: `1px solid ${f.ok ? '#00d4aa30' : f.warn ? '#ffd06030' : '#ff606030'}`,
            }}
          >
            {f.text}
          </div>
        ))}
      </div>
    </GlowingCard>
  );
}

// ─────────────────────────────────────────────
// Лого-компонент
// ─────────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" stroke="#00d4aa" strokeWidth="1.5" />
        <circle cx="17" cy="17" r="10" stroke="#4a9eff" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
        <circle cx="17" cy="17" r="3.5" fill="#00d4aa" />
        {[0, 72, 144, 216, 288].map((a) => {
          const r = (a * Math.PI) / 180;
          const x1 = (17 + 5 * Math.cos(r)).toFixed(4);
          const y1 = (17 + 5 * Math.sin(r)).toFixed(4);
          const x2 = (17 + 9.5 * Math.cos(r)).toFixed(4);
          const y2 = (17 + 9.5 * Math.sin(r)).toFixed(4);
          return (
            <line key={a}
              x1={x1} y1={y1}
              x2={x2} y2={y2}
              stroke="#4a9eff" strokeWidth="1.8" strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div>
        <div className="text-[18px] font-black text-white leading-none tracking-tight">WheelsHub</div>
        <div className="text-[9px] text-slate-500 font-mono tracking-[0.2em] uppercase">Калькулятор посадки</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Главная страница
// ─────────────────────────────────────────────

export default function FitmentCalculator() {
  const { oeSpec, customSpec } = useCalculatorStore();

  const navItems = [
    { name: "Калькулятор", link: "#calculator", icon: <Calculator className="w-4 h-4" /> },
    { name: "Шины", link: "#tires", icon: <CircleDashed className="w-4 h-4" /> },
    { name: "Диски", link: "#wheels", icon: <Aperture className="w-4 h-4" /> },
    { name: "Болты", link: "#bolts", icon: <Hexagon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-[#0a0e1f] text-slate-900 dark:text-slate-200">
      {/* ── Навигация ── */}
      <FloatingNav 
        logo={<div className="scale-[0.8] origin-left"><Logo /></div>}
        navItems={navItems}
        actionButton={
          <div className="flex items-center gap-4">
            <div className="hidden md:block"><CitySelector /></div>
            <a href="#cart" className="relative text-slate-600 dark:text-slate-400 hover:text-cyan-600 transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-[1.2rem] h-[1.2rem]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full"></span>
            </a>
            <ThemeToggle />
            <UserDropdown />
          </div>
        }
      />

      {/* ── Основной контент ── */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-6 pt-24 space-y-6">

        {/* ── Hero-строка ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Калькулятор посадки колеса</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              2D-разрез колеса в арке · Таблица Plus Sizing · Расчёт параметров
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="px-2 py-1 rounded border border-blue-600/30 bg-blue-600/10 text-blue-400">
              Штат: {oeSpec.sectionWidth}/{oeSpec.aspectRatio}R{oeSpec.rimDiameter} ET{oeSpec.offset}
            </span>
            <span className="text-slate-700">→</span>
            <span className="px-2 py-1 rounded border border-cyan-600/30 bg-cyan-600/10 text-cyan-400">
              Новый: {customSpec.sectionWidth}/{customSpec.aspectRatio}R{customSpec.rimDiameter} ET{customSpec.offset}
            </span>
          </div>
        </div>

        {/* ── Выбор автомобиля ── */}
        <div>
          <VehicleSelector />
        </div>

        {/* ── Параметры (сверху, два блока) ── */}
        <div className="mt-6">
          <ParametersForm />
        </div>

        {/* ── SVG схема + Результаты ── */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 items-start">
          {/* SVG — шире */}
          <GlowingCard className="xl:col-span-3 h-auto min-h-0" contentClassName="overflow-hidden">
            {/* Заголовок схемы */}
            <div className="px-5 py-3 border-b border-slate-700/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Технический разрез — Вид в сечении
                </h2>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-px border-b border-dashed" style={{ borderColor: '#4a9eff' }} />
                  <span style={{ color: '#4a9eff' }}>Штатный</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-px" style={{ background: '#00d4aa' }} />
                  <span style={{ color: '#00d4aa' }}>Новый</span>
                </span>
                <span className="text-slate-700">SVG · 2D</span>
              </div>
            </div>

            <div className="p-2 flex flex-col items-center">
              <SvgRenderer currentSpecs={oeSpec} newSpecs={customSpec} />
            </div>
          </GlowingCard>

          {/* Результаты */}
          <div className="xl:col-span-2 flex flex-col">
            <ResultsSection oeSpec={oeSpec} customSpec={customSpec} />
            <OffersList customSpec={customSpec} />
          </div>
        </div>

        {/* ── Plus Sizing ── */}
        <PlusSizingTable />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/40 py-5 text-center text-[10px] text-slate-700 font-mono mt-6">
        WheelsHub · Агрегатор шин и дисков · 2025
      </footer>
    </div>
  );
}

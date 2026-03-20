/**
 * wheelMath.ts — Математическое ядро Fitment Calculator
 * Все геометрические вычисления вынесены в изолированный файл.
 * AGENTS.md: Never use WebGL/Three.js — только SVG + эта математика.
 */

// ─────────────────────────────────────────────
// Типы
// ─────────────────────────────────────────────

export interface WheelSpec {
  /** Ширина профиля шины, мм (Section Width) */
  sectionWidth: number;
  /** Высота профиля, % (Aspect Ratio) */
  aspectRatio: number;
  /** Диаметр диска, дюймы (Rim Diameter) */
  rimDiameter: number;
  /** Вылет диска, мм (ET / Offset) */
  offset: number;
  /** Ширина диска, дюймы (Rim Width) */
  rimWidth: number;
}

export interface WheelGeometry {
  /** Внешний диаметр колеса, мм */
  totalDiameter: number;
  /** Внешний радиус колеса, мм */
  totalRadius: number;
  /** Высота боковины, мм */
  sidewallHeight: number;
  /** Backspace (обратный вылет), мм */
  backspace: number;
  /** Scrub Radius (плечо обката), мм — условно, зависит от kingpin inclination */
  scrubRadius: number;
}

export interface FitmentClearances {
  /** Зазор до крыла, мм */
  fenderClearance: number;
  /** Зазор до стойки подвески, мм */
  suspensionClearance: number;
  /** Зазор внутри колёсной арки, мм */
  wheelWellClearance: number;
  /** Изменение клиренса относительно OE, мм */
  deltaGroundClearance: number;
}

export interface PlusSizingEntry {
  /** Ширина профиля, мм */
  sectionWidth: number;
  /** Высота профиля, % */
  aspectRatio: number;
  /** Диаметр диска, дюймы */
  rimDiameter: number;
  /** Внешний диаметр, мм */
  totalDiameter: number;
  /** Отклонение от OE, мм */
  deviation: number;
  /** Отклонение от OE, % */
  deviationPercent: number;
  /** Статус безопасности */
  status: 'recommended' | 'acceptable' | 'warning' | 'blocked';
}

// ─────────────────────────────────────────────
// Константы
// ─────────────────────────────────────────────

const INCHES_TO_MM = 25.4;

/** Пороги отклонения внешнего диаметра от OE */
const DEVIATION_THRESHOLD = {
  RECOMMENDED: 2.0,  // ≤ 2% — Recommended (зелёный)
  ACCEPTABLE: 3.0,   // ≤ 3% — Acceptable (жёлтый)
  BLOCKED: 3.0,      // > 3% — Critical / Blocked (красный)
} as const;

// ─────────────────────────────────────────────
// Формулы
// ─────────────────────────────────────────────

/**
 * Внешний диаметр колеса (по AGENTS.md):
 * D_total = D_rim × 25.4 + 2 × W × (H / 100)
 */
export function calcTotalDiameter(spec: WheelSpec): number {
  const rimMm = spec.rimDiameter * INCHES_TO_MM;
  const sidewall = spec.sectionWidth * (spec.aspectRatio / 100);
  return rimMm + 2 * sidewall;
}

/**
 * Высота боковины (одна сторона), мм
 */
export function calcSidewallHeight(spec: WheelSpec): number {
  return spec.sectionWidth * (spec.aspectRatio / 100);
}

/**
 * Backspace (обратный вылет), мм
 * Backspace = (rimWidth_mm / 2) + offset
 */
export function calcBackspace(spec: WheelSpec): number {
  const rimWidthMm = spec.rimWidth * INCHES_TO_MM;
  return rimWidthMm / 2 + spec.offset;
}

/**
 * Scrub Radius (плечо обката), мм
 * Scrub = kingpinOffset − (rimWidthMm / 2 + offset)
 * Упрощённая версия: используется центральная линия диска.
 * Отрицательный → диск «выходит» за ступицу (negative scrub).
 * Для точного расчёта нужен kingpin inclination угол — принимаем konstantу 30мм.
 */
export function calcScrubRadius(spec: WheelSpec, kingpinOffset = 30): number {
  const rimWidthMm = spec.rimWidth * INCHES_TO_MM;
  const hubOffset = rimWidthMm / 2 - spec.offset;
  return kingpinOffset - hubOffset;
}

/**
 * Полная геометрия колеса
 */
export function calcWheelGeometry(spec: WheelSpec): WheelGeometry {
  const totalDiameter = calcTotalDiameter(spec);
  return {
    totalDiameter,
    totalRadius: totalDiameter / 2,
    sidewallHeight: calcSidewallHeight(spec),
    backspace: calcBackspace(spec),
    scrubRadius: calcScrubRadius(spec),
  };
}

/**
 * Изменение клиренса (ΔClearance):
 * ΔClearance = (D_total_new − D_total_old) / 2
 * Положительное → колесо стало выше (рост клиренса).
 * Отрицательное → колесо стало ниже.
 */
export function calcDeltaClearance(oeSpec: WheelSpec, newSpec: WheelSpec): number {
  const dNew = calcTotalDiameter(newSpec);
  const dOld = calcTotalDiameter(oeSpec);
  return (dNew - dOld) / 2;
}

/**
 * Зазоры в арке (упрощённые, относительно OE)
 * В реальном импилементе эти значения берутся из базы данных кузовных параметров.
 * Здесь — мок-значения с поправкой на ΔClearance.
 */
export function calcFitmentClearances(
  oeSpec: WheelSpec,
  newSpec: WheelSpec,
  /** Базовые зазоры OE-автомобиля из TecDoc/базы кузовных параметров */
  baselineClearances = { fender: 25, suspension: 20, wheelWell: 15 }
): FitmentClearances {
  const delta = calcDeltaClearance(oeSpec, newSpec);
  // Увеличение внешнего диаметра уменьшает все зазоры
  const offsetCorrection = (newSpec.offset - oeSpec.offset);
  return {
    fenderClearance: baselineClearances.fender - delta,
    suspensionClearance: baselineClearances.suspension - delta + offsetCorrection,
    wheelWellClearance: baselineClearances.wheelWell - delta,
    deltaGroundClearance: delta,
  };
}

// ─────────────────────────────────────────────
// Plus Sizing Table
// ─────────────────────────────────────────────

/**
 * Таблица стандартных соотношений ширина/профиль для Plus Sizing
 * Ключ — ширина профиля (мм), значение — массив типичных aspect ratio
 */
const PLUS_SIZING_PROFILES: Record<number, number[]> = {
  195: [65, 60, 55, 50, 45],
  205: [65, 60, 55, 50, 45, 40],
  215: [65, 60, 55, 50, 45, 40],
  225: [65, 60, 55, 50, 45, 40, 35],
  235: [65, 60, 55, 50, 45, 40, 35],
  245: [65, 60, 55, 50, 45, 40, 35, 30],
  255: [65, 60, 55, 50, 45, 40, 35, 30],
  265: [65, 60, 55, 50, 45, 40, 35],
  275: [65, 60, 55, 50, 45, 40, 35],
  285: [65, 60, 55, 50, 45, 40, 35],
  295: [65, 60, 55, 50, 45, 40, 35],
  305: [65, 60, 55, 50, 45, 40, 35],
};

/**
 * Статус безопасности по отклонению диаметра
 */
function getDeviationStatus(deviationPercent: number): PlusSizingEntry['status'] {
  const abs = Math.abs(deviationPercent);
  if (abs <= DEVIATION_THRESHOLD.RECOMMENDED) return 'recommended';
  if (abs <= DEVIATION_THRESHOLD.ACCEPTABLE) return 'acceptable';
  return 'blocked';
}

/**
 * Генерация таблицы Plus Sizing (+1, +2 дюйма от OE).
 * Возвращает отсортированный массив вариантов резины.
 */
export function generatePlusSizingTable(oeSpec: WheelSpec): PlusSizingEntry[] {
  const oeDiameter = calcTotalDiameter(oeSpec);
  const results: PlusSizingEntry[] = [];

  // Подбираем ширины вокруг OE (±20мм)
  const widths = Object.keys(PLUS_SIZING_PROFILES)
    .map(Number)
    .filter(w => Math.abs(w - oeSpec.sectionWidth) <= 20);

  for (let plusSize = 1; plusSize <= 2; plusSize++) {
    const newRim = oeSpec.rimDiameter + plusSize;

    for (const width of widths) {
      const ratios = PLUS_SIZING_PROFILES[width] ?? [];
      for (const ratio of ratios) {
        const candidate: WheelSpec = {
          sectionWidth: width,
          aspectRatio: ratio,
          rimDiameter: newRim,
          offset: oeSpec.offset,
          rimWidth: oeSpec.rimWidth,
        };
        const totalDiameter = calcTotalDiameter(candidate);
        const deviation = totalDiameter - oeDiameter;
        const deviationPercent = (deviation / oeDiameter) * 100;

        results.push({
          sectionWidth: width,
          aspectRatio: ratio,
          rimDiameter: newRim,
          totalDiameter,
          deviation: Math.round(deviation * 10) / 10,
          deviationPercent: Math.round(deviationPercent * 100) / 100,
          status: getDeviationStatus(deviationPercent),
        });
      }
    }
  }

  // Сортировка: сначала recommended, потом по абсолютному отклонению
  return results.sort((a, b) => {
    const priority = { recommended: 0, acceptable: 1, warning: 2, blocked: 3 };
    if (priority[a.status] !== priority[b.status]) {
      return priority[a.status] - priority[b.status];
    }
    return Math.abs(a.deviationPercent) - Math.abs(b.deviationPercent);
  });
}

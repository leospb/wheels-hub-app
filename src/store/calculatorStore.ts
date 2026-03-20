/**
 * calculatorStore.ts — Zustand store для Fitment Calculator
 * Хранит OE-параметры (заводские) и кастомные параметры (выбранные пользователем).
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { WheelSpec } from '@/utils/wheelMath';

// ─────────────────────────────────────────────
// Типы
// ─────────────────────────────────────────────

interface CalculatorState {
  /** Заводские (OE) параметры колеса */
  oeSpec: WheelSpec;
  /** Кастомные параметры, выбранные пользователем */
  customSpec: WheelSpec;
  /** VIN номер для запроса TECDOC */
  vin: string;
  /** Состояние загрузки (при запросе к TecDoc) */
  isLoading: boolean;
  /** Сообщение об ошибке */
  error: string | null;
  /** Отображать ли таблицу Plus Sizing */
  showPlusSizing: boolean;
}

interface CalculatorActions {
  setOeSpec: (spec: Partial<WheelSpec>) => void;
  setCustomSpec: (spec: Partial<WheelSpec>) => void;
  setVin: (vin: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setShowPlusSizing: (show: boolean) => void;
  /** Сбросить кастомные параметры к OE */
  resetCustomToOe: () => void;
  /** Загрузить OE параметры по VIN (заглушка — реальный запрос в tecdoc.ts) */
  loadOeByVin: (vin: string) => Promise<void>;
}

// ─────────────────────────────────────────────
// Дефолтные значения (типичный автомобиль C-класса)
// ─────────────────────────────────────────────

const DEFAULT_OE_SPEC: WheelSpec = {
  sectionWidth: 205,
  aspectRatio: 55,
  rimDiameter: 16,
  offset: 45,
  rimWidth: 6.5,
};

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const useCalculatorStore = create<CalculatorState & CalculatorActions>()(
  devtools(
    (set, get) => ({
      // Начальное состояние
      oeSpec: DEFAULT_OE_SPEC,
      customSpec: { ...DEFAULT_OE_SPEC },
      vin: '',
      isLoading: false,
      error: null,
      showPlusSizing: true,

      // Действия
      setOeSpec: (spec) =>
        set((state) => ({ oeSpec: { ...state.oeSpec, ...spec } })),

      setCustomSpec: (spec) =>
        set((state) => ({ customSpec: { ...state.customSpec, ...spec } })),

      setVin: (vin) => set({ vin }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      setShowPlusSizing: (showPlusSizing) => set({ showPlusSizing }),

      resetCustomToOe: () =>
        set((state) => ({ customSpec: { ...state.oeSpec } })),

      loadOeByVin: async (vin: string) => {
        set({ isLoading: true, error: null, vin });
        try {
          const response = await fetch(`/api/tecdoc/oe-specs?vin=${encodeURIComponent(vin)}`);
          if (!response.ok) throw new Error('Не удалось получить данные по VIN');
          const data: WheelSpec = await response.json();
          set({ oeSpec: data, customSpec: { ...data }, isLoading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : 'Неизвестная ошибка',
            isLoading: false,
          });
        }
      },
    }),
    { name: 'WheelsHub:Calculator' }
  )
);

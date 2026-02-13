import { DashboardFilters } from '../types';

const FILTERS_KEY = 'esports-dashboard-filters';
const THEME_KEY = 'esports-dashboard-theme';

// Filtros predeterminados
const defaultFilters: DashboardFilters = {
  game: 'all',
  searchQuery: '',
  sortBy: 'winRate',
  sortOrder: 'desc',
};

/**
 * Guarda los filtros en localStorage
 */
export const saveFilters = (filters: DashboardFilters): void => {
  try {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  } catch (error) {
    console.error('Error al guardar filtros:', error);
  }
};

/**
 * Obtiene los filtros guardados de localStorage
 */
export const getFilters = (): DashboardFilters => {
  try {
    const saved = localStorage.getItem(FILTERS_KEY);
    if (saved) {
      return { ...defaultFilters, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Error al obtener filtros:', error);
  }
  return defaultFilters;
};

/**
 * Guarda el tema (dark/light) en localStorage
 */
export const saveTheme = (isDark: boolean): void => {
  try {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  } catch (error) {
    console.error('Error al guardar tema:', error);
  }
};

/**
 * Obtiene el tema guardado de localStorage
 */
export const getTheme = (): boolean => {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved === 'dark';
    }
  } catch (error) {
    console.error('Error al obtener tema:', error);
  }
  // Por defecto, verificar preferencia del sistema
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
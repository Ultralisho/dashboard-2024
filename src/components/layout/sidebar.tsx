import { Filter, Search } from 'lucide-react';
import { DashboardFilters, Game } from '../../types';

interface SidebarProps {
  filters: DashboardFilters;
  onFiltersChange: (filters: DashboardFilters) => void;
}

const GAMES: (Game | 'all')[] = [
  'all',
  'League of Legends',
  'Counter-Strike 2',
  'Dota 2',
  'Valorant',
  'Overwatch 2',
];

/**
 * Sidebar con filtros y búsqueda
 */
export const Sidebar = ({ filters, onFiltersChange }: SidebarProps) => {
  const handleGameChange = (game: Game | 'all') => {
    onFiltersChange({ ...filters, game });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchQuery: e.target.value });
  };

  const handleSortChange = (sortBy: DashboardFilters['sortBy']) => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <aside className="w-72 glass glass-border card-shadow animate-slide-down">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 pb-4 border-b border-gray-200 dark:border-gray-700">
          <Filter className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filtros
          </h2>
        </div>

        {/* Búsqueda */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Buscar equipo
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Nombre del equipo..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg glass-border 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       placeholder-gray-400 focus:outline-none focus:ring-2 
                       focus:ring-primary-500 transition-all"
            />
          </div>
        </div>

        {/* Filtro por juego */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Juego
          </label>
          <div className="space-y-2">
            {GAMES.map((game) => (
              <button
                key={game}
                onClick={() => handleGameChange(game)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200
                  ${
                    filters.game === game
                      ? 'bg-primary-500 text-white shadow-lg scale-[1.02]'
                      : 'glass-border hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
              >
                <span className="text-sm font-medium">
                  {game === 'all' ? 'Todos los juegos' : game}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Ordenar por */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ordenar por
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'name', label: 'Nombre' },
              { value: 'wins', label: 'Victorias' },
              { value: 'losses', label: 'Derrotas' },
              { value: 'winRate', label: 'Win Rate' },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleSortChange(value as DashboardFilters['sortBy'])}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${
                    filters.sortBy === value
                      ? 'bg-accent-500 text-white shadow-lg'
                      : 'glass-border hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Orden ascendente/descendente */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Orden
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onFiltersChange({ ...filters, sortOrder: 'asc' })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  filters.sortOrder === 'asc'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'glass-border hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
            >
              Ascendente
            </button>
            <button
              onClick={() => onFiltersChange({ ...filters, sortOrder: 'desc' })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  filters.sortOrder === 'desc'
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'glass-border hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
            >
              Descendente
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
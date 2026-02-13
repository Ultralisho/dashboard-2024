import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/navbar';
import { Sidebar } from './components/layout/sidebar';
import { Dashboard } from './pages/Dashboard';
import { Team, DashboardFilters } from './types';
import { getFilters, saveFilters, getTheme, saveTheme } from './utils/storage';
import teamsData from './data/teams.json';

/**
 * Componente principal de la aplicación
 * Maneja el estado global del dashboard, tema y filtros
 */
function App() {
  // Estado del tema (dark mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => getTheme());

  // Estado de los filtros
  const [filters, setFilters] = useState<DashboardFilters>(() => getFilters());

  // Equipos cargados desde JSON
  const [teams] = useState<Team[]>(teamsData as Team[]);

  // Aplicar el tema al montar el componente
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Manejar cambio de tema
  const handleToggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    saveTheme(newTheme);
  };

  // Manejar cambio de filtros
  const handleFiltersChange = (newFilters: DashboardFilters) => {
    setFilters(newFilters);
    saveFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 
                    dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-colors duration-300">
      {/* Navbar */}
      <Navbar isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />

      {/* Layout principal */}
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex gap-6 p-6">
          {/* Sidebar */}
          <Sidebar filters={filters} onFiltersChange={handleFiltersChange} />

          {/* Contenido principal */}
          <main className="flex-1 min-w-0">
            <Dashboard teams={teams} filters={filters} />
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>E-sports Analytics Dashboard © 2024</p>
      </footer>
    </div>
  );
}

export default App;
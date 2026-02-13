import { Moon, Sun, Trophy } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

/**
 * Barra de navegación superior con logo y toggle de tema
 */
export const Navbar = ({ isDarkMode, onToggleTheme }: NavbarProps) => {
  return (
    <nav className="glass glass-border sticky top-0 z-50 card-shadow">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                E-sports Analytics
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Professional Dashboard
              </p>
            </div>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-4">
            {/* Toggle tema */}
            <button
              onClick={onToggleTheme}
              className="p-2.5 rounded-xl glass-border hover:bg-gray-100 dark:hover:bg-gray-700 
                       transition-all duration-200 group"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Avatar simulado */}
            <div className="w-9 h-9 rounded-full gradient-accent flex items-center justify-center 
                          text-white text-sm font-semibold shadow-lg cursor-pointer 
                          hover:scale-110 transition-transform duration-200">
              AD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
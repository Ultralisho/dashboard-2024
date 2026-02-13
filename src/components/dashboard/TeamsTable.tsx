import { ArrowUpDown } from 'lucide-react';
import { Team } from '../../types';

interface TeamsTableProps {
  teams: Team[];
}

/**
 * Tabla de equipos con todas sus estadísticas
 */
export const TeamsTable = ({ teams }: TeamsTableProps) => {
  // Badge de juego con color
  const getGameBadge = (game: string) => {
    const badges: Record<string, string> = {
      'League of Legends': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'Counter-Strike 2': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      'Dota 2': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      'Valorant': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      'Overwatch 2': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    };

    return badges[game] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  };

  // Obtener color según win rate
  const getWinRateColor = (winRate: number) => {
    if (winRate >= 70) return 'text-green-600 dark:text-green-400 font-bold';
    if (winRate >= 60) return 'text-blue-600 dark:text-blue-400 font-semibold';
    if (winRate >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="glass glass-border rounded-xl card-shadow overflow-hidden animate-slide-up" 
         style={{ animationDelay: '500ms' }}>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Equipos E-sports
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {teams.length} equipos encontrados
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  Equipo
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Juego
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Región
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-2">
                  Victorias
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-2">
                  Derrotas
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Partidos
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center justify-center gap-2">
                  Win Rate
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {teams.map((team, index) => (
              <tr
                key={team.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150"
                style={{ animationDelay: `${600 + index * 50}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 
                                  flex items-center justify-center text-white font-bold text-sm shadow-lg">
                      {team.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">
                        {team.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Fundado en {team.founded}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getGameBadge(team.game)}`}>
                    {team.game}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  {team.region}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-green-600 dark:text-green-400">
                  {team.wins}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-semibold text-red-600 dark:text-red-400">
                  {team.losses}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 dark:text-gray-300">
                  {team.totalMatches}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`text-sm ${getWinRateColor(team.winRate)}`}>
                    {team.winRate.toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {teams.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No se encontraron equipos con los filtros seleccionados.
          </p>
        </div>
      )}
    </div>
  );
};
import { useMemo } from 'react';
import { Users, Trophy, Target, TrendingUp } from 'lucide-react';
import { Team, DashboardFilters, KPIData } from '../types';
import { KPICard } from '../components/dashboard/KPICard';
import { Charts } from '../components/dashboard/Charts';
import { TeamsTable } from '../components/dashboard/TeamsTable';

interface DashboardProps {
  teams: Team[];
  filters: DashboardFilters;
}

/**
 * Página principal del Dashboard
 * Muestra KPIs, gráficas y tabla de equipos
 */
export const Dashboard = ({ teams, filters }: DashboardProps) => {
  // Filtrar equipos según los filtros aplicados
  const filteredTeams = useMemo(() => {
    let result = [...teams];

    // Filtrar por juego
    if (filters.game !== 'all') {
      result = result.filter((team) => team.game === filters.game);
    }

    // Filtrar por búsqueda
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter((team) =>
        team.name.toLowerCase().includes(query)
      );
    }

    // Ordenar
    result.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'wins':
          aValue = a.wins;
          bValue = b.wins;
          break;
        case 'losses':
          aValue = a.losses;
          bValue = b.losses;
          break;
        case 'winRate':
          aValue = a.winRate;
          bValue = b.winRate;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return filters.sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return result;
  }, [teams, filters]);

  // Calcular KPIs
  const kpis: KPIData = useMemo(() => {
    const totalTeams = filteredTeams.length;
    const totalPlayers = totalTeams * 5; // Asumiendo 5 jugadores por equipo
    const totalMatches = filteredTeams.reduce(
      (sum, team) => sum + team.totalMatches,
      0
    );
    const totalWins = filteredTeams.reduce((sum, team) => sum + team.wins, 0);
    const globalWinRate = totalMatches > 0 ? (totalWins / totalMatches) * 100 : 0;

    return {
      totalTeams,
      totalPlayers,
      totalMatches,
      globalWinRate,
    };
  }, [filteredTeams]);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Equipos"
          value={kpis.totalTeams}
          icon={Users}
          gradient="primary"
          delay={0}
        />
        <KPICard
          title="Total Jugadores"
          value={kpis.totalPlayers}
          icon={Target}
          gradient="accent"
          delay={100}
        />
        <KPICard
          title="Partidos Jugados"
          value={kpis.totalMatches.toLocaleString()}
          icon={Trophy}
          gradient="success"
          delay={200}
        />
        <KPICard
          title="Win Rate Global"
          value={`${kpis.globalWinRate.toFixed(2)}%`}
          icon={TrendingUp}
          gradient="warning"
          delay={300}
        />
      </div>

      {/* Gráficas */}
      <Charts teams={filteredTeams} />

      {/* Tabla de equipos */}
      <TeamsTable teams={filteredTeams} />
    </div>
  );
};
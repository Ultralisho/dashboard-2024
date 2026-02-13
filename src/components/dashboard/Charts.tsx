import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Team } from '../../types';

interface ChartsProps {
  teams: Team[];
}

// Colores para las gráficas
const COLORS = ['#0ea5e9', '#d946ef', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

/**
 * Gráfica de línea: Evolución de victorias por año
 */
const WinsEvolutionChart = ({ teams }: ChartsProps) => {
  // Preparar datos para el LineChart
  const years = [2023, 2024, 2025];
  const topTeams = teams.slice(0, 5); // Top 5 equipos

  const data = years.map((year) => {
    const yearData: any = { year };
    topTeams.forEach((team) => {
      const yearStats = team.yearlyStats.find((s) => s.year === year);
      yearData[team.name] = yearStats?.wins || 0;
    });
    return yearData;
  });

  return (
    <div className="glass glass-border rounded-xl p-6 card-shadow animate-slide-up" style={{ animationDelay: '200ms' }}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Evolución de Victorias (Top 5)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="year" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.95)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend />
          {topTeams.map((team, index) => (
            <Line
              key={team.id}
              type="monotone"
              dataKey={team.name}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Gráfica de barras: Ranking de equipos por victorias
 */
const TeamRankingChart = ({ teams }: ChartsProps) => {
  const data = teams
    .slice(0, 8)
    .map((team) => ({
      name: team.name.length > 15 ? team.name.substring(0, 15) + '...' : team.name,
      wins: team.wins,
    }));

  return (
    <div className="glass glass-border rounded-xl p-6 card-shadow animate-slide-up" style={{ animationDelay: '300ms' }}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Ranking de Equipos (Victorias)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.95)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Bar dataKey="wins" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Gráfica de pastel: Win/Loss ratio global
 */
const WinLossRatioChart = ({ teams }: ChartsProps) => {
  const totalWins = teams.reduce((sum, team) => sum + team.wins, 0);
  const totalLosses = teams.reduce((sum, team) => sum + team.losses, 0);

  const data = [
    { name: 'Victorias', value: totalWins },
    { name: 'Derrotas', value: totalLosses },
  ];

  return (
    <div className="glass glass-border rounded-xl p-6 card-shadow animate-slide-up" style={{ animationDelay: '400ms' }}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Win/Loss Ratio Global
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            <Cell fill="#10b981" />
            <Cell fill="#ef4444" />
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(31, 41, 55, 0.95)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

/**
 * Componente contenedor de todas las gráficas
 */
export const Charts = ({ teams }: ChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <WinsEvolutionChart teams={teams} />
      <TeamRankingChart teams={teams} />
      <div className="lg:col-span-2">
        <WinLossRatioChart teams={teams} />
      </div>
    </div>
  );
};
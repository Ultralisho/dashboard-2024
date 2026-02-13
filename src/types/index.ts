// Tipos para equipos de E-sports
export interface Team {
  id: string;
  name: string;
  game: Game;
  region: string;
  wins: number;
  losses: number;
  totalMatches: number;
  winRate: number;
  founded: number;
  logo?: string;
  yearlyStats: YearlyStats[];
}

export interface YearlyStats {
  year: number;
  wins: number;
  losses: number;
  tournaments: number;
}

export type Game = 'League of Legends' | 'Counter-Strike 2' | 'Dota 2' | 'Valorant' | 'Overwatch 2';

export interface DashboardFilters {
  game: Game | 'all';
  searchQuery: string;
  sortBy: 'name' | 'wins' | 'losses' | 'winRate';
  sortOrder: 'asc' | 'desc';
}

export interface KPIData {
  totalTeams: number;
  totalPlayers: number;
  totalMatches: number;
  globalWinRate: number;
}

// Tipos para las gráficas
export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface LineChartData {
  year: number;
  [teamName: string]: number;
}
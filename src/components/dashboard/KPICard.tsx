import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient: 'primary' | 'accent' | 'success' | 'warning';
  delay?: number;
}

/**
 * Tarjeta KPI con icono y tendencia opcional
 */
export const KPICard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  gradient,
  delay = 0 
}: KPICardProps) => {
  const gradientClass = `gradient-${gradient}`;

  return (
    <div 
      className="glass glass-border rounded-xl p-6 card-shadow hover:card-shadow-hover 
                 transition-all duration-300 hover:-translate-y-1 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm font-semibold ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                vs. último año
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${gradientClass} flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
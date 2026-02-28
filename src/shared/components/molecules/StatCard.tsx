/**
 * Component: StatCard
 * Molecule - Carte de statistique avec icône, valeur, tendance et couleur.
 * Utilisée dans le dashboard admin.
 */

import React, { ReactNode } from 'react';
import { Card } from '../atoms/Card';

export type StatTrend = 'up' | 'down' | 'neutral';
export type StatColor = 'default' | 'blue' | 'green' | 'red' | 'purple' | 'yellow';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: StatTrend;
  /** Texte affiché à côté de la flèche de tendance (ex: "+12%") */
  trendValue?: string;
  description?: string;
  color?: StatColor;
  className?: string;
}

const colorClasses: Record<StatColor, { icon: string; value: string }> = {
  default: { icon: 'bg-gray-100 text-gray-600',     value: 'text-gray-900' },
  blue:    { icon: 'bg-blue-100 text-blue-600',     value: 'text-blue-700' },
  green:   { icon: 'bg-green-100 text-green-600',   value: 'text-green-700' },
  red:     { icon: 'bg-red-100 text-red-600',       value: 'text-red-700' },
  purple:  { icon: 'bg-purple-100 text-purple-600', value: 'text-purple-700' },
  yellow:  { icon: 'bg-yellow-100 text-yellow-600', value: 'text-yellow-700' },
};

const trendConfig: Record<StatTrend, { text: string; arrow: string }> = {
  up:      { text: 'text-green-600', arrow: '↑' },
  down:    { text: 'text-red-500',   arrow: '↓' },
  neutral: { text: 'text-gray-500',  arrow: '→' },
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  trend,
  trendValue,
  description,
  color = 'default',
  className,
}) => {
  const colors = colorClasses[color];

  return (
    <Card variant="default" padding="lg" className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
          <p className={`mt-1 text-3xl font-bold ${colors.value}`}>{value}</p>

          {(trend || description) && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              {trend && trendValue && (
                <span className={`text-sm font-medium ${trendConfig[trend].text}`}>
                  {trendConfig[trend].arrow} {trendValue}
                </span>
              )}
              {description && (
                <span className="text-xs text-gray-400">{description}</span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div
            className={`ml-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${colors.icon}`}
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;

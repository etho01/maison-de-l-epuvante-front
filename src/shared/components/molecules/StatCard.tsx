/**
 * Component: StatCard
 * Molecule - Carte de statistique - Style professionnel
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
  default: { icon: 'bg-neutral-800 text-neutral-400',  value: 'text-neutral-100' },
  blue:    { icon: 'bg-blue-950/50 text-blue-400',     value: 'text-blue-300' },
  green:   { icon: 'bg-green-950/50 text-green-400',   value: 'text-green-300' },
  red:     { icon: 'bg-crimson-950/50 text-crimson-400', value: 'text-crimson-300' },
  purple:  { icon: 'bg-purple-950/50 text-purple-400', value: 'text-purple-300' },
  yellow:  { icon: 'bg-yellow-950/50 text-yellow-400', value: 'text-yellow-300' },
};

const trendConfig: Record<StatTrend, { text: string; icon: ReactNode }> = {
  up:      { text: 'text-green-400', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z"/></svg> },
  down:    { text: 'text-crimson-400', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg> },
  neutral: { text: 'text-neutral-400', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l6 0"/></svg> },
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
  const trendStyle = trend ? trendConfig[trend] : null;

  return (
    <Card variant="glass" padding="lg" className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-400 truncate">{label}</p>
          <p className={`mt-2 text-3xl font-bold tabular-nums ${colors.value}`}>{value}</p>

          {(trend || description) && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              {trend && trendValue && trendStyle && (
                <span className={`inline-flex items-center gap-1 text-sm font-semibold ${trendStyle.text}`}>
                  {trendStyle.icon}
                  {trendValue}
                </span>
              )}
              {description && (
                <span className="text-xs text-neutral-500">{description}</span>
              )}
            </div>
          )}
        </div>

        {icon && (
          <div
            className={`ml-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${colors.icon}`}
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

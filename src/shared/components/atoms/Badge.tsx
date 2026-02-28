/**
 * Component: Badge
 * Atom - Badge réutilisable pour afficher des statuts, labels, etc.
 */

import React, { ReactNode } from 'react';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'secondary'
  | 'ghost';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  /** Icône affichée avant le texte */
  icon?: ReactNode;
  /** Utilise border-radius pill si true (défaut), carré si false */
  rounded?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  icon,
  rounded = true,
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    default:   'bg-gray-100 text-gray-800 border border-gray-200',
    primary:   'bg-red-100 text-red-800 border border-red-200',
    success:   'bg-green-100 text-green-800 border border-green-200',
    warning:   'bg-yellow-100 text-yellow-800 border border-yellow-200',
    danger:    'bg-red-200 text-red-900 border border-red-300',
    info:      'bg-blue-100 text-blue-800 border border-blue-200',
    secondary: 'bg-purple-100 text-purple-800 border border-purple-200',
    ghost:     'bg-transparent text-gray-500 border border-gray-300',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const shape = rounded ? 'rounded-full' : 'rounded';

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium ${shape} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

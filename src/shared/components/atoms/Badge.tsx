/**
 * Component: Badge
 * Atom - Badge réutilisable pour afficher des statuts, labels, etc. - Style professionnel
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
    default:   'bg-neutral-800 text-neutral-300 border border-neutral-700',
    primary:   'bg-crimson-950/50 text-crimson-300 border border-crimson-800',
    success:   'bg-green-950/50 text-green-300 border border-green-800',
    warning:   'bg-yellow-950/50 text-yellow-300 border border-yellow-800',
    danger:    'bg-crimson-900/50 text-crimson-200 border border-crimson-700',
    info:      'bg-blue-950/50 text-blue-300 border border-blue-800',
    secondary: 'bg-purple-950/50 text-purple-300 border border-purple-800',
    ghost:     'bg-transparent text-neutral-400 border border-neutral-700',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const shape = rounded ? 'rounded-full' : 'rounded-lg';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium ${shape} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};

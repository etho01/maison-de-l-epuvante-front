/**
 * Component: Card
 * Atom - Conteneur de carte réutilisable avec sous-composants
 */

import React, { ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost' | 'dark';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
  /** Permet de rendre la carte comme un élément HTML différent (ex: article, section) */
  as?: React.ElementType;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  onClick,
  as: Tag = 'div',
}) => {
  const variantStyles: Record<CardVariant, string> = {
    default:  'border border-gray-200 rounded-lg bg-white',
    elevated: 'rounded-lg bg-white shadow-md',
    outlined: 'border-2 border-gray-300 rounded-lg bg-white',
    ghost:    'rounded-lg bg-transparent',
    dark:     'border border-gray-700 rounded-lg bg-gray-900 text-white',
  };

  const paddingStyles: Record<CardPadding, string> = {
    none: '',
    sm:   'p-3',
    md:   'p-4',
    lg:   'p-6',
    xl:   'p-8',
  };

  const hoverStyles = hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : '';

  return (
    <Tag
      className={`${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

// ── Sous-composants ───────────────────────────────────────────────────────────

export const CardHeader: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`mb-4 pb-4 border-b border-gray-100 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={className}>{children}</div>;

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 flex items-center gap-3 ${className}`}>
    {children}
  </div>
);

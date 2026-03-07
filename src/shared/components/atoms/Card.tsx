/**
 * Component: Card
 * Atom - Conteneur de carte réutilisable avec sous-composants - Style professionnel
 */

import React, { ReactNode } from 'react';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'ghost' | 'glass';
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
    default:  'border border-crimson-900/30 rounded-xl bg-neutral-900/50',
    elevated: 'rounded-xl bg-neutral-900/70 shadow-lg shadow-black/20',
    outlined: 'border-2 border-crimson-800/50 rounded-xl bg-neutral-900/30',
    ghost:    'rounded-xl bg-transparent',
    glass:    'glass-effect rounded-2xl',
  };

  const paddingStyles: Record<CardPadding, string> = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
    xl:   'p-10',
  };

  const hoverStyles = hoverable 
    ? 'hover:shadow-crimson-md hover:border-crimson-700/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]' 
    : '';

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
  <div className={`mb-6 pb-4 border-b border-crimson-900/30 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <h3 className={`text-xl font-bold text-neutral-100 ${className}`}>{children}</h3>
);

export const CardBody: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`text-neutral-300 ${className}`}>{children}</div>;

export const CardFooter: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`mt-6 pt-4 border-t border-crimson-900/30 flex items-center gap-3 ${className}`}>
    {children}
  </div>
);

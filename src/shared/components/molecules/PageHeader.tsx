/**
 * Component: PageHeader
 * Molecule - En-tête de page - Style professionnel
 */

import React, { ReactNode } from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Boutons ou liens affichés à droite du titre */
  actions?: ReactNode;
  /** Fil d'Ariane affiché au-dessus du titre */
  breadcrumb?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumb,
  className = '',
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {breadcrumb && (
        <nav aria-label="fil d'Ariane" className="mb-3 text-sm text-neutral-500">
          {breadcrumb}
        </nav>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-100">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-3 shrink-0">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

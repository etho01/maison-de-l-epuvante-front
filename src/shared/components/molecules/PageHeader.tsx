/**
 * Component: PageHeader
 * Molecule - En-tête de page cohérent : titre, sous-titre, fil d'Ariane et actions.
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
    <div className={`mb-6 ${className}`}>
      {breadcrumb && (
        <nav aria-label="fil d'Ariane" className="mb-2 text-sm text-gray-500">
          {breadcrumb}
        </nav>
      )}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
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

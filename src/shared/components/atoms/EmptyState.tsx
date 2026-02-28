/**
 * Component: EmptyState
 * Atom - État vide réutilisable, affiché quand une liste est vide ou une recherche
 * ne retourne aucun résultat.
 */

import React, { ReactNode } from 'react';

export interface EmptyStateProps {
  /** Icône React (SVG, composant…) */
  icon?: ReactNode;
  /** Emoji affiché en grand (alternatif à icon) */
  emoji?: string;
  title: string;
  description?: string;
  /** Bouton/lien d'action affiché sous la description */
  action?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: { wrapper: 'py-8',  emojiClass: 'text-3xl', title: 'text-base', desc: 'text-sm' },
  md: { wrapper: 'py-12', emojiClass: 'text-4xl', title: 'text-lg',   desc: 'text-sm' },
  lg: { wrapper: 'py-20', emojiClass: 'text-6xl', title: 'text-2xl',  desc: 'text-base' },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  emoji,
  title,
  description,
  action,
  size = 'md',
  className = '',
}) => {
  const s = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center justify-center text-center ${s.wrapper} ${className}`}>
      {(emoji || icon) && (
        <div className={`mb-4 ${s.emojiClass}`} aria-hidden="true">
          {emoji ?? icon}
        </div>
      )}
      <h3 className={`font-semibold text-gray-700 ${s.title}`}>{title}</h3>
      {description && (
        <p className={`mt-2 text-gray-500 max-w-sm ${s.desc}`}>{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;

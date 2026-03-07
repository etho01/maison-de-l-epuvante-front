/**
 * Component: FormSection
 * Molecule - Section de formulaire avec titre et description optionnels.
 * Utilise <fieldset> pour la sémantique HTML et l'accessibilité.
 */

import React, { ReactNode } from 'react';

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className = '',
}) => {
  return (
    <fieldset className={`border border-crimson-900/30 rounded-xl p-4 space-y-4 glass-effect ${className}`}>
      {(title || description) && (
        <legend className="px-2">
          {title && (
            <span className="text-sm font-semibold text-neutral-100">{title}</span>
          )}
          {description && (
            <p className="text-xs text-neutral-400 mt-0.5">{description}</p>
          )}
        </legend>
      )}
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
};

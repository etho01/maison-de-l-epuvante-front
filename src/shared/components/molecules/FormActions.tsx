/**
 * Component: FormActions
 * Composant molecule pour les actions de formulaire (boutons)
 */

import { ReactNode } from 'react';

interface FormActionsProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  align = 'left',
  className = '',
}) => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={`flex gap-4 pt-4 ${alignmentClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

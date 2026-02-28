/**
 * Component: ActionMenu
 * Molecule - Menu d'actions kebab (⋮) avec fermeture au clic extérieur.
 * Utilisé dans les tableaux admin pour les actions par ligne.
 */

'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';

export interface ActionMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'danger';
  disabled?: boolean;
  /** Affiche un séparateur au-dessus de cet item */
  separator?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  align?: 'left' | 'right';
  /** Accessible label du bouton déclencheur */
  triggerLabel?: string;
  className?: string;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  items,
  align = 'right',
  triggerLabel = 'Actions',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={triggerLabel}
        className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
      >
        {/* Icône ⋮ */}
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="4"  r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className={[
            'absolute z-50 mt-1 w-44 rounded-lg bg-white shadow-lg ring-1 ring-gray-200 py-1',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {items.map((item, i) => (
            <React.Fragment key={i}>
              {item.separator && i > 0 && (
                <div className="my-1 border-t border-gray-100" role="separator" />
              )}
              <button
                role="menuitem"
                type="button"
                disabled={item.disabled}
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className={[
                  'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors',
                  item.variant === 'danger'
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-700 hover:bg-gray-50',
                  item.disabled ? 'opacity-40 cursor-not-allowed' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {item.icon && (
                  <span className="w-4 h-4 shrink-0" aria-hidden="true">{item.icon}</span>
                )}
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;

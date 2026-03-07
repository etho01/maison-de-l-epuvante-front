/**
 * Component: Checkbox
 * Composant réutilisable pour les cases à cocher - Style professionnel
 */

import { forwardRef, InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-6">
          <input
            id={id}
            ref={ref}
            type="checkbox"
            className={`w-5 h-5 text-crimson-600 bg-neutral-900/50 border-crimson-900/30 rounded-lg focus:ring-crimson-600 focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all cursor-pointer hover:border-crimson-600 ${className}`}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3">
            <label htmlFor={id} className="text-sm font-medium text-neutral-300 cursor-pointer">
              {label}
            </label>
            {error && (
              <p className="text-crimson-400 text-sm mt-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{error}</span>
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;

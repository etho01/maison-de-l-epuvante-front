/**
 * Component: SearchBar
 * Molecule - Barre de recherche - Style professionnel
 */

'use client';

import React, { useRef } from 'react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'h-9 text-sm pl-9 pr-9',
  md: 'h-11 text-sm pl-11 pr-11',
  lg: 'h-14 text-base pl-12 pr-12',
};

const iconClasses: Record<string, string> = {
  sm: 'left-3 w-4 h-4',
  md: 'left-3.5 w-5 h-5',
  lg: 'left-4 w-6 h-6',
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Rechercher…',
  onClear,
  size = 'md',
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loupe */}
      <svg
        className={`absolute top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none ${iconClasses[size]}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          'w-full rounded-xl border border-crimson-900/30 bg-neutral-900/50 text-neutral-100',
          'placeholder-neutral-500 outline-none transition-all duration-200',
          'focus:border-crimson-600 focus:ring-2 focus:ring-crimson-600/30',
          sizeClasses[size],
        ].join(' ')}
      />

      {/* Bouton clear */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-crimson-400 transition-colors p-1 rounded-lg hover:bg-neutral-800/50"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;

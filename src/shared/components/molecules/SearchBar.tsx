/**
 * Component: SearchBar
 * Molecule - Barre de recherche avec icône loupe et bouton clear.
 * Utilisée dans tous les listings (produits, commandes, utilisateurs…).
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
  sm: 'h-8 text-sm pl-8 pr-8',
  md: 'h-10 text-sm pl-10 pr-10',
  lg: 'h-12 text-base pl-11 pr-11',
};

const iconClasses: Record<string, string> = {
  sm: 'left-2.5 w-3.5 h-3.5',
  md: 'left-3 w-4 h-4',
  lg: 'left-3.5 w-5 h-5',
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
        className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${iconClasses[size]}`}
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
          'w-full rounded-lg border border-gray-200 bg-white text-gray-900',
          'placeholder-gray-400 outline-none transition',
          'focus:border-red-400 focus:ring-2 focus:ring-red-100',
          sizeClasses[size],
        ].join(' ')}
      />

      {/* Bouton clear */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Effacer la recherche"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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

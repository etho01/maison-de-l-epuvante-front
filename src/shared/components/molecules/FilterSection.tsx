/**
 * Component: FilterSection
 * Molecule - Section de filtres réutilisable
 */

'use client';

import React, { ReactNode } from 'react';

export interface FilterOption<T = any> {
  label: string;
  value: T;
}

interface FilterSectionProps<T = any> {
  title: string;
  options: FilterOption<T>[];
  selectedValue?: T;
  onChange: (value: T | undefined) => void;
  allowClear?: boolean;
  clearLabel?: string;
  className?: string;
}

export function FilterSection<T>({
  title,
  options,
  selectedValue,
  onChange,
  allowClear = true,
  clearLabel = 'Tous',
  className = '',
}: FilterSectionProps<T>) {
  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      <h3 className="font-bold mb-3">{title}</h3>
      <div className="space-y-2">
        {allowClear && (
          <button
            onClick={() => onChange(undefined)}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 transition-colors ${
              selectedValue === undefined ? 'bg-red-100 text-red-800' : ''
            }`}
          >
            {clearLabel}
          </button>
        )}
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onChange(option.value)}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 transition-colors ${
              selectedValue === option.value ? 'bg-red-100 text-red-800' : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

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
  onChange: (value?: T) => void;
  allowClear?: boolean;
  clearLabel?: string;
  className?: string;
  valueClearLabel?: T;
}

export function FilterSection<T>({
  title,
  options,
  selectedValue,
  onChange,
  allowClear = true,
  clearLabel = 'Tous',
  className = '',
  valueClearLabel,
}: FilterSectionProps<T>) {

  function isValueEqual(val1: T | undefined, val2: T | undefined): boolean {
    if (Array.isArray(val1) && Array.isArray(val2)) {
      return JSON.stringify(val1.sort()) === JSON.stringify(val2.sort());
    }
    return val1 === val2;
  }

  return (
    <div className={`border border-crimson-900/30 rounded-xl p-4 glass-effect ${className}`}>
      <h3 className="font-bold text-neutral-100 mb-3">{title}</h3>
      <div className="space-y-1">
        {allowClear && (
          <button
            onClick={() => onChange(valueClearLabel)}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
              selectedValue === undefined || isValueEqual(selectedValue, valueClearLabel) 
                ? 'bg-crimson-600 text-white shadow-crimson-sm' 
                : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-crimson-400'
            }`}
          >
            {clearLabel}
          </button>
        )}
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onChange(option.value)}
            className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
              isValueEqual(selectedValue, option.value) 
                ? 'bg-crimson-600 text-white shadow-crimson-sm' 
                : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-crimson-400'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

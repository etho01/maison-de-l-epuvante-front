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
    <div className={`border rounded-lg p-4 ${className}`}>
      <h3 className="font-bold mb-3">{title}</h3>
      <div className="space-y-2">
        {allowClear && (
          <button
            onClick={() => onChange(valueClearLabel)}
            className={`block w-full text-left px-2 py-1 rounded hover:bg-gray-100 transition-colors ${
              selectedValue === undefined || isValueEqual(selectedValue, valueClearLabel) ? 'bg-red-100 text-red-800' : ''
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
              isValueEqual(selectedValue, option.value) ? 'bg-red-100 text-red-800' : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

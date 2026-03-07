/**
 * Component: FilterSection
 * Molecule - Section de filtres réutilisable
 */

'use client';

import React, { ReactNode } from 'react';
import { Button } from '@/src/shared/components/atoms';

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
          <Button
            onClick={() => onChange(valueClearLabel)}
            variant={selectedValue === undefined || isValueEqual(selectedValue, valueClearLabel) ? 'primary' : 'ghost'}
            size="sm"
            className="w-full justify-start"
          >
            {clearLabel}
          </Button>
        )}
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onChange(option.value)}
            variant={isValueEqual(selectedValue, option.value) ? 'primary' : 'ghost'}
            size="sm"
            className="w-full justify-start"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

/**
 * Component: DataTable
 * Molecule - Tableau de données générique avec colonnes configurables,
 * état de chargement et état vide intégrés.
 */

import React from 'react';
import { EmptyState } from '../atoms/EmptyState';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

export interface Column<T> {
  /** Identifiant unique de la colonne */
  key: string;
  header: string;
  render: (row: T, index: number) => React.ReactNode;
  /** Classes CSS sur la cellule <td> */
  className?: string;
  /** Classes CSS sur l'en-tête <th> */
  headerClassName?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyEmoji?: string;
  /** Contenu affiché sous le message d'état vide (ex: bouton d'ajout) */
  emptyAction?: React.ReactNode;
  caption?: string;
  className?: string;
  rowClassName?: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyTitle = 'Aucun résultat',
  emptyDescription,
  emptyEmoji = '📭',
  emptyAction,
  caption,
  className = '',
  rowClassName,
  onRowClick,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <LoadingSpinner size="lg" label="Chargement…" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        emoji={emptyEmoji}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
      <table className="w-full text-sm text-left">
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 font-semibold text-gray-600 whitespace-nowrap ${col.headerClassName ?? ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, index) => (
            <tr
              key={keyExtractor(row, index)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={[
                'bg-white transition-colors',
                onRowClick ? 'cursor-pointer hover:bg-gray-50' : '',
                rowClassName?.(row, index) ?? '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 text-gray-700 ${col.className ?? ''}`}
                >
                  {col.render(row, index)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

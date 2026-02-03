'use client';

import React from 'react';
import { Pagination as PaginationType } from '@/src/shared/domain/Pagination';

interface PaginationComponentProps {
  pagination?: PaginationType;
  onPageChange: (page: number) => void;
  className?: string;
}

export const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pagination,
  onPageChange,
  className = '',
}) => {
  if (!pagination) return null;

  const { page, totalPages, hasNextPage, hasPreviousPage, totalItems, itemsPerPage } = pagination;

  // Générer les numéros de pages à afficher
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 7;

    if (totalPages <= maxPagesToShow) {
      // Afficher toutes les pages si peu nombreuses
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Afficher avec ellipses
      if (page <= 3) {
        // Début
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 2) {
        // Fin
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Milieu
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {/* Informations sur les résultats */}
      <div className="text-sm text-gray-600">
        Affichage de <span className="font-medium">{startItem}</span> à{' '}
        <span className="font-medium">{endItem}</span> sur{' '}
        <span className="font-medium">{totalItems}</span> résultat{totalItems > 1 ? 's' : ''}
      </div>

      {/* Contrôles de pagination */}
      <nav className="flex items-center gap-2" aria-label="Pagination">
        {/* Bouton Précédent */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPreviousPage}
          className={`
            px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${
              hasPreviousPage
                ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }
          `}
          aria-label="Page précédente"
        >
          ← Précédent
        </button>

        {/* Numéros de pages */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-gray-500"
                >
                  ...
                </span>
              );
            }

            const isActive = pageNum === page;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-red-600 text-white border border-red-600'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }
                `}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Bouton Suivant */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className={`
            px-3 py-2 rounded-md text-sm font-medium transition-colors
            ${
              hasNextPage
                ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }
          `}
          aria-label="Page suivante"
        >
          Suivant →
        </button>
      </nav>
    </div>
  );
};

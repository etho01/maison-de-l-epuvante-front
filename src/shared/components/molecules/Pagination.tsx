'use client';

import React from 'react';
import { Pagination as PaginationType } from '@/src/shared/domain/Pagination';
import { Button } from '@/src/shared/components/atoms';

interface PaginationComponentProps  {
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
      <div className="text-sm text-neutral-400">
        Affichage de <span className="font-semibold text-neutral-300">{startItem}</span> à{' '}
        <span className="font-semibold text-neutral-300">{endItem}</span> sur{' '}
        <span className="font-semibold text-neutral-300">{totalItems}</span> résultat{totalItems > 1 ? 's' : ''}
      </div>

      {/* Contrôles de pagination */}
      <nav className="flex items-center gap-2" aria-label="Pagination">
        {/* Bouton Précédent */}
        <Button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPreviousPage}
          variant={hasPreviousPage ? 'secondary' : 'ghost'}
          size="sm"
          aria-label="Page précédente"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        {/* Numéros de pages */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum, index) => {
            if (pageNum === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-neutral-500"
                >
                  …
                </span>
              );
            }

            const isActive = pageNum === page;

            return (
              <Button
                key={pageNum}
                onClick={() => onPageChange(pageNum as number)}
                variant={isActive ? 'primary' : 'ghost'}
                size="sm"
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        {/* Bouton Suivant */}
        <Button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          variant={hasNextPage ? 'secondary' : 'ghost'}
          size="sm"
          aria-label="Page suivante"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </nav>
    </div>
  );
};

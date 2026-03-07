'use client';

import React from 'react';
import { Category } from '../../../domain/entities/Category';
import { Button } from '@/src/shared/components/atoms';

interface CategoryCardProps {
  category: Category;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <div className="glass-effect border border-crimson-900/30 rounded-xl p-4 hover:border-crimson-700/50 hover:shadow-crimson-md transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-100">{category.name}</h3>
          <p className="text-sm text-neutral-400">{category.slug}</p>
        </div>
      </div>
      
      {category.description && (
        <p className="text-sm text-neutral-300 mb-3">{category.description}</p>
      )}
      
      {category.parent && (
        <p className="text-xs text-neutral-400 mb-3">
          Catégorie parente: {category.parent.name}
        </p>
      )}
      
      <div className="flex gap-2 justify-end">
        {onEdit && (
          <Button
            onClick={() => onEdit(category)}
            variant="secondary"
            size="sm"
          >
            Modifier
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={() => onDelete(category)}
            variant="danger"
            size="sm"
          >
            Supprimer
          </Button>
        )}
      </div>
    </div>
  );
};

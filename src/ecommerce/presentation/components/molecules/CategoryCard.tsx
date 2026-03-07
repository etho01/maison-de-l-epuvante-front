'use client';

import React from 'react';
import { Category } from '../../../domain/entities/Category';

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
          <button
            onClick={() => onEdit(category)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Modifier
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(category)}
            className="px-3 py-1 text-sm bg-crimson-600 text-white rounded-lg hover:bg-crimson-700 transition-colors"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

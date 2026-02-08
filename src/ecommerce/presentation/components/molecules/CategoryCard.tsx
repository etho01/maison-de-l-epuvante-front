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
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.slug}</p>
        </div>
      </div>
      
      {category.description && (
        <p className="text-sm text-gray-700 mb-3">{category.description}</p>
      )}
      
      {category.parent && (
        <p className="text-xs text-gray-500 mb-3">
          Catégorie parente: {category.parent.name}
        </p>
      )}
      
      <div className="flex gap-2 justify-end">
        {onEdit && (
          <button
            onClick={() => onEdit(category)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Modifier
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(category)}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};

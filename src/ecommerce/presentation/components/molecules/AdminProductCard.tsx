'use client';

import React from 'react';
import { Product } from '../../../domain/entities/Product';
import { ProductStockBadge } from '../atoms/ProductStockBadge';
import { ProductTypeBadge } from '../atoms/ProductTypeBadge';

interface AdminProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
        </div>
        <div className="flex gap-2">
          <ProductTypeBadge type={product.type} />
          <ProductStockBadge stock={product.stock} />
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900">{product.price} €</span>
          <span className="ml-2 text-sm text-gray-500">{product.category.name}</span>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Modifier
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product)}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-2 flex gap-2 text-xs">
        {product.active && (
          <span className="text-green-600">● Actif</span>
        )}
        {product.exclusiveOnline && (
          <span className="text-purple-600">● Exclusivité en ligne</span>
        )}
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { Product } from '../../../../../domain/entities/Product';
import { ProductStockBadge } from '../../../atoms/Product/ProductStockBadge';
import { ProductTypeBadge } from '../../../atoms/Product/ProductTypeBadge';

interface AdminProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const AdminProductCard: React.FC<AdminProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="glass-effect border border-crimson-900/30 rounded-xl p-4 hover:border-crimson-700/50 hover:shadow-crimson-md transition-all duration-200">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-neutral-100">{product.name}</h3>
          <p className="text-sm text-neutral-400">SKU: {product.sku}</p>
        </div>
        <div className="flex gap-2">
          <ProductTypeBadge type={product.type} />
          <ProductStockBadge stock={product.stock} />
        </div>
      </div>
      
      <p className="text-sm text-neutral-300 mb-3 line-clamp-2">{product.description}</p>
      
      <div className="flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-neutral-100">{product.price} €</span>
          <span className="ml-2 text-sm text-neutral-400">{product.category.name}</span>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Modifier
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(product)}
              className="px-3 py-1 text-sm bg-crimson-600 text-white rounded-lg hover:bg-crimson-700 transition-colors"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-2 flex gap-2 text-xs">
        {product.active && (
          <span className="text-green-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="3" />
            </svg>
            Actif
          </span>
        )}
        {product.exclusiveOnline && (
          <span className="text-purple-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="3" />
            </svg>
            Exclusivité en ligne
          </span>
        )}
      </div>
    </div>
  );
};

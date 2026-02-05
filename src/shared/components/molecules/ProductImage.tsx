/**
 * Component: ProductImage
 * Molecule - Affichage d'image de produit avec fallback
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  size = 'md',
  aspectRatio = 'square',
  className = '',
}) => {
  const [error, setError] = useState(false);

  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-48 h-48',
    xl: 'w-full h-64',
  };

  const aspectStyles = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  };

  const containerClasses = `${sizeStyles[size]} ${aspectStyles[aspectRatio]} relative overflow-hidden rounded ${className}`;

  if (!src || error) {
    return (
      <div className={`${containerClasses} bg-gray-200 flex items-center justify-center`}>
        <svg
          className="w-1/2 h-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
};

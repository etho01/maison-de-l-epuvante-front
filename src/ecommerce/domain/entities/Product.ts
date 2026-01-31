import { Category } from './Category';

export type ProductType = 'physical' | 'digital' | 'subscription';

export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  price: string; // Decimal as string
  stock: number;
  type: ProductType;
  sku: string;
  category: Category;
  active: boolean;
  exclusiveOnline: boolean;
  images: string[];
  weight: string | null; // For physical products
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  slug: string;
  price: string;
  stock: number;
  type: ProductType;
  sku: string;
  category: string; // IRI like /api/categories/1
  active?: boolean;
  exclusiveOnline?: boolean;
  images?: string[];
  weight?: string;
  metadata?: Record<string, any>;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  slug?: string;
  price?: string;
  stock?: number;
  type?: ProductType;
  sku?: string;
  category?: string;
  active?: boolean;
  exclusiveOnline?: boolean;
  images?: string[];
  weight?: string;
  metadata?: Record<string, any>;
}

export interface ProductFilters {
  name?: string;
  type?: ProductType;
  'category.id'?: number;
  'price[gte]'?: number;
  'price[lte]'?: number;
  active?: boolean;
  exclusiveOnline?: boolean;
  page?: number;
}

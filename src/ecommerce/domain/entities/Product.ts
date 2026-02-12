import { Category } from './Category';

export enum ProductType {
  PHYSICAL = 'physical',
  DIGITAL = 'digital',
  SUBSCRIPTION = 'subscription'
}

export interface Product {
  id: number;
  name: string;
  description: string;
  slug: string;
  price: number; // Decimal as string
  stock: number;
  type: ProductType;
  sku: string;
  category: Category;
  active: boolean;
  exclusiveOnline: boolean;
  images: string[];
  weight: number | null; // For physical products
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  slug: string;
  price: number;
  stock: number;
  type: ProductType;
  sku: string;
  categoryId: number; // IRI like /api/categories/1
  active?: boolean;
  exclusiveOnline?: boolean;
  images?: string[];
  weight?: number;
  metadata?: Record<string, any>;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  slug?: string;
  price?: number;
  stock?: number;
  type?: ProductType;
  sku?: string;
  categoryId?: number;
  active?: boolean;
  exclusiveOnline?: boolean;
  images?: string[];
  weight?: number;
  metadata?: Record<string, any>;
}

export interface ProductFilters {
  name?: string;
  type?: ProductType[];
  'category.id'?: number;
  'price[gte]'?: number;
  'price[lte]'?: number;
  active?: boolean;
  exclusiveOnline?: boolean;
  page?: number;
}

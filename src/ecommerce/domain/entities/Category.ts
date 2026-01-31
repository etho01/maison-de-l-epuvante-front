export interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  parent: Category | null;
  children?: Category[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  slug: string;
  parent?: string; // IRI like /api/categories/1
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  slug?: string;
  parent?: string | null;
}

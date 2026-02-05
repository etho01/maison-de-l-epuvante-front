'use client';

import React, { useState, useEffect } from 'react';
import { useAdminEcommerce } from '../../context/AdminEcommerceContext';
import { Category } from '../../../domain/entities/Category';
import { CategoryCard } from '../molecules/CategoryCard';

interface AdminCategoryListProps {
  onEdit?: (category: Category) => void;
}

export const AdminCategoryList: React.FC<AdminCategoryListProps> = ({ onEdit }) => {
  const { getCategories, deleteCategory } = useAdminEcommerce();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCategories.execute();
      setCategories(response.member);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (category: Category) => {
    if (!confirm(`Supprimer la catégorie "${category.name}" ?`)) return;
    
    try {
      await deleteCategory.execute(category.id);
      loadCategories();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la suppression');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 py-8">{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={onEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-8 text-gray-500">Aucune catégorie trouvée</div>
      )}
    </div>
  );
};

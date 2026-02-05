import React from 'react';
import AdminCategoriesClient from './AdminCategoriesClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';

export default function AdminCategoriesPage() {
  return (
    <AdminLayout>
      <AdminCategoriesClient />
    </AdminLayout>
  );
}

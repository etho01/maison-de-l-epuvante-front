import React from 'react';
import AdminProductsClient from './AdminProductsClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <AdminProductsClient />
    </AdminLayout>
  );
}

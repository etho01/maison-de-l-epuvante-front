import React from 'react';
import AdminOrdersClient from './AdminOrdersClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <AdminOrdersClient />
    </AdminLayout>
  );
}

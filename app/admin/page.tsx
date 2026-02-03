import React from 'react';
import AdminDashboard from './AdminDashboard';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

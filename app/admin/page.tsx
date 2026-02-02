import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLayout from '@/src/admin/components/AdminLayout';

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}

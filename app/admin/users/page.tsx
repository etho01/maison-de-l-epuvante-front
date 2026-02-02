import React from 'react';
import AdminUsersClient from './AdminUsersClient';
import AdminLayout from '@/src/admin/components/AdminLayout';

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <AdminUsersClient />
    </AdminLayout>
  );
}

import React from 'react';
import AdminLayout from '@/admin/components/AdminLayout';
import AdminUsersClient from './AdminUsersClient';

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <AdminUsersClient />
    </AdminLayout>
  );
}

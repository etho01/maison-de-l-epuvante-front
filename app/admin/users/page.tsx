import React from 'react';
import AdminUsersClient from './AdminUsersClient';
import { AdminLayout } from '@/src/shared/components/organisms/AdminLayout';

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <AdminUsersClient />
    </AdminLayout>
  );
}

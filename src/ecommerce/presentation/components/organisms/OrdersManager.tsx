'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderList } from './OrderList';
import { useOrdersViewModel } from '../../hooks/orders';
import { Order } from '@/src/ecommerce/domain/entities/Order';
import { Pagination } from '@/src/shared/domain/Pagination';

interface OrdersManagerProps {
  initialOrders?: Order[];
  initialPagination?: Pagination
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({ initialOrders, initialPagination }) => {
  const searchParams = useSearchParams();
  const viewModel = useOrdersViewModel(initialOrders, initialPagination);
  const { orders, loading, error } = viewModel.getState();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  return (
    <>
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Votre commande a été passée avec succès !
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <OrderList orders={orders} loading={loading} />
    </>
  );
};

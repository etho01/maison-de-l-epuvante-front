'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { OrderList } from './OrderList';
import { useGetOrdersViewModel } from '../../../hooks/orders';
import { Order } from '@/src/ecommerce/domain/entities/Order';
import { Pagination } from '@/src/shared/domain/Pagination';

interface OrdersManagerProps {
  initialOrders?: Order[];
  initialPagination?: Pagination
}

export const OrdersManager: React.FC<OrdersManagerProps> = ({ initialOrders, initialPagination }) => {
  const searchParams = useSearchParams();
  const viewModel = useGetOrdersViewModel(initialOrders, initialPagination);
  const { orders, loading } = viewModel.getState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  return (
    <>
      {showSuccess && (
        <div className="glass-effect border border-green-700/50 text-green-200 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Votre commande a été passée avec succès !</span>
        </div>
      )}

      {error && (
        <div className="glass-effect border border-crimson-700/50 text-crimson-200 px-4 py-3 rounded-xl mb-6 flex items-start gap-3">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <OrderList orders={orders} loading={loading} />
    </>
  );
};

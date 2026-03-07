'use client';

import React from 'react';
import Link from 'next/link';
import { LoaderCard } from '@/src/shared/components';
import { Order } from '@/src/ecommerce/domain/entities/Order';
import { OrderCard } from '../../molecules';

interface OrderListProps {
  orders: Order[];
  loading?: boolean;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <LoaderCard />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-400 text-lg mb-4">Vous n'avez pas encore de commande</p>
        <Link href="/produits" className="text-crimson-400 hover:text-crimson-300 transition-colors flex items-center justify-center gap-2">
          <span>Découvrir nos produits</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}
    </div>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { LoaderCard } from '@/src/shared/components';
import { Order } from '@/src/ecommerce/domain/entities/Order';
import { OrderCard, OrderCardData } from '@/src/shared/components/molecules/OrderCard';

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
        <p className="text-gray-500 text-lg mb-4">Vous n'avez pas encore de commande</p>
        <Link href="/produits" className="text-red-600 hover:underline">
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order as OrderCardData}
        />
      ))}
    </div>
  );
};

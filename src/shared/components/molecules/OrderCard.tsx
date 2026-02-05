/**
 * Component: OrderCard
 * Molecule - Carte de commande réutilisable
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { OrderStatusBadge, OrderStatus } from './OrderStatusBadge';
import { PriceDisplay } from '../atoms/PriceDisplay';

export interface OrderCardItem {
  id: number;
  product: {
    name: string;
  };
  quantity: number;
}

export interface OrderCardData {
  id: number;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  totalAmount: string;
  items: OrderCardItem[];
}

interface OrderCardProps {
  order: OrderCardData;
  className?: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, className = '' }) => {
  const orderDate = new Date(order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`border rounded-lg p-6 hover:shadow-lg transition-shadow ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <Link href={`/commandes/${order.id}`} className="hover:underline">
            <h3 className="text-xl font-bold">Commande #{order.orderNumber}</h3>
          </Link>
          <p className="text-sm text-gray-500">{orderDate}</p>
        </div>
        <OrderStatusBadge status={order.status} size="md" />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-700">
          {order.items.length} article{order.items.length > 1 ? 's' : ''}
        </p>
        <div className="mt-2 space-y-1">
          {order.items.slice(0, 3).map((item) => (
            <p key={item.id} className="text-sm text-gray-600">
              • {item.product.name} (x{item.quantity})
            </p>
          ))}
          {order.items.length > 3 && (
            <p className="text-sm text-gray-500">
              + {order.items.length - 3} autre{order.items.length - 3 > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          <span className="text-sm text-gray-600 mr-2">Total:</span>
          <PriceDisplay price={order.totalAmount} variant="emphasis" size="lg" />
        </div>
        <Link
          href={`/commandes/${order.id}`}
          className="text-red-600 hover:underline text-sm"
        >
          Voir les détails →
        </Link>
      </div>
    </div>
  );
};

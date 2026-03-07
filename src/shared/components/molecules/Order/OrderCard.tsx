/**
 * Component: OrderCard
 * Molecule - Carte de commande réutilisable
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { OrderStatusBadge, OrderStatus } from './OrderStatusBadge';
import { PriceDisplay } from '../../atoms/PriceDisplay';

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
    <div className={`border border-crimson-900/30 rounded-xl p-6 glass-effect hover:border-crimson-700/50 hover:shadow-crimson-md transition-all duration-200 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <Link href={`/commandes/${order.id}`} className="hover:text-crimson-400 transition-colors">
            <h3 className="text-xl font-bold text-neutral-100">Commande #{order.orderNumber}</h3>
          </Link>
          <p className="text-sm text-neutral-400">{orderDate}</p>
        </div>
        <OrderStatusBadge status={order.status} size="md" />
      </div>

      <div className="mb-4">
        <p className="text-sm text-neutral-300">
          {order.items.length} article{order.items.length > 1 ? 's' : ''}
        </p>
        <div className="mt-2 space-y-1">
          {order.items.slice(0, 3).map((item) => (
            <p key={item.id} className="text-sm text-neutral-400">
              • {item.product.name} (x{item.quantity})
            </p>
          ))}
          {order.items.length > 3 && (
            <p className="text-sm text-neutral-500">
              + {order.items.length - 3} autre{order.items.length - 3 > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-crimson-900/30">
        <div>
          <span className="text-sm text-neutral-400 mr-2">Total:</span>
          <PriceDisplay price={order.totalAmount} variant="emphasis" size="lg" />
        </div>
        <Link
          href={`/commandes/${order.id}`}
          className="text-crimson-400 hover:text-crimson-300 text-sm transition-colors flex items-center gap-1"
        >
          <span>Voir les détails</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

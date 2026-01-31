'use client';

import React from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '../../domain/entities/Order';

interface OrderListProps {
  orders: Order[];
  loading?: boolean;
}

const statusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  processing: 'En cours',
  paid: 'Payée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-200 text-green-900',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export const OrderList: React.FC<OrderListProps> = ({ orders, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-6 animate-pulse">
            <div className="bg-gray-200 h-6 rounded mb-4 w-1/3"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded"></div>
          </div>
        ))}
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
        <div key={order.id} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Link href={`/commandes/${order.id}`} className="hover:underline">
                <h3 className="text-xl font-bold">Commande #{order.orderNumber}</h3>
              </Link>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                statusColors[order.status]
              }`}
            >
              {statusLabels[order.status]}
            </span>
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
            <span className="text-lg font-bold">Total: {order.totalAmount} €</span>
            <Link
              href={`/commandes/${order.id}`}
              className="text-red-600 hover:underline text-sm"
            >
              Voir les détails →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

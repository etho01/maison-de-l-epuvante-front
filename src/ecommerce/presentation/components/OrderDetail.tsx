'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEcommerce } from '../context/EcommerceContext';
import { Order, OrderStatus } from '../../domain/entities/Order';

const statusLabels: Record<OrderStatus, string> = {
  pending: 'En attente',
  processing: 'En cours',
  paid: 'Payée',
  shipped: 'Expédiée',
  delivered: 'Livrée',
  cancelled: 'Annulée',
  refunded: 'Remboursée',
};

interface OrderDetailProps {
  orderId: number;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  const router = useRouter();
  const { getOrderById } = useEcommerce();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrder();
  }, [orderId]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderData = await getOrderById(orderId);
      setOrder(orderData);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error || !order) {
    return (
      <div className="text-center">
        <p className="text-red-600 text-lg mb-4">{error || 'Commande non trouvée'}</p>
        <button
          onClick={() => router.push('/commandes')}
          className="text-red-600 hover:underline"
        >
          ← Retour aux commandes
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => router.push('/commandes')}
        className="text-red-600 hover:underline mb-6"
      >
        ← Retour aux commandes
      </button>

      <div className="border rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Commande #{order.orderNumber}</h1>
            <p className="text-gray-600">
              Passée le{' '}
              {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <span className="px-4 py-2 rounded bg-blue-100 text-blue-800 font-medium">
            {statusLabels[order.status]}
          </span>
        </div>

        {/* Articles */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Articles commandés</h2>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-3">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Prix unitaire: {item.unitPrice} €</p>
                </div>
                <p className="font-bold">{item.totalPrice} €</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4 border-t mt-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-red-600">{order.totalAmount} €</span>
          </div>
        </div>

        {/* Adresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold mb-2">Adresse de livraison</h3>
            <div className="text-sm text-gray-700">
              <p>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Adresse de facturation</h3>
            <div className="text-sm text-gray-700">
              <p>
                {order.billingAddress.firstName} {order.billingAddress.lastName}
              </p>
              <p>{order.billingAddress.address}</p>
              <p>
                {order.billingAddress.postalCode} {order.billingAddress.city}
              </p>
              <p>{order.billingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div>
          <h3 className="font-bold mb-2">Informations supplémentaires</h3>
          <p className="text-sm text-gray-700">
            Méthode de paiement: <span className="font-medium">{order.paymentMethod}</span>
          </p>
          {order.customerNotes && (
            <div className="mt-2">
              <p className="text-sm font-medium">Notes du client:</p>
              <p className="text-sm text-gray-700">{order.customerNotes}</p>
            </div>
          )}
          {order.adminNotes && (
            <div className="mt-2">
              <p className="text-sm font-medium">Notes de l'administration:</p>
              <p className="text-sm text-gray-700">{order.adminNotes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

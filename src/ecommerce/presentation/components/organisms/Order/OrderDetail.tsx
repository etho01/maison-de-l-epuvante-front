'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Address, Order, OrderStatus } from '@/src/ecommerce/domain/entities/Order';
import { DeliveryStatus } from '@/src/ecommerce/domain/entities/Devivery';
import { Card, CardHeader, CardTitle, CardBody } from '@/src/shared/components/atoms/Card';
import { PriceDisplay } from '@/src/shared/components/atoms/PriceDisplay';
import { Button } from '@/src/shared/components/atoms';
import { OrderStatusBadge } from '../../atoms';

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {
  const router = useRouter();

  const orderDate = new Date(order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getDeliveryStatusLabel = (status: DeliveryStatus): string => {
    const labels: Record<DeliveryStatus, string> = {
      [DeliveryStatus.PENDING]: 'En attente',
      [DeliveryStatus.PREPARING]: 'En préparation',
      [DeliveryStatus.SHIPPED]: 'Expédiée',
      [DeliveryStatus.IN_TRANSIT]: 'En transit',
      [DeliveryStatus.DELIVERED]: 'Livrée',
      [DeliveryStatus.FAILED]: 'Échec',
      [DeliveryStatus.CANCELLED]: 'Annulée',
    };
    return labels[status];
  };

  const getDeliveryStatusColor = (status: DeliveryStatus): string => {
    const colors: Record<DeliveryStatus, string> = {
      [DeliveryStatus.PENDING]: 'text-yellow-400',
      [DeliveryStatus.PREPARING]: 'text-orange-400',
      [DeliveryStatus.SHIPPED]: 'text-blue-400',
      [DeliveryStatus.IN_TRANSIT]: 'text-cyan-400',
      [DeliveryStatus.DELIVERED]: 'text-green-400',
      [DeliveryStatus.FAILED]: 'text-red-600',
      [DeliveryStatus.CANCELLED]: 'text-red-400',
    };
    return colors[status];
  };

  let addressList: { label: string; addr: Address }[] = [];

  if (order.delivery?.shippingAddress) {
    addressList.push({ label: 'Adresse de livraison', addr: order.delivery.shippingAddress });
  }
  
  addressList.push({ label: 'Adresse de facturation', addr: order.billingAddress });

  return (
    <>
      <Button
        onClick={() => router.push('/commandes')}
        variant="ghost"
        size="sm"
        className="mb-6"
      >
        ← Retour aux commandes
      </Button>

      <Card variant="default" padding="lg">
        {/* En-tête */}
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <CardTitle>Commande #{order.orderNumber}</CardTitle>
              <p className="text-sm text-neutral-400 mt-1">Passée le {orderDate}</p>
            </div>
            <OrderStatusBadge status={order.status as OrderStatus} size="md" />
          </div>
        </CardHeader>

        <CardBody>
          {/* Articles */}
          <section className="mb-6">
            <h2 className="text-base font-semibold text-neutral-100 mb-3">Articles commandés</h2>
            <div className="space-y-3">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex justify-between border-b border-neutral-800/50 pb-3 last:border-0">
                  <div>
                    <p className="font-medium text-neutral-100">{item.product.name}</p>
                    <p className="text-sm text-neutral-400">Quantité : {item.quantity}</p>
                    <p className="text-sm text-neutral-400">Prix unitaire : <PriceDisplay price={item.unitPrice} size="sm" /></p>
                  </div>
                  <PriceDisplay price={item.totalPrice} variant="emphasis" size="md" />
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-neutral-800/50 mt-2">
              <span className="font-semibold text-neutral-100">Total</span>
              <PriceDisplay price={order.totalAmount} variant="emphasis" size="lg" />
            </div>
          </section>

          {/* Adresses */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {addressList.map(({ label, addr }) => (
              <div key={label}>
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">{label}</h3>
                <address className="not-italic text-sm text-neutral-400 space-y-0.5">
                  <p>{addr.firstName} {addr.lastName}</p>
                  <p>{addr.address}</p>
                  <p>{addr.postalCode} {addr.city}</p>
                  <p>{addr.country}</p>
                </address>
              </div>
            ))}
          </section>

          {/* Informations de livraison */}
          {order.delivery && (
            <section className="mb-6 p-4 bg-neutral-900/50 rounded-lg border border-neutral-800/50">
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">Suivi de livraison</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-400">Statut de livraison :</span>
                  <span className={`text-sm font-medium ${getDeliveryStatusColor(order.delivery.status)}`}>
                    {getDeliveryStatusLabel(order.delivery.status)}
                  </span>
                </div>
                {order.delivery.deliveredAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-400">Date de livraison :</span>
                    <span className="text-sm font-medium text-neutral-100">
                      {new Date(order.delivery.deliveredAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Informations supplémentaires */}
          <section>
            <h3 className="text-sm font-semibold text-neutral-300 mb-2">Informations supplémentaires</h3>
            <div className="space-y-1.5">
              <p className="text-sm text-neutral-400">
                Méthode de paiement : <span className="font-medium text-neutral-100">{order.paymentMethod}</span>
              </p>
              {order.updatedAt && order.updatedAt !== order.createdAt && (
                <p className="text-sm text-neutral-400">
                  Dernière mise à jour : <span className="font-medium text-neutral-100">
                    {new Date(order.updatedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </p>
              )}
            </div>
            {order.customerNotes && (
              <div className="mt-2">
                <p className="text-sm font-medium text-neutral-300">Notes du client</p>
                <p className="text-sm text-neutral-400 mt-0.5">{order.customerNotes}</p>
              </div>
            )}
            {order.adminNotes && (
              <div className="mt-2">
                <p className="text-sm font-medium text-neutral-300">Notes de l'administration</p>
                <p className="text-sm text-neutral-400 mt-0.5">{order.adminNotes}</p>
              </div>
            )}
          </section>
        </CardBody>
      </Card>
    </>
  );
};


'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Order, OrderStatus } from '@/src/ecommerce/domain/entities/Order';
import { Card, CardHeader, CardTitle, CardBody } from '@/src/shared/components/atoms/Card';
import { OrderStatusBadge } from '@/src/shared/components/molecules/Order/OrderStatusBadge';
import { PriceDisplay } from '@/src/shared/components/atoms/PriceDisplay';
import { Button } from '@/src/shared/components/atoms';

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
            {[
              { label: 'Adresse de livraison', addr: order.shippingAddress },
              { label: 'Adresse de facturation', addr: order.billingAddress },
            ].map(({ label, addr }) => (
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

          {/* Informations supplémentaires */}
          <section>
            <h3 className="text-sm font-semibold text-neutral-300 mb-2">Informations supplémentaires</h3>
            <p className="text-sm text-neutral-400">
              Méthode de paiement : <span className="font-medium text-neutral-100">{order.paymentMethod}</span>
            </p>
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


'use client';

import React, { useState } from 'react';
import { AdminOrderList } from '@/src/ecommerce/presentation/components/organisms/AdminOrderList';
import { AdminOrderDetail } from '@/src/ecommerce/presentation/components/organisms/AdminOrderDetail';
import { Order } from '@/src/ecommerce/domain/entities/Order';

export default function AdminOrdersClient() {
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>();

  const handleView = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleUpdate = () => {
    setSelectedOrder(undefined);
    window.location.reload();
  };

  const handleClose = () => {
    setSelectedOrder(undefined);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Commandes</h1>

      {selectedOrder ? (
        <AdminOrderDetail
          orderId={selectedOrder.id}
          onUpdate={handleUpdate}
          onClose={handleClose}
        />
      ) : (
        <AdminOrderList onView={handleView} />
      )}
    </div>
  );
}

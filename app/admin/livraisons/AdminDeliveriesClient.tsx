'use client';

import React, { useState } from 'react';
import { AdminDeliveryList } from '@/src/ecommerce/presentation/components/organisms/Delivery/Admin/AdminDeliveryList';
import { AdminDeliveryDetail } from '@/src/ecommerce/presentation/components/organisms/Delivery/Admin/AdminDeliveryDetail';
import { Delivery } from '@/src/ecommerce/domain/entities/Devivery';
import { Pagination } from '@/src/shared/domain/Pagination';

interface AdminDeliveriesClientProps {
  initialDeliveries?: Delivery[];
  initialPagination?: Pagination;
}

export default function AdminDeliveriesClient({
  initialDeliveries = [],
  initialPagination,
}: AdminDeliveriesClientProps) {
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | undefined>();

  const handleView = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
  };

  const handleUpdate = () => {
    setSelectedDelivery(undefined);
    window.location.reload();
  };

  const handleClose = () => {
    setSelectedDelivery(undefined);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold bg-linear-to-r from-crimson-400 to-crimson-600 bg-clip-text text-transparent">Gestion des Livraisons</h1>

      {selectedDelivery ? (
        <AdminDeliveryDetail
          deliveryId={selectedDelivery.id}
          onUpdate={handleUpdate}
          onClose={handleClose}
        />
      ) : (
        <AdminDeliveryList 
          onView={handleView}
          initialDeliveries={initialDeliveries}
          initialPagination={initialPagination}
        />
      )}
    </div>
  );
}

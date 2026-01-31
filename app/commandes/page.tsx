'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/auth/presentation/context/AuthContext';
import { useEcommerce } from '@/src/ecommerce/presentation/context/EcommerceContext';
import { OrderList } from '@/src/ecommerce/presentation/components/OrderList';
import { Order } from '@/src/ecommerce/domain/entities/Order';

export default function CommandesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { getOrders } = useEcommerce();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/commandes');
    } else if (user) {
      loadOrders();
    }
  }, [user, authLoading, router]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response['hydra:member']);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Mes Commandes</h1>

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Votre commande a été passée avec succès !
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <OrderList orders={orders} loading={loading} />
    </div>
  );
}

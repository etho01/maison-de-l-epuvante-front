import { OrderStatus } from '@/src/ecommerce/domain/entities/Order';

/**
 * Labels métier des statuts de commande.
 * Centralise la connaissance domaine : chaque statut a un libellé humain.
 * Les couleurs/variants (présentation) sont dans la couche présentation :
 *   `src/ecommerce/presentation/constants/orderStatus.ts`
 */
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending:    'En attente',
  processing: 'En cours',
  paid:       'Payée',
  shipped:    'Expédiée',
  delivered:  'Livrée',
  cancelled:  'Annulée',
  refunded:   'Remboursée',
};

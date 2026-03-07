import { DeliveryStatus } from '@/src/ecommerce/domain/entities/Devivery';

/**
 * Labels métier des statuts de livraison.
 * Centralise la connaissance domaine : chaque statut a un libellé humain.
 * Les couleurs/variants (présentation) sont dans la couche présentation :
 *   `src/ecommerce/presentation/constants/deliveryStatus.ts`
 */
export const DELIVERY_STATUS_LABELS: Record<DeliveryStatus, string> = {
  [DeliveryStatus.PENDING]: 'En attente',
  [DeliveryStatus.PREPARING]: 'En préparation',
  [DeliveryStatus.SHIPPED]: 'Expédiée',
  [DeliveryStatus.IN_TRANSIT]: 'En transit',
  [DeliveryStatus.DELIVERED]: 'Livrée',
  [DeliveryStatus.FAILED]: 'Échec',
  [DeliveryStatus.CANCELLED]: 'Annulée',
};

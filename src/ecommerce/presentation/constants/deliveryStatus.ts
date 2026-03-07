/**
 * Constantes de présentation pour les statuts de livraison.
 *
 * Séparation des responsabilités :
 *  - Les LABELS (libellés métier) → domaine : `domain/constants/deliveryStatus.ts` › `DELIVERY_STATUS_LABELS`
 *  - Les VARIANTS/COULEURS       → ici (couche présentation)
 *
 * On n'importe jamais de classes CSS ou de logique d'affichage dans le domaine.
 */

import { BadgeVariant } from '@/src/shared/components/atoms/Badge';
import { DeliveryStatus } from '@/src/ecommerce/domain/entities/Devivery';

export const DELIVERY_STATUS_VARIANTS: Record<DeliveryStatus, BadgeVariant> = {
  [DeliveryStatus.PENDING]: 'warning',
  [DeliveryStatus.PREPARING]: 'info',
  [DeliveryStatus.SHIPPED]: 'secondary',
  [DeliveryStatus.IN_TRANSIT]: 'info',
  [DeliveryStatus.DELIVERED]: 'success',
  [DeliveryStatus.FAILED]: 'danger',
  [DeliveryStatus.CANCELLED]: 'ghost',
};

/**
 * Constantes de présentation pour les statuts de commande.
 *
 * Séparation des responsabilités :
 *  - Les LABELS (libellés métier) → domaine : `Order.ts` › `ORDER_STATUS_LABELS`
 *  - Les VARIANTS/COULEURS       → ici (couche présentation)
 *
 * On n'importe jamais de classes CSS ou de logique d'affichage dans le domaine.
 */

import { BadgeVariant } from '@/src/shared/components/atoms/Badge';
import { OrderStatus } from '@/src/ecommerce/domain/entities/Order';

export const ORDER_STATUS_VARIANTS: Record<OrderStatus, BadgeVariant> = {
  pending:    'warning',
  processing: 'info',
  paid:       'success',
  shipped:    'secondary',
  delivered:  'success',
  cancelled:  'danger',
  refunded:   'ghost',
};

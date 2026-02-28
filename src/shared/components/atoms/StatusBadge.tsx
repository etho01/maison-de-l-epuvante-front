/**
 * Component: StatusBadge
 * Atom - Badge de statut sémantique avec configurations métier prêtes à l'emploi.
 * Construit sur Badge, centralise les maps status → label/variant.
 *
 * Séparation des responsabilités :
 *  - Labels métier (ex: ORDER_STATUS_LABELS) → domaine de chaque bounded context
 *  - Variants/couleurs                        → ici (couche présentation partagée)
 */

import React from 'react';
import { Badge, BadgeVariant, BadgeSize } from './Badge';
import { ORDER_STATUS_LABELS } from '@/src/ecommerce/domain/constants/orderStatus';
import { ORDER_STATUS_VARIANTS } from '@/src/ecommerce/presentation/constants/orderStatus';

export interface StatusConfig {
  label: string;
  variant: BadgeVariant;
  icon?: string;
}

export interface StatusBadgeProps {
  status: string;
  /** Map statut → { label, variant, icon } */
  statusMap: Record<string, StatusConfig>;
  size?: BadgeSize;
  /** Configuration utilisée si le statut n'est pas dans la map */
  fallback?: StatusConfig;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  statusMap,
  size = 'sm',
  fallback = { label: status, variant: 'default' },
  className,
}) => {
  const config = statusMap[status] ?? fallback;

  return (
    <Badge variant={config.variant} size={size} className={className}>
      {config.icon && <span aria-hidden="true">{config.icon} </span>}
      {config.label}
    </Badge>
  );
};

// ── Configurations métier : labels viennent du domaine, variants de la présentation ──

export const ORDER_STATUS_MAP: Record<string, StatusConfig> = {
  pending:    { label: ORDER_STATUS_LABELS.pending,    variant: ORDER_STATUS_VARIANTS.pending,    icon: '⏳' },
  processing: { label: ORDER_STATUS_LABELS.processing, variant: ORDER_STATUS_VARIANTS.processing, icon: '🔄' },
  paid:       { label: ORDER_STATUS_LABELS.paid,       variant: ORDER_STATUS_VARIANTS.paid,       icon: '✅' },
  shipped:    { label: ORDER_STATUS_LABELS.shipped,    variant: ORDER_STATUS_VARIANTS.shipped,    icon: '📦' },
  delivered:  { label: ORDER_STATUS_LABELS.delivered,  variant: ORDER_STATUS_VARIANTS.delivered,  icon: '🏠' },
  cancelled:  { label: ORDER_STATUS_LABELS.cancelled,  variant: ORDER_STATUS_VARIANTS.cancelled,  icon: '❌' },
  refunded:   { label: ORDER_STATUS_LABELS.refunded,   variant: ORDER_STATUS_VARIANTS.refunded,   icon: '↩️' },
};

export const SUBSCRIPTION_STATUS_MAP: Record<string, StatusConfig> = {
  active:    { label: 'Actif',       variant: 'success', icon: '✅' },
  inactive:  { label: 'Inactif',     variant: 'default', icon: '⭕' },
  cancelled: { label: 'Annulé',      variant: 'danger',  icon: '❌' },
  expired:   { label: 'Expiré',      variant: 'warning', icon: '⌛' },
  pending:   { label: 'En attente',  variant: 'warning', icon: '⏳' },
};

export const PRODUCT_TYPE_MAP: Record<string, StatusConfig> = {
  physical: { label: 'Physique',   variant: 'info',      icon: '📦' },
  digital:  { label: 'Numérique',  variant: 'secondary', icon: '💾' },
  bundle:   { label: 'Bundle',     variant: 'warning',   icon: '🎁' },
};

export const STOCK_STATUS_MAP: Record<string, StatusConfig> = {
  in_stock:     { label: 'En stock',      variant: 'success', icon: '✅' },
  low_stock:    { label: 'Stock faible',  variant: 'warning', icon: '⚠️' },
  out_of_stock: { label: 'Rupture',       variant: 'danger',  icon: '❌' },
};

export default StatusBadge;

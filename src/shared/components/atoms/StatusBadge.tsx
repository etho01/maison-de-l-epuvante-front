/**
 * Component: StatusBadge
 * Atom - Badge de statut sémantique - Style professionnel
 */

import React from 'react';
import { Badge, BadgeVariant, BadgeSize } from './Badge';
import { ORDER_STATUS_LABELS } from '@/src/ecommerce/domain/constants/orderStatus';
import { ORDER_STATUS_VARIANTS } from '@/src/ecommerce/presentation/constants/orderStatus';

export interface StatusConfig {
  label: string;
  variant: BadgeVariant;
  icon?: React.ReactNode;
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
      {config.icon && <span aria-hidden="true">{config.icon}</span>}
      {config.label}
    </Badge>
  );
};

// ── Configurations métier : labels viennent du domaine, variants de la présentation ──

export const ORDER_STATUS_MAP: Record<string, StatusConfig> = {
  pending:    { label: ORDER_STATUS_LABELS.pending,    variant: ORDER_STATUS_VARIANTS.pending,    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg> },
  processing: { label: ORDER_STATUS_LABELS.processing, variant: ORDER_STATUS_VARIANTS.processing, icon: <svg className="w-3 h-3 animate-spin" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/></svg> },
  paid:       { label: ORDER_STATUS_LABELS.paid,       variant: ORDER_STATUS_VARIANTS.paid,       icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg> },
  shipped:    { label: ORDER_STATUS_LABELS.shipped,    variant: ORDER_STATUS_VARIANTS.shipped,    icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg> },
  delivered:  { label: ORDER_STATUS_LABELS.delivered,  variant: ORDER_STATUS_VARIANTS.delivered,  icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
  cancelled:  { label: ORDER_STATUS_LABELS.cancelled,  variant: ORDER_STATUS_VARIANTS.cancelled,  icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> },
  refunded:   { label: ORDER_STATUS_LABELS.refunded,   variant: ORDER_STATUS_VARIANTS.refunded,   icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg> },
};

export const SUBSCRIPTION_STATUS_MAP: Record<string, StatusConfig> = {
  active:    { label: 'Actif',       variant: 'success', icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg> },
  inactive:  { label: 'Inactif',     variant: 'default', icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/></svg> },
  cancelled: { label: 'Annulé',      variant: 'danger',  icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> },
  expired:   { label: 'Expiré',      variant: 'warning', icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg> },
  pending:   { label: 'En attente',  variant: 'warning', icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg> },
};

export const PRODUCT_TYPE_MAP: Record<string, StatusConfig> = {
  physical: { label: 'Physique',   variant: 'info',      icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z"/></svg> },
  digital:  { label: 'Numérique',  variant: 'secondary', icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/></svg> },
  bundle:   { label: 'Bundle',     variant: 'warning',   icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg> },
};

export const STOCK_STATUS_MAP: Record<string, StatusConfig> = {
  in_stock:     { label: 'En stock',      variant: 'success', icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg> },
  low_stock:    { label: 'Stock faible',  variant: 'warning', icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg> },
  out_of_stock: { label: 'Rupture',       variant: 'danger',  icon: <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> },
};

export default StatusBadge;

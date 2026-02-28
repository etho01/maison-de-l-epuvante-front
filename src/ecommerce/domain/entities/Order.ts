import { User } from '@/src/auth/domain/entities/User';
import { Product } from './Product';

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'paid' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export interface Address {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  user: User;
  items: OrderItem[];
  totalAmount: string;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  customerNotes: string | null;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutData {
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  customerNotes?: string;
  products: Array<{
    id: number;
    name: string;
    quantity: number;
    price: number;
  }>
  ;
}

export interface UpdateOrderData {
  status?: OrderStatus;
  adminNotes?: string;
}

export interface CheckoutResponse {
  message: string;
  id: number;
  order: {
    id: number;
    orderNumber: string;
    status: OrderStatus;
    totalAmount: number;
  };
  stripePayment: {
    paymentIntentId: string;
    clientSecret: string;
  };
}

/**
 * Labels métier des statuts de commande.
 * Centralise la connaissance domaine : chaque statut a un libellé humain.
 * Les couleurs/variants (présentation) sont dans la couche présentation.
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

export enum OrderError {
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  INVALID_QUANTITY = 'INVALID_QUANTITY',
}
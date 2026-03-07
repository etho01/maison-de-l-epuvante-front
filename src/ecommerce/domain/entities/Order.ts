import { User } from '@/src/auth/domain/entities/User';
import { Product } from './Product';
import { Delivery } from './Devivery';

export type OrderStatus = 
  | 'pending' 
  | 'processing' 
  | 'paid' 
  | 'shipped' 
  | 'delivered' 
  | 'cancelled' 
  | 'refunded';

export enum OrderStatusEnum {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

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
  billingAddress: Address;
  paymentMethod: string;
  customerNotes: string | null;
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
  delivery?: Delivery;
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
  stripeCheckout: {
    sessionId: string;
    url: string;
  };
}

export enum OrderError {
  ORDER_NOT_FOUND = 'ORDER_NOT_FOUND',
  INVALID_QUANTITY = 'INVALID_QUANTITY',
}
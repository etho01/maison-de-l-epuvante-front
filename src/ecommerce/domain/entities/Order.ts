
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
}

export interface UpdateOrderData {
  status?: OrderStatus;
  adminNotes?: string;
}

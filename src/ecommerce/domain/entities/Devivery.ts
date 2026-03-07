import { Address } from "./Order";

export enum DeliveryStatus {
    PENDING = 'pending',
    PREPARING = 'preparing',
    SHIPPED = 'shipped',
    IN_TRANSIT = 'in_transit',
    DELIVERED = 'delivered',
    FAILED = 'failed',
    CANCELLED = 'cancelled'
}

export interface DeliveryItem {
    id: number;
    productName: string;
    quantity: number;
    totalPrice: number;
    unitPrice: number;
}

export interface Delivery {
    id: number;
    deliveredAt: string;
    items: DeliveryItem[];
    status: DeliveryStatus;
    shippingAddress: Address;
}
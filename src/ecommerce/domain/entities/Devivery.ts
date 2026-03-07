import { Address } from "./Order";

export enum DeliveryStatus {
    PENDING = 'pending',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled'
}

export interface DeliveryItem {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

export interface Delivery {
    id: number;
    deliveredAt: string;
    items: DeliveryItem[];
    status: DeliveryStatus;
    shippingAddress: Address;
}
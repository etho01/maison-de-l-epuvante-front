import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { Delivery, DeliveryStatus } from '../entities/Devivery';

export interface IDeliveryRepository {
  getDeliveries(page?: number): Promise<PaginatedResponse<Delivery>>;
  getById(id: number): Promise<Delivery>;
  updateStatus(id: number, status: DeliveryStatus): Promise<Delivery>;
}

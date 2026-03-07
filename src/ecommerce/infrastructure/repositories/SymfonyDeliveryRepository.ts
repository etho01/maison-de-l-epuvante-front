import { serverApiClient } from '@/src/shared/infrastructure/api/ServerApiClient';
import { IDeliveryRepository } from '../../domain/repositories/IDeliveryRepository';
import { Delivery, DeliveryStatus } from '../../domain/entities/Devivery';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class SymfonyDeliveryRepository implements IDeliveryRepository {
  async getDeliveries(page?: number): Promise<PaginatedResponse<Delivery>> {
    const endpoint = page ? `/deliveries?page=${page}` : '/deliveries';
    return await serverApiClient.get<PaginatedResponse<Delivery>>(endpoint);
  }

  async getById(id: number): Promise<Delivery> {
    return await serverApiClient.get<Delivery>(`/deliveries/${id}`);
  }

  async updateStatus(id: number, status: DeliveryStatus): Promise<Delivery> {
    return await serverApiClient.post<Delivery>(`/deliveries/${id}/status`, { status });
  }
}

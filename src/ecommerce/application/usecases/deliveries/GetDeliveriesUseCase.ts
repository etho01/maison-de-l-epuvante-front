import { IDeliveryRepository } from '../../../domain/repositories/IDeliveryRepository';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { Delivery } from '../../../domain/entities/Devivery';

export class GetDeliveriesUseCase {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  async execute(page?: number): Promise<PaginatedResponse<Delivery>> {
    return await this.deliveryRepository.getDeliveries(page);
  }
}

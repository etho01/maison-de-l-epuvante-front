import { IDeliveryRepository } from '../../../domain/repositories/IDeliveryRepository';
import { Delivery, DeliveryStatus } from '../../../domain/entities/Devivery';

export class UpdateDeliveryStatusUseCase {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  async execute(id: number, status: DeliveryStatus): Promise<Delivery> {
    return await this.deliveryRepository.updateStatus(id, status);
  }
}

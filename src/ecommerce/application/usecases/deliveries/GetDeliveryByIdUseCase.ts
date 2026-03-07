import { IDeliveryRepository } from '../../../domain/repositories/IDeliveryRepository';
import { Delivery } from '../../../domain/entities/Devivery';

export class GetDeliveryByIdUseCase {
  constructor(private deliveryRepository: IDeliveryRepository) {}

  async execute(id: number): Promise<Delivery> {
    return await this.deliveryRepository.getById(id);
  }
}

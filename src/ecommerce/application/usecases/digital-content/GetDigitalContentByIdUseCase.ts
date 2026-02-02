import { IDigitalContentRepository } from '../../../domain/repositories/IDigitalContentRepository';
import { DigitalContent } from '../../../domain/entities/DigitalContent';

export class GetDigitalContentByIdUseCase {
  constructor(private digitalContentRepository: IDigitalContentRepository) {}

  async execute(id: number): Promise<DigitalContent> {
    return await this.digitalContentRepository.getById(id);
  }
}

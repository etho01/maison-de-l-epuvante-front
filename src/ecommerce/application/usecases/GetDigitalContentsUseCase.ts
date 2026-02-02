import { IDigitalContentRepository, PaginatedResponse } from '../../domain/repositories/IDigitalContentRepository';
import { DigitalContent } from '../../domain/entities/DigitalContent';

export class GetDigitalContentsUseCase {
  constructor(private digitalContentRepository: IDigitalContentRepository) {}

  async execute(page?: number): Promise<PaginatedResponse<DigitalContent>> {
    return await this.digitalContentRepository.getDigitalContents(page);
  }
}

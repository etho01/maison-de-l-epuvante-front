import { IDigitalContentRepository } from '../../../domain/repositories/IDigitalContentRepository';
import { DigitalContent } from '../../../domain/entities/DigitalContent';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

export class GetDigitalContentsUseCase {
  constructor(private digitalContentRepository: IDigitalContentRepository) {}

  async execute(page?: number): Promise<PaginatedResponse<DigitalContent>> {
    return await this.digitalContentRepository.getDigitalContents(page);
  }
}

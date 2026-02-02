import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { DigitalContent } from '../entities/DigitalContent';

export interface IDigitalContentRepository {
  getDigitalContents(page?: number): Promise<PaginatedResponse<DigitalContent>>;
  getById(id: number): Promise<DigitalContent>;
  download(id: number): Promise<Blob>;
}

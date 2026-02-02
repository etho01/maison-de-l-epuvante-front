import { DigitalContent } from '../entities/DigitalContent';
import { PaginatedResponse } from './IProductRepository';

export interface IDigitalContentRepository {
  getDigitalContents(page?: number): Promise<PaginatedResponse<DigitalContent>>;
  getById(id: number): Promise<DigitalContent>;
  download(id: number): Promise<Blob>;
}

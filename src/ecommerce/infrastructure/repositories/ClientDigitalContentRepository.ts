import { IDigitalContentRepository } from '../../domain/repositories/IDigitalContentRepository';
import { DigitalContent } from '../../domain/entities/DigitalContent';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';
import { ClientApiClient } from '@/src/shared/infrastructure/api/ClientApiClient';

export class ClientDigitalContentRepository implements IDigitalContentRepository {
  private client: ClientApiClient;

  constructor() {
    this.client = new ClientApiClient('/api/ecommerce');
  }

  async getDigitalContents(page?: number): Promise<PaginatedResponse<DigitalContent>> {
    const endpoint = page ? `/digital-contents?page=${page}` : '/digital-contents';
    return await this.client.get<PaginatedResponse<DigitalContent>>(endpoint);
  }

  async getById(id: number): Promise<DigitalContent> {
    return await this.client.get<DigitalContent>(`/digital-contents/${id}`);
  }

  async download(id: number): Promise<Blob> {
    return await this.client.downloadFile(`/digital-contents/${id}/download`);
  }
}

import { IDigitalContentRepository } from '../../domain/repositories/IDigitalContentRepository';
import { PaginatedResponse } from '../../domain/repositories/IProductRepository';
import { DigitalContent } from '../../domain/entities/DigitalContent';

export class ClientDigitalContentRepository implements IDigitalContentRepository {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api/ecommerce';
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  }

  async getAll(page?: number): Promise<PaginatedResponse<DigitalContent>> {
    const endpoint = page ? `/digital-contents?page=${page}` : '/digital-contents';
    return await this.request<PaginatedResponse<DigitalContent>>(endpoint);
  }

  async getById(id: number): Promise<DigitalContent> {
    return await this.request<DigitalContent>(`/digital-contents/${id}`);
  }

  async download(id: number): Promise<Blob> {
    const url = `${this.baseURL}/digital-contents/${id}/download`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement');
    }

    return await response.blob();
  }
}

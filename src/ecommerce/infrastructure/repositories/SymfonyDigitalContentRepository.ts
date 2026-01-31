import { apiClient } from '@/src/auth/infrastructure/api/apiClient';
import { IDigitalContentRepository } from '../../domain/repositories/IDigitalContentRepository';
import { PaginatedResponse } from '../../domain/repositories/IProductRepository';
import { DigitalContent } from '../../domain/entities/DigitalContent';

export class SymfonyDigitalContentRepository implements IDigitalContentRepository {
  async getAll(page?: number): Promise<PaginatedResponse<DigitalContent>> {
    const endpoint = page ? `/digital-contents?page=${page}` : '/digital-contents';
    return await apiClient.get<PaginatedResponse<DigitalContent>>(endpoint);
  }

  async getById(id: number): Promise<DigitalContent> {
    return await apiClient.get<DigitalContent>(`/digital-contents/${id}`);
  }

  async download(id: number): Promise<Blob> {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const url = `${baseURL}/digital-contents/${id}/download`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await this.getToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement');
    }

    return await response.blob();
  }

  private async getToken(): Promise<string | undefined> {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token') || undefined;
    }
    return undefined;
  }
}

/**
 * Tests unitaires — GetProductsUseCase
 * Vérifie la logique de récupération des produits
 */

import { GetProductsUseCase } from '@/src/ecommerce/application/usecases/products/GetProductsUseCase';
import { IProductRepository } from '@/src/ecommerce/domain/repositories/IProductRepository';
import { Product, ProductType } from '@/src/ecommerce/domain/entities/Product';
import { PaginatedResponse } from '@/src/shared/domain/Pagination';

// Mock du repository
class MockProductRepository implements Partial<IProductRepository> {
  async getProducts(): Promise<PaginatedResponse<Product>> {
    return {
      member: [
        {
          id: 1,
          name: 'Figurine Evil Ed',
          description: 'Figurine collector exclusive',
          slug: 'figurine-evil-ed',
          price: 29.99,
          stock: 10,
          type: ProductType.PHYSICAL,
          sku: 'FIG-001',
          category: { id: 1, name: 'Figurines', slug: 'figurines' },
          active: true,
          exclusiveOnline: true,
          images: ['image1.jpg'],
          weight: 250,
          metadata: {},
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        } as Product,
      ],
      totalItems: 1,
      view: {
        first: 1,
        last: 1,
        current: 1,
        next: null,
        previous: null,
      },
    };
  }
}

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();
    useCase = new GetProductsUseCase(mockRepository as IProductRepository);
  });

  describe('Récupération des produits', () => {
    it('devrait retourner une liste paginée de produits', async () => {
      const result = await useCase.execute();

      expect(result).toHaveProperty('member');
      expect(result).toHaveProperty('totalItems');
      expect(result).toHaveProperty('view');
      expect(Array.isArray(result.member)).toBe(true);
      expect(result.totalItems).toBe(1);
    });

    it('devrait retourner les produits avec toutes les propriétés', async () => {
      const result = await useCase.execute();
      const product = result.member[0];

      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('slug');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('stock');
      expect(product).toHaveProperty('type');
      expect(product).toHaveProperty('sku');
      expect(product).toHaveProperty('category');
      expect(product).toHaveProperty('active');
    });

    it('devrait accepter des filtres optionnels', async () => {
      const filters = { page: 1, categoryId: 1 };
      const result = await useCase.execute(filters);

      expect(result).toBeDefined();
      expect(result.member).toHaveLength(1);
    });
  });

  describe('Pagination', () => {
    it('devrait retourner les informations de pagination', async () => {
      const result = await useCase.execute();

      expect(result.view).toHaveProperty('first');
      expect(result.view).toHaveProperty('last');
      expect(result.view).toHaveProperty('current');
      expect(result.view.current).toBe(1);
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait propager les erreurs du repository', async () => {
      const errorRepository = {
        getProducts: jest.fn().mockRejectedValue(new Error('Database error')),
      } as unknown as IProductRepository;

      const useCaseWithError = new GetProductsUseCase(errorRepository);

      await expect(useCaseWithError.execute()).rejects.toThrow('Database error');
    });
  });
});

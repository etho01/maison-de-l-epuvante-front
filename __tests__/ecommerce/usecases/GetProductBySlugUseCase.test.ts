/**
 * Tests unitaires — GetProductBySlugUseCase
 * Vérifie la logique de récupération d'un produit par slug
 */

import { GetProductBySlugUseCase } from '@/src/ecommerce/application/usecases/products/GetProductBySlugUseCase';
import { IProductRepository } from '@/src/ecommerce/domain/repositories/IProductRepository';
import { Product, ProductType } from '@/src/ecommerce/domain/entities/Product';

// Mock du repository
class MockProductRepository implements Partial<IProductRepository> {
  async getBySlug(slug: string): Promise<Product> {
    if (slug === 'inexistant') {
      throw new Error('Product not found');
    }

    return {
      id: 1,
      name: 'Figurine Evil Ed',
      description: 'Figurine collector exclusive',
      slug: slug,
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
    } as Product;
  }
}

describe('GetProductBySlugUseCase', () => {
  let useCase: GetProductBySlugUseCase;
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();
    useCase = new GetProductBySlugUseCase(mockRepository as IProductRepository);
  });

  describe('Récupération d\'un produit', () => {
    it('devrait retourner un produit par son slug', async () => {
      const result = await useCase.execute('figurine-evil-ed');

      expect(result).toBeDefined();
      expect(result.slug).toBe('figurine-evil-ed');
      expect(result.name).toBe('Figurine Evil Ed');
    });

    it('devrait retourner un produit avec toutes les propriétés', async () => {
      const result = await useCase.execute('figurine-evil-ed');

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('price');
      expect(result).toHaveProperty('stock');
      expect(result).toHaveProperty('category');
      expect(result.category).toHaveProperty('id');
      expect(result.category).toHaveProperty('name');
    });

    it('devrait accepter des slugs avec tirets', async () => {
      const result = await useCase.execute('ma-super-figurine');

      expect(result).toBeDefined();
      expect(result.slug).toBe('ma-super-figurine');
    });

    it('devrait accepter des slugs avec chiffres', async () => {
      const result = await useCase.execute('figurine-123');

      expect(result).toBeDefined();
      expect(result.slug).toBe('figurine-123');
    });
  });

  describe('Validation', () => {
    it('devrait rejeter si slug est vide', async () => {
      await expect(useCase.execute('')).rejects.toThrow('Le slug est requis');
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait lever une erreur si le produit n\'existe pas', async () => {
      await expect(useCase.execute('inexistant')).rejects.toThrow('Product not found');
    });

    it('devrait propager les erreurs du repository', async () => {
      const errorRepository = {
        getBySlug: jest.fn().mockRejectedValue(new Error('Database connection failed')),
      } as unknown as IProductRepository;

      const useCaseWithError = new GetProductBySlugUseCase(errorRepository);

      await expect(useCaseWithError.execute('test')).rejects.toThrow(
        'Database connection failed'
      );
    });
  });
});

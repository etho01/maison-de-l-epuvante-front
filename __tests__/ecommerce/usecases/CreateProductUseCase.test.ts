/**
 * Tests unitaires — CreateProductUseCase
 * Vérifie la logique de création de produits
 */

import { CreateProductUseCase } from '@/src/ecommerce/application/usecases/products/CreateProductUseCase';
import { IProductRepository } from '@/src/ecommerce/domain/repositories/IProductRepository';
import { Product, ProductType, CreateProductData } from '@/src/ecommerce/domain/entities/Product';

// Mock du repository
class MockProductRepository implements Partial<IProductRepository> {
  async create(data: CreateProductData): Promise<Product> {
    return {
      id: 1,
      ...data,
      images: data.images || [],
      metadata: data.metadata || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Product;
  }
}

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase;
  let mockRepository: MockProductRepository;

  beforeEach(() => {
    mockRepository = new MockProductRepository();
    useCase = new CreateProductUseCase(mockRepository as IProductRepository);
  });

  const validProductData: CreateProductData = {
    name: 'Nouvelle Figurine',
    description: 'Description détaillée',
    slug: 'nouvelle-figurine',
    price: 39.99,
    stock: 20,
    type: ProductType.PHYSICAL,
    sku: 'FIG-002',
    categoryId: 1,
    active: true,
    exclusiveOnline: false,
  };

  describe('Création de produit', () => {
    it('devrait créer un produit avec des données valides', async () => {
      const result = await useCase.execute(validProductData);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(validProductData.name);
      expect(result.slug).toBe(validProductData.slug);
      expect(result.price).toBe(validProductData.price);
    });

    it('devrait créer un produit physique', async () => {
      const result = await useCase.execute({
        ...validProductData,
        type: ProductType.PHYSICAL,
        weight: 300,
      });

      expect(result.type).toBe(ProductType.PHYSICAL);
    });

    it('devrait créer un produit numérique', async () => {
      const result = await useCase.execute({
        ...validProductData,
        type: ProductType.DIGITAL,
        weight: null,
      });

      expect(result.type).toBe(ProductType.DIGITAL);
    });

    it('devrait créer un produit exclusif en ligne', async () => {
      const result = await useCase.execute({
        ...validProductData,
        exclusiveOnline: true,
      });

      expect(result.exclusiveOnline).toBe(true);
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait propager les erreurs du repository', async () => {
      const errorRepository = {
        create: jest.fn().mockRejectedValue(new Error('SKU already exists')),
      } as unknown as IProductRepository;

      const useCaseWithError = new CreateProductUseCase(errorRepository);

      await expect(useCaseWithError.execute(validProductData)).rejects.toThrow(
        'SKU already exists'
      );
    });
  });
});

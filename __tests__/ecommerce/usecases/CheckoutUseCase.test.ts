/**
 * Tests unitaires — CheckoutUseCase
 * Vérifie la logique de passage de commande
 */

import { CheckoutUseCase } from '@/src/ecommerce/application/usecases/orders/CheckoutUseCase';
import { IOrderRepository } from '@/src/ecommerce/domain/repositories/IOrderRepository';
import { CheckoutData, CheckoutResponse, OrderStatusEnum } from '@/src/ecommerce/domain/entities/Order';

// Mock du repository
class MockOrderRepository implements Partial<IOrderRepository> {
  async checkout(data: CheckoutData): Promise<CheckoutResponse> {
    return {
      message: 'Order created successfully',
      id: 1,
      order: {
        id: 1,
        orderNumber: 'ORD-001',
        status: OrderStatusEnum.PENDING,
        totalAmount: data.products.reduce((sum, item) => sum + item.price * item.quantity, 0),
      },
      stripeCheckout: {
        sessionId: 'session_123',
        url: 'https://stripe.com/payment/session_123',
      },
    };
  }
}

describe('CheckoutUseCase', () => {
  let useCase: CheckoutUseCase;
  let mockRepository: MockOrderRepository;

  beforeEach(() => {
    mockRepository = new MockOrderRepository();
    useCase = new CheckoutUseCase(mockRepository as IOrderRepository);
  });

  const validCheckoutData: CheckoutData = {
    products: [
      { id: 1, name: 'Produit 1', quantity: 2, price: 29.99 },
      { id: 2, name: 'Produit 2', quantity: 1, price: 19.99 },
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Rue de l\'Horreur',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
    },
    billingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Rue de l\'Horreur',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
    },
    paymentMethod: 'card',
  };

  describe('Passage de commande', () => {
    it('devrait créer une commande avec des données valides', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('order');
      expect(result.order).toHaveProperty('status');
      expect(result.order).toHaveProperty('totalAmount');
      expect(result.stripeCheckout).toHaveProperty('url');
    });

    it('devrait retourner un ID de commande', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result.order.id).toBeDefined();
      expect(typeof result.order.id).toBe('number');
      expect(result.order.id).toBeGreaterThan(0);
    });

    it('devrait calculer le montant total correct', async () => {
      const result = await useCase.execute(validCheckoutData);

      // 2 * 29.99 + 1 * 19.99 = 79.97
      expect(result.order.totalAmount).toBe(79.97);
    });

    it('devrait retourner une URL de paiement', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result.stripeCheckout.url).toBeDefined();
      expect(typeof result.stripeCheckout.url).toBe('string');
      expect(result.stripeCheckout.url).toContain('stripe.com');
    });

    it('devrait retourner un statut PENDING', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result.order.status).toBe(OrderStatusEnum.PENDING);
    });
  });

  describe('Gestion des articles', () => {
    it('devrait accepter une commande avec un seul article', async () => {
      const singleItemData: CheckoutData = {
        ...validCheckoutData,
        products: [{ id: 1, name: 'Produit 1', quantity: 1, price: 29.99 }],
      };

      const result = await useCase.execute(singleItemData);

      expect(result.order.totalAmount).toBe(29.99);
    });

    it('devrait accepter une commande avec plusieurs quantités', async () => {
      const multiQuantityData: CheckoutData = {
        ...validCheckoutData,
        products: [{ id: 1, name: 'Produit 1', quantity: 5, price: 10.0 }],
      };

      const result = await useCase.execute(multiQuantityData);

      expect(result.order.totalAmount).toBe(50.0);
    });
  });

  describe('Adresse de livraison', () => {
    it('devrait accepter une adresse française', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result).toBeDefined();
    });

    it('devrait accepter une adresse avec code postal', async () => {
      const dataWithPostal: CheckoutData = {
        ...validCheckoutData,
        shippingAddress: {
          ...validCheckoutData.shippingAddress,
          postalCode: '75001',
        },
      };

      const result = await useCase.execute(dataWithPostal);

      expect(result).toBeDefined();
    });
  });

  describe('Gestion des erreurs', () => {
    it('devrait propager les erreurs du repository', async () => {
      const errorRepository = {
        checkout: jest.fn().mockRejectedValue(new Error('Payment failed')),
      } as unknown as IOrderRepository;

      const useCaseWithError = new CheckoutUseCase(errorRepository);

      await expect(useCaseWithError.execute(validCheckoutData)).rejects.toThrow(
        'Payment failed'
      );
    });

    it('devrait gérer les erreurs de stock insuffisant', async () => {
      const errorRepository = {
        checkout: jest.fn().mockRejectedValue(new Error('Insufficient stock')),
      } as unknown as IOrderRepository;

      const useCaseWithError = new CheckoutUseCase(errorRepository);

      await expect(useCaseWithError.execute(validCheckoutData)).rejects.toThrow(
        'Insufficient stock'
      );
    });
  });
});

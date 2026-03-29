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
      orderId: 1,
      status: OrderStatusEnum.PENDING,
      totalAmount: data.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      paymentUrl: 'https://stripe.com/payment/session_123',
      message: 'Order created successfully',
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
    items: [
      {
        productId: 1,
        quantity: 2,
        price: 29.99,
      },
      {
        productId: 2,
        quantity: 1,
        price: 19.99,
      },
    ],
    shippingAddress: {
      street: '123 Rue de l\'Horreur',
      city: 'Paris',
      postalCode: '75001',
      country: 'France',
    },
    paymentMethodId: 'pm_card_visa',
  };

  describe('Passage de commande', () => {
    it('devrait créer une commande avec des données valides', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('orderId');
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('totalAmount');
      expect(result).toHaveProperty('paymentUrl');
    });

    it('devrait retourner un ID de commande', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result.orderId).toBeDefined();
      expect(typeof result.orderId).toBe('number');
      expect(result.orderId).toBeGreaterThan(0);
    });

    it('devrait calculer le montant total correct', async () => {
      const result = await useCase.execute(validCheckoutData);

      // 2 * 29.99 + 1 * 19.99 = 79.97
      expect(result.totalAmount).toBe(79.97);
    });

    it('devrait retourner une URL de paiement', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result.paymentUrl).toBeDefined();
      expect(typeof result.paymentUrl).toBe('string');
      expect(result.paymentUrl).toContain('stripe.com');
    });

    it('devrait retourner un statut PENDING', async () => {
      const result = await useCase.execute(validCheckoutData);

      expect(result.status).toBe(OrderStatusEnum.PENDING);
    });
  });

  describe('Gestion des articles', () => {
    it('devrait accepter une commande avec un seul article', async () => {
      const singleItemData: CheckoutData = {
        ...validCheckoutData,
        items: [{ productId: 1, quantity: 1, price: 29.99 }],
      };

      const result = await useCase.execute(singleItemData);

      expect(result.totalAmount).toBe(29.99);
    });

    it('devrait accepter une commande avec plusieurs quantités', async () => {
      const multiQuantityData: CheckoutData = {
        ...validCheckoutData,
        items: [{ productId: 1, quantity: 5, price: 10.0 }],
      };

      const result = await useCase.execute(multiQuantityData);

      expect(result.totalAmount).toBe(50.0);
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

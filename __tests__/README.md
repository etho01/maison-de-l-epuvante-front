# Tests — La Petite Maison de l'Épouvante

Ce dossier contient les tests unitaires et d'intégration du projet.

## Structure

```
__tests__/
├── auth/
│   └── usecases/
│       ├── LoginUseCase.test.ts
│       ├── RegisterUseCase.test.ts
│       └── ChangePasswordUseCase.test.ts
│
└── ecommerce/
    └── usecases/
        ├── GetProductsUseCase.test.ts
        ├── GetProductBySlugUseCase.test.ts
        ├── CreateProductUseCase.test.ts
        └── CheckoutUseCase.test.ts
```

## Lancer les tests

```bash
# Tous les tests
npm test

# Tests en mode watch (développement)
npm run test:watch

# Tests avec coverage
npm run test:coverage
```

## Philosophie

- **Use Cases** : tests unitaires avec mocks des repositories
- **Isolation** : chaque test est indépendant
- **Clarity** : noms de tests descriptifs en français
- **Coverage** : viser 80%+ sur les Use Cases critiques

## Conventions

### Structure d'un test de Use Case

```typescript
describe('NomDuUseCase', () => {
  let useCase: NomDuUseCase;
  let mockRepository: MockRepository;

  beforeEach(() => {
    // Setup
  });

  describe('Scénario 1', () => {
    it('devrait faire quelque chose', async () => {
      // Test
    });
  });
});
```

### Mocks

Les repositories sont mockés avec des classes implémentant partiellement l'interface :

```typescript
class MockRepository implements Partial<IRepository> {
  async method(): Promise<Result> {
    return mockData;
  }
}
```

## Couverture actuelle

- **Auth** : LoginUseCase, RegisterUseCase, ChangePasswordUseCase
- **Ecommerce** : GetProductsUseCase, GetProductBySlugUseCase, CreateProductUseCase, CheckoutUseCase

## Tests à ajouter

- [ ] UpdateProductUseCase
- [ ] DeleteProductUseCase
- [ ] GetOrdersUseCase
- [ ] SubscribeUseCase
- [ ] Components critiques (AuthGuard, ProductCard, etc.)

## Ressources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Clean Architecture Testing](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

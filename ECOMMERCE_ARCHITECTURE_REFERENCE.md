# Architecture E-commerce - Référence Complète

## 📐 Clean Architecture (4 couches)

### Domain Layer (`src/ecommerce/domain/`)
**Entités métier pures**
- `Product.ts` - Produits (physical, digital, subscription)
- `Category.ts` - Catégories
- `Order.ts` - Commandes avec items et adresses
- `Cart.ts` - Panier client-side
- `SubscriptionPlan.ts` - Plans d'abonnement
- `Subscription.ts` - Abonnements utilisateurs
- `DigitalContent.ts` - Contenus numériques

**Interfaces repositories**
- `IProductRepository.ts`
- `ICategoryRepository.ts`
- `IOrderRepository.ts`
- `ISubscriptionRepository.ts`
- etc.

### Application Layer (`src/ecommerce/application/usecases/`)
**Use cases - Logique métier pure**
- `GetProductsUseCase` - Récupérer produits avec filtres
- `GetProductByIdUseCase` - Détails d'un produit
- `CheckoutUseCase` - Passer une commande
- `SubscribeUseCase` - S'abonner à un plan
- `GetOrdersUseCase` - Historique des commandes
- Etc.

**Principe**: Un use case = une action métier

### Infrastructure Layer (`src/ecommerce/infrastructure/`)

#### 🔄 DUAL REPOSITORY PATTERN (Clé de l'architecture)

**1. SymfonyRepository (Server-Side)**
```
infrastructure/repositories/
  ├── SymfonyProductRepository.ts
  ├── SymfonyCategoryRepository.ts
  ├── SymfonyOrderRepository.ts
  └── ...
```
- **Utilisé par**: Server Components Next.js (pages)
- **Appelle**: Directement l'API Symfony Backend
- **Environnement**: Node.js (SSR)
- **Avantages**: Performance (pas de round-trip), SEO

**2. ClientRepository (Client-Side)**
```
infrastructure/repositories/
  ├── ClientProductRepository.ts
  ├── ClientCategoryRepository.ts
  ├── ClientOrderRepository.ts
  └── ...
```
- **Utilisé par**: Client Components React
- **Appelle**: API Routes Next.js (`/api/ecommerce/*`)
- **Environnement**: Navigateur
- **Avantages**: Interactions utilisateur, état réactif

### Presentation Layer (`src/ecommerce/presentation/`)

#### Components (Atomic Design)

**Atoms** (`components/atoms/`)
- Composants indivisibles
- Shared: PriceDisplay, Badge, StockIndicator, QuantitySelector, Card
- E-commerce: AddToCartButton, ProductTypeBadge
- **Règle**: Ne dépendent d'aucun autre composant

**Molecules** (`components/molecules/`)
- Groupes simples de composants
- Shared: ProductImage, FilterSection, OrderStatusBadge, CartItem, OrderCard
- E-commerce: ProductCard, ProductFilters, SubscriptionPlanCard
- **Règle**: Peuvent utiliser atoms, pas d'autres molecules

**Organisms** (`components/organisms/`)
- Sections complexes et complètes
- ProductList, ProductCatalog, CartSummary, OrderList, CheckoutForm, OrdersManager, ProductDetailView, SubscriptionPlansView
- **Règle**: Peuvent utiliser atoms, molecules, et autres organisms

#### Context (`presentation/context/`)

**EcommerceContext**
- Fournit l'accès aux use cases côté client
- Utilise **ClientRepository**
- Méthodes: getProducts(), checkout(), subscribe(), etc.

**CartContext**
- Gestion d'état du panier
- Persistance localStorage
- Méthodes: addToCart(), removeFromCart(), updateQuantity(), clearCart()

#### Hooks (`presentation/hooks/`)
- Hooks personnalisés pour logique réutilisable
- Séparent la logique métier de l'UI
- Exemples: useProductFilters, useCart, usePagination

#### ViewModels (`presentation/viewmodels/`)
- Transformation des données pour l'affichage
- Logique de présentation isolée
- Calculs dérivés, formatage, agrégation
- **Principe**: Séparer la logique de présentation des composants

## 🔄 Flux de données complet

### 1. Chargement initial (SSR)
```
Page (Server Component)
  └→ new SymfonyXxxRepository()
     └→ new XxxUseCase(repository)
        └→ useCase.execute()
           └→ API Symfony directe
              └→ Données en props au Client Component
```

**Exemple concret:**
```tsx
// app/produits/page.tsx (Server Component)
const productRepository = new SymfonyProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);
const products = await getProductsUseCase.execute(); // SSR

return <ProductCatalog initialProducts={products} />;
```

### 2. Interactions client (CSR)
```
Client Component
  └→ useEcommerce() / useCart()
     └→ Context avec ClientRepository
        └→ API Route Next.js (/api/ecommerce/*)
           └→ Proxy vers Symfony
              └→ Réponse → État React
```

**Exemple concret:**
```tsx
// Composant client
const { getProducts } = useEcommerce(); // ClientRepository

const handleFilter = async () => {
  const products = await getProducts(filters);
  setProducts(products);
};
```

### 3. API Routes (Proxy)
```
app/api/ecommerce/
├── products/route.ts
├── categories/route.ts
├── orders/
│   ├── route.ts
│   └── checkout/route.ts
└── ...
```

**Rôle**: Proxy entre client et Symfony
- Gestion des cookies (authentification)
- Validation côté serveur
- Transformation des requêtes/réponses

## 🎨 Principes d'Architecture

### 1. Séparation Server/Client
- **Server Components**: Chargement initial via SymfonyRepository
- **Client Components**: Interactions via ClientRepository + Context

### 2. Atomic Design
- **Réutilisabilité**: atoms → molecules → organisms
- **Shared vs Module**: Composants shared/ vs ecommerce/
- **DRY**: Logique centralisée dans composants dédiés

### 3. Repository Pattern
- **Interface unique**: IProductRepository
- **Deux implémentations**: Symfony (SSR) + Client (CSR)
- **Use cases agnostiques**: Fonctionnent avec n'importe quelle implémentation

### 4. Presentation Pattern
- **ViewModels**: Transformation données → présentation
- **Hooks**: Logique réutilisable isolée
- **Context**: État global accessible
- **Components**: UI pure avec props

### 5. Type Safety
- TypeScript strict sur toutes les couches
- Interfaces bien définies
- Props typées explicitement

## 📦 Structure de fichiers complète

```
src/ecommerce/
├── domain/
│   ├── entities/
│   │   ├── Product.ts
│   │   ├── Category.ts
│   │   ├── Order.ts
│   │   └── ...
│   └── repositories/
│       ├── IProductRepository.ts
│       ├── ICategoryRepository.ts
│       └── ...
├── application/
│   └── usecases/
│       ├── products/
│       │   ├── GetProductsUseCase.ts
│       │   └── GetProductByIdUseCase.ts
│       ├── orders/
│       │   └── CheckoutUseCase.ts
│       └── ...
├── infrastructure/
│   └── repositories/
│       ├── SymfonyProductRepository.ts    # Server-side
│       ├── ClientProductRepository.ts     # Client-side
│       ├── SymfonyCategoryRepository.ts
│       ├── ClientCategoryRepository.ts
│       └── ...
└── presentation/
    ├── components/
    │   ├── atoms/
    │   │   ├── AddToCartButton.tsx
    │   │   ├── ProductTypeBadge.tsx
    │   │   └── index.ts
    │   ├── molecules/
    │   │   ├── ProductCard.tsx
    │   │   ├── ProductFilters.tsx
    │   │   └── index.ts
    │   └── organisms/
    │       ├── ProductCatalog.tsx
    │       ├── CartSummary.tsx
    │       └── index.ts
    ├── context/
    │   ├── EcommerceContext.tsx  # Use cases client-side
    │   └── CartContext.tsx        # État panier
    ├── hooks/
    │   └── useProductFilters.ts
    └── viewmodels/
        └── ProductViewModel.ts

app/
├── produits/
│   ├── page.tsx              # Server Component (SymfonyRepository)
│   └── [slug]/page.tsx
├── panier/
│   ├── page.tsx
│   └── checkout/page.tsx
└── api/ecommerce/            # API Routes (Proxy)
    ├── products/route.ts
    ├── categories/route.ts
    └── orders/
        ├── route.ts
        └── checkout/route.ts
```

## 🎯 Patterns à suivre pour futures fonctionnalités

### Ajouter une nouvelle entité

1. **Domain**: Créer entité + interface repository
2. **Application**: Créer use cases
3. **Infrastructure**: 
   - SymfonyXxxRepository (SSR)
   - ClientXxxRepository (CSR)
4. **Presentation**:
   - Atoms/Molecules/Organisms selon besoin
   - Ajouter au Context si nécessaire
   - Créer hooks/viewmodels si logique complexe
5. **API Routes**: Créer route proxy
6. **Page**: Server Component avec SymfonyRepository

### Ajouter un composant

1. Identifier le niveau (atom/molecule/organism)
2. Déterminer si shared ou module-specific
3. Utiliser composants existants en priorité
4. Créer variantes plutôt que nouveaux composants
5. Exporter via index.ts
6. Documenter les props TypeScript

### Ajouter une interaction client

1. Ajouter méthode dans ClientRepository
2. Exposer via Context
3. Utiliser dans composant via hook (useEcommerce/useCart)
4. Créer API Route si nouvelle route nécessaire

## ✅ Checklist de cohérence

Pour toute nouvelle fonctionnalité e-commerce:

- [ ] Entité domain définie avec interface
- [ ] Use case créé (logique métier)
- [ ] SymfonyRepository implémenté (SSR)
- [ ] ClientRepository implémenté (CSR)
- [ ] API Route créée (proxy)
- [ ] Components suivent Atomic Design
- [ ] Context mis à jour si nécessaire
- [ ] Hooks créés pour logique réutilisable
- [ ] ViewModel si transformation complexe
- [ ] TypeScript strict respecté
- [ ] Exports dans index.ts

## 🔑 Points clés à retenir

1. **Dual Repository**: Toujours 2 implémentations (Symfony + Client)
2. **SSR First**: Chargement initial via Server Components
3. **Context pour interactions**: Client Components utilisent Context
4. **Atomic Design strict**: Respecter hiérarchie atoms → molecules → organisms
5. **ViewModels pour présentation**: Séparer logique affichage des composants
6. **Hooks pour réutilisabilité**: Extraire logique commune
7. **Type Safety**: TypeScript partout
8. **Barrel exports**: index.ts à tous les niveaux

---

**Ce fichier sert de référence architecturale pour toutes les futures demandes concernant le module e-commerce.**

# Module E-Commerce - La Petite Maison de l'Épouvante

## 📋 Vue d'ensemble

Ce module implémente le système e-commerce complet pour la boutique en ligne, incluant :
- Gestion des produits et catégories
- Panier d'achat
- Processus de commande (checkout)
- Gestion des abonnements au fanzine
- Contenus numériques téléchargeables

## 🏗️ Architecture

Le module suit l'architecture Clean Architecture avec :

### Domain Layer (`domain/`)
- **Entities** : Modèles de données TypeScript
  - `Product.ts` - Produits (physiques, digitaux, abonnements)
  - `Category.ts` - Catégories de produits
  - `Order.ts` - Commandes avec adresses et items
  - `Cart.ts` - Panier client-side
  - `SubscriptionPlan.ts` - Plans d'abonnement
  - `Subscription.ts` - Abonnements utilisateurs
  - `DigitalContent.ts` - Contenus numériques (fanzines)

- **Repositories Interfaces** : Contrats pour l'accès aux données
  - `IProductRepository.ts`
  - `ICategoryRepository.ts`
  - `IOrderRepository.ts`
  - `ISubscriptionRepository.ts`
  - etc.

### Application Layer (`application/`)
- **Use Cases** : Logique métier
  - `GetProductsUseCase` - Récupérer les produits avec filtres
  - `GetProductByIdUseCase` - Détails d'un produit
  - `CheckoutUseCase` - Passer une commande
  - `SubscribeUseCase` - S'abonner à un plan
  - `GetOrdersUseCase` - Historique des commandes
  - etc.

### Infrastructure Layer (`infrastructure/`)
- **Repositories** : Implémentations Symfony API Platform
  - `SymfonyProductRepository.ts`
  - `SymfonyCategoryRepository.ts`
  - `SymfonyOrderRepository.ts`
  - etc.

### Presentation Layer (`presentation/`)
- **Components** : Composants React
  - `ProductCard.tsx` - Carte produit
  - `ProductList.tsx` - Liste de produits
  - `CartSummary.tsx` - Résumé du panier
  - `CheckoutForm.tsx` - Formulaire de commande
  - `OrderList.tsx` - Liste des commandes
  - `SubscriptionPlanCard.tsx` - Carte de plan d'abonnement

- **Context** : Gestion d'état React
  - `CartContext.tsx` - État du panier (localStorage)
  - `EcommerceContext.tsx` - Accès aux use cases

## 🛣️ Routes Frontend

### Pages publiques
- `/produits` - Catalogue de produits avec filtres
- `/produits/[slug]` - Détails d'un produit
- `/abonnements` - Plans d'abonnement

### Pages authentifiées
- `/panier` - Panier d'achat
- `/panier/checkout` - Finaliser la commande
- `/commandes` - Historique des commandes
- `/commandes/[id]` - Détails d'une commande

## 🔌 API Backend

### Produits
```
GET  /api/products              # Liste avec filtres
GET  /api/products/{id}         # Détails
POST /api/products              # Créer (ADMIN)
PATCH /api/products/{id}        # Modifier (ADMIN)
DELETE /api/products/{id}       # Supprimer (ADMIN)
```

### Catégories
```
GET  /api/categories            # Liste
GET  /api/categories/{id}       # Détails
POST /api/categories            # Créer (ADMIN)
PATCH /api/categories/{id}      # Modifier (ADMIN)
DELETE /api/categories/{id}     # Supprimer (ADMIN)
```

### Commandes
```
GET  /api/orders                # Mes commandes
GET  /api/orders/{id}           # Détails
POST /api/orders/checkout       # Passer commande
PATCH /api/orders/{id}          # Modifier statut (ADMIN)
```

### Abonnements
```
GET  /api/subscription-plans    # Plans disponibles
GET  /api/subscriptions         # Mes abonnements
POST /api/subscriptions/subscribe # S'abonner
PATCH /api/subscriptions/{id}/cancel # Annuler
PATCH /api/subscriptions/{id}/renew  # Renouveler
```

### Contenus Numériques
```
GET  /api/digital-contents          # Mes contenus
GET  /api/digital-contents/{id}     # Détails
GET  /api/digital-contents/{id}/download # Télécharger
```

## 🎨 Utilisation

### Ajouter un produit au panier

```typescript
import { useCart } from '@/src/ecommerce/presentation/context/CartContext';

const MyComponent = () => {
  const { addToCart, cart } = useCart();

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
  };

  return (
    <div>
      <p>Total: {cart.totalItems} articles</p>
      <button onClick={() => handleAdd(product)}>
        Ajouter au panier
      </button>
    </div>
  );
};
```

### Récupérer des produits

```typescript
import { useEcommerce } from '@/src/ecommerce/presentation/context/EcommerceContext';

const ProductsPage = () => {
  const { getProducts } = useEcommerce();

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getProducts({
        type: 'physical',
        'category.id': 5,
        active: true,
      });
      setProducts(response['hydra:member']);
    };
    loadProducts();
  }, []);
};
```

### Passer une commande

```typescript
import { useEcommerce } from '@/src/ecommerce/presentation/context/EcommerceContext';
import { useCart } from '@/src/ecommerce/presentation/context/CartContext';

const CheckoutPage = () => {
  const { checkout } = useEcommerce();
  const { clearCart } = useCart();

  const handleCheckout = async () => {
    const order = await checkout({
      shippingAddress: { /* ... */ },
      billingAddress: { /* ... */ },
      paymentMethod: 'card',
    });
    
    clearCart(); // Vider le panier après commande
    router.push(`/commandes/${order.id}`);
  };
};
```

## 🔐 Authentification

Les routes protégées nécessitent un token JWT :
- Le token est automatiquement ajouté via `apiClient`
- Utiliser `useAuth()` pour vérifier l'authentification
- Redirection automatique vers `/auth/login` si non connecté

## 🎯 Filtres produits disponibles

```typescript
interface ProductFilters {
  name?: string;              // Recherche partielle
  type?: 'physical' | 'digital' | 'subscription';
  'category.id'?: number;     // ID de catégorie
  'price[gte]'?: number;      // Prix minimum
  'price[lte]'?: number;      // Prix maximum
  active?: boolean;           // Produits actifs
  exclusiveOnline?: boolean;  // Exclusivités en ligne
  page?: number;              // Pagination
}
```

## 📦 Statuts de commande

- `pending` - En attente
- `processing` - En cours de traitement
- `paid` - Payée
- `shipped` - Expédiée
- `delivered` - Livrée
- `cancelled` - Annulée
- `refunded` - Remboursée

## 🎫 Types d'abonnement

### Formats
- `paper` - Papier uniquement
- `digital` - Numérique uniquement
- `both` - Papier + Numérique

### Intervalles de facturation
- `monthly` - Mensuel
- `quarterly` - Trimestriel
- `yearly` - Annuel

## 🛠️ Développement

### Ajouter un nouveau type de produit

1. Mettre à jour `ProductType` dans `Product.ts`
2. Adapter les composants pour gérer le nouveau type
3. Ajouter les filtres si nécessaire

### Ajouter un nouveau statut de commande

1. Mettre à jour `OrderStatus` dans `Order.ts`
2. Ajouter le label dans `statusLabels`
3. Ajouter la couleur dans `statusColors`

## 🚀 Prochaines étapes

- [ ] Intégration paiement (Stripe/PayPal)
- [ ] Gestion des stocks en temps réel
- [ ] Notifications email de commande
- [ ] Suivi de livraison
- [ ] Système de wishlist
- [ ] Avis et notes produits
- [ ] Codes promo et réductions
- [ ] Export PDF des factures

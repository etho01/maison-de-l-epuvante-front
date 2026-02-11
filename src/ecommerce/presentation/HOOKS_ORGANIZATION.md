# Organisation des Hooks et ViewModels

## Structure

Les hooks et viewmodels sont maintenant organisés par **domaine fonctionnel** pour une meilleure maintenabilité et découvrabilité.

```
presentation/
├── hooks/
│   ├── products/          # Gestion des produits
│   │   ├── useCreateProductViewModel.ts
│   │   ├── useDeleteProductViewModel.ts
│   │   ├── useGetProductsViewModel.ts
│   │   ├── useProductDetailViewModel.ts
│   │   ├── useUpdateProductViewModel.ts
│   │   └── index.ts
│   ├── categories/        # Gestion des catégories
│   │   ├── useCreateCategoryViewModel.ts
│   │   ├── useDeleteCategoryViewModel.ts
│   │   ├── useGetAllCategoriesViewModel.ts
│   │   ├── useUpdateCategoryViewModel.ts
│   │   └── index.ts
│   ├── orders/            # Gestion des commandes
│   │   ├── useGetOrdersViewModel.ts
│   │   ├── useOrderDetailViewModel.ts
│   │   ├── useUpdateOrderViewModel.ts
│   │   └── index.ts
│   ├── subscriptions/     # Gestion des abonnements
│   │   ├── useSubscribeViewModel.ts
│   │   ├── useSubscriptionPlansViewModel.ts
│   │   └── index.ts
│   └── index.ts           # Export global
│
└── viewmodels/
    ├── products/
    │   ├── CreateProductViewModel.ts
    │   ├── DeleteProductViewModel.ts
    │   ├── GetProductsViewModel.ts
    │   ├── ProductDetailViewModel.ts
    │   ├── UpdateProductViewModel.ts
    │   └── index.ts
    ├── categories/
    │   ├── CreateCategoryViewModel.ts
    │   ├── DeleteCategoryViewModel.ts
    │   ├── GetAllCategoriesViewModel.ts
    │   ├── UpdateCategoryViewModel.ts
    │   └── index.ts
    ├── orders/
    │   ├── GetOrdersViewModel.ts
    │   ├── OrderDetailViewModel.ts
    │   ├── UpdateOrderViewModel.ts
    │   └── index.ts
    ├── subscriptions/
    │   ├── SubscribeViewModel.ts
    │   ├── SubscriptionPlansViewModel.ts
    │   └── index.ts
    └── index.ts           # Export global
```

## Utilisation

### Import depuis un domaine spécifique

```typescript
// Import depuis le domaine products
import { 
  useCreateProductViewModel, 
  useGetProductsViewModel 
} from '@/src/ecommerce/presentation/hooks/products';

// Import depuis le domaine categories
import { 
  useCreateCategoryViewModel 
} from '@/src/ecommerce/presentation/hooks/categories';
```

### Import depuis l'index global

```typescript
// Tous les hooks sont aussi disponibles depuis l'index principal
import { 
  useCreateProductViewModel,
  useCreateCategoryViewModel,
  useGetOrdersViewModel
} from '@/src/ecommerce/presentation/hooks';
```

## Avantages de cette organisation

### ✅ Maintenabilité
- Fichiers groupés par domaine métier
- Plus facile de trouver et modifier du code
- Moins de fichiers à la racine

### ✅ Scalabilité
- Facile d'ajouter de nouveaux hooks dans le bon domaine
- Structure claire pour les nouveaux développeurs
- Évite la prolifération de fichiers à la racine

### ✅ Découvrabilité
- Navigation intuitive par domaine
- Index par domaine pour une vue d'ensemble
- Auto-complétion améliorée dans l'IDE

### ✅ Réutilisabilité
- Les hooks d'un domaine sont regroupés
- Import ciblé ou global au choix
- Barrel exports pour simplicité

## Domaines

### 📦 Products
Tout ce qui concerne la gestion des produits :
- CRUD produits
- Liste et filtres
- Détails produit
- Catalogue

### 🏷️ Categories
Gestion des catégories de produits :
- CRUD catégories
- Hiérarchie des catégories
- Liste et navigation

### 📋 Orders
Gestion des commandes :
- Liste des commandes
- Détails commande
- Mise à jour statut
- Historique

### 💳 Subscriptions
Gestion des abonnements :
- Plans d'abonnement
- Souscription
- Gestion abonnements utilisateur

## Convention de nommage

### Hooks
- Format: `use{Action}{Entity}ViewModel`
- Exemples:
  - `useCreateProductViewModel`
  - `useGetOrdersViewModel`
  - `useDeleteCategoryViewModel`

### ViewModels
- Format: `{Action}{Entity}ViewModel`
- Exemples:
  - `CreateProductViewModel`
  - `GetOrdersViewModel`
  - `DeleteCategoryViewModel`

## Migration des imports

Si vous avez du code existant avec des anciens imports, voici comment migrer :

### Avant
```typescript
import { useCreateProductViewModel } from '@/src/ecommerce/presentation/hooks/useCreateProductViewModel';
import { useGetProductsViewModel } from '@/src/ecommerce/presentation/hooks/useGetProductsViewModel';
```

### Après (Option 1 - Import par domaine)
```typescript
import { 
  useCreateProductViewModel,
  useGetProductsViewModel 
} from '@/src/ecommerce/presentation/hooks/products';
```

### Après (Option 2 - Import global)
```typescript
import { 
  useCreateProductViewModel,
  useGetProductsViewModel 
} from '@/src/ecommerce/presentation/hooks';
```

## Bonnes pratiques

1. **Importer depuis le domaine** quand vous utilisez plusieurs hooks du même domaine
2. **Importer depuis l'index global** quand vous utilisez des hooks de différents domaines
3. **Suivre la convention de nommage** pour les nouveaux hooks/viewmodels
4. **Ajouter au bon index** lors de la création de nouveaux fichiers
5. **Documenter** les hooks complexes avec JSDoc

## Ajout d'un nouveau hook/viewmodel

### 1. Créer le fichier dans le bon domaine
```bash
# Exemple: nouveau hook pour dupliquer un produit
src/ecommerce/presentation/hooks/products/useDuplicateProductViewModel.ts
```

### 2. Exporter depuis l'index du domaine
```typescript
// hooks/products/index.ts
export { useDuplicateProductViewModel } from './useDuplicateProductViewModel';
```

### 3. L'export global se fait automatiquement
Grâce aux barrel exports dans `hooks/index.ts` qui fait `export * from './products'`

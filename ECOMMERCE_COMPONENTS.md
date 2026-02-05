# Composants E-commerce - Documentation

## Vue d'ensemble

Les composants du module e-commerce ont été refactorisés suivant les principes d'Atomic Design pour maximiser la réutilisabilité et la maintenabilité.

## 📦 Organisation

### Composants Shared (Réutilisables globalement)

#### Atoms (`src/shared/components/atoms/`)

- **PriceDisplay** - Affichage du prix avec formatage
  - Props: `price`, `currency`, `size`, `variant`
  - Variantes: `default`, `emphasis`, `muted`
  - Tailles: `sm`, `md`, `lg`, `xl`

- **Badge** - Badge générique pour labels et statuts
  - Props: `children`, `variant`, `size`
  - Variantes: `default`, `primary`, `success`, `warning`, `danger`, `info`, `secondary`
  - Tailles: `xs`, `sm`, `md`, `lg`

- **StockIndicator** - Indicateur de disponibilité du stock
  - Props: `stock`, `showQuantity`, `size`
  - Affiche automatiquement le bon état (en stock, stock faible, rupture)

- **QuantitySelector** - Sélecteur de quantité avec boutons +/-
  - Props: `quantity`, `min`, `max`, `onIncrease`, `onDecrease`, `size`, `disabled`

- **Card** - Conteneur de carte réutilisable
  - Props: `children`, `variant`, `padding`, `hoverable`
  - Variantes: `default`, `elevated`, `outlined`, `ghost`
  - Padding: `none`, `sm`, `md`, `lg`

#### Molecules (`src/shared/components/molecules/`)

- **ProductImage** - Affichage d'image de produit avec fallback
  - Props: `src`, `alt`, `size`, `aspectRatio`
  - Gère les erreurs de chargement avec icône par défaut

- **FilterSection** - Section de filtres réutilisable
  - Props: `title`, `options`, `selectedValue`, `onChange`, `allowClear`
  - Générique: fonctionne avec tout type de valeur

- **OrderStatusBadge** - Badge de statut de commande
  - Props: `status`, `size`
  - Gère automatiquement les couleurs et labels selon le statut

- **CartItem** - Item de panier réutilisable
  - Props: `product`, `quantity`, `onRemove`, `onUpdateQuantity`
  - Utilise ProductImage, PriceDisplay et QuantitySelector

- **OrderCard** - Carte de commande réutilisable
  - Props: `order`
  - Affiche résumé de commande avec statut et détails

### Composants E-commerce (Spécifiques au domaine)

#### Atoms (`src/ecommerce/presentation/components/atoms/`)

- **AddToCartButton** - Bouton d'ajout au panier
  - Props: `onAdd`, `disabled`, `currentQuantity`, `loading`
  - Affiche la quantité actuelle dans le panier

- **ProductTypeBadge** - Badge du type de produit
  - Props: `type`
  - Types: `physical`, `digital`, `subscription`

#### Molecules (`src/ecommerce/presentation/components/molecules/`)

- **ProductCard** (Refactorisé)
  - Utilise: ProductImage, PriceDisplay, StockIndicator, Badge, AddToCartButton
  - Plus modulaire et maintenable

- **ProductFilters** (Refactorisé)
  - Utilise: FilterSection (molecule réutilisable)
  - Simplifié et plus DRY

- **SubscriptionPlanCard** (Refactorisé)
  - Utilise: Card, PriceDisplay, Badge

#### Organisms (`src/ecommerce/presentation/components/organisms/`)

- **CartSummary** (Refactorisé)
  - Utilise: CartItem, PriceDisplay
  - Logique simplifiée avec composants dédiés

- **OrderList** (Refactorisé)
  - Utilise: OrderCard
  - Beaucoup plus court et lisible

- **ProductList**
- **ProductCatalog**
- **ProductDetailView**
- **OrdersManager**
- **OrderDetail**
- **SubscriptionPlansView**
- **CheckoutForm**

## 🎯 Avantages de la refactorisation

### ✅ Réutilisabilité maximale
- Les composants atoms et molecules peuvent être utilisés partout
- Les composants partagés dans `shared/` sont disponibles pour tous les modules

### ✅ Maintenabilité améliorée
- Logique métier centralisée dans des composants dédiés
- Changements localisés (modifier PriceDisplay affecte tous les prix)
- Code DRY (Don't Repeat Yourself)

### ✅ Testabilité
- Composants plus petits = plus faciles à tester
- Isolation des responsabilités

### ✅ Cohérence visuelle
- Utilisation des mêmes composants garantit une UI cohérente
- Facile de créer un design system

### ✅ Extensibilité
- Facile d'ajouter de nouvelles variantes
- Composants génériques (FilterSection) fonctionnent avec différents types

## 📝 Exemples d'utilisation

### Afficher un prix

```tsx
import { PriceDisplay } from '@/src/shared/components/atoms/PriceDisplay';

<PriceDisplay price={29.99} variant="emphasis" size="xl" />
```

### Créer un nouveau filtre

```tsx
import { FilterSection } from '@/src/shared/components/molecules/FilterSection';

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
];

<FilterSection
  title="Mon filtre"
  options={options}
  selectedValue={selectedValue}
  onChange={handleChange}
/>
```

### Afficher un badge de statut

```tsx
import { OrderStatusBadge } from '@/src/shared/components/molecules/OrderStatusBadge';

<OrderStatusBadge status="delivered" size="md" />
```

### Utiliser le sélecteur de quantité

```tsx
import { QuantitySelector } from '@/src/shared/components/atoms/QuantitySelector';

<QuantitySelector
  quantity={quantity}
  min={1}
  max={stock}
  onIncrease={() => setQuantity(quantity + 1)}
  onDecrease={() => setQuantity(quantity - 1)}
/>
```

## 🔄 Migration

Les anciens composants ont été refactorisés pour utiliser les nouveaux composants atomiques :

- **ProductCard** : Utilise maintenant ProductImage, PriceDisplay, StockIndicator, Badge, AddToCartButton
- **ProductFilters** : Utilise FilterSection
- **CartSummary** : Utilise CartItem
- **OrderList** : Utilise OrderCard
- **SubscriptionPlanCard** : Utilise Card, PriceDisplay, Badge

Tous les exports sont maintenus pour garantir la compatibilité.

## 🎨 Variantes des composants

### Button (Amélioré)
Variantes existantes: `primary`, `secondary`, `danger`, `ghost`

### Input (Amélioré)
Nouvelles variantes: `default`, `dark`, `light`
Nouvelles tailles: `sm`, `md`, `lg`

### Card (Nouveau)
Variantes: `default`, `elevated`, `outlined`, `ghost`
Padding: `none`, `sm`, `md`, `lg`

## 📚 Structure de fichiers

```
src/
├── shared/
│   └── components/
│       ├── atoms/
│       │   ├── PriceDisplay.tsx
│       │   ├── Badge.tsx
│       │   ├── StockIndicator.tsx
│       │   ├── QuantitySelector.tsx
│       │   ├── Card.tsx
│       │   └── index.ts
│       └── molecules/
│           ├── ProductImage.tsx
│           ├── FilterSection.tsx
│           ├── OrderStatusBadge.tsx
│           ├── CartItem.tsx
│           ├── OrderCard.tsx
│           └── index.ts
└── ecommerce/
    └── presentation/
        └── components/
            ├── atoms/
            │   ├── AddToCartButton.tsx
            │   ├── ProductTypeBadge.tsx
            │   └── index.ts
            ├── molecules/
            │   ├── ProductCard.tsx (refactorisé)
            │   ├── ProductFilters.tsx (refactorisé)
            │   └── SubscriptionPlanCard.tsx (refactorisé)
            └── organisms/
                ├── CartSummary.tsx (refactorisé)
                ├── OrderList.tsx (refactorisé)
                └── ...
```

## 🚀 Prochaines étapes

- [ ] Refactoriser les autres organisms pour utiliser les nouveaux composants
- [ ] Créer des variants supplémentaires si nécessaire
- [ ] Ajouter Storybook pour documenter visuellement les composants
- [ ] Créer des tests unitaires pour chaque composant atomique
- [ ] Considérer l'extraction d'autres patterns récurrents

# Organisation Atomic Design des Composants

Ce projet suit le pattern **Atomic Design** de Brad Frost pour organiser tous les composants UI.

## Structure

```
src/
├── shared/
│   └── components/
│       ├── atoms/           # Composants de base indivisibles
│       │   ├── Button.tsx
│       │   ├── Input.tsx
│       │   ├── PasswordInput.tsx
│       │   ├── Link.tsx
│       │   ├── ErrorMessage.tsx
│       │   ├── LoaderCard.tsx
│       │   └── index.ts
│       ├── molecules/       # Groupes simples de composants
│       │   ├── Pagination.tsx
│       │   └── index.ts
│       ├── organisms/       # Sections complexes
│       │   ├── Header.tsx
│       │   ├── AdminLayout.tsx
│       │   └── index.ts
│       ├── ui/             # Barrel export (rétrocompatibilité)
│       │   └── index.ts
│       └── index.ts        # Export principal
├── ecommerce/
│   └── presentation/
│       └── components/
│           ├── atoms/
│           │   └── index.ts
│           ├── molecules/
│           │   ├── ProductCard.tsx
│           │   ├── SubscriptionPlanCard.tsx
│           │   ├── ProductFilters.tsx
│           │   └── index.ts
│           ├── organisms/
│           │   ├── ProductCatalog.tsx
│           │   ├── ProductList.tsx
│           │   ├── ProductDetailView.tsx
│           │   ├── OrdersManager.tsx
│           │   ├── OrderDetail.tsx
│           │   ├── OrderList.tsx
│           │   ├── SubscriptionPlansView.tsx
│           │   ├── CartSummary.tsx
│           │   ├── CheckoutForm.tsx
│           │   └── index.ts
│           └── index.ts
└── auth/
    └── presentation/
        └── components/
            ├── organisms/
            │   ├── LoginForm.tsx
            │   ├── RegisterForm.tsx
            │   ├── ChangePasswordForm.tsx
            │   ├── EditProfileForm.tsx
            │   ├── ResetPasswordRequestForm.tsx
            │   ├── VerifyEmail.tsx
            │   └── index.ts
            └── index.ts
```

## Niveaux Atomic Design

### Atoms (Atomes)
Composants de base indivisibles qui ne peuvent pas être décomposés davantage sans perdre leur utilité.

**Exemples:**
- `Button` - Bouton réutilisable
- `Input` - Champ de saisie
- `PasswordInput` - Champ de saisie de mot de passe
- `Link` - Lien personnalisé
- `ErrorMessage` - Message d'erreur
- `LoaderCard` - Indicateur de chargement

### Molecules (Molécules)
Groupes simples d'atomes qui fonctionnent ensemble comme une unité.

**Exemples:**
- `Pagination` - Contrôles de pagination (boutons + indicateur de page)
- `ProductCard` - Carte produit (image + titre + prix + bouton)
- `SubscriptionPlanCard` - Carte plan d'abonnement
- `ProductFilters` - Filtres de produits

### Organisms (Organismes)
Groupes complexes de molécules et/ou atomes qui forment des sections distinctes d'interface.

**Exemples Shared:**
- `Header` - En-tête du site avec navigation
- `AdminLayout` - Layout de l'administration

**Exemples E-commerce:**
- `ProductCatalog` - Catalogue de produits complet
- `ProductList` - Liste de produits avec grille
- `ProductDetailView` - Vue détaillée d'un produit
- `OrdersManager` - Gestionnaire de commandes
- `CheckoutForm` - Formulaire de paiement
- `CartSummary` - Résumé du panier

**Exemples Auth:**
- `LoginForm` - Formulaire de connexion
- `RegisterForm` - Formulaire d'inscription
- `ChangePasswordForm` - Formulaire de changement de mot de passe

## Imports

### Imports Directs (Recommandé)

```typescript
// Import depuis le niveau atomique spécifique
import { Button, Input } from '@/src/shared/components/atoms';
import { Pagination } from '@/src/shared/components/molecules';
import { Header } from '@/src/shared/components/organisms';

// Import depuis le barrel du module
import { ProductCard } from '@/src/ecommerce/presentation/components/molecules';
import { ProductCatalog } from '@/src/ecommerce/presentation/components/organisms';
```

### Barrel Exports (Rétrocompatibilité)

```typescript
// Le dossier ui/ réexporte tous les composants shared pour rétrocompatibilité
import { Button, Input, Pagination, Header } from '@/src/shared/components/ui';

// Barrel export principal du module
import { Button, Pagination, Header } from '@/src/shared/components';
```

## Avantages

1. **Découvrabilité** - Facile de trouver et comprendre le rôle de chaque composant
2. **Réutilisabilité** - Les atoms et molecules sont hautement réutilisables
3. **Maintenabilité** - Structure claire et prévisible
4. **Scalabilité** - Facile d'ajouter de nouveaux composants
5. **Test** - Plus facile de tester des composants isolés
6. **Documentation** - La structure elle-même documente la hiérarchie

## Règles

1. **Atoms** ne doivent jamais importer d'autres atoms, molecules ou organisms
2. **Molecules** peuvent importer des atoms mais pas d'autres molecules ou organisms
3. **Organisms** peuvent importer atoms, molecules et d'autres organisms
4. Chaque niveau doit avoir un fichier `index.ts` pour les barrel exports
5. Préférer les exports nommés plutôt que les exports par défaut

## Migration

Les anciens imports depuis `@/src/shared/components/ui/Button` continuent de fonctionner grâce au barrel export dans `ui/index.ts`, mais il est recommandé de migrer progressivement vers les nouveaux imports atomiques.

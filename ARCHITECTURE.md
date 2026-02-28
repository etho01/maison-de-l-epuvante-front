# Architecture — La Petite Maison de l'Épouvante (Frontend)

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Stack technique](#stack-technique)
3. [Structure des dossiers](#structure-des-dossiers)
4. [Clean Architecture](#clean-architecture)
5. [Gestion des repositories](#gestion-des-repositories)
6. [Pattern Client / Serveur](#pattern-client--serveur)
7. [Atomic Design](#atomic-design)
8. [Hooks & ViewModels](#hooks--viewmodels)
9. [Gestion des formulaires](#gestion-des-formulaires)
10. [Sécurité & Authentification](#sécurité--authentification)
11. [Injection de dépendances](#injection-de-dépendances)
12. [Conventions de nommage](#conventions-de-nommage)
13. [Règles à respecter](#règles-à-respecter)

---

## Vue d'ensemble

Le frontend est un projet **Next.js 15** (App Router) en **TypeScript strict**, organisé selon les principes de la **Clean Architecture** et du **Domain-Driven Design (DDD)**.

Il communique avec une API **Symfony** via un système de proxy API Routes Next.js, garantissant que les tokens d'authentification ne sont jamais exposés côté client.

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | ^15 | Framework React (App Router) |
| React | ^19 | UI |
| TypeScript | ^5 | Typage statique strict |
| Tailwind CSS | ^4 | Styling utility-first |
| Zod | ^3 | Validation des schémas |
| React Hook Form | ^7 | Gestion des formulaires |

---

## Structure des dossiers

```
.
├── app/                        # App Router Next.js (pages, layouts, API routes)
│   ├── layout.tsx              # Layout racine (Header, Providers)
│   ├── page.tsx                # Page d'accueil
│   ├── api/                    # API Routes (proxy vers Symfony)
│   │   ├── auth/               # Routes auth (login, register, me, change-password...)
│   │   └── ecommerce/          # Routes ecommerce (produits, commandes, abonnements...)
│   ├── admin/                  # Pages administration
│   ├── produits/               # Pages catalogue
│   ├── abonnements/            # Pages abonnements
│   ├── commandes/              # Pages commandes
│   ├── panier/                 # Pages panier & checkout
│   └── compte/                 # Pages espace membre
│
└── src/                        # Logique métier & composants (hors framework)
    ├── auth/                   # Module authentification
    │   ├── domain/             # Entités, interfaces repository
    │   ├── application/        # Use Cases
    │   ├── infrastructure/     # Implémentations repository + factory index.ts
    │   ├── presentation/       # Composants, Contextes, Schémas, Hooks, ViewModels
    │   ├── utils/              # Helpers (roleHelpers, etc.)
    │   └── container.ts        # IoC container client (lazy singletons)
    │
    ├── ecommerce/              # Module e-commerce
    │   ├── domain/             # Entités, interfaces repository
    │   ├── application/        # Use Cases
    │   ├── infrastructure/     # Implémentations repository + factory index.ts
    │   ├── presentation/       # Composants, Contextes, Hooks, ViewModels, Schémas
    │   └── container.ts        # IoC container client (lazy singletons)
    │
    └── shared/                 # Composants et utilitaires partagés
        ├── components/         # Atomic Design (atoms/molecules/organisms)
        ├── domain/             # Types partagés (ApiError, Pagination...)
        └── infrastructure/     # Clients HTTP (ServerApiClient, ClientApiClient)
```

---

## Clean Architecture

Chaque module (`auth`, `ecommerce`) suit **4 couches strictes** avec une règle de dépendance unidirectionnelle :

```
Présentation → Application → Domain ← Infrastructure
```

### Domain
- Contient les **entités** (ex: `User`, `Product`, `Order`)
- Contient les **interfaces repository** (ex: `IAuthRepository`, `IProductRepository`)
- **Zéro dépendance** externe — pure logique métier

### Application
- Contient les **Use Cases** (ex: `LoginUseCase`, `GetProductsUseCase`)
- Orchestre le domain sans connaître l'infrastructure
- Peut contenir des validations métier (ex: longueur minimale d'un mot de passe)

### Infrastructure
- Contient les **implémentations concrètes** des repositories
- Deux implémentations par entité : une client, une serveur (voir section suivante)
- Contient les clients HTTP partagés (`ServerApiClient`, `ClientApiClient`)

### Présentation
- Contient les **composants React**, **contextes**, **hooks**, **view models**, **schémas Zod**
- Dépend uniquement de l'Application et du Domain
- Ne connaît pas l'infrastructure directement — passe par le container ou les factories

---

## Gestion des repositories

Chaque entité dispose de **deux implémentations** du repository :

| Suffixe | Contexte | Mécanisme |
|---|---|---|
| `Client*Repository` | Composants React client | Appelle `/api/*` (proxy Next.js) via `ClientApiClient` |
| `Symfony*Repository` | Server Components & API Routes | Appelle l'API Symfony directement via `ServerApiClient` |

### Règle simple

```
Composant 'use client' / Hook → ClientRepository → /api/* → API Route → SymfonyRepository → Symfony
Server Component / API Route  → SymfonyRepository → Symfony directement
```

### Factory functions (point d'entrée unique par environnement)

**Auth** — `src/auth/infrastructure/repositories/index.ts` :
```ts
getClientAuthRepository()  // → AuthRepositoryImpl
getServerAuthRepository()  // → SymfonyAuthRepository
```

**Ecommerce** — `src/ecommerce/infrastructure/repositories/index.ts` :
```ts
getClientProductRepository()      // → ClientProductRepository
getServerProductRepository()      // → SymfonyProductRepository
// idem pour Category, Order, Subscription, SubscriptionPlan, DigitalContent
```

---

## Pattern Client / Serveur

### Server Components (`app/*/page.tsx`)
- Instancient directement le `SymfonyRepository` et le Use Case via les factories
- Passent les données initiales au composant client via props (`initialProducts`, `initialPagination`...)
- Permettent le SSR sans exposer les tokens

```ts
// app/produits/page.tsx
const productRepository = getServerProductRepository();
const getProductsUseCase = new GetProductsUseCase(productRepository);

export default async function ProduitsPage() {
  const resp = await getProductsUseCase.execute({ page: 1 });
  return <ProductCatalog initialProducts={resp.member} />;
}
```

### API Routes (`app/api/*/route.ts`)
- Servent de **proxy sécurisé** entre le client et Symfony
- Utilisent le `SymfonyRepository` + Use Case
- Gèrent les tokens via **cookies httpOnly** (jamais exposés au JS client)
- Retournent des erreurs standardisées via `ApiError`

```ts
// Pattern standard d'une API Route
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const repository = getServerXxxRepository();
    const useCase = new XxxUseCase(repository);
    const result = await useCase.execute(data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      return NextResponse.json(error.getError(), { status: error.getStatusCode() });
    }
    return NextResponse.json({ message: 'Une erreur est survenue' }, { status: 500 });
  }
}
```

> **Pourquoi instancier par requête côté serveur ?**
> Dans Node.js, les singletons de module persistent entre les requêtes. Un repository
> serveur qui stockerait un token utilisateur dans son état pourrait fuiter entre utilisateurs.
> L'instanciation par requête garantit l'isolation complète.

### Composants Client (`'use client'`)
- Utilisent le container DI pour accéder aux Use Cases
- Passent par les hooks/ViewModels pour toute logique d'état
- Ne font **jamais** de fetch direct vers Symfony

---

## Atomic Design

Les composants partagés (`src/shared/components/`) sont organisés selon **Atomic Design** :

```
atoms/       → Briques de base : Button, Input, Select, ErrorMessage, ...
molecules/   → Composants composés : Pagination, Modal, FilterSection, CartItem, ...
organisms/   → Sections complexes : Header, AdminLayout, ...
```

### Barrel exports

Chaque niveau exporte depuis son `index.ts` :

```ts
// Import depuis le barrel global
import { Button, Modal, Header } from '@/src/shared/components';

// Import ciblé par niveau
import { Button } from '@/src/shared/components/atoms';
```

Les composants ecommerce (`src/ecommerce/presentation/components/`) suivent la même convention, subdivisés par domaine (Product, Category, Order, SubscriptionPlan...).

---

## Hooks & ViewModels

Situés dans `src/{module}/presentation/hooks/` et `src/{module}/presentation/viewmodels/`, organisés **par domaine métier** :

```
hooks/
├── products/        # useCreateProductViewModel, useGetProductsViewModel, ...
├── categories/      # useCreateCategoryViewModel, useGetCategoriesViewModel, ...
├── orders/          # useGetOrdersViewModel, useGetOrderByIdViewModel, ...
├── subscriptions/   # useGetSubscriptionPlansViewModel, useCreateSubscriptionViewModel, ...
└── index.ts         # barrel export global

viewmodels/
├── products/        # CreateProductViewModel, GetProductsViewModel, ...
├── categories/      # CreateCategoryViewModel, GetAllCategoriesViewModel, ...
├── orders/          # GetOrdersViewModel, GetOrderByIdViewModel, ...
├── subscriptions/   # GetSubscriptionPlansViewModel, ...
└── index.ts         # barrel export global
```

### Convention de nommage

- Hooks : `use{Action}{Entity}ViewModel` (ex: `useCreateProductViewModel`)
- ViewModels : `{Action}{Entity}ViewModel` (ex: `CreateProductViewModel`)

### Pattern interne d'un hook

```ts
'use client';

export const useCreateProductViewModel = () => {
  const viewModel = useMemo(
    () => new CreateProductViewModel(ecommerceContainer.createProductUseCase),
    []
  );

  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = viewModel.subscribe(() => forceUpdate({}));
    return unsubscribe;
  }, [viewModel]);

  return viewModel;
};
```

### Import recommandé

```ts
// Par domaine (recommandé)
import { useCreateProductViewModel } from '@/src/ecommerce/presentation/hooks/products';

// Global (pratique dans les composants)
import { useCreateProductViewModel } from '@/src/ecommerce/presentation/hooks';
```

---

## Gestion des formulaires

Tous les formulaires utilisent **React Hook Form** + **Zod** via `@hookform/resolvers/zod`.

### Schémas

- Auth : `src/auth/presentation/schemas/authSchemas.ts`
- Ecommerce : `src/ecommerce/presentation/schemas/ecommerceSchemas.ts`

### Pattern standard

```ts
const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
type FormData = z.infer<typeof schema>;

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### Niveaux de validation

| Niveau | Outil | Responsabilité |
|---|---|---|
| Présentation | Zod (schémas) | Retour immédiat à l'utilisateur |
| Application | Use Case | Règles métier (ex: cohérence mot de passe) |
| Backend | Symfony | Validation finale et autoritaire |

---

## Sécurité & Authentification

### Flux de tokens

```
1. Login  →  /api/auth/login (API Route)
          →  SymfonyAuthRepository → Symfony
          ←  JWT retourné par Symfony
          →  Stocké dans un cookie httpOnly (inaccessible au JS client)

2. Requêtes suivantes  →  cookie envoyé automatiquement par le navigateur
                       →  SymfonyRepository lit le cookie côté serveur
```

### Contexte Auth : `AuthContext`

- Provider global dans `app/layout.tsx`
- Expose `user`, `isAuthenticated`, `login`, `logout`, `registerUser`, `refreshUser`...
- Utilise `authContainer` (client) qui cible `/api/auth/*`

### Gestion des rôles : `src/auth/utils/roleHelpers.ts`

```ts
isAdmin(user)            // ROLE_ADMIN
isModerator(user)        // ROLE_MODERATOR
hasRole(user, role)      // rôle spécifique
hasAnyRole(user, roles)  // au moins un rôle parmi la liste
```

---

## Injection de dépendances

### Pourquoi des containers uniquement côté client ?

Les containers DI (`src/auth/container.ts`, `src/ecommerce/container.ts`) sont des **lazy singletons** adaptés au client :

- Les `ClientRepository` font des `fetch()` vers `/api/*` — sans notion de requête courante
- Un singleton est sûr côté client car chaque onglet a son propre contexte JS
- Côté serveur, l'isolation par requête est obligatoire (voir ci-dessus)

### Container Auth (`src/auth/container.ts`)

```ts
import { authContainer } from '@/src/auth/container';

// Use cases disponibles (lazy — instanciés au premier accès) :
authContainer.loginUseCase
authContainer.registerUseCase
authContainer.getCurrentUserUseCase
authContainer.logoutUseCase
authContainer.changePasswordUseCase
authContainer.updateUserUseCase
authContainer.requestPasswordResetUseCase
authContainer.confirmPasswordResetUseCase
authContainer.verifyEmailUseCase
authContainer.resendVerificationEmailUseCase
authContainer.getAllAdministratorsUseCase
authContainer.getAdministratorByIdUseCase
authContainer.createAdministratorUseCase
authContainer.updateAdministratorUseCase
authContainer.deleteAdministratorUseCase
```

### Container Ecommerce (`src/ecommerce/container.ts`)

```ts
import { ecommerceContainer } from '@/src/ecommerce/container';

// Catégories
ecommerceContainer.getAllCategoriesUseCase
ecommerceContainer.getCategoriesUseCase
ecommerceContainer.createCategoryUseCase
ecommerceContainer.updateCategoryUseCase
ecommerceContainer.deleteCategoryUseCase

// Produits
ecommerceContainer.getProductsUseCase
ecommerceContainer.getProductBySlugUseCase
ecommerceContainer.createProductUseCase
ecommerceContainer.updateProductUseCase
ecommerceContainer.deleteProductUseCase

// Commandes
ecommerceContainer.getOrdersUseCase
ecommerceContainer.getOrderByIdUseCase
ecommerceContainer.checkoutUseCase
ecommerceContainer.updateOrderUseCase

// Abonnements & plans
ecommerceContainer.getSubscriptionPlansUseCase
ecommerceContainer.getSubscriptionPlanByIdUseCase
ecommerceContainer.createSubscriptionPlanUseCase
ecommerceContainer.updateSubscriptionPlanUseCase
ecommerceContainer.deleteSubscriptionPlanUseCase
ecommerceContainer.getUserSubscriptionsUseCase
ecommerceContainer.subscribeUseCase
ecommerceContainer.cancelSubscriptionUseCase
ecommerceContainer.renewSubscriptionUseCase

// Contenus numériques
ecommerceContainer.getDigitalContentsUseCase
ecommerceContainer.getDigitalContentByIdUseCase
ecommerceContainer.downloadDigitalContentUseCase
```

---

## Conventions de nommage

| Type | Convention | Exemple |
|---|---|---|
| Entité domain | PascalCase | `Product`, `User`, `Order` |
| Interface repository | `I` + PascalCase | `IProductRepository` |
| Repository client | `Client` + nom | `ClientProductRepository` |
| Repository serveur | `Symfony` + nom | `SymfonyProductRepository` |
| Use Case | action + `UseCase` | `GetProductsUseCase` |
| Hook ViewModel | `use` + action + entité + `ViewModel` | `useCreateProductViewModel` |
| Classe ViewModel | action + entité + `ViewModel` | `CreateProductViewModel` |
| Schéma Zod | nom + `Schema` | `productSchema` |
| Type Zod inféré | nom + `FormData` | `ProductFormData` |
| Composant React | PascalCase | `ProductCatalog` |
| API Route | `app/api/[domaine]/[ressource]/route.ts` | `app/api/ecommerce/products/route.ts` |

---

## Règles à respecter

### ✅ À faire

- Toujours passer par un **Use Case** pour la logique métier — jamais appeler un repository directement dans un composant
- Utiliser `ecommerceContainer` / `authContainer` dans les hooks et composants client
- Utiliser les factories (`getServerXxxRepository()`) dans les API Routes et Server Components
- Valider les formulaires avec **Zod** côté présentation
- Gérer les erreurs avec `ApiError` dans les API Routes
- Grouper les hooks et viewmodels par **domaine métier**
- Exporter via les **barrel exports** (`index.ts`)

### ❌ À ne pas faire

- Faire un `fetch()` direct vers Symfony depuis un composant client
- Bypasser les Use Cases en appelant un repository depuis un composant
- Utiliser `SymfonyRepository` dans un composant React client (`'use client'`)
- Utiliser `ClientRepository` dans une API Route ou un Server Component
- Stocker des tokens JWT dans le `localStorage` ou le state React
- Créer des singletons de repository côté serveur (risque de fuite inter-requêtes)

---

## Flux de données — exemple complet (produits)

```
┌─────────────────────────────────────────────────────────┐
│ SSR : app/produits/page.tsx (Server Component)          │
│   getServerProductRepository()                          │
│   → GetProductsUseCase.execute()                        │
│   → SymfonyProductRepository → Symfony API              │
│   → initialProducts passés en props                     │
└────────────────────┬────────────────────────────────────┘
                     │ props (initialProducts)
                     ▼
┌─────────────────────────────────────────────────────────┐
│ Client : <ProductCatalog initialProducts={...} />       │
│   useGetProductsViewModel()                             │
│   → GetProductsViewModel(ecommerceContainer.getProductsUseCase)
│   → ClientProductRepository                             │
│   → fetch('/api/ecommerce/products')                    │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP
                     ▼
┌─────────────────────────────────────────────────────────┐
│ API Route : app/api/ecommerce/products/route.ts         │
│   getServerProductRepository()                          │
│   → GetProductsUseCase.execute()                        │
│   → SymfonyProductRepository → Symfony API              │
└─────────────────────────────────────────────────────────┘
```

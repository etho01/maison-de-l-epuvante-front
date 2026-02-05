# Architecture Globale du Projet - Référence

## 📐 Clean Architecture (Standard pour TOUS les modules)

Tous les modules du projet suivent la même structure en 4 couches :

```
src/{module}/
├── domain/          # Entités et interfaces pures
├── application/     # Use cases (logique métier)
├── infrastructure/  # Implémentations concrètes
└── presentation/    # UI, Context, Hooks, ViewModels
```

### Domain Layer

**Entités** (`domain/entities/`)
- Modèles de données TypeScript purs
- Pas de dépendances externes
- Business rules simples

**Interfaces Repositories** (`domain/repositories/`)
- Contrats pour l'accès aux données
- Interface unique par entité
- Agnostique de l'implémentation

### Application Layer

**Use Cases** (`application/usecases/`)
- Une classe = une action métier
- Dépend uniquement du Domain
- Logique métier pure et testable

**Principe**: Si l'action a un nom métier, c'est un use case

### Infrastructure Layer

#### 🔄 DUAL REPOSITORY PATTERN (Standard projet)

**Pour CHAQUE module, 2 implémentations:**

**1. SymfonyRepository (Server-Side)**
```typescript
// src/{module}/infrastructure/repositories/SymfonyXxxRepository.ts
export class SymfonyXxxRepository implements IXxxRepository {
  // Appelle directement l'API Symfony depuis le serveur
  // Utilisé par les Server Components Next.js
}
```

**2. ClientRepository (Client-Side)**
```typescript
// src/{module}/infrastructure/repositories/ClientXxxRepository.ts
export class ClientXxxRepository implements IXxxRepository {
  // Appelle les API Routes Next.js
  // Utilisé par les Client Components React
}
```

**Pourquoi 2 implémentations ?**
- **SymfonyRepository**: SSR, SEO, performance (pas de round-trip)
- **ClientRepository**: Interactions utilisateur, réactivité, état local

### Presentation Layer

#### Components (Atomic Design)

**Structure obligatoire:**
```
presentation/components/
├── atoms/       # Composants indivisibles
├── molecules/   # Groupes simples
└── organisms/   # Sections complexes
```

**Règles:**
- **Atoms**: Ne dépendent d'aucun autre composant
- **Molecules**: Peuvent utiliser atoms uniquement
- **Organisms**: Peuvent utiliser atoms, molecules, et organisms

**Shared vs Module:**
- `src/shared/components/` → Composants réutilisables globalement
- `src/{module}/presentation/components/` → Spécifiques au module

#### Context (`presentation/context/`)

**Un Context par module pour:**
- Exposer les use cases côté client (via ClientRepository)
- Gérer l'état global du module
- Fournir des méthodes métier

**Pattern standard:**
```typescript
// src/{module}/presentation/context/ModuleContext.tsx
export const ModuleProvider = ({ children }) => {
  const repository = new ClientModuleRepository();
  const useCases = useMemo(() => ({
    doAction: new DoActionUseCase(repository),
    // ...
  }), []);

  return <ModuleContext.Provider value={useCases}>
    {children}
  </ModuleContext.Provider>;
};

export const useModule = () => useContext(ModuleContext);
```

#### Hooks (`presentation/hooks/`)

**Hooks personnalisés pour:**
- Logique réutilisable entre composants
- Séparation logique/UI
- Gestion d'état complexe

**Exemples:** `useFilters`, `usePagination`, `useForm`

#### ViewModels (`presentation/viewmodels/`)

**ViewModels pour:**
- Transformation données → affichage
- Calculs dérivés
- Formatage et agrégation
- Logique de présentation isolée

**Principe:** Séparer la logique de présentation des composants

## 🔄 Flux de Données Standard

### 1. Chargement initial (SSR)

```
Page (Server Component)
  ↓
SymfonyRepository
  ↓
UseCase.execute()
  ↓
API Symfony (directe)
  ↓
Props → Client Component
```

**Code type:**
```tsx
// app/{module}/page.tsx (Server Component)
const repository = new SymfonyXxxRepository();
const useCase = new GetXxxUseCase(repository);
const data = await useCase.execute();

return <ClientComponent initialData={data} />;
```

### 2. Interactions Client (CSR)

```
Client Component
  ↓
useModule() / Custom Hook
  ↓
ClientRepository
  ↓
API Route Next.js (/api/{module}/*)
  ↓
Proxy → Symfony
  ↓
Response → État React
```

**Code type:**
```tsx
// Composant client
'use client';

const { doAction } = useModule();

const handleAction = async () => {
  const result = await doAction(params);
  setState(result);
};
```

### 3. API Routes (Proxy)

```
app/api/{module}/
├── resource/
│   ├── route.ts           # GET, POST
│   └── [id]/
│       └── route.ts       # GET, PATCH, DELETE
└── action/
    └── route.ts           # POST
```

**Rôle:**
- Proxy entre client et Symfony
- Gestion cookies/auth
- Validation serveur

## 📦 Structure Complète d'un Module

```
src/{module}/
├── domain/
│   ├── entities/
│   │   ├── Entity1.ts
│   │   ├── Entity2.ts
│   │   └── index.ts
│   └── repositories/
│       ├── IEntity1Repository.ts
│       ├── IEntity2Repository.ts
│       └── index.ts
│
├── application/
│   └── usecases/
│       ├── entity1/
│       │   ├── GetEntity1UseCase.ts
│       │   ├── CreateEntity1UseCase.ts
│       │   └── index.ts
│       └── entity2/
│           └── ...
│
├── infrastructure/
│   └── repositories/
│       ├── SymfonyEntity1Repository.ts    # SSR
│       ├── ClientEntity1Repository.ts     # CSR
│       ├── SymfonyEntity2Repository.ts
│       ├── ClientEntity2Repository.ts
│       └── index.ts
│
└── presentation/
    ├── components/
    │   ├── atoms/
    │   │   ├── SpecificAtom.tsx
    │   │   └── index.ts
    │   ├── molecules/
    │   │   ├── SpecificMolecule.tsx
    │   │   └── index.ts
    │   ├── organisms/
    │   │   ├── SpecificOrganism.tsx
    │   │   └── index.ts
    │   └── index.ts
    ├── context/
    │   ├── ModuleContext.tsx
    │   └── index.ts
    ├── hooks/
    │   ├── useCustomHook.ts
    │   └── index.ts
    ├── viewmodels/
    │   ├── EntityViewModel.ts
    │   └── index.ts
    ├── schemas/              # Validation (Zod, etc.)
    │   └── entitySchema.ts
    └── index.ts

app/{module}/
├── page.tsx                  # Server Component
├── [id]/
│   └── page.tsx
└── action/
    └── page.tsx

app/api/{module}/
├── resource/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
└── action/
    └── route.ts
```

## 🎯 Checklist Nouvelle Fonctionnalité

Pour TOUTE nouvelle fonctionnalité (quel que soit le module):

### Domain
- [ ] Entité définie avec TypeScript
- [ ] Interface repository créée
- [ ] Exports dans index.ts

### Application
- [ ] Use case créé (un par action)
- [ ] Dépend uniquement des interfaces domain
- [ ] Logique métier testable
- [ ] Exports dans index.ts

### Infrastructure
- [ ] **SymfonyRepository** implémenté (Server-Side)
- [ ] **ClientRepository** implémenté (Client-Side)
- [ ] Les deux implémentent la même interface
- [ ] Exports dans index.ts

### Presentation
- [ ] Composants suivent Atomic Design
- [ ] Niveau approprié (atom/molecule/organism)
- [ ] Shared vs module-specific déterminé
- [ ] Context mis à jour si nécessaire
- [ ] Hooks créés pour logique réutilisable
- [ ] ViewModel si transformation complexe
- [ ] Schemas de validation si formulaire
- [ ] Exports dans index.ts

### App (Next.js)
- [ ] Page créée avec Server Component
- [ ] Utilise SymfonyRepository pour SSR
- [ ] API Route créée (proxy vers Symfony)
- [ ] Client Component utilise ClientRepository via Context

### TypeScript
- [ ] Types stricts partout
- [ ] Pas de `any`
- [ ] Interfaces explicites
- [ ] Props typées

## 🎨 Principes d'Architecture

### 1. Clean Architecture
- **Dépendances**: Toujours vers l'intérieur (Domain ← Application ← Infrastructure/Presentation)
- **Domain**: Pur, sans dépendances externes
- **Use Cases**: Orchestrent la logique métier
- **Repositories**: Abstraits via interfaces

### 2. Atomic Design
- **Réutilisabilité**: Composants partagés dans `shared/`
- **Composition**: Construire organisms à partir d'atoms/molecules
- **DRY**: Extraire patterns récurrents
- **Variantes**: Utiliser props plutôt que dupliquer

### 3. Dual Repository
- **SSR First**: Chargement initial via SymfonyRepository
- **CSR pour interactions**: ClientRepository + Context
- **Même interface**: Les use cases fonctionnent avec les deux

### 4. Separation of Concerns
- **ViewModels**: Logique de présentation
- **Hooks**: Logique réutilisable
- **Context**: État global
- **Components**: UI pure

### 5. Type Safety
- TypeScript strict
- Validation runtime (Zod) pour formulaires
- Props typées explicitement

## 📚 Modules Existants

### ✅ Auth
- Login, Register, Password Reset
- Context: `AuthContext`
- Pattern: Dual Repository ✓

### ✅ E-commerce
- Products, Orders, Cart, Subscriptions
- Context: `EcommerceContext`, `CartContext`
- Pattern: Dual Repository ✓
- Référence complète: `ECOMMERCE_ARCHITECTURE_REFERENCE.md`

### ✅ Admin
- User Management, Dashboard
- Context: À créer si nécessaire
- Pattern: À aligner sur standard

### 🔄 Shared
- Composants réutilisables (atoms, molecules, organisms)
- Utils, config, types globaux

## 🚀 Workflow Standard

### Créer un nouveau module

1. **Domain**
   ```bash
   src/{module}/domain/entities/
   src/{module}/domain/repositories/
   ```

2. **Application**
   ```bash
   src/{module}/application/usecases/
   ```

3. **Infrastructure**
   ```bash
   src/{module}/infrastructure/repositories/
   # Créer Symfony ET Client repositories
   ```

4. **Presentation**
   ```bash
   src/{module}/presentation/components/
   src/{module}/presentation/context/
   src/{module}/presentation/hooks/
   src/{module}/presentation/viewmodels/
   ```

5. **App**
   ```bash
   app/{module}/page.tsx        # Server Component
   app/api/{module}/route.ts     # API Routes
   ```

### Ajouter une fonctionnalité à un module existant

1. Vérifier si entité domain existe, sinon la créer
2. Créer use case dans application/
3. Implémenter dans les 2 repositories (Symfony + Client)
4. Créer/modifier composants (Atomic Design)
5. Exposer via Context si nécessaire
6. Créer hooks/viewmodels si logique complexe
7. Ajouter API Route si nouvelle action
8. Mettre à jour page si nécessaire

### Créer un composant

1. **Identifier le niveau**: atom, molecule, ou organism ?
2. **Shared ou module?**: Réutilisable globalement ou spécifique ?
3. **Composer**: Utiliser composants existants en priorité
4. **Variantes**: Ajouter props plutôt que créer nouveau composant
5. **Export**: Ajouter dans index.ts
6. **Types**: Props TypeScript strictes

## 🔑 Points Clés à Retenir

1. **Dual Repository TOUJOURS**: Symfony (SSR) + Client (CSR)
2. **Clean Architecture**: 4 couches pour chaque module
3. **Atomic Design**: atoms → molecules → organisms
4. **SSR First**: Server Components + SymfonyRepository
5. **Context pour interactions**: Client Components + ClientRepository
6. **ViewModels + Hooks**: Séparer logique de l'UI
7. **Type Safety**: TypeScript strict partout
8. **Barrel Exports**: index.ts à tous les niveaux
9. **DRY**: Composants shared/ réutilisables
10. **Interface unique**: Use cases agnostiques de l'implémentation

## 📖 Documentation Spécifique

- **E-commerce**: `ECOMMERCE_ARCHITECTURE_REFERENCE.md`
- **Auth**: `AUTH_DOCUMENTATION.md`
- **Composants**: `ATOMIC_DESIGN.md`
- **Repositories**: `REPOSITORIES_ARCHITECTURE.md`
- **Structure**: `PROJECT_STRUCTURE.md`

---

**Ce fichier est la référence architecturale GLOBALE du projet. Tous les modules doivent suivre ces patterns.**

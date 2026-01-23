# Structure du projet - La Petite Maison de l'Épouvante

## 📁 Organisation des dossiers

```
/home/nicolas/maison-de-lepouvante/front/
├── src/                              # Logique métier (Clean Architecture)
│   ├── auth/                         # Module d'authentification
│   │   ├── domain/                   # Entités et interfaces (logique pure)
│   │   ├── application/              # Use cases (logique métier)
│   │   ├── infrastructure/           # Implémentations (API, storage, etc.)
│   │   └── presentation/             # Context, hooks, composants
│   │
│   └── config/                       # Configuration globale
│       └── site.config.ts
│
├── app/                              # Next.js App Router
│   ├── api/                          # API Routes (serveur Next.js)
│   │   └── auth/                     # Routes d'authentification (proxy Symfony)
│   │
│   ├── auth/                         # Pages d'authentification
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── reset-password/page.tsx
│   │   └── verify-email/page.tsx
│   │
│   ├── components/                   # Composants globaux (Header, Footer, etc.)
│   │   └── Header.tsx
│   │
│   ├── layout.tsx                    # Layout racine
│   ├── page.tsx                      # Page d'accueil
│   └── globals.css                   # Styles globaux
│
├── public/                           # Assets statiques
│
└── Configuration files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.ts
    ├── tailwind.config.ts (à créer)
    ├── .env.local (à créer depuis .env.local.example)
    └── AUTH_DOCUMENTATION.md
```

## 🎯 Principe de séparation

### `src/` - Logique métier (Clean Architecture)
Contient toute la logique métier, organisée selon les principes de la Clean Architecture :
- ✅ **Domain** : Entités et interfaces pures
- ✅ **Application** : Use cases et logique métier
- ✅ **Infrastructure** : Implémentations concrètes (API, storage)
- ✅ **Presentation** : Context, hooks, composants réutilisables

### `app/` - Next.js spécifique
Contient uniquement ce qui est lié au framework Next.js :
- ✅ **Pages** : Routes et pages de l'application
- ✅ **API Routes** : Endpoints serveur (proxy vers Symfony)
- ✅ **Layouts** : Mise en page
- ✅ **Composants globaux** : Header, Footer (spécifiques à l'UI)

## 📦 Imports

Tous les imports utilisent le chemin absolu `@/` qui pointe vers la racine du projet :

```tsx
// Import depuis src/
import { useAuth } from '@/src/auth/presentation/context/AuthContext';
import { siteConfig } from '@/src/config/site.config';

// Import depuis app/
import Header from '@/app/components/Header';
```

## 🔄 Avantages de cette structure

✅ **Séparation des responsabilités** : Logique métier séparée de l'infrastructure Next.js  
✅ **Testabilité** : Le code dans `src/` est plus facile à tester  
✅ **Réutilisabilité** : La logique métier peut être réutilisée dans d'autres projets  
✅ **Maintenabilité** : Structure claire et prévisible  
✅ **Évolutivité** : Facile d'ajouter de nouveaux modules dans `src/`

## 🚀 Prochains modules à créer dans src/

- `src/boutique/` - Gestion de la boutique
- `src/fanzine/` - Gestion des fanzines
- `src/troc/` - Système d'échange
- `src/communaute/` - Fonctionnalités communautaires
- `src/shared/` - Éléments partagés entre modules

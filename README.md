# 🎃 La Petite Maison de l'Épouvante — Frontend

> Plateforme e-commerce moderne pour la vente de produits d'horreur, figurines, fanzines et contenus numériques.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Développement](#développement)
- [Structure du projet](#structure-du-projet)
- [Tests](#tests)
- [Documentation](#documentation)

## 🎯 À propos

Application frontend Next.js pour **La Petite Maison de l'Épouvante**, une boutique spécialisée dans l'univers de l'horreur. Le projet implémente une architecture **Clean Architecture** avec **Domain-Driven Design (DDD)** pour garantir maintenabilité, testabilité et scalabilité.

Ce frontend communique avec une API Symfony via un système de **proxy API Routes**, garantissant une sécurité maximale (tokens httpOnly, pas d'exposition côté client).

## ✨ Fonctionnalités

### 🛒 E-commerce
- **Catalogue produits** : figurines, jeux, blu-ray, goodies
- **Collection exclusive** : gamme Evil Ed en édition limitée
- **Panier et checkout** : intégration Stripe pour les paiements
- **Gestion des commandes** : suivi et historique des achats

### 📖 Contenus numériques
- **Fanzines digitalisés** : accès et lecture en ligne
- **Liseuse intégrée** : interface de lecture dans l'espace utilisateur
- **Téléchargement** : accès hors ligne aux contenus achetés

### 📫 Abonnements
- **Abonnement papier** : livraison du fanzine physique
- **Abonnement numérique** : accès illimité aux versions digitales
- **Renouvellement automatique** : gestion des récurrences

### 👤 Authentification & Profil
- **Inscription / Connexion** : gestion complète des utilisateurs
- **Vérification email** : sécurisation des comptes
- **Reset password** : récupération de compte
- **Espace utilisateur** : gestion du profil et préférences

### 🛡️ Administration
- **Gestion des produits** : CRUD complet
- **Gestion des catégories** : organisation du catalogue
- **Gestion des commandes** : suivi et statuts
- **Gestion des utilisateurs** : modération et administration
- **Gestion des livraisons** : tracking et statuts
- **Plans d'abonnement** : configuration des offres

## 🏗️ Architecture

Ce projet suit les principes de la **Clean Architecture** avec une séparation stricte en 4 couches :

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │  ← React Components, Hooks, Context
│  (Components, ViewModels, Schemas)      │
├─────────────────────────────────────────┤
│        Application Layer                │  ← Use Cases (Business Logic)
│         (Use Cases)                     │
├─────────────────────────────────────────┤
│          Domain Layer                   │  ← Entities, Interfaces
│   (Entities, Repository Interfaces)     │
├─────────────────────────────────────────┤
│      Infrastructure Layer               │  ← API Clients, Repositories
│  (Repositories, API Clients, Storage)   │
└─────────────────────────────────────────┘
```

### Principes clés

- **Dependency Rule** : les dépendances pointent uniquement vers l'intérieur
- **Inversion de contrôle** : injection de dépendances via containers
- **Repository Pattern** : abstraction de la couche de données
- **Use Cases** : logique métier isolée et testable
- **Double implémentation** : Client/Server repositories pour Next.js

### Modules

Le projet est organisé en **modules DDD** indépendants :

- **`auth/`** : Authentification, utilisateurs, administrateurs
- **`ecommerce/`** : Produits, commandes, abonnements, contenus numériques
- **`shared/`** : Composants UI réutilisables (Atomic Design)

Voir [ARCHITECTURE.md](ARCHITECTURE.md) pour les détails complets.

## 🛠️ Technologies

| Technologie | Version | Usage |
|------------|---------|-------|
| [Next.js](https://nextjs.org/) | 15+ | Framework React (App Router, API Routes) |
| [React](https://react.dev/) | 19+ | Bibliothèque UI |
| [TypeScript](https://www.typescriptlang.org/) | 5+ | Typage statique strict |
| [Tailwind CSS](https://tailwindcss.com/) | 4+ | Framework CSS utility-first |
| [Zod](https://zod.dev/) | 3+ | Validation de schémas |
| [React Hook Form](https://react-hook-form.com/) | 7+ | Gestion des formulaires |
| [Stripe](https://stripe.com/) | - | Paiements en ligne |
| [Jest](https://jestjs.io/) | - | Tests unitaires et d'intégration |

## 📦 Installation

### Prérequis

- Node.js 20+ (LTS recommandé)
- npm, yarn, pnpm ou bun
- API Symfony backend (voir repository associé)

### Installation des dépendances

```bash
# Cloner le repository
git clone https://github.com/votre-username/maison-de-lepouvante-front.git
cd maison-de-lepouvante-front

# Installer les dépendances
npm install
```

## ⚙️ Configuration

### Variables d'environnement

Copier le fichier `.env.example` et créer un `.env.local` :

```bash
cp .env.example .env.local
```

Configurer les variables suivantes :

```env
# API Backend
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Environment
NODE_ENV=development
```

Voir [.env.example](.env.example) pour la liste complète.

## 🚀 Développement

### Démarrer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Scripts disponibles

```bash
npm run dev      # Démarrer en mode développement
npm run build    # Build de production
npm run start    # Démarrer en mode production
npm run lint     # Linter le code
npm test         # Lancer les tests
npm run test:watch # Tests en mode watch
```

## 📁 Structure du projet

```
.
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (proxy vers Symfony)
│   │   ├── auth/                 # Routes authentification
│   │   └── ecommerce/            # Routes e-commerce
│   ├── admin/                    # Pages administration
│   ├── produits/                 # Catalogue
│   ├── panier/                   # Panier & checkout
│   └── compte/                   # Espace utilisateur
│
├── src/                          # Logique métier (Clean Architecture)
│   ├── auth/                     # Module authentification
│   │   ├── domain/               # Entités et interfaces
│   │   ├── application/          # Use Cases
│   │   ├── infrastructure/       # Repositories & API
│   │   └── presentation/         # Components & Hooks
│   │
│   ├── ecommerce/                # Module e-commerce
│   │   ├── domain/
│   │   ├── application/
│   │   ├── infrastructure/
│   │   └── presentation/
│   │
│   └── shared/                   # Code partagé
│       ├── components/           # Atomic Design (atoms/molecules/organisms)
│       ├── domain/               # Types communs
│       └── infrastructure/       # API clients
│
├── __tests__/                    # Tests unitaires et d'intégration
├── public/                       # Assets statiques
├── ARCHITECTURE.md               # Documentation architecture détaillée
├── PROJECT_SPECS.md              # Spécifications fonctionnelles
└── package.json
```

## 🧪 Tests

Le projet utilise **Jest** pour les tests unitaires.

```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Tests avec coverage
npm run test:coverage
```

### Philosophie de tests

- **Use Cases** : tests unitaires avec mocks des repositories
- **Components** : tests d'intégration avec React Testing Library
- **Repositories** : tests d'intégration avec l'API

Exemples de tests disponibles :
- `__tests__/auth/usecases/LoginUseCase.test.ts`
- `__tests__/ecommerce/usecases/GetProductsUseCase.test.ts`

## 📚 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — Architecture détaillée, patterns et conventions
- [PROJECT_SPECS.md](PROJECT_SPECS.md) — Spécifications fonctionnelles complètes
- [HOOKS_ORGANIZATION.md](src/ecommerce/presentation/HOOKS_ORGANIZATION.md) — Organisation des hooks et viewmodels

## 🤝 Contribution

Ce projet suit des conventions strictes pour maintenir la qualité :

1. **TypeScript strict mode** : aucun `any`, typage complet
2. **Clean Architecture** : respecter les couches et dépendances
3. **Tests obligatoires** : Use Cases et composants critiques
4. **Pas de fetch direct** : passer par les repositories
5. **Pas de logique métier dans les composants** : utiliser les Use Cases

## 📄 Licence

Projet privé — © 2026 La Petite Maison de l'Épouvante

---

**Développé avec ❤️ et 🎃 pour les passionnés d'horreur**

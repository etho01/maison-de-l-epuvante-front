# Système d'Authentification - Clean Architecture

## 📁 Structure du projet

```
src/
└── auth/
    ├── domain/                      # Couche Domaine
    │   ├── entities/
    │   │   └── User.ts             # Entités métier
    │   └── repositories/
    │       └── IAuthRepository.ts  # Interfaces des repositories
    │
    ├── application/                 # Couche Application (Use Cases)
    │   └── usecases/
    │       ├── LoginUseCase.ts
    │       ├── RegisterUseCase.ts
    │       └── GetCurrentUserUseCase.ts
    │
    ├── infrastructure/              # Couche Infrastructure
    │   ├── api/
    │   │   └── apiClient.ts        # Client HTTP vers Symfony
    │   ├── storage/
    │   │   └── TokenStorage.ts     # Gestion des cookies
    │   └── repositories/
    │       └── AuthRepositoryImpl.ts
    │
    └── presentation/                # Couche Présentation
        ├── context/
        │   └── AuthContext.tsx     # Context React
        ├── hooks/
        │   └── useAuthForm.ts      # Hooks personnalisés
        └── components/
            ├── LoginForm.tsx
            ├── RegisterForm.tsx
            ├── ResetPasswordRequestForm.tsx
            └── VerifyEmail.tsx

app/
├── api/auth/                        # API Routes (Proxy vers Symfony)
│   ├── login/route.ts
│   ├── register/route.ts
│   ├── logout/route.ts
│   ├── me/route.ts
│   ├── change-password/route.ts
│   ├── reset-password-request/route.ts
│   ├── reset-password-confirm/route.ts
│   ├── verify-email/route.ts
│   └── resend-verification/route.ts
│
└── auth/                            # Pages publiques
    ├── login/page.tsx
    ├── register/page.tsx
    ├── reset-password/page.tsx
    └── verify-email/page.tsx
```

## 🔐 Fonctionnalités implémentées

### ✅ Authentification de base
- ✅ Connexion (login)
- ✅ Inscription (register)
- ✅ Déconnexion (logout)
- ✅ Récupération utilisateur actuel (/me)

### ✅ Gestion du mot de passe
- ✅ Changement de mot de passe
- ✅ Demande de réinitialisation
- ✅ Confirmation de réinitialisation

### ✅ Vérification email
- ✅ Vérification de l'email
- ✅ Renvoi de l'email de vérification

## 🏗️ Architecture Clean

### 1. **Domaine** (`domain/`)
Contient la logique métier pure, sans dépendances externes.
- **Entities** : Modèles de données (User, LoginCredentials, etc.)
- **Repositories** : Interfaces définissant les contrats

### 2. **Application** (`application/`)
Contient les cas d'utilisation (use cases) de l'application.
- Orchestration de la logique métier
- Validation des données
- Pas de dépendances vers l'infrastructure

### 3. **Infrastructure** (`infrastructure/`)
Implémentations concrètes des interfaces du domaine.
- **API Client** : Communication avec Symfony
- **TokenStorage** : Gestion des cookies (client & server)
- **Repositories** : Implémentations concrètes

### 4. **Présentation** (`presentation/`)
Composants React et logique UI.
- **Context** : État global d'authentification
- **Hooks** : Logique réutilisable
- **Components** : Formulaires et UI

## 🔄 Flux d'authentification

### Connexion
```
1. User remplit LoginForm
2. LoginForm → useAuth().login()
3. AuthContext → LoginUseCase
4. LoginUseCase → AuthRepositoryImpl
5. AuthRepositoryImpl → /api/auth/login (Next.js)
6. API Route → Symfony API /login
7. Symfony retourne { token, user }
8. API Route stocke token dans cookie httpOnly
9. API Route retourne { user } au front
10. AuthContext met à jour l'état global
```

### Requêtes authentifiées
```
1. Component → API Route Next.js
2. API Route récupère token depuis cookie (server-side)
3. API Route → Symfony API avec Bearer token
4. Symfony traite et retourne les données
5. API Route retourne au front
```

## 🍪 Gestion des tokens

### Stockage sécurisé
- **Cookie httpOnly** : Le token est stocké dans un cookie httpOnly côté serveur
- **SameSite: Lax** : Protection CSRF
- **Secure en production** : HTTPS uniquement en prod
- **Durée** : 7 jours par défaut

### Avantages
- ✅ Token non accessible en JavaScript (XSS protection)
- ✅ Envoyé automatiquement avec chaque requête
- ✅ Gestion server-side pour plus de sécurité

## 🛣️ Routes API

Toutes les routes passent par Next.js qui agit comme proxy :

| Route Next.js | Méthode | Route Symfony | Description |
|--------------|---------|---------------|-------------|
| `/api/auth/login` | POST | `/login` | Connexion |
| `/api/auth/register` | POST | `/users` | Inscription |
| `/api/auth/logout` | POST | - | Déconnexion (supprime cookie) |
| `/api/auth/me` | GET | `/me` | Utilisateur actuel |
| `/api/auth/change-password` | POST | `/change-password` | Changer mot de passe |
| `/api/auth/reset-password-request` | POST | `/reset-password-request` | Demander reset |
| `/api/auth/reset-password-confirm` | POST | `/reset-password-confirm` | Confirmer reset |
| `/api/auth/verify-email` | GET | `/verify/email` | Vérifier email |
| `/api/auth/resend-verification` | POST | `/verify/resend` | Renvoyer email |

## 🎨 Pages d'authentification

- **`/auth/login`** : Connexion
- **`/auth/register`** : Inscription
- **`/auth/reset-password`** : Réinitialisation mot de passe
- **`/auth/verify-email`** : Vérification email

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📝 Utilisation

### Dans un composant

```tsx
'use client';

import { useAuth } from '@/src/auth/presentation/context/AuthContext';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Non connecté</div>;
  }

  return (
    <div>
      <p>Bienvenue {user?.firstName}</p>
      <button onClick={logout}>Déconnexion</button>
    </div>
  );
}
```

### Appel API authentifié

```tsx
// Dans un composant client
const response = await fetch('/api/auth/me');
const user = await response.json();
```

## 🚀 Prochaines étapes

- [ ] Middleware pour protéger les routes
- [ ] Page de profil utilisateur
- [ ] Gestion des rôles et permissions
- [ ] Refresh token
- [ ] Remember me
- [ ] 2FA (Two-Factor Authentication)

## 🐛 Gestion des erreurs

Toutes les API routes retournent des réponses structurées :

```json
// Succès
{
  "user": { ... }
}

// Erreur
{
  "message": "Description de l'erreur"
}
```

Les erreurs sont gérées automatiquement dans les composants avec affichage utilisateur.

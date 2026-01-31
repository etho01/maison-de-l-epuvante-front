# Repositories Architecture - E-Commerce

## 🔀 Architecture de sécurité avec API Routes Next.js

Le système e-commerce utilise une **architecture proxy** pour maximiser la sécurité :

```
Client Component → API Route Next.js → Symfony API
     (Browser)         (Server)          (Backend)
```

---

## 🏗️ Architecture en 3 couches

### 1. Client Repositories (Frontend → Next.js)
**Emplacement**: `src/ecommerce/infrastructure/repositories/Client*Repository.ts`

- Utilisés dans les **Client Components** React
- Appellent les **API Routes Next.js** (`/api/ecommerce/*`)
- Utilisent `credentials: 'include'` pour envoyer les cookies
- **Pas de token en localStorage** - plus sécurisé !

### 2. API Routes Next.js (Proxy Server)
**Emplacement**: `app/api/ecommerce/*/route.ts`

- Reçoivent les requêtes du frontend
- Accèdent aux cookies HTTP-only sécurisés
- Utilisent les **Symfony Repositories** pour appeler l'API backend
- Retournent les données au frontend

### 3. Symfony Repositories (Next.js → Symfony API)
**Emplacement**: `src/ecommerce/infrastructure/repositories/Symfony*Repository.ts`

- Utilisés **uniquement côté serveur** (API Routes, Server Components)
- Gèrent l'authentification via `TokenStorage.getTokenServer()`
- Appellent l'API Symfony externe
- Accès sécurisé aux cookies HTTP-only

---

## 🔐 Avantages de cette architecture

### ✅ Sécurité maximale
- **Tokens jamais exposés au client** - stockés en cookies HTTP-only
- **Protection XSS** - le JavaScript malveillant ne peut pas voler le token
- **Protection CSRF** - possible d'ajouter des tokens CSRF
- **Pas de localStorage** - évite les vulnérabilités courantes

### ✅ Simplicité frontend
- Les Client Components n'ont pas à gérer l'authentification
- Pas besoin de passer des tokens manuellement
- Les cookies sont automatiquement envoyés avec chaque requête

### ✅ Flexibilité
- Facile d'ajouter de la logique métier dans les API Routes
- Cache côté serveur possible
- Transformation des données avant envoi au client

---

## 📦 Flux de données

### Exemple: Récupérer les produits

```typescript
// 1. Client Component appelle le Client Repository
'use client';
function ProductList() {
  const { getProducts } = useEcommerce();
  
  useEffect(() => {
    const loadProducts = async () => {
      // Appelle /api/ecommerce/products
      const products = await getProducts();
    };
  }, []);
}

// 2. Client Repository appelle l'API Route Next.js
class ClientProductRepository {
  async getAll() {
    const response = await fetch('/api/ecommerce/products', {
      credentials: 'include', // Envoie les cookies
    });
    return response.json();
  }
}

// 3. API Route Next.js utilise Symfony Repository
// app/api/ecommerce/products/route.ts
export async function GET() {
  const productRepo = new SymfonyProductRepository();
  const products = await productRepo.getAll(); // Appelle Symfony API
  return NextResponse.json(products);
}

// 4. Symfony Repository appelle l'API externe
class SymfonyProductRepository {
  async getAll() {
    // Utilise apiClient avec TokenStorage.getTokenServer()
    return await apiClient.get('/products');
  }
}
```

---

## 🗂️ Structure des API Routes

```
app/api/ecommerce/
├── products/
│   ├── route.ts           # GET, POST /api/ecommerce/products
│   └── [id]/
│       └── route.ts       # GET, PATCH, DELETE /api/ecommerce/products/:id
├── categories/
│   ├── route.ts           # GET, POST /api/ecommerce/categories
│   └── [id]/
│       └── route.ts       # GET, PATCH, DELETE /api/ecommerce/categories/:id
├── orders/
│   ├── route.ts           # GET /api/ecommerce/orders
│   ├── checkout/
│   │   └── route.ts       # POST /api/ecommerce/orders/checkout
│   └── [id]/
│       └── route.ts       # GET, PATCH /api/ecommerce/orders/:id
├── subscriptions/
│   ├── route.ts           # GET /api/ecommerce/subscriptions
│   ├── subscribe/
│   │   └── route.ts       # POST /api/ecommerce/subscriptions/subscribe
│   └── [id]/
│       ├── route.ts       # GET /api/ecommerce/subscriptions/:id
│       ├── cancel/
│       │   └── route.ts   # PATCH /api/ecommerce/subscriptions/:id/cancel
│       └── renew/
│           └── route.ts   # PATCH /api/ecommerce/subscriptions/:id/renew
├── subscription-plans/
│   └── route.ts           # GET, POST /api/ecommerce/subscription-plans
└── digital-contents/
    ├── route.ts           # GET /api/ecommerce/digital-contents
    └── [id]/
        ├── route.ts       # GET /api/ecommerce/digital-contents/:id
        └── download/
            └── route.ts   # GET /api/ecommerce/digital-contents/:id/download
```

---

## 📝 Implémentation Client Repository Pattern

```typescript
export class ClientProductRepository implements IProductRepository {
  private baseURL = '/api/ecommerce'; // API Routes Next.js

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // ← Envoie automatiquement les cookies
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  }

  async getAll(filters?: ProductFilters) {
    const params = new URLSearchParams();
    // ... construction des params
    return await this.request(`/products?${params}`);
  }
}
```

---

## 📝 Implémentation API Route Pattern

```typescript
// app/api/ecommerce/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SymfonyProductRepository } from '@/src/ecommerce/infrastructure/repositories/SymfonyProductRepository';

const productRepository = new SymfonyProductRepository();

export async function GET(request: NextRequest) {
  try {
    // Extraction des paramètres
    const searchParams = request.nextUrl.searchParams;
    const filters = {}; // ... construction des filtres

    // Appel au repository Symfony (qui utilise les cookies)
    const products = await productRepository.getAll(filters);
    
    // Retour au client
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500 }
    );
  }
}
```

---

## 🔐 Sécurité et Cookies

### Configuration des cookies (déjà gérée par l'auth)

Les cookies sont configurés comme `HttpOnly`, `Secure`, et `SameSite`:

```typescript
// TokenStorage.setTokenServer()
cookies().set('token', token, {
  httpOnly: true,     // ← Pas accessible en JavaScript
  secure: true,       // ← HTTPS uniquement
  sameSite: 'lax',    // ← Protection CSRF
  path: '/',
  maxAge: 60 * 60 * 24 * 7 // 7 jours
});
```

### Avantages de cette approche

| Aspect | localStorage | Cookies HTTP-only |
|--------|--------------|-------------------|
| **Accès JavaScript** | ✅ Oui | ❌ Non (plus sécurisé) |
| **Protection XSS** | ❌ Vulnérable | ✅ Protégé |
| **Auto-envoi avec fetch** | ❌ Manuel | ✅ Automatique avec `credentials: 'include'` |
| **Expiration automatique** | ❌ Manuel | ✅ Géré par le serveur |
| **Taille max** | ~10MB | ~4KB (suffisant pour un token) |

---

## 🚀 Migration depuis localStorage

### ❌ Ancien code (localStorage)

```typescript
// Client Repository appelait directement Symfony
private getToken() {
  return localStorage.getItem('token');
}

await fetch('http://symfony-api/products', {
  headers: {
    Authorization: `Bearer ${token}` // ← Token exposé !
  }
});
```

### ✅ Nouveau code (API Routes + Cookies)

```typescript
// Client Repository appelle Next.js API
await fetch('/api/ecommerce/products', {
  credentials: 'include' // ← Cookies automatiques
});

// API Route utilise les cookies serveur
const token = await TokenStorage.getTokenServer(); // ← Sécurisé
```

---

## 📊 Comparaison des architectures

### Architecture Ancienne (localStorage)
```
Client → Symfony API (direct)
  ↑
Token dans localStorage (vulnérable XSS)
```

### Architecture Actuelle (API Routes)
```
Client → Next.js API Routes → Symfony API
  ↑           ↑
Cookies    Token sécurisé
(HttpOnly) (côté serveur)
```

---

## 🎯 Résumé

✅ **Pas de token côté client** - sécurité maximale  
✅ **API Routes comme proxy** - couche de contrôle  
✅ **Cookies HTTP-only** - protection XSS  
✅ **Credentials include** - envoi automatique  
✅ **Même interface** - facile à maintenir  

Le système est maintenant **beaucoup plus sécurisé** tout en restant simple à utiliser pour les développeurs !

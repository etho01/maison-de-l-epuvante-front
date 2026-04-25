# Dockerfile - Maison de l'Épouvante Frontend

Dockerfile multi-stage optimisé pour Next.js en production.

## Construction de l'image

### Build basique

```bash
docker build -t maison-epouvante-front:latest .
```

**Note** : Les variables `NEXT_PUBLIC_*` ne sont plus passées au moment du build. Elles sont injectées au runtime depuis Vault via Kubernetes secrets.

### Build pour GitHub Container Registry

```bash
# Tag l'image
docker build \
  -t ghcr.io/etho01/maison-epouvante-front:latest \
  -t ghcr.io/etho01/maison-epouvante-front:v1.0.0 \
  .

# Authentification GitHub
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Push l'image
docker push ghcr.io/etho01/maison-epouvante-front:latest
docker push ghcr.io/etho01/maison-epouvante-front:v1.0.0
```

## Exécution locale

```bash
# Exécuter le conteneur
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.maison-epouvante.nicolasbarbey.fr \
  -e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... \
  maison-epouvante-front:latest
```

Accéder à l'application: http://localhost:3000

## Architecture du Dockerfile

### Étape 1: deps
- Image Alpine légère
- Installation des dépendances de production uniquement
- Optimisation du cache npm

### Étape 2: builder
- Installation de toutes les dépendances (y compris devDependencies)
- Build de l'application Next.js avec `npm run build`
- **Variables d'environnement injectées au runtime** (pas au build-time)

### Étape 3: runner (production)
- Image finale ultra-légère
- Copie uniquement des fichiers nécessaires (standalone + static + public)
- Utilisateur non-root (nextjs:1000)
- Port 3000 exposé

## Optimisations

- **Multi-stage build**: Réduit la taille de l'image finale
- **Alpine Linux**: Image de base minimale (~5MB)
- **Standalone output**: Next.js génère un bundle autonome minimal
- **Cache npm**: Optimisation des layers Docker
- **Non-root user**: Sécurité renforcée (UID/GID 1000)
- **.dockerignore**: Exclut les fichiers inutiles du contexte de build

## Variables d'environnement

Les variables `NEXT_PUBLIC_API_URL` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` sont injectées au **runtime** depuis Vault via Kubernetes secrets.

Voir [VAULT_ENV.md](VAULT_ENV.md) pour la configuration complète.

### Runtime (ENV)
Variables configurées dans le conteneur:
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`
- `PORT=3000`
- `HOSTNAME=0.0.0.0`

Variables injectées par Kubernetes depuis Vault:
- `NEXT_PUBLIC_API_URL`: URL de l'API backend
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Clé publique Stripe

## Taille de l'image

L'image finale devrait faire environ:
- **Base Alpine**: ~5MB
- **Node.js runtime**: ~50MB
- **Application Next.js (standalone)**: ~80-150MB
- **Total**: ~150-200MB

## Sécurité

- ✅ Utilisateur non-root (nextjs:1000)
- ✅ Image Alpine (moins de surface d'attaque)
- ✅ Dépendances de production uniquement dans l'image finale
- ✅ Télémétrie Next.js désactivée
- ✅ Pas de secrets hardcodés

## Troubleshooting

### Erreur: "Cannot find module './standalone'"

Assurez-vous que `next.config.ts` contient:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
};
```
sont injectées au runtime depuis Vault via Kubernetes secrets. En local, passez-les comme variables d'environnement:

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.maison-epouvante.nicolasbarbey.fr \
  -e NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... \
  maison-epouvante-front:latest
Les variables `NEXT_PUBLIC_*` doivent être fournies au moment du **build**:
```bash
docker build --build-arg NEXT_PUBLIC_API_URL=... .
```

### Image trop volumineuse

Vérifiez que `.dockerignore` est bien présent et exclut:
- `node_modules`
- `.next`
- `coverage`
- Fichiers de test

### Permissions denied

Le conteneur s'exécute avec l'utilisateur `nextjs` (UID 1000). Vérifiez que les volumes montés ont les bonnes permissions.

## CI/CD avec GitHub Actions

Exemple de workflow pour build et push automatique:

```yaml
name: Build and Push Docker Image

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository_owner }}/maison-epouvante-front

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
```

**Note** : Les variables `NEXT_PUBLIC_*` ne sont plus passées comme build-args. Elles sont gérées par Vault et injectées au runtime dans Kubernetes.       labels: ${{ steps.meta.outputs.labels }}
          build-args: |
            NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}
            NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${{ secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }}
```

## Notes

- Le Dockerfile utilise `npm ci` pour des installations reproductibles
- Le mode `standalone` de Next.js est activé pour générer un bundle minimal
- L'image est compatible avec Kubernetes et les contraintes de sécurité (non-root, capabilities dropped)

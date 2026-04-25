# Configuration des variables d'environnement avec Vault

Ce document explique comment les variables `NEXT_PUBLIC_API_URL` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` sont maintenant gérées par Vault au lieu d'être passées comme build-args Docker.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                         VAULT                                 │
│  secret/maison-epouvante-front/app                           │
│  ├─ NEXT_PUBLIC_API_URL                                      │
│  └─ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY                       │
└──────────────────────────────────────────────────────────────┘
                            ↓
         External Secrets Operator (synchronisation toutes les 15min)
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                  KUBERNETES SECRET                            │
│  maison-epouvante-front-secret                               │
│  ├─ NEXT_PUBLIC_API_URL                                      │
│  └─ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY                       │
└──────────────────────────────────────────────────────────────┘
                            ↓
              envFrom: secretRef (Deployment)
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                    POD NEXT.JS                                │
│  Variables d'environnement disponibles:                      │
│  - process.env.NEXT_PUBLIC_API_URL                           │
│  - process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY            │
└──────────────────────────────────────────────────────────────┘
                            ↓
         next.config.ts (expose les variables au runtime)
                            ↓
            Application Next.js (client + serveur)
```

## Avantages

✅ **Source unique de vérité** : Toutes les configurations dans Vault  
✅ **Pas de secrets dans Git** : Ni dans le code ni dans GitHub Secrets  
✅ **Rotation facilitée** : Mise à jour uniquement dans Vault  
✅ **Synchronisation automatique** : External Secrets met à jour Kubernetes  
✅ **Audit trail** : Vault garde l'historique des modifications  
✅ **Multi-environnements** : Facile de gérer dev/staging/prod  

## Configuration initiale

### 1. Configurer Vault

```bash
# Sur votre serveur avec accès au cluster
cd /path/to/project
./update-vault-secrets.sh <VAULT_ROOT_TOKEN>
```

Vous serez guidé pour entrer :
- `NEXT_PUBLIC_API_URL` : https://api.maison-epouvante.nicolasbarbey.fr
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` : pk_live_... ou pk_test_...

### 2. Vérifier la synchronisation

```bash
# Vérifier l'ExternalSecret
kubectl -n maison-epouvante-front get externalsecret
kubectl -n maison-epouvante-front describe externalsecret maison-epouvante-front-vault

# Vérifier le secret Kubernetes
kubectl -n maison-epouvante-front get secret maison-epouvante-front-secret

# Vérifier dans un pod
kubectl -n maison-epouvante-front exec -it deployment/maison-epouvante-front -- env | grep NEXT_PUBLIC
```

## Mise à jour des secrets

Pour changer les valeurs :

```bash
# Méthode 1 : Script interactif
./update-vault-secrets.sh <VAULT_ROOT_TOKEN>

# Méthode 2 : Directement avec vault CLI
kubectl -n vault port-forward svc/vault 8200:8200 &
export VAULT_ADDR=http://127.0.0.1:8200
export VAULT_TOKEN=<ROOT_TOKEN>

vault kv put secret/maison-epouvante-front/app \
  NEXT_PUBLIC_API_URL="https://api.maison-epouvante.nicolasbarbey.fr" \
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

Puis redémarrer les pods :

```bash
kubectl -n maison-epouvante-front rollout restart deployment/maison-epouvante-front
```

## Développement local

Pour le développement local, créez un fichier `.env.local` :

```bash
cp .env.example .env.local
```

Et modifiez les valeurs :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Next.js chargera automatiquement ces variables depuis `.env.local`.

## Fichiers modifiés

### Dockerfile

**Avant** :
```dockerfile
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

**Maintenant** :
```dockerfile
# Pas de ARG ni de ENV
# Les variables sont injectées au runtime
```

### next.config.ts

**Ajouté** :
```typescript
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};
```

Cela permet à Next.js de récupérer les variables au démarrage du serveur.

### GitHub Actions Workflow

**Avant** :
```yaml
build-args: |
  NEXT_PUBLIC_API_URL=${{ secrets.NEXT_PUBLIC_API_URL }}
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${{ secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }}
```

**Maintenant** :
```yaml
# Pas de build-args
# Les variables sont injectées par Kubernetes
```

### Kubernetes Deployment

**Inchangé** (déjà configuré) :
```yaml
envFrom:
  - secretRef:
      name: maison-epouvante-front-secret
```

## Documentation complète

Pour plus de détails, voir :
- [VAULT_ENV.md](VAULT_ENV.md) - Documentation complète de la configuration Vault
- [k8s/README.md](k8s/README.md) - Guide de déploiement Kubernetes
- [update-vault-secrets.sh](update-vault-secrets.sh) - Script de mise à jour des secrets

## FAQ

**Q : Pourquoi ne pas utiliser les build-args ?**  
R : Les build-args sont pratiques mais ont des inconvénients :
- Les secrets sont dans GitHub Secrets
- Difficile à changer (nécessite un rebuild)
- Pas de centralisation de la configuration

**Q : Les variables sont-elles disponibles côté client ?**  
R : Oui, c'est le comportement normal de Next.js pour les variables `NEXT_PUBLIC_*`. Elles sont destinées à être publiques (URLs d'API, clés Stripe publiques).

**Q : Que se passe-t-il si je change les valeurs dans Vault ?**  
R : External Secrets synchronise automatiquement toutes les 15 minutes. Pour forcer une mise à jour immédiate, redémarrez les pods.

**Q : Puis-je utiliser des valeurs différentes pour dev/staging/prod ?**  
R : Oui, créez des chemins différents dans Vault :
- `secret/maison-epouvante-front-dev/app`
- `secret/maison-epouvante-front-staging/app`
- `secret/maison-epouvante-front/app` (production)

Et ajustez le chemin dans `externalsecret.yaml` selon l'environnement.

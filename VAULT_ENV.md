# Configuration des variables d'environnement depuis Vault

Les variables `NEXT_PUBLIC_API_URL` et `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` sont désormais injectées au **runtime** depuis Vault via External Secrets Operator.

## Architecture

```
Vault (source de vérité)
  ↓
External Secrets Operator (synchronisation)
  ↓
Kubernetes Secret (maison-epouvante-front-secret)
  ↓
Pod Next.js (variables d'environnement)
  ↓
next.config.ts (configuration runtime)
```

## Configuration

### 1. Stocker les secrets dans Vault

Utilisez le script `update-vault-secrets.sh` :

```bash
./update-vault-secrets.sh <VAULT_ROOT_TOKEN>
```

Le script vous demandera :
- `NEXT_PUBLIC_API_URL` : URL de l'API backend
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` : Clé publique Stripe

Ces valeurs sont stockées dans Vault sous : `secret/maison-epouvante-front/app`

### 2. Synchronisation automatique

External Secrets Operator synchronise automatiquement les secrets depuis Vault vers Kubernetes :

```yaml
# k8s/externalsecret.yaml
apiVersion: external-secrets.io/v1
kind: ExternalSecret
metadata:
  name: maison-epouvante-front-vault
  namespace: maison-epouvante-front
spec:
  refreshInterval: 15m  # Mise à jour toutes les 15 minutes
  secretStoreRef:
    name: vault-frontend
  target:
    name: maison-epouvante-front-secret
  dataFrom:
    - extract:
        key: maison-epouvante-front/app
```

### 3. Injection dans le pod

Le déploiement Kubernetes injecte automatiquement le secret comme variables d'environnement :

```yaml
# k8s/deployment.yaml
spec:
  containers:
    - name: app
      envFrom:
        - secretRef:
            name: maison-epouvante-front-secret
```

### 4. Configuration Next.js

Le fichier `next.config.ts` expose les variables au runtime :

```typescript
const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};
```

## Avantages de cette approche

✅ **Source unique de vérité** : Toutes les configurations sont dans Vault  
✅ **Sécurité renforcée** : Pas de secrets hardcodés dans le code ou les workflows  
✅ **Rotation facilitée** : Mise à jour des secrets dans Vault uniquement  
✅ **Synchronisation automatique** : External Secrets met à jour Kubernetes automatiquement  
✅ **Audit trail** : Vault garde l'historique des modifications  
✅ **Environnements multiples** : Facile de gérer dev/staging/prod  

## Variables disponibles au runtime

Dans votre code Next.js, les variables sont accessibles normalement :

```typescript
// Dans n'importe quel composant ou page
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
```

Next.js les rend disponibles :
- **Côté serveur** : Via `process.env`
- **Côté client** : Inlinées dans le bundle JavaScript au moment du build

## Mise à jour des secrets

### Méthode 1 : Script interactif

```bash
./update-vault-secrets.sh <VAULT_ROOT_TOKEN>
```

### Méthode 2 : Directement avec vault CLI

```bash
# Port-forward Vault
kubectl -n vault port-forward svc/vault 8200:8200 &

# Configurer Vault
export VAULT_ADDR=http://127.0.0.1:8200
export VAULT_TOKEN=<VAULT_ROOT_TOKEN>

# Mettre à jour les secrets
vault kv put secret/maison-epouvante-front/app \
  NEXT_PUBLIC_API_URL="https://api.maison-epouvante.nicolasbarbey.fr" \
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

### Méthode 3 : Via l'interface Vault UI

1. Accéder à Vault : http://vault.your-domain.com
2. Naviguer vers : `secret/maison-epouvante-front/app`
3. Modifier les valeurs
4. Sauvegarder

## Forcer la resynchronisation

Après avoir mis à jour les secrets dans Vault :

```bash
# Option 1 : Attendre la synchronisation automatique (max 15 minutes)
kubectl -n maison-epouvante-front get externalsecret -w

# Option 2 : Forcer le redémarrage des pods
kubectl -n maison-epouvante-front rollout restart deployment/maison-epouvante-front

# Option 3 : Supprimer le secret pour forcer une resynchronisation immédiate
kubectl -n maison-epouvante-front delete secret maison-epouvante-front-secret
# Le secret sera recréé automatiquement par External Secrets Operator
```

## Vérification

### 1. Vérifier que Vault contient les secrets

```bash
vault kv get secret/maison-epouvante-front/app
```

### 2. Vérifier la synchronisation External Secrets

```bash
# Status de l'ExternalSecret
kubectl -n maison-epouvante-front get externalsecret

# Détails
kubectl -n maison-epouvante-front describe externalsecret maison-epouvante-front-vault
```

### 3. Vérifier le secret Kubernetes

```bash
# Vérifier que le secret existe
kubectl -n maison-epouvante-front get secret maison-epouvante-front-secret

# Voir les clés (pas les valeurs)
kubectl -n maison-epouvante-front get secret maison-epouvante-front-secret -o jsonpath='{.data}' | jq 'keys'

# Décoder une valeur (pour debug)
kubectl -n maison-epouvante-front get secret maison-epouvante-front-secret \
  -o jsonpath='{.data.NEXT_PUBLIC_API_URL}' | base64 -d
```

### 4. Vérifier dans le pod

```bash
# Entrer dans un pod
kubectl -n maison-epouvante-front exec -it deployment/maison-epouvante-front -- sh

# Vérifier les variables d'environnement
env | grep NEXT_PUBLIC
```

## Troubleshooting

### Les variables ne sont pas définies dans l'application

**Cause** : Le pod a démarré avant la synchronisation des secrets

**Solution** :
```bash
kubectl -n maison-epouvante-front rollout restart deployment/maison-epouvante-front
```

### ExternalSecret en erreur

**Vérifier le status** :
```bash
kubectl -n maison-epouvante-front describe externalsecret maison-epouvante-front-vault
```

**Erreurs communes** :
- **"secret not found"** : Le chemin dans Vault est incorrect ou le secret n'existe pas
- **"authentication failed"** : Le ServiceAccount n'a pas les permissions Vault
- **"connection refused"** : Vault n'est pas accessible depuis le cluster

### Les secrets ne se mettent pas à jour

**Cause** : Le `refreshInterval` définit la fréquence de synchronisation (15 minutes par défaut)

**Solutions** :
1. Attendre la prochaine synchronisation
2. Redémarrer les pods
3. Supprimer le secret pour forcer une recréation

## Sécurité

- ✅ Les secrets ne sont jamais committés dans Git
- ✅ Les secrets ne sont pas dans les GitHub Secrets (sauf KUBECONFIG)
- ✅ Les secrets ne sont pas dans les logs ou l'historique Docker
- ✅ Vault gère l'encryption au repos et en transit
- ✅ Les permissions sont gérées par Vault policies
- ✅ Audit trail complet dans Vault

## Différences avec l'approche précédente

### Avant (build-time)
```dockerfile
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
```

- ❌ Secrets dans GitHub Secrets
- ❌ Secrets passés comme build-args
- ❌ Secrets dans l'image Docker
- ❌ Difficile à changer après le build

### Maintenant (runtime)
```yaml
envFrom:
  - secretRef:
      name: maison-epouvante-front-secret
```

- ✅ Secrets uniquement dans Vault
- ✅ Injection au runtime
- ✅ Facile à mettre à jour
- ✅ Pas de rebuild nécessaire

## Notes importantes

1. **Next.js et variables publiques** : Les variables `NEXT_PUBLIC_*` sont toujours exposées côté client dans le bundle JavaScript. C'est normal et attendu, car elles sont destinées à être publiques (URLs d'API, clés Stripe publiques, etc.)

2. **Build vs Runtime** : Avec la configuration `env` dans `next.config.ts`, les variables sont injectées au moment du démarrage du serveur Next.js, pas au moment du build Docker.

3. **Pas de secrets sensibles** : Ne stockez jamais de secrets vraiment sensibles (clés privées, passwords) dans des variables `NEXT_PUBLIC_*` car elles sont exposées côté client.

4. **Redémarrage requis** : Quand les secrets changent dans Vault, les pods doivent être redémarrés pour charger les nouvelles valeurs.

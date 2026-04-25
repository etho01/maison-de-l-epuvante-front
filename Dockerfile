# Étape 1: Installation des dépendances
FROM node:20-alpine AS deps

# Installer les dépendances système nécessaires pour certains packages npm
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances de production uniquement
RUN npm ci --only=production && npm cache clean --force

# Étape 2: Builder l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les dépendances depuis l'étape précédente
COPY --from=deps /app/node_modules ./node_modules
COPY package.json package-lock.json* ./

# Installer toutes les dépendances (y compris devDependencies pour le build)
RUN npm ci

# Copier le code source
COPY . .

# Désactiver la télémétrie Next.js
ENV NEXT_TELEMETRY_DISABLED=1

# Builder l'application Next.js
# Note: Les variables NEXT_PUBLIC_* seront injectées au runtime depuis Vault
RUN npm run build

# Étape 3: Image de production
FROM node:20-alpine AS runner

WORKDIR /app

# Désactiver la télémétrie Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Changer la propriété des fichiers
RUN chown -R nextjs:nodejs /app

# Basculer vers l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3000

# Variables d'environnement runtime
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Démarrer l'application
CMD ["node", "server.js"]

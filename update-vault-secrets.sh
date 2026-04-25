#!/bin/bash
# Script de mise à jour des secrets Vault - Maison de l'Épouvante Frontend

set -e

echo "🔐 Mise à jour des secrets Vault - Maison de l'Épouvante Frontend"
echo "=================================================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Vérifier que le ROOT_TOKEN est fourni
if [ -z "${1:-}" ]; then
  echo -e "${RED}❌ Usage: $0 <ROOT_TOKEN>${NC}"
  echo ""
  echo "Exemple:"
  echo "  $0 hvs.XXXXXXXXXXXXXXXXXXXXXX"
  exit 1
fi

ROOT_TOKEN="$1"

# Vérifier kubectl
if ! command -v kubectl &> /dev/null; then
    echo -e "${RED}❌ kubectl non trouvé${NC}"
    exit 1
fi

# Vérifier vault CLI
if ! command -v vault &> /dev/null; then
    echo -e "${RED}❌ vault CLI non trouvé${NC}"
    exit 1
fi

# Port-forward Vault en arrière-plan
echo -e "${CYAN}📡 Démarrage du port-forward vers Vault...${NC}"
kubectl -n vault port-forward svc/vault 8200:8200 > /dev/null 2>&1 &
PF_PID=$!
sleep 3

# Créer un fichier temporaire sécurisé
TEMP_FILE=$(mktemp)

# Trap pour arrêter le port-forward à la fin
cleanup() {
    echo ""
    echo -e "${CYAN}🧹 Nettoyage...${NC}"
    kill $PF_PID 2>/dev/null || true
    rm -f "$TEMP_FILE" 2>/dev/null || true
}
trap cleanup EXIT

# Configuration Vault
export VAULT_ADDR=http://127.0.0.1:8200
export VAULT_TOKEN="$ROOT_TOKEN"

# Vérifier la connexion
echo -e "${CYAN}🔍 Vérification de la connexion à Vault...${NC}"
if ! vault status &>/dev/null; then
    # Vérifier si Vault est scellé
    if vault status 2>&1 | grep -q "Vault is sealed"; then
        echo -e "${RED}❌ Vault est scellé (sealed)${NC}"
        echo -e "${YELLOW}📋 Pour desceller Vault:${NC}"
        echo ""
        echo "  1. Dans un autre terminal, exécutez:"
        echo "     vault operator unseal <VOTRE_UNSEAL_KEY>"
        echo ""
        echo "  2. Ou si vous avez la clé maintenant:"
        read -sp "     Entrez la clé de descellement (ENTRÉE pour annuler): " UNSEAL_KEY
        echo ""
        
        if [ -n "$UNSEAL_KEY" ]; then
            echo -e "${CYAN}🔓 Tentative de descellement...${NC}"
            if vault operator unseal "$UNSEAL_KEY" &>/dev/null; then
                echo -e "${GREEN}✅ Vault descellé avec succès${NC}"
            else
                echo -e "${RED}❌ Échec du descellement - clé invalide${NC}"
                exit 1
            fi
        else
            echo -e "${RED}❌ Script annulé${NC}"
            exit 1
        fi
    else
        echo -e "${RED}❌ Impossible de se connecter à Vault${NC}"
        exit 1
    fi
fi

# Vérifier à nouveau après descellement potentiel
if ! vault status &>/dev/null; then
    echo -e "${RED}❌ Vault toujours inaccessible${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Connexion à Vault OK${NC}"
echo ""

# Récupérer les secrets actuels
echo -e "${CYAN}📥 Récupération des secrets actuels...${NC}"
if ! vault kv get -format=json secret/maison-epouvante-front/app > "$TEMP_FILE" 2>/dev/null; then
    echo -e "${YELLOW}⚠️  Aucun secret existant, création d'une nouvelle configuration${NC}"
    echo '{"data":{"data":{}}}' > "$TEMP_FILE"
fi

# Fonction pour récupérer une valeur actuelle
get_current_value() {
    local key=$1
    jq -r ".data.data.${key} // \"\"" "$TEMP_FILE"
}

# Fonction pour demander une valeur
ask_value() {
    local key=$1
    local description=$2
    local current_value=$(get_current_value "$key")
    local value
    
    echo "" >&2
    if [ -n "$current_value" ] && [ "$current_value" != "null" ]; then
        echo -e "${YELLOW}🔑 ${key}${NC} - ${description}" >&2
        echo -e "${CYAN}   Actuelle: ${current_value}${NC}" >&2
        read -p "   Nouvelle (ENTRÉE pour garder): " value >&2
        echo "${value:-$current_value}"
    else
        echo -e "${YELLOW}🔑 ${key}${NC} - ${description}" >&2
        read -p "   Valeur: " value >&2
        echo "${value}"
    fi
}

# Fonction pour demander une valeur sensible (masquée)
ask_secret() {
    local key=$1
    local description=$2
    local current_value=$(get_current_value "$key")
    local value
    
    echo "" >&2
    if [ -n "$current_value" ] && [ "$current_value" != "null" ]; then
        echo -e "${YELLOW}🔐 ${key}${NC} - ${description}" >&2
        echo -e "${CYAN}   Actuelle: ${current_value:0:10}...${NC} (masquée)" >&2
        read -sp "   Nouvelle (ENTRÉE pour garder): " value
        echo "" >&2
        echo "${value:-$current_value}"
    else
        echo -e "${YELLOW}🔐 ${key}${NC} - ${description}" >&2
        read -sp "   Valeur: " value
        echo "" >&2
        echo "${value}"
    fi
}

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}📝 CONFIGURATION DES SECRETS${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Appuyez sur ENTRÉE sans saisir de valeur pour conserver la valeur actuelle."

# API Configuration
echo ""
echo -e "${CYAN}══════════════════════════════════${NC}"
echo -e "${CYAN}     Configuration API${NC}"
echo -e "${CYAN}══════════════════════════════════${NC}"
NEXT_PUBLIC_API_URL=$(ask_value "NEXT_PUBLIC_API_URL" "URL de l'API Backend (ex: https://api.maison-epouvante.nicolasbarbey.fr)")

# Stripe Configuration
echo ""
echo -e "${CYAN}══════════════════════════════════${NC}"
echo -e "${CYAN}     Configuration Stripe${NC}"
echo -e "${CYAN}══════════════════════════════════${NC}"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$(ask_value "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "Clé publique Stripe (pk_test_... ou pk_live_...)")

echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 RÉSUMÉ DE LA CONFIGURATION${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "API URL: $NEXT_PUBLIC_API_URL"
echo "Stripe Publishable Key: ${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:0:20}..."
echo ""

read -p "Voulez-vous sauvegarder cette configuration dans Vault ? (o/N): " confirm
if [[ ! "$confirm" =~ ^([oO][uU][iI]|[oO])$ ]]; then
    echo -e "${RED}❌ Annulé${NC}"
    exit 0
fi

echo ""
echo -e "${CYAN}💾 Sauvegarde des secrets dans Vault...${NC}"

vault kv put secret/maison-epouvante-front/app \
  NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" \
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"

echo ""
echo -e "${GREEN}✅ Secrets sauvegardés dans Vault${NC}"
echo ""

echo -e "${CYAN}🔍 Vérification des secrets...${NC}"
vault kv get secret/maison-epouvante-front/app

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Configuration mise à jour avec succès !${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}📋 Prochaines étapes:${NC}"
echo ""
echo "1. Les secrets seront automatiquement synchronisés vers Kubernetes"
echo "   (délai: jusqu'à 15 minutes ou au prochain redémarrage des pods)"
echo ""
echo "2. Pour forcer la resynchronisation immédiate:"
echo "   kubectl -n maison-epouvante-front rollout restart deployment/maison-epouvante-front"
echo ""
echo "3. Vérifier la synchronisation:"
echo "   kubectl -n maison-epouvante-front get externalsecret"
echo "   kubectl -n maison-epouvante-front describe externalsecret maison-epouvante-front-vault"
echo ""

# Cleanup automatique via trap

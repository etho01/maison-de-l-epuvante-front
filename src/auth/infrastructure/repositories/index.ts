/**
 * Infrastructure: Auth Repository Factory
 *
 * Point d'entrée unique pour obtenir le bon repository selon le contexte.
 *
 * Règle simple :
 *   - Contexte CLIENT (composants React) → getClientAuthRepository()
 *   - Contexte SERVEUR (API Routes, Server Components) → getServerAuthRepository()
 */

import { AuthRepositoryImpl } from './AuthRepositoryImpl';
import { SymfonyAuthRepository } from './SymfonyAuthRepository';

/**
 * Repository pour les composants client et les hooks de présentation.
 * Passe par les API Routes Next.js (/api/auth/*).
 */
export const getClientAuthRepository = () => new AuthRepositoryImpl();

/**
 * Repository pour les Server Components et les API Routes Next.js.
 * Appelle directement l'API Symfony.
 */
export const getServerAuthRepository = () => new SymfonyAuthRepository();

export { AuthRepositoryImpl, SymfonyAuthRepository };

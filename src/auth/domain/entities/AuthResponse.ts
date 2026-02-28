import { User } from './User';

/**
 * Domain Entity: Auth Response
 * Réponse retournée par le repository lors d'une authentification.
 * Séparée de IAuthRepository pour ne pas mélanger contrat d'interface et types métier.
 */
export interface AuthResponse {
  token: string;
  user: User;
}

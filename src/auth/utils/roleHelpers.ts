import { User } from '../domain/entities/User';

export enum UserRole {
  ADMIN = 'ROLE_ADMIN',
  USER = 'ROLE_USER',
  MODERATOR = 'ROLE_MODERATOR',
}

/**
 * Vérifie si un utilisateur a un rôle spécifique
 */
export const hasRole = (user: User | null, role: UserRole): boolean => {
  if (!user) return false;
  return user.roles.includes(role);
};

/**
 * Vérifie si un utilisateur est admin
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, UserRole.ADMIN);
};

/**
 * Vérifie si un utilisateur est modérateur
 */
export const isModerator = (user: User | null): boolean => {
  return hasRole(user, UserRole.MODERATOR);
};

/**
 * Vérifie si un utilisateur a au moins un des rôles spécifiés
 */
export const hasAnyRole = (user: User | null, roles: UserRole[]): boolean => {
  if (!user) return false;
  return roles.some(role => user.roles.includes(role));
};

/**
 * Vérifie si un utilisateur peut accéder à l'admin
 */
export const canAccessAdmin = (user: User | null): boolean => {
  return hasAnyRole(user, [UserRole.ADMIN, UserRole.MODERATOR]);
};

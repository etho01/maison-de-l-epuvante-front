/**
 * Helper: Check if user has admin role
 */

import { User } from '../domain/entities/User';

export function isAdmin(user: User | null): boolean {
  if (!user) return false;
  return user.roles.includes('ROLE_ADMIN');
}

export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false;
  return user.roles.includes(role);
}

/**
 * Domain Entity: Administrator
 * Représente un administrateur dans le domaine
 */

export interface Administrator {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAdministratorData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  isVerified?: boolean;
}

export interface UpdateAdministratorData {
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
  isVerified?: boolean;
}

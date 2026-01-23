/**
 * Domain Entity: User
 * Représente un utilisateur dans le domaine
 */

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  roles: string[];
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequestData {
  email: string;
}

export interface ResetPasswordConfirmData {
  token: string;
  password: string;
}

export interface VerifyEmailData {
  token: string;
}

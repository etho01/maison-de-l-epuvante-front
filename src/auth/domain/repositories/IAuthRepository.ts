/**
 * Domain Interface: Auth Repository
 * Définit les opérations d'authentification sans connaître l'implémentation
 */

import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  ChangePasswordData,
  ResetPasswordRequestData,
  ResetPasswordConfirmData,
  VerifyEmailData 
} from '../entities/User';

export interface AuthResponse {
  token: string;
  user: User;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User>;
  changePassword(data: ChangePasswordData): Promise<void>;
  requestPasswordReset(data: ResetPasswordRequestData): Promise<void>;
  confirmPasswordReset(data: ResetPasswordConfirmData): Promise<void>;
  verifyEmail(data: VerifyEmailData): Promise<void>;
  resendVerificationEmail(): Promise<void>;
}

/**
 * Auth Container — Injection de dépendances
 *
 * Singleton côté CLIENT uniquement (composants 'use client').
 * Une seule instance de AuthRepositoryImpl est partagée par tous les use cases.
 *
 * Usage :
 *   import { authContainer } from '@/src/auth/container';
 *   const result = await authContainer.loginUseCase.execute({ email, password });
 */

import { AuthRepositoryImpl } from './infrastructure/repositories/AuthRepositoryImpl';
import { LoginUseCase } from './application/usecases/LoginUseCase';
import { RegisterUseCase } from './application/usecases/RegisterUseCase';
import { GetCurrentUserUseCase } from './application/usecases/GetCurrentUserUseCase';
import { LogoutUseCase } from './application/usecases/LogoutUseCase';
import { ChangePasswordUseCase } from './application/usecases/ChangePasswordUseCase';
import { UpdateUserUseCase } from './application/usecases/UpdateUserUseCase';
import { RequestPasswordResetUseCase } from './application/usecases/RequestPasswordResetUseCase';
import { ConfirmPasswordResetUseCase } from './application/usecases/ConfirmPasswordResetUseCase';
import { VerifyEmailUseCase } from './application/usecases/VerifyEmailUseCase';
import { ResendVerificationEmailUseCase } from './application/usecases/ResendVerificationEmailUseCase';

const repository = new AuthRepositoryImpl();

export const authContainer = {
  /** Repository partagé (utile pour logout qui ne possède pas encore son use case dans le context) */
  repository,

  loginUseCase: new LoginUseCase(repository),
  registerUseCase: new RegisterUseCase(repository),
  getCurrentUserUseCase: new GetCurrentUserUseCase(repository),
  logoutUseCase: new LogoutUseCase(repository),
  changePasswordUseCase: new ChangePasswordUseCase(repository),
  updateUserUseCase: new UpdateUserUseCase(repository),
  requestPasswordResetUseCase: new RequestPasswordResetUseCase(repository),
  confirmPasswordResetUseCase: new ConfirmPasswordResetUseCase(repository),
  verifyEmailUseCase: new VerifyEmailUseCase(repository),
  resendVerificationEmailUseCase: new ResendVerificationEmailUseCase(repository),
};

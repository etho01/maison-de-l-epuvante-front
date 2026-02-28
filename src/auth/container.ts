/**
 * Auth Container — Injection de dépendances (CLIENT-SIDE)
 *
 * Lazy singletons : le repository et les use cases sont instanciés uniquement
 * au premier accès, puis mis en cache. Rien n'est créé au chargement du module.
 *
 * Usage :
 *   import { authContainer } from '@/src/auth/container';
 *   await authContainer.loginUseCase.execute({ email, password });
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

class AuthContainer {
  // ─── Repository (lazy) ────────────────────────────────────────────────────
  private _repository?: AuthRepositoryImpl;
  get repository() {
    return (this._repository ??= new AuthRepositoryImpl());
  }

  // ─── Use Cases (lazy) ─────────────────────────────────────────────────────
  private _loginUseCase?: LoginUseCase;
  get loginUseCase() {
    return (this._loginUseCase ??= new LoginUseCase(this.repository));
  }

  private _registerUseCase?: RegisterUseCase;
  get registerUseCase() {
    return (this._registerUseCase ??= new RegisterUseCase(this.repository));
  }

  private _getCurrentUserUseCase?: GetCurrentUserUseCase;
  get getCurrentUserUseCase() {
    return (this._getCurrentUserUseCase ??= new GetCurrentUserUseCase(this.repository));
  }

  private _logoutUseCase?: LogoutUseCase;
  get logoutUseCase() {
    return (this._logoutUseCase ??= new LogoutUseCase(this.repository));
  }

  private _changePasswordUseCase?: ChangePasswordUseCase;
  get changePasswordUseCase() {
    return (this._changePasswordUseCase ??= new ChangePasswordUseCase(this.repository));
  }

  private _updateUserUseCase?: UpdateUserUseCase;
  get updateUserUseCase() {
    return (this._updateUserUseCase ??= new UpdateUserUseCase(this.repository));
  }

  private _requestPasswordResetUseCase?: RequestPasswordResetUseCase;
  get requestPasswordResetUseCase() {
    return (this._requestPasswordResetUseCase ??= new RequestPasswordResetUseCase(this.repository));
  }

  private _confirmPasswordResetUseCase?: ConfirmPasswordResetUseCase;
  get confirmPasswordResetUseCase() {
    return (this._confirmPasswordResetUseCase ??= new ConfirmPasswordResetUseCase(this.repository));
  }

  private _verifyEmailUseCase?: VerifyEmailUseCase;
  get verifyEmailUseCase() {
    return (this._verifyEmailUseCase ??= new VerifyEmailUseCase(this.repository));
  }

  private _resendVerificationEmailUseCase?: ResendVerificationEmailUseCase;
  get resendVerificationEmailUseCase() {
    return (this._resendVerificationEmailUseCase ??= new ResendVerificationEmailUseCase(this.repository));
  }
}

export const authContainer = new AuthContainer();

/**
 * Infrastructure: Token Storage
 * Gestion du stockage du token d'authentification
 */

import { cookies } from 'next/headers';

export class TokenStorage {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 jours

  // Server-side: Utilise next/headers
  static async setTokenServer(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(this.TOKEN_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: this.TOKEN_MAX_AGE,
      path: '/',
    });
  }

  static async getTokenServer(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(this.TOKEN_KEY)?.value;
  }

  static async removeTokenServer(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(this.TOKEN_KEY);
  }

  // Client-side: Utilise document.cookie
  static setTokenClient(token: string): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + this.TOKEN_MAX_AGE * 1000);
    document.cookie = `${this.TOKEN_KEY}=${token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  static getTokenClient(): string | undefined {
    if (typeof document === 'undefined') return undefined;
    
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === this.TOKEN_KEY) {
        return value;
      }
    }
    return undefined;
  }

  static removeTokenClient(): void {
    document.cookie = `${this.TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

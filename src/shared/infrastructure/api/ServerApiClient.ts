/**
 * Infrastructure: Server API Client
 * Client HTTP pour communiquer avec l'API Symfony depuis le serveur ou le client
 * Utilise les tokens d'authentification
 */

import { ApiError } from '@/src/shared/domain/ApiError';
import { TokenStorage } from '@/src/auth/infrastructure/storage/TokenStorage';
import { redirect } from 'next/navigation';


export class ServerApiClient {
    private baseURL: string;

    constructor() {
        this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    }

    private async getToken(): Promise<string | undefined> {
        // Détection serveur vs client
        if (typeof window === 'undefined') {
            // Côté serveur
            return await TokenStorage.getTokenServer();
        } else {
            // Côté client
            return TokenStorage.getTokenClient();
        }
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        // Récupérer automatiquement le token
        const token = await this.getToken();

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);
            

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.log(config, await errorData, response.status);

                if (response.status === 401) {
                    redirect('/api/auth/logout');

                }

                console.error('Erreur API:', {
                    status: response.status,
                    statusText: response.statusText,
                    url,
                    method: config.method,
                    body: config.body,
                    errorData,
                });

                throw new ApiError(
                    response.status,
                    errorData.errors || [],
                    errorData.data,
                    errorData.message || 'Une erreur est survenue lors de la requête'
                );
            }

            // Si status 204 (No Content), retourner null
            if (response.status === 204) {
                return null as T;
            }
            let data = await response.json();

            return data['data'] || data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            // Re-émettre les signaux internes Next.js (redirect, notFound, etc.)
            if (error instanceof Error && 'digest' in error) {
                throw error;
            }
            console.error('Erreur de connexion au serveur:', error);
            throw new ApiError(500, ['ERROR_SERVER'], null, 'Erreur de connexion au serveur');
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
        });
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async patch<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }
}

export const serverApiClient = new ServerApiClient();

/**
 * Infrastructure: API Client
 * Client HTTP pour communiquer avec l'API Symfony
 */

import { ApiError } from '@/src/shared/domain/ApiError';
import { TokenStorage } from '../storage/TokenStorage';


export class ApiClient {
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
        options: RequestInit = {},
        hasAlledgedlyRetried: boolean = false
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
            console.log(url, options)

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.log('Error response data:', errorData, response.status);

                if (response.status === 401) {
                    // Token invalide ou expiré, supprimer le token stocké
                    await TokenStorage.removeTokenServer();
                    if (!hasAlledgedlyRetried) {
                        // Retenter la requête une fois après suppression du token
                        return this.request<T>(endpoint, options, true);
                    }
                }

                throw new ApiError(
                    errorData.message || 'Une erreur est survenue',
                    response.status,
                    errorData
                );
            }

            // Si status 204 (No Content), retourner null
            if (response.status === 204) {
                return null as T;
            }

            return await response.json();
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError('Erreur de connexion au serveur', 500);
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
        });
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        console.log('POST request to:', endpoint, 'with data:', data);
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        console.log('PATCH request to:', endpoint, 'with data:', data);
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

export const apiClient = new ApiClient();

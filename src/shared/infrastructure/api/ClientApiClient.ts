/**
 * Infrastructure: Client API Client
 * Client HTTP pour les appels côté client uniquement
 * Authentification par cookies
 */

export class ClientApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public data?: any
    ) {
        super(message);
        this.name = 'ClientApiError';
    }
}

export class ClientApiClient {
    private baseURL: string;

    constructor(baseURL?: string) {
        this.baseURL = baseURL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    }

    /**
     * Méthode générique pour effectuer des requêtes
     */
    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const config: RequestInit = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include', // Authentification par cookies
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Client API Error:', {
                    status: response.status,
                    data: errorData,
                });
                throw new ClientApiError(
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
            if (error instanceof ClientApiError) {
                throw error;
            }
            throw new ClientApiError('Erreur de connexion au serveur', 500);
        }
    }

    /**
     * Effectue une requête GET
     */
    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'GET',
        });
    }

    /**
     * Effectue une requête POST
     */
    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * Effectue une requête PUT
     */
    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * Effectue une requête PATCH
     */
    async patch<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    /**
     * Effectue une requête DELETE
     */
    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }

    /**
     * Télécharge un fichier (retourne un Blob)
     */
    async downloadFile(endpoint: string): Promise<Blob> {
        const url = `${this.baseURL}${endpoint}`;

        const response = await fetch(url, {
            method: 'GET',
            credentials: 'include', // Authentification par cookies
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ClientApiError(
                errorData.message || 'Erreur lors du téléchargement',
                response.status,
                errorData
            );
        }

        return await response.blob();
    }

    /**
     * Upload un fichier (FormData)
     */
    async uploadFile<T>(endpoint: string, formData: FormData): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include', // Authentification par cookies
            // Ne pas définir Content-Type pour FormData (sera automatiquement défini avec le boundary)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new ClientApiError(
                errorData.message || 'Erreur lors de l\'upload',
                response.status,
                errorData
            );
        }

        if (response.status === 204) {
            return null as T;
        }

        return await response.json();
    }
}

/**
 * Instance singleton du client API côté client
 */
export const clientApiClient = new ClientApiClient();

/**
 * Types pour les requêtes API
 */

export type RequestParams = Record<string, string> | FormData | undefined;

export type RequestHeaders = Record<string, string>;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

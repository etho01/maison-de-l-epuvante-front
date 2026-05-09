/**
 * Types pour les requêtes API
 */

export type RequestParams = object | FormData | undefined;

export type RequestHeaders = Record<string, string>;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

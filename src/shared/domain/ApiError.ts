
export class ApiError extends Error {
    code: number;
    errors: string[];
    data?: any;

    constructor(
        code: number,
        errors: string[] = [],
        data?: any,
        message: string = 'Une erreur est survenue',
    ) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.errors = errors;
        this.data = data;
    }
}
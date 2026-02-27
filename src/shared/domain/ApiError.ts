
export class ApiError<T = any> extends Error {
    code: number;
    errors: string[];
    data?: T;

    constructor(
        code: number,
        errors: string[] = [],
        data?: T,
        message: string = 'Une erreur est survenue',
    ) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.errors = errors;
        this.data = data;
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    hasError(error: string): boolean {
        return this.errors.includes(error);
    }

    getData(): T | undefined {
        return this.data;
    }

    getError() {
        return {
            code: this.code,
            message: this.message,
            errors: this.errors,
            data: this.data,
        };
    }

    getStatusCode(): number {
        return this.code;
    }
}
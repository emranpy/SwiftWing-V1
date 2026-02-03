// apps/api/src/utils/Errors/errors.ts
export class AppError extends Error {
    statusCode: number;
    explanation: string; // Add this specific field

    constructor(message: string, statusCode: number, explanation?: string) {
        super(message);
        this.statusCode = statusCode;
        this.explanation = explanation || message; // Use message if explanation is missing
    }
}
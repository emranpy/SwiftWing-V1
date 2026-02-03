// packages/ui-utils/index.ts
export class SuccessResponse {
    success: boolean = true;
    error: object = {};

    constructor(
        public data: any, 
        public message: string = "Request completed successfully"
    ) {}
}
 
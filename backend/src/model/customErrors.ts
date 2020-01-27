export class ApiError extends Error {
    constructor(readonly message: string) {
        super();
    }
}

export class CustomerNotFoundError extends ApiError {}

export class NoteNotFoundError extends ApiError {}

export class InvalidRequestError extends ApiError {}

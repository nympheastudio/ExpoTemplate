declare class NamedError extends Error {
    constructor(message?: string);
}
export declare class InvalidEasJsonError extends NamedError {
}
export declare class MissingEasJsonError extends NamedError {
}
export declare class MissingProfileError extends NamedError {
}
export declare class MissingParentProfileError extends NamedError {
}
export {};

export declare class MissingCredentialsNonInteractiveError extends Error {
    constructor(message?: string);
}
export declare class InsufficientAuthenticationNonInteractiveError extends Error {
    constructor(message?: string);
}
export declare class ForbidCredentialModificationError extends Error {
    constructor(message?: string);
}
export declare class MissingCredentialsError extends Error {
    constructor(message?: string);
}
export declare class UnsupportedCredentialsChoiceError extends Error {
    choice: string;
    constructor(message: string, choice: string);
}
export declare class AndroidPackageNotDefinedError extends Error {
    constructor(message?: string);
}

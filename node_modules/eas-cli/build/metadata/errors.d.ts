import { Issue } from './config/issue';
/**
 * Before syncing data to the ASC API, we need to validate the metadata config.
 * This error represents unrecoverable issues before syncing that data,
 * and should contain useful information for the user to solve before trying again.
 */
export declare class MetadataValidationError extends Error {
    readonly errors: Issue[];
    constructor(message?: string, errors?: Issue[]);
}
/**
 * If a single entity failed to update, we don't block the other entities from uploading.
 * We still attempt to update the data in the stores as much as possible.
 * Because of that, we keep track of any errors encountered and throw this generic error.
 * It contains that list of encountered errors to present to the user.
 */
export declare class MetadataUploadError extends Error {
    readonly errors: Error[];
    readonly executionId: string;
    constructor(errors: Error[], executionId: string);
}
/**
 * If a single entity failed to download, we don't block the other entities from downloading.
 * We sill attempt to pull in the data from the stores as much as possible.
 * Because of that, we keep track of any errors envountered and throw this generic error.
 * It contains that list of encountered errors to present to the user.
 */
export declare class MetadataDownloadError extends Error {
    readonly errors: Error[];
    readonly executionId: string;
    constructor(errors: Error[], executionId: string);
}
/**
 * Log the encountered metadata validation error in detail for the user.
 * This should help communicate any possible configuration error and help the user resolve it.
 */
export declare function logMetadataValidationError(error: MetadataValidationError): void;
/**
 * Handle a thrown metadata error by informing the user what went wrong.
 * If a normal error is thrown, this method will re-throw that error to avoid consuming it.
 */
export declare function handleMetadataError(error: Error): void;

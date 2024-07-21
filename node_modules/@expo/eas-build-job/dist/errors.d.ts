import { BuildPhase } from './logs';
export declare enum ErrorCode {
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    UNKNOWN_CUSTOM_BUILD_ERROR = "UNKNOWN_CUSTOM_BUILD_ERROR",
    SERVER_ERROR = "SERVER_ERROR",
    UNKNOWN_FASTLANE_ERROR = "EAS_BUILD_UNKNOWN_FASTLANE_ERROR",
    UNKNOWN_FASTLANE_RESIGN_ERROR = "EAS_BUILD_UNKNOWN_FASTLANE_RESIGN_ERROR",
    UNKNOWN_GRADLE_ERROR = "EAS_BUILD_UNKNOWN_GRADLE_ERROR",
    BUILD_TIMEOUT_ERROR = "EAS_BUILD_TIMEOUT_ERROR"
}
export interface ExternalBuildError {
    errorCode: string;
    message: string;
    docsUrl?: string;
    buildPhase?: BuildPhase;
}
interface BuildErrorDetails {
    errorCode: string;
    userFacingMessage: string;
    userFacingErrorCode: string;
    docsUrl?: string;
    innerError?: Error;
    buildPhase?: BuildPhase;
}
export declare class BuildError extends Error {
    errorCode: string;
    userFacingMessage: string;
    userFacingErrorCode: string;
    docsUrl?: string;
    innerError?: Error;
    buildPhase?: BuildPhase;
    constructor(message: string, details: BuildErrorDetails);
    format(): ExternalBuildError;
}
export declare class UserFacingError extends Error {
    errorCode: string;
    message: string;
    docsUrl?: string | undefined;
    constructor(errorCode: string, message: string, docsUrl?: string | undefined);
}
export declare class UnknownError extends UserFacingError {
    constructor(buildPhase?: BuildPhase);
}
export declare class UnknownBuildError extends BuildError {
    constructor();
}
export declare class UnknownCustomBuildError extends BuildError {
    constructor();
}
export declare class CredentialsDistCertMismatchError extends UserFacingError {
    constructor(message: string);
}
export {};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsDistCertMismatchError = exports.UnknownCustomBuildError = exports.UnknownBuildError = exports.UnknownError = exports.UserFacingError = exports.BuildError = exports.ErrorCode = void 0;
const logs_1 = require("./logs");
var ErrorCode;
(function (ErrorCode) {
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    ErrorCode["UNKNOWN_CUSTOM_BUILD_ERROR"] = "UNKNOWN_CUSTOM_BUILD_ERROR";
    ErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
    ErrorCode["UNKNOWN_FASTLANE_ERROR"] = "EAS_BUILD_UNKNOWN_FASTLANE_ERROR";
    ErrorCode["UNKNOWN_FASTLANE_RESIGN_ERROR"] = "EAS_BUILD_UNKNOWN_FASTLANE_RESIGN_ERROR";
    ErrorCode["UNKNOWN_GRADLE_ERROR"] = "EAS_BUILD_UNKNOWN_GRADLE_ERROR";
    ErrorCode["BUILD_TIMEOUT_ERROR"] = "EAS_BUILD_TIMEOUT_ERROR";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
class BuildError extends Error {
    constructor(message, details) {
        super(message);
        this.errorCode = details.errorCode;
        this.userFacingErrorCode = details.userFacingErrorCode;
        this.userFacingMessage = details.userFacingMessage;
        this.docsUrl = details.docsUrl;
        this.innerError = details.innerError;
        this.buildPhase = details.buildPhase;
    }
    format() {
        return {
            errorCode: this.userFacingErrorCode,
            message: this.userFacingMessage,
            docsUrl: this.docsUrl,
            buildPhase: this.buildPhase,
        };
    }
}
exports.BuildError = BuildError;
class UserFacingError extends Error {
    constructor(errorCode, message, docsUrl) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
        this.docsUrl = docsUrl;
    }
}
exports.UserFacingError = UserFacingError;
class UnknownError extends UserFacingError {
    constructor(buildPhase) {
        super(ErrorCode.UNKNOWN_ERROR, buildPhase
            ? `Unknown error. See logs of the ${logs_1.buildPhaseDisplayName[buildPhase]} build phase for more information.`
            : 'Unknown error. See logs for more information.');
    }
}
exports.UnknownError = UnknownError;
class UnknownBuildError extends BuildError {
    constructor() {
        const errorCode = ErrorCode.UNKNOWN_ERROR;
        const message = 'Unknown error. See logs for more information.';
        super(message, {
            errorCode,
            userFacingMessage: message,
            userFacingErrorCode: errorCode,
        });
    }
}
exports.UnknownBuildError = UnknownBuildError;
class UnknownCustomBuildError extends BuildError {
    constructor() {
        const errorCode = ErrorCode.UNKNOWN_CUSTOM_BUILD_ERROR;
        const message = 'Unknown custom build error. See logs for more information.';
        super(message, {
            errorCode,
            userFacingMessage: message,
            userFacingErrorCode: errorCode,
        });
    }
}
exports.UnknownCustomBuildError = UnknownCustomBuildError;
class CredentialsDistCertMismatchError extends UserFacingError {
    constructor(message) {
        super('EAS_BUILD_CREDENTIALS_DIST_CERT_MISMATCH', message);
    }
}
exports.CredentialsDistCertMismatchError = CredentialsDistCertMismatchError;
//# sourceMappingURL=errors.js.map
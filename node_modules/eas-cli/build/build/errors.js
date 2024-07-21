"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasBuildProjectArchiveUploadError = exports.EasBuildTooManyPendingBuildsError = exports.EasBuildDownForMaintenanceError = exports.RequestValidationError = exports.EasBuildLegacyResourceClassNotAvailableError = exports.EasBuildResourceClassNotAvailableInFreeTierError = exports.EasBuildFreeTierIosLimitExceededError = exports.EasBuildFreeTierLimitExceededError = exports.EasBuildFreeTierDisabledAndroidError = exports.EasBuildFreeTierDisabledIOSError = exports.EasBuildFreeTierDisabledError = exports.TurtleDeprecatedJobFormatError = void 0;
const errors_1 = require("../commandUtils/errors");
class TurtleDeprecatedJobFormatError extends errors_1.EasCommandError {
}
exports.TurtleDeprecatedJobFormatError = TurtleDeprecatedJobFormatError;
class EasBuildFreeTierDisabledError extends errors_1.EasCommandError {
}
exports.EasBuildFreeTierDisabledError = EasBuildFreeTierDisabledError;
class EasBuildFreeTierDisabledIOSError extends errors_1.EasCommandError {
}
exports.EasBuildFreeTierDisabledIOSError = EasBuildFreeTierDisabledIOSError;
class EasBuildFreeTierDisabledAndroidError extends errors_1.EasCommandError {
}
exports.EasBuildFreeTierDisabledAndroidError = EasBuildFreeTierDisabledAndroidError;
class EasBuildFreeTierLimitExceededError extends errors_1.EasCommandError {
}
exports.EasBuildFreeTierLimitExceededError = EasBuildFreeTierLimitExceededError;
class EasBuildFreeTierIosLimitExceededError extends errors_1.EasCommandError {
}
exports.EasBuildFreeTierIosLimitExceededError = EasBuildFreeTierIosLimitExceededError;
class EasBuildResourceClassNotAvailableInFreeTierError extends errors_1.EasCommandError {
}
exports.EasBuildResourceClassNotAvailableInFreeTierError = EasBuildResourceClassNotAvailableInFreeTierError;
class EasBuildLegacyResourceClassNotAvailableError extends errors_1.EasCommandError {
}
exports.EasBuildLegacyResourceClassNotAvailableError = EasBuildLegacyResourceClassNotAvailableError;
class RequestValidationError extends errors_1.EasCommandError {
}
exports.RequestValidationError = RequestValidationError;
class EasBuildDownForMaintenanceError extends errors_1.EasCommandError {
}
exports.EasBuildDownForMaintenanceError = EasBuildDownForMaintenanceError;
class EasBuildTooManyPendingBuildsError extends errors_1.EasCommandError {
}
exports.EasBuildTooManyPendingBuildsError = EasBuildTooManyPendingBuildsError;
class EasBuildProjectArchiveUploadError extends errors_1.EasCommandError {
}
exports.EasBuildProjectArchiveUploadError = EasBuildProjectArchiveUploadError;

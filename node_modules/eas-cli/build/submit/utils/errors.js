"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSubmissionError = void 0;
const tslib_1 = require("tslib");
const log_1 = tslib_1.__importDefault(require("../../log"));
const UNKNOWN_ERROR_CODES = [
    'SUBMISSION_SERVICE_ANDROID_UNKNOWN_ERROR',
    'SUBMISSION_SERVICE_IOS_UNKNOWN_ERROR',
];
/**
 * Returns a boolean indicating whether the submission logs should be printed.
 */
function printSubmissionError(error) {
    log_1.default.addNewLineIfNone();
    if (!error.message || (error.errorCode && UNKNOWN_ERROR_CODES.includes(error.errorCode))) {
        log_1.default.error(error.message ?? `We couldn't figure out what went wrong. See logs to learn more.`);
        return true;
    }
    else {
        log_1.default.error(error.message);
        return false;
    }
}
exports.printSubmissionError = printSubmissionError;

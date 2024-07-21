"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParentProfileError = exports.MissingProfileError = exports.MissingEasJsonError = exports.InvalidEasJsonError = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
class NamedError extends Error {
    constructor(message) {
        super(message);
        this.name = chalk_1.default.red(this.constructor.name);
    }
}
class InvalidEasJsonError extends NamedError {
}
exports.InvalidEasJsonError = InvalidEasJsonError;
class MissingEasJsonError extends NamedError {
}
exports.MissingEasJsonError = MissingEasJsonError;
class MissingProfileError extends NamedError {
}
exports.MissingProfileError = MissingProfileError;
class MissingParentProfileError extends NamedError {
}
exports.MissingParentProfileError = MissingParentProfileError;

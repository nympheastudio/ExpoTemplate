"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasCommandError = void 0;
class EasCommandError extends Error {
    // constructor is not useless, since the constructor for Error allows for optional `message`
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(message) {
        super(message);
    }
}
exports.EasCommandError = EasCommandError;

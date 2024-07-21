"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleTeamMissingError = void 0;
class AppleTeamMissingError extends Error {
    constructor(message) {
        super(message ?? 'Apple Team is necessary to create Apple App Identifier');
    }
}
exports.AppleTeamMissingError = AppleTeamMissingError;

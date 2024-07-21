"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelNotFoundError = void 0;
class ChannelNotFoundError extends Error {
    constructor(message) {
        super(message ?? 'Channel not found.');
    }
}
exports.ChannelNotFoundError = ChannelNotFoundError;

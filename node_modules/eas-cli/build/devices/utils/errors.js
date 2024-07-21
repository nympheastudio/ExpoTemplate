"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceCreateError = exports.DeviceNotFoundError = void 0;
class DeviceNotFoundError extends Error {
    constructor(message) {
        super(message ?? 'Device not found.');
    }
}
exports.DeviceNotFoundError = DeviceNotFoundError;
class DeviceCreateError extends Error {
    constructor(message) {
        super(message ?? 'Failed to create a device.');
    }
}
exports.DeviceCreateError = DeviceCreateError;

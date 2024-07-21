"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMultipleInstancesPossible = exports.isNativeModuleLoaded = exports.isValidCallback = void 0;
var invariant_1 = __importDefault(require("invariant"));
var events_1 = require("./events/events");
function isValidCallback(handler) {
    invariant_1.default(typeof handler === 'function', 'Must provide a valid callback');
}
exports.isValidCallback = isValidCallback;
function isNativeModuleLoaded(module) {
    if (module == null) {
        console.error('Could not load RNOneSignal native module. Make sure native dependencies are properly linked.');
        return false;
    }
    return true;
}
exports.isNativeModuleLoaded = isNativeModuleLoaded;
/**
 * Returns whether the handler associated with the event name can have multiple instances set
 * @param  {String} eventName
 */
function isMultipleInstancesPossible(eventName) {
    switch (eventName) {
        case events_1.PERMISSION_CHANGED:
        case events_1.SUBSCRIPTION_CHANGED:
        case events_1.EMAIL_SUBSCRIPTION_CHANGED:
        case events_1.SMS_SUBSCRIPTION_CHANGED:
            return true;
        default:
            return false;
    }
}
exports.isMultipleInstancesPossible = isMultipleInstancesPossible;

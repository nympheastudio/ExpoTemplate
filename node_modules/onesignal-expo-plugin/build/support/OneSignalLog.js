"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneSignalLog = void 0;
class OneSignalLog {
    static log(str) {
        console.log(`\tonesignal-expo-plugin: ${str}`);
    }
    static error(str) {
        console.error(`\tonesignal-expo-plugin: ${str}`);
    }
}
exports.OneSignalLog = OneSignalLog;

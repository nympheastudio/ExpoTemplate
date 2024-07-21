"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAndroidSdkRootAsync = exports.ANDROID_DEFAULT_LOCATION = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = require("fs-extra");
const os_1 = tslib_1.__importDefault(require("os"));
const path_1 = tslib_1.__importDefault(require("path"));
exports.ANDROID_DEFAULT_LOCATION = {
    darwin: path_1.default.join(os_1.default.homedir(), 'Library', 'Android', 'sdk'),
    linux: path_1.default.join(os_1.default.homedir(), 'Android', 'Sdk'),
    win32: path_1.default.join(os_1.default.homedir(), 'AppData', 'Local', 'Android', 'Sdk'),
};
const ANDROID_DEFAULT_LOCATION_FOR_CURRENT_PLATFORM = exports.ANDROID_DEFAULT_LOCATION[process.platform];
async function getAndroidSdkRootAsync() {
    if (process.env.ANDROID_HOME && (await (0, fs_extra_1.pathExists)(process.env.ANDROID_HOME))) {
        return process.env.ANDROID_HOME;
    }
    else if (process.env.ANDROID_SDK_ROOT && (await (0, fs_extra_1.pathExists)(process.env.ANDROID_SDK_ROOT))) {
        return process.env.ANDROID_SDK_ROOT;
    }
    else if (ANDROID_DEFAULT_LOCATION_FOR_CURRENT_PLATFORM &&
        (await (0, fs_extra_1.pathExists)(ANDROID_DEFAULT_LOCATION_FOR_CURRENT_PLATFORM))) {
        return ANDROID_DEFAULT_LOCATION_FOR_CURRENT_PLATFORM;
    }
    else {
        return null;
    }
}
exports.getAndroidSdkRootAsync = getAndroidSdkRootAsync;

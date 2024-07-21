"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAptParametersAsync = exports.getAaptExecutableAsync = void 0;
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const fast_glob_1 = tslib_1.__importDefault(require("fast-glob"));
const path_1 = tslib_1.__importDefault(require("path"));
const sdk_1 = require("./sdk");
const log_1 = tslib_1.__importDefault(require("../../log"));
async function aaptAsync(...options) {
    try {
        return await (0, spawn_async_1.default)(await getAaptExecutableAsync(), options);
    }
    catch (error) {
        if (error.stderr) {
            log_1.default.error(error.stderr);
        }
        throw error;
    }
}
async function getAaptExecutableAsync() {
    const sdkRoot = await (0, sdk_1.getAndroidSdkRootAsync)();
    if (!sdkRoot) {
        log_1.default.debug('Failed to resolve the Android SDK path, falling back to global aapt executable');
        return 'aapt';
    }
    const aaptPaths = await (0, fast_glob_1.default)(path_1.default.posix.join('build-tools/**', process.platform === 'win32' ? 'aapt.exe' : 'aapt'), { cwd: sdkRoot, absolute: true });
    if (aaptPaths.length === 0) {
        throw new Error('Failed to resolve the Android aapt path');
    }
    const sorted = aaptPaths.sort();
    return sorted[sorted.length - 1];
}
exports.getAaptExecutableAsync = getAaptExecutableAsync;
async function getAptParametersAsync(appPath) {
    const { stdout } = await aaptAsync('dump', 'badging', appPath);
    const packageNameMatch = stdout.match(/package: name='([^']+)'/);
    if (!packageNameMatch) {
        throw new Error(`Could not read package name from ${appPath}`);
    }
    // get activity name
    const activityNameMatch = stdout.match(/launchable-activity: name='([^']+)'/);
    if (!activityNameMatch) {
        throw new Error(`Could not read activity name from ${appPath}`);
    }
    return {
        packageName: packageNameMatch[1],
        activityName: activityNameMatch[1],
    };
}
exports.getAptParametersAsync = getAptParametersAsync;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installXcrunAsync = exports.isXcrunInstalledAsync = exports.xcrunAsync = void 0;
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const log_1 = tslib_1.__importDefault(require("../../log"));
const promise_1 = require("../../utils/promise");
async function xcrunAsync(args, options) {
    try {
        return await (0, spawn_async_1.default)('xcrun', args, options);
    }
    catch (e) {
        throwXcrunError(e);
    }
}
exports.xcrunAsync = xcrunAsync;
function throwXcrunError(e) {
    if (isLicenseOutOfDate(e.stdout) || isLicenseOutOfDate(e.stderr)) {
        throw new Error('Xcode license is not accepted. Please run `sudo xcodebuild -license`.');
    }
    else if (e.stderr?.includes('not a developer tool or in PATH')) {
        throw new Error(`You may need to run ${chalk_1.default.bold('sudo xcode-select -s /Applications/Xcode.app')} and try again.`);
    }
    if (Array.isArray(e.output)) {
        e.message += '\n' + e.output.join('\n').trim();
    }
    else if (e.stderr) {
        e.message += '\n' + e.stderr;
    }
    throw new Error(`Some other error occurred while running xcrun command.
  ${e.message}`);
}
function isLicenseOutOfDate(text) {
    if (!text) {
        return false;
    }
    const lower = text.toLowerCase();
    return lower.includes('xcode') && lower.includes('license');
}
async function isXcrunInstalledAsync() {
    try {
        await (0, spawn_async_1.default)('xcrun', ['--version']);
        return true;
    }
    catch {
        return false;
    }
}
exports.isXcrunInstalledAsync = isXcrunInstalledAsync;
async function installXcrunAsync() {
    await (0, spawn_async_1.default)('xcode-select', ['--install']);
    await waitForXcrunInstallToFinishAsync(60 * 1000, 1000);
}
exports.installXcrunAsync = installXcrunAsync;
async function waitForXcrunInstallToFinishAsync(maxWaitTimeMs, intervalMs) {
    log_1.default.newLine();
    log_1.default.log('Waiting for Xcode Command Line Tools install to finish...');
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitTimeMs) {
        if (await isXcrunInstalledAsync()) {
            return;
        }
        await (0, promise_1.sleepAsync)(Math.min(intervalMs, Math.max(maxWaitTimeMs - (Date.now() - startTime), 0)));
    }
    throw new Error('Timed out waiting for Xcode Command Line Tools install to finish');
}

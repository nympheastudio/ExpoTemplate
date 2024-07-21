"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAppOnIosSimulatorAsync = void 0;
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const path_1 = tslib_1.__importDefault(require("path"));
const simulator = tslib_1.__importStar(require("./simulator"));
const systemRequirements_1 = require("./systemRequirements");
async function runAppOnIosSimulatorAsync(appPath) {
    await (0, systemRequirements_1.validateSystemRequirementsAsync)();
    const selectedSimulator = await simulator.selectSimulatorAsync();
    await simulator.ensureSimulatorBootedAsync(selectedSimulator);
    await simulator.ensureSimulatorAppOpenedAsync(selectedSimulator.udid);
    const bundleIdentifier = await getAppBundleIdentifierAsync(appPath);
    await simulator.installAppAsync(selectedSimulator.udid, appPath);
    await simulator.launchAppAsync(selectedSimulator.udid, bundleIdentifier);
}
exports.runAppOnIosSimulatorAsync = runAppOnIosSimulatorAsync;
async function getAppBundleIdentifierAsync(appPath) {
    const { stdout, stderr } = await (0, spawn_async_1.default)('xcrun', [
        'plutil',
        '-extract',
        'CFBundleIdentifier',
        'raw',
        path_1.default.join(appPath, 'Info.plist'),
    ]);
    if (!stdout) {
        throw new Error(`Could not read app bundle identifier from ${path_1.default.join(appPath, 'Info.plist')}: ${stderr}`);
    }
    return stdout.trim();
}

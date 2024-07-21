"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimulatorAppIdAsync = exports.installAppAsync = exports.ensureSimulatorAppOpenedAsync = exports.launchAppAsync = exports.openSimulatorAppAsync = exports.ensureSimulatorBootedAsync = exports.getAvaliableIosSimulatorsListAsync = exports.getFirstBootedIosSimulatorAsync = exports.selectSimulatorAsync = void 0;
const tslib_1 = require("tslib");
const osascript = tslib_1.__importStar(require("@expo/osascript"));
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const simctl_1 = require("./simctl");
const log_1 = tslib_1.__importDefault(require("../../log"));
const prompts_1 = require("../../prompts");
const promise_1 = require("../../utils/promise");
async function selectSimulatorAsync() {
    const bootedSimulator = await getFirstBootedIosSimulatorAsync();
    if (bootedSimulator) {
        return bootedSimulator;
    }
    const simulators = await getAvaliableIosSimulatorsListAsync();
    log_1.default.newLine();
    const { selectedSimulator } = await (0, prompts_1.promptAsync)({
        type: 'select',
        message: `Select a simulator to run your app on`,
        name: 'selectedSimulator',
        choices: simulators.map(simulator => ({
            title: `iOS ${simulator.osVersion} ${simulator.name}`,
            value: simulator,
        })),
    });
    return selectedSimulator;
}
exports.selectSimulatorAsync = selectSimulatorAsync;
async function getFirstBootedIosSimulatorAsync() {
    const bootedSimulators = await getAvaliableIosSimulatorsListAsync('booted');
    if (bootedSimulators.length > 0) {
        return bootedSimulators[0];
    }
    return undefined;
}
exports.getFirstBootedIosSimulatorAsync = getFirstBootedIosSimulatorAsync;
async function getAvaliableIosSimulatorsListAsync(query) {
    const { stdout } = query
        ? await (0, simctl_1.simctlAsync)(['list', 'devices', '--json', query])
        : await (0, simctl_1.simctlAsync)(['list', 'devices', '--json']);
    const info = parseSimControlJsonResults(stdout);
    const iosSimulators = [];
    for (const runtime of Object.keys(info.devices)) {
        // Given a string like 'com.apple.CoreSimulator.SimRuntime.tvOS-13-4'
        const runtimeSuffix = runtime.split('com.apple.CoreSimulator.SimRuntime.').pop();
        if (!runtimeSuffix) {
            continue;
        }
        // Create an array [tvOS, 13, 4]
        const [osType, ...osVersionComponents] = runtimeSuffix.split('-');
        if (osType === 'iOS') {
            // Join the end components [13, 4] -> '13.4'
            const osVersion = osVersionComponents.join('.');
            const sims = info.devices[runtime];
            for (const device of sims) {
                if (device.isAvailable) {
                    iosSimulators.push({
                        ...device,
                        runtime,
                        osVersion,
                        windowName: `${device.name} (${osVersion})`,
                        osType: 'iOS',
                        state: device.state,
                        lastBootedAt: device.lastBootedAt ? new Date(device.lastBootedAt) : undefined,
                    });
                }
            }
        }
    }
    return iosSimulators;
}
exports.getAvaliableIosSimulatorsListAsync = getAvaliableIosSimulatorsListAsync;
function parseSimControlJsonResults(input) {
    try {
        return JSON.parse(input);
    }
    catch (error) {
        // Nov 15, 2020: Observed this can happen when opening the simulator and the simulator prompts the user to update the xcode command line tools.
        // Unexpected token I in JSON at position 0
        if (error.message.includes('Unexpected token')) {
            log_1.default.error(`Apple's simctl returned malformed JSON:\n${input}`);
        }
        throw error;
    }
}
async function ensureSimulatorBootedAsync(simulator) {
    if (simulator.state === 'Booted') {
        return;
    }
    await (0, simctl_1.simctlAsync)(['boot', simulator.udid]);
}
exports.ensureSimulatorBootedAsync = ensureSimulatorBootedAsync;
async function openSimulatorAppAsync(simulatorUdid) {
    const args = ['-a', 'Simulator'];
    if (simulatorUdid) {
        // This has no effect if the app is already running.
        args.push('--args', '-CurrentDeviceUDID', simulatorUdid);
    }
    await (0, spawn_async_1.default)('open', args);
}
exports.openSimulatorAppAsync = openSimulatorAppAsync;
async function launchAppAsync(simulatorUdid, bundleIdentifier) {
    log_1.default.newLine();
    log_1.default.log('Launching your app...');
    await (0, simctl_1.simctlAsync)(['launch', simulatorUdid, bundleIdentifier]);
    log_1.default.succeed('Successfully launched your app!');
}
exports.launchAppAsync = launchAppAsync;
// I think the app can be open while no simulators are booted.
async function waitForSimulatorAppToStartAsync(maxWaitTimeMs, intervalMs) {
    log_1.default.newLine();
    log_1.default.log('Waiting for Simulator app to start...');
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitTimeMs) {
        if (await isSimulatorAppRunningAsync()) {
            return;
        }
        await (0, promise_1.sleepAsync)(Math.min(intervalMs, Math.max(maxWaitTimeMs - (Date.now() - startTime), 0)));
    }
    throw new Error('Timed out waiting for the iOS simulator to start.');
}
async function isSimulatorAppRunningAsync() {
    try {
        const result = await osascript.execAsync('tell app "System Events" to count processes whose name is "Simulator"');
        if (result.trim() === '0') {
            return false;
        }
    }
    catch (error) {
        if (error.message.includes('Application isn’t running')) {
            return false;
        }
        throw error;
    }
    return true;
}
async function ensureSimulatorAppOpenedAsync(simulatorUuid) {
    if (await isSimulatorAppRunningAsync()) {
        return;
    }
    await openSimulatorAppAsync(simulatorUuid);
    await waitForSimulatorAppToStartAsync(60 * 1000, 1000);
}
exports.ensureSimulatorAppOpenedAsync = ensureSimulatorAppOpenedAsync;
async function installAppAsync(deviceId, filePath) {
    log_1.default.newLine();
    log_1.default.log('Installing your app on the simulator...');
    await (0, simctl_1.simctlAsync)(['install', deviceId, filePath]);
    log_1.default.succeed('Successfully installed your app on the simulator!');
}
exports.installAppAsync = installAppAsync;
async function getSimulatorAppIdAsync() {
    try {
        return (await osascript.execAsync('id of app "Simulator"')).trim();
    }
    catch {
        return undefined;
    }
}
exports.getSimulatorAppIdAsync = getSimulatorAppIdAsync;

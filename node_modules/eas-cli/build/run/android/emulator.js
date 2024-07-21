"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startAppAsync = exports.installAppAsync = exports.ensureEmulatorBootedAsync = exports.selectEmulatorAsync = exports.getEmulatorExecutableAsync = exports.EMULATOR_MAX_WAIT_TIMEOUT_MS = void 0;
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const assert_1 = tslib_1.__importDefault(require("assert"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const os_1 = tslib_1.__importDefault(require("os"));
const path_1 = tslib_1.__importDefault(require("path"));
const adb_1 = require("./adb");
const sdk_1 = require("./sdk");
const log_1 = tslib_1.__importDefault(require("../../log"));
const prompts_1 = require("../../prompts");
const filter_1 = require("../../utils/expodash/filter");
exports.EMULATOR_MAX_WAIT_TIMEOUT_MS = 60 * 1000 * 3;
async function getEmulatorExecutableAsync() {
    const sdkRoot = await (0, sdk_1.getAndroidSdkRootAsync)();
    if (sdkRoot) {
        return path_1.default.join(sdkRoot, 'emulator', 'emulator');
    }
    return 'emulator';
}
exports.getEmulatorExecutableAsync = getEmulatorExecutableAsync;
async function emulatorAsync(...options) {
    const emulatorExecutable = await getEmulatorExecutableAsync();
    try {
        return await (0, spawn_async_1.default)(emulatorExecutable, options);
    }
    catch (error) {
        if (error.stderr) {
            log_1.default.error(error.stderr);
        }
        throw error;
    }
}
async function getAvaliableAndroidEmulatorsAsync() {
    try {
        const { stdout } = await emulatorAsync('-list-avds');
        return stdout
            .split(os_1.default.EOL)
            .filter(filter_1.truthy)
            .map(name => ({
            name,
        }));
    }
    catch {
        return [];
    }
}
/** Start an Android device and wait until it is booted. */
async function bootEmulatorAsync(emulator, { timeout = exports.EMULATOR_MAX_WAIT_TIMEOUT_MS, interval = 1000, } = {}) {
    log_1.default.newLine();
    log_1.default.log(`Opening emulator ${chalk_1.default.bold(emulator.name)}`);
    const emulatorExecutable = await getEmulatorExecutableAsync();
    // Start a process to open an emulator
    const emulatorProcess = (0, spawn_async_1.default)(emulatorExecutable, [`@${emulator.name}`], {
        stdio: 'ignore',
        detached: true,
    });
    // we don't want to wait for the emulator process to exit before we can finish `eas build:run` command
    // https://github.com/expo/eas-cli/pull/1485#discussion_r1007935871
    emulatorProcess.child.unref();
    return await (0, adb_1.waitForEmulatorToBeBootedAsync)(timeout, interval);
}
async function selectEmulatorAsync() {
    const runningEmulator = await (0, adb_1.getFirstRunningEmulatorAsync)();
    if (runningEmulator) {
        log_1.default.newLine();
        log_1.default.log(`Using open emulator: ${chalk_1.default.bold(runningEmulator.name)}`);
        return runningEmulator;
    }
    const emulators = await getAvaliableAndroidEmulatorsAsync();
    log_1.default.newLine();
    const { selectedEmulator } = await (0, prompts_1.promptAsync)({
        type: 'select',
        message: `Select an emulator to run your app on`,
        name: 'selectedEmulator',
        choices: emulators.map(emulator => ({
            title: emulator.name,
            value: emulator,
        })),
    });
    return selectedEmulator;
}
exports.selectEmulatorAsync = selectEmulatorAsync;
async function ensureEmulatorBootedAsync(emulator) {
    if (!emulator.pid || !(await (0, adb_1.isEmulatorBootedAsync)(emulator.pid))) {
        return await bootEmulatorAsync(emulator);
    }
    return emulator;
}
exports.ensureEmulatorBootedAsync = ensureEmulatorBootedAsync;
async function installAppAsync(emulator, apkFilePath) {
    log_1.default.newLine();
    log_1.default.log('Installing your app...');
    (0, assert_1.default)(emulator.pid);
    await (0, adb_1.adbAsync)('-s', emulator.pid, 'install', '-r', '-d', apkFilePath);
    log_1.default.succeed('Successfully installed your app!');
}
exports.installAppAsync = installAppAsync;
async function startAppAsync(emulator, packageName, activityName) {
    log_1.default.newLine();
    log_1.default.log('Starting your app...');
    (0, assert_1.default)(emulator.pid);
    await (0, adb_1.adbAsync)('-s', emulator.pid, 'shell', 'am', 'start', '-a', 'android.intent.action.MAIN', '-f', '0x20000000', // FLAG_ACTIVITY_SINGLE_TOP -- If set, the activity will not be launched if it is already running at the top of the history stack.
    '-n', `${packageName}/${activityName}`);
    log_1.default.succeed('Successfully started your app!');
}
exports.startAppAsync = startAppAsync;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertExecutablesExistAsync = void 0;
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const aapt_1 = require("./aapt");
const adb_1 = require("./adb");
const emulator_1 = require("./emulator");
async function assertExecutableExistsAsync(executable, options) {
    try {
        await (0, spawn_async_1.default)(executable, options);
    }
    catch (err) {
        throw new Error(`${chalk_1.default.bold(executable)} executable doesn't seem to work. Please make sure Android Studio is installed on your device and ${chalk_1.default.bold('ANDROID_HOME')} or ${chalk_1.default.bold('ANDROID_SDK_ROOT')} env variables are set.
${err.message}`);
    }
}
async function assertExecutablesExistAsync() {
    await assertExecutableExistsAsync(await (0, adb_1.getAdbExecutableAsync)(), ['--version']);
    await assertExecutableExistsAsync(await (0, emulator_1.getEmulatorExecutableAsync)(), ['-list-avds']);
    await assertExecutableExistsAsync(await (0, aapt_1.getAaptExecutableAsync)(), ['version']);
}
exports.assertExecutablesExistAsync = assertExecutablesExistAsync;

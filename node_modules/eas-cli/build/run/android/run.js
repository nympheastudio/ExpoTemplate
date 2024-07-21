"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAppOnAndroidEmulatorAsync = void 0;
const tslib_1 = require("tslib");
const aapt_1 = require("./aapt");
const emulator = tslib_1.__importStar(require("./emulator"));
const systemRequirements_1 = require("./systemRequirements");
async function runAppOnAndroidEmulatorAsync(appPath) {
    await (0, systemRequirements_1.assertExecutablesExistAsync)();
    const selectedEmulator = await emulator.selectEmulatorAsync();
    const bootedEmulator = await emulator.ensureEmulatorBootedAsync(selectedEmulator);
    await emulator.installAppAsync(bootedEmulator, appPath);
    const { packageName, activityName } = await (0, aapt_1.getAptParametersAsync)(appPath);
    await emulator.startAppAsync(bootedEmulator, packageName, activityName);
}
exports.runAppOnAndroidEmulatorAsync = runAppOnAndroidEmulatorAsync;

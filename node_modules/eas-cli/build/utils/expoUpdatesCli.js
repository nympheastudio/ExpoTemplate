"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expoUpdatesCommandAsync = exports.ExpoUpdatesCLICommandFailedError = exports.ExpoUpdatesCLIInvalidCommandError = exports.ExpoUpdatesCLIModuleNotFoundError = void 0;
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const resolve_from_1 = tslib_1.__importStar(require("resolve-from"));
const log_1 = require("../log");
class ExpoUpdatesCLIModuleNotFoundError extends Error {
}
exports.ExpoUpdatesCLIModuleNotFoundError = ExpoUpdatesCLIModuleNotFoundError;
class ExpoUpdatesCLIInvalidCommandError extends Error {
}
exports.ExpoUpdatesCLIInvalidCommandError = ExpoUpdatesCLIInvalidCommandError;
class ExpoUpdatesCLICommandFailedError extends Error {
}
exports.ExpoUpdatesCLICommandFailedError = ExpoUpdatesCLICommandFailedError;
async function expoUpdatesCommandAsync(projectDir, args, options) {
    let expoUpdatesCli;
    try {
        expoUpdatesCli =
            (0, resolve_from_1.silent)(projectDir, 'expo-updates/bin/cli') ??
                (0, resolve_from_1.default)(projectDir, 'expo-updates/bin/cli.js');
    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            throw new ExpoUpdatesCLIModuleNotFoundError(`The \`expo-updates\` package was not found. Follow the installation directions at ${(0, log_1.link)('https://docs.expo.dev/bare/installing-expo-modules/')}`);
        }
        throw e;
    }
    try {
        return (await (0, spawn_async_1.default)(expoUpdatesCli, args, {
            stdio: 'pipe',
            env: { ...process.env, ...options.env },
            cwd: options.cwd,
        })).stdout;
    }
    catch (e) {
        if (e.stderr && typeof e.stderr === 'string') {
            if (e.stderr.includes('Invalid command')) {
                throw new ExpoUpdatesCLIInvalidCommandError(`The command specified by ${args} was not valid in the \`expo-updates\` CLI.`);
            }
            else {
                throw new ExpoUpdatesCLICommandFailedError(e.stderr);
            }
        }
        throw e;
    }
}
exports.expoUpdatesCommandAsync = expoUpdatesCommandAsync;

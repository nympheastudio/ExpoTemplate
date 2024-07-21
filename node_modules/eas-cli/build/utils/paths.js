"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTmpDirectory = exports.getLogDirectory = exports.getCacheDirectory = exports.getConfigDirectory = exports.getDataDirectory = exports.getEasBuildRunCacheDirectoryPath = exports.getStateJsonPath = void 0;
const tslib_1 = require("tslib");
const env_paths_1 = tslib_1.__importDefault(require("env-paths"));
const os_1 = require("os");
const path = tslib_1.__importStar(require("path"));
// The ~/.expo directory is used to store authentication sessions,
// which are shared between EAS CLI and Expo CLI.
function dotExpoHomeDirectory() {
    const home = (0, os_1.homedir)();
    if (!home) {
        throw new Error("Can't determine your home directory; make sure your $HOME environment variable is set.");
    }
    let dirPath;
    if (process.env.EXPO_STAGING) {
        dirPath = path.join(home, '.expo-staging');
    }
    else if (process.env.EXPO_LOCAL) {
        dirPath = path.join(home, '.expo-local');
    }
    else {
        dirPath = path.join(home, '.expo');
    }
    return dirPath;
}
const getStateJsonPath = () => path.join(dotExpoHomeDirectory(), 'state.json');
exports.getStateJsonPath = getStateJsonPath;
const getEasBuildRunCacheDirectoryPath = () => path.join((0, exports.getTmpDirectory)(), 'eas-build-run-cache');
exports.getEasBuildRunCacheDirectoryPath = getEasBuildRunCacheDirectoryPath;
// Paths for storing things like data, config, cache, etc.
// Should use the correct OS-specific paths (e.g. XDG base directory on Linux)
const { data: DATA_PATH, config: CONFIG_PATH, cache: CACHE_PATH, log: LOG_PATH, temp: TEMP_PATH, } = (0, env_paths_1.default)('eas-cli');
const getDataDirectory = () => DATA_PATH;
exports.getDataDirectory = getDataDirectory;
const getConfigDirectory = () => CONFIG_PATH;
exports.getConfigDirectory = getConfigDirectory;
const getCacheDirectory = () => CACHE_PATH;
exports.getCacheDirectory = getCacheDirectory;
const getLogDirectory = () => LOG_PATH;
exports.getLogDirectory = getLogDirectory;
const getTmpDirectory = () => TEMP_PATH;
exports.getTmpDirectory = getTmpDirectory;

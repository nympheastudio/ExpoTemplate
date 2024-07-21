"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readAppJson = exports.updateAppJsonConfigAsync = void 0;
const tslib_1 = require("tslib");
const ExpoConfig = tslib_1.__importStar(require("@expo/config"));
const json_file_1 = tslib_1.__importDefault(require("@expo/json-file"));
const assert_1 = tslib_1.__importDefault(require("assert"));
async function updateAppJsonConfigAsync({ projectDir, exp, }, modifyConfig) {
    const paths = ExpoConfig.getConfigFilePaths(projectDir);
    (0, assert_1.default)(paths.staticConfigPath, "can't update dynamic config");
    const rawStaticConfig = readAppJson(paths.staticConfigPath);
    rawStaticConfig.expo = rawStaticConfig.expo ?? {};
    modifyConfig(rawStaticConfig.expo);
    await json_file_1.default.writeAsync(paths.staticConfigPath, rawStaticConfig, { json5: false });
    modifyConfig(exp);
}
exports.updateAppJsonConfigAsync = updateAppJsonConfigAsync;
// TODO: remove this once @expo/config exports getStaticConfig
function readAppJson(appJsonPath) {
    const config = json_file_1.default.read(appJsonPath, { json5: true });
    if (config) {
        return config;
    }
    throw new Error(`Failed to read app.json`);
}
exports.readAppJson = readAppJson;

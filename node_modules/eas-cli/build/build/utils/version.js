"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bumpAppVersionAsync = exports.ensureStaticConfigExists = void 0;
const tslib_1 = require("tslib");
const config_1 = require("@expo/config");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const semver_1 = tslib_1.__importDefault(require("semver"));
const appJson_1 = require("./appJson");
const log_1 = tslib_1.__importDefault(require("../../log"));
const prompts_1 = require("../../prompts");
function ensureStaticConfigExists(projectDir) {
    const paths = (0, config_1.getConfigFilePaths)(projectDir);
    if (!paths.staticConfigPath) {
        throw new Error('autoIncrement option is not supported when using app.config.js');
    }
}
exports.ensureStaticConfigExists = ensureStaticConfigExists;
async function bumpAppVersionAsync({ appVersion, projectDir, exp, }) {
    let bumpedAppVersion;
    if (semver_1.default.valid(appVersion)) {
        bumpedAppVersion = (0, nullthrows_1.default)(semver_1.default.inc(appVersion, 'patch'));
        log_1.default.log(`Bumping ${chalk_1.default.bold('expo.version')} from ${chalk_1.default.bold(appVersion)} to ${chalk_1.default.bold(bumpedAppVersion)}`);
    }
    else {
        log_1.default.log(`${chalk_1.default.bold('expo.version')} = ${chalk_1.default.bold(appVersion)} is not a valid semver`);
        bumpedAppVersion = (await (0, prompts_1.promptAsync)({
            type: 'text',
            name: 'bumpedAppVersion',
            message: 'What is the next version?',
        })).bumpedAppVersion;
    }
    await (0, appJson_1.updateAppJsonConfigAsync)({ projectDir, exp }, config => {
        config.version = bumpedAppVersion;
    });
}
exports.bumpAppVersionAsync = bumpAppVersionAsync;

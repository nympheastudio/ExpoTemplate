"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logCredentialsSource = void 0;
const tslib_1 = require("tslib");
const eas_json_1 = require("@expo/eas-json");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const log_1 = tslib_1.__importDefault(require("../../log"));
const platform_1 = require("../../platform");
function logCredentialsSource(credentialsSource, platform) {
    let message = `Using ${credentialsSource} ${platform_1.requestedPlatformDisplayNames[platform]} credentials`;
    if (credentialsSource === eas_json_1.CredentialsSource.LOCAL) {
        message += ` ${chalk_1.default.dim('(credentials.json)')}`;
    }
    else if (credentialsSource === eas_json_1.CredentialsSource.REMOTE) {
        message += ` ${chalk_1.default.dim('(Expo server)')}`;
    }
    log_1.default.succeed(message);
}
exports.logCredentialsSource = logCredentialsSource;

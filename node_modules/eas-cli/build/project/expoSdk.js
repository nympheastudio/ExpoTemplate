"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpoSdkIsSupportedAsync = void 0;
const tslib_1 = require("tslib");
const eas_build_job_1 = require("@expo/eas-build-job");
const core_1 = require("@oclif/core");
const assert_1 = tslib_1.__importDefault(require("assert"));
const semver_1 = tslib_1.__importDefault(require("semver"));
const log_1 = tslib_1.__importDefault(require("../log"));
const prompts_1 = require("../prompts");
const SUPPORTED_EXPO_SDK_VERSIONS = '>= 41.0.0';
(0, assert_1.default)(semver_1.default.validRange(SUPPORTED_EXPO_SDK_VERSIONS), 'Must be a valid version range');
async function checkExpoSdkIsSupportedAsync(ctx) {
    (0, assert_1.default)(ctx.workflow === eas_build_job_1.Workflow.MANAGED, 'Must be a managed workflow project');
    if (ctx.exp.sdkVersion && semver_1.default.satisfies(ctx.exp.sdkVersion, SUPPORTED_EXPO_SDK_VERSIONS)) {
        return;
    }
    const unsupportedSdkMessage = 'EAS Build does not officially support building managed project with Expo SDK < 41.';
    if (ctx.nonInteractive) {
        log_1.default.warn(`${unsupportedSdkMessage} Proceeding because you are running in non-interactive mode.`);
        return;
    }
    const proceed = await (0, prompts_1.confirmAsync)({
        message: `${unsupportedSdkMessage} Do you want to proceed?`,
    });
    if (!proceed) {
        core_1.Errors.exit(1);
    }
}
exports.checkExpoSdkIsSupportedAsync = checkExpoSdkIsSupportedAsync;

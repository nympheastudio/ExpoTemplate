"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncProjectConfigurationAsync = void 0;
const eas_build_job_1 = require("@expo/eas-build-job");
const version_1 = require("./version");
const projectUtils_1 = require("../../project/projectUtils");
const workflow_1 = require("../../project/workflow");
const UpdatesModule_1 = require("../../update/ios/UpdatesModule");
async function syncProjectConfigurationAsync({ projectDir, exp, targets, localAutoIncrement, vcsClient, env, }) {
    const workflow = await (0, workflow_1.resolveWorkflowAsync)(projectDir, eas_build_job_1.Platform.IOS, vcsClient);
    const versionBumpStrategy = resolveVersionBumpStrategy(localAutoIncrement ?? false);
    if (workflow === eas_build_job_1.Workflow.GENERIC) {
        if ((0, projectUtils_1.isExpoUpdatesInstalled)(projectDir)) {
            await (0, UpdatesModule_1.syncUpdatesConfigurationAsync)({ vcsClient, projectDir, exp, workflow, env });
        }
        await (0, version_1.bumpVersionAsync)({ projectDir, exp, bumpStrategy: versionBumpStrategy, targets });
    }
    else {
        await (0, version_1.bumpVersionInAppJsonAsync)({ projectDir, exp, bumpStrategy: versionBumpStrategy });
    }
}
exports.syncProjectConfigurationAsync = syncProjectConfigurationAsync;
function resolveVersionBumpStrategy(autoIncrement) {
    if (autoIncrement === true) {
        return version_1.BumpStrategy.BUILD_NUMBER;
    }
    else if (autoIncrement === false) {
        return version_1.BumpStrategy.NOOP;
    }
    else if (autoIncrement === 'buildNumber') {
        return version_1.BumpStrategy.BUILD_NUMBER;
    }
    else {
        return version_1.BumpStrategy.APP_VERSION;
    }
}

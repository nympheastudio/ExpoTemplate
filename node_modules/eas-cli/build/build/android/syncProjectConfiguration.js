"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUpOldEasBuildGradleScriptAsync = exports.syncProjectConfigurationAsync = void 0;
const tslib_1 = require("tslib");
const config_plugins_1 = require("@expo/config-plugins");
const eas_build_job_1 = require("@expo/eas-build-job");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const version_1 = require("./version");
const log_1 = tslib_1.__importDefault(require("../../log"));
const projectUtils_1 = require("../../project/projectUtils");
const workflow_1 = require("../../project/workflow");
const UpdatesModule_1 = require("../../update/android/UpdatesModule");
async function syncProjectConfigurationAsync({ projectDir, exp, localAutoIncrement, vcsClient, env, }) {
    const workflow = await (0, workflow_1.resolveWorkflowAsync)(projectDir, eas_build_job_1.Platform.ANDROID, vcsClient);
    const versionBumpStrategy = resolveVersionBumpStrategy(localAutoIncrement ?? false);
    if (workflow === eas_build_job_1.Workflow.GENERIC) {
        await cleanUpOldEasBuildGradleScriptAsync(projectDir);
        if ((0, projectUtils_1.isExpoUpdatesInstalled)(projectDir)) {
            await (0, UpdatesModule_1.syncUpdatesConfigurationAsync)({ projectDir, exp, workflow, env });
        }
        await (0, version_1.bumpVersionAsync)({ projectDir, exp, bumpStrategy: versionBumpStrategy });
    }
    else {
        await (0, version_1.bumpVersionInAppJsonAsync)({ projectDir, exp, bumpStrategy: versionBumpStrategy });
    }
}
exports.syncProjectConfigurationAsync = syncProjectConfigurationAsync;
function resolveVersionBumpStrategy(autoIncrement) {
    if (autoIncrement === true) {
        return version_1.BumpStrategy.VERSION_CODE;
    }
    else if (autoIncrement === false) {
        return version_1.BumpStrategy.NOOP;
    }
    else if (autoIncrement === 'versionCode') {
        return version_1.BumpStrategy.VERSION_CODE;
    }
    else {
        return version_1.BumpStrategy.APP_VERSION;
    }
}
// TODO: remove this after a few months
async function cleanUpOldEasBuildGradleScriptAsync(projectDir) {
    const easBuildGradlePath = path_1.default.join(projectDir, 'android', 'app', 'eas-build.gradle');
    if (await fs_extra_1.default.pathExists(easBuildGradlePath)) {
        log_1.default.withTick(`Removing ${chalk_1.default.bold('eas-build.gradle')} as it's not longer necessary`);
        await fs_extra_1.default.remove(easBuildGradlePath);
        const buildGradlePath = config_plugins_1.AndroidConfig.Paths.getAppBuildGradleFilePath(projectDir);
        const buildGradleContents = await fs_extra_1.default.readFile(buildGradlePath, 'utf-8');
        const buildGradleContentsWithoutApply = buildGradleContents.replace(/apply from: ["'].\/eas-build.gradle["']\n/, '');
        if (buildGradleContentsWithoutApply !== buildGradleContents) {
            await fs_extra_1.default.writeFile(buildGradlePath, buildGradleContentsWithoutApply);
        }
    }
}
exports.cleanUpOldEasBuildGradleScriptAsync = cleanUpOldEasBuildGradleScriptAsync;

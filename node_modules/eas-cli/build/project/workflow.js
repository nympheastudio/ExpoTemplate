"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasIgnoredIosProjectAsync = exports.resolveWorkflowPerPlatformAsync = exports.resolveWorkflowAsync = void 0;
const tslib_1 = require("tslib");
const config_plugins_1 = require("@expo/config-plugins");
const eas_build_job_1 = require("@expo/eas-build-job");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
async function resolveWorkflowAsync(projectDir, platform, vcsClient) {
    let platformWorkflowMarkers;
    try {
        platformWorkflowMarkers =
            platform === eas_build_job_1.Platform.ANDROID
                ? [
                    path_1.default.join(projectDir, 'android/app/build.gradle'),
                    await config_plugins_1.AndroidConfig.Paths.getAndroidManifestAsync(projectDir),
                ]
                : [config_plugins_1.IOSConfig.Paths.getPBXProjectPath(projectDir)];
    }
    catch {
        return eas_build_job_1.Workflow.MANAGED;
    }
    const vcsRootPath = path_1.default.normalize(await vcsClient.getRootPathAsync());
    for (const marker of platformWorkflowMarkers) {
        if ((await fs_extra_1.default.pathExists(marker)) &&
            !(await vcsClient.isFileIgnoredAsync(path_1.default.relative(vcsRootPath, marker)))) {
            return eas_build_job_1.Workflow.GENERIC;
        }
    }
    return eas_build_job_1.Workflow.MANAGED;
}
exports.resolveWorkflowAsync = resolveWorkflowAsync;
async function resolveWorkflowPerPlatformAsync(projectDir, vcsClient) {
    const [android, ios] = await Promise.all([
        resolveWorkflowAsync(projectDir, eas_build_job_1.Platform.ANDROID, vcsClient),
        resolveWorkflowAsync(projectDir, eas_build_job_1.Platform.IOS, vcsClient),
    ]);
    return { android, ios };
}
exports.resolveWorkflowPerPlatformAsync = resolveWorkflowPerPlatformAsync;
async function hasIgnoredIosProjectAsync(projectDir, vcsClient) {
    const vcsRootPath = path_1.default.normalize(await vcsClient.getRootPathAsync());
    try {
        const pbxProjectPath = config_plugins_1.IOSConfig.Paths.getPBXProjectPath(projectDir);
        return await vcsClient.isFileIgnoredAsync(path_1.default.relative(vcsRootPath, pbxProjectPath));
    }
    finally {
        return false;
    }
}
exports.hasIgnoredIosProjectAsync = hasIgnoredIosProjectAsync;

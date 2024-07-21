"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureExpoDevClientInstalledForDevClientBuildsAsync = void 0;
const tslib_1 = require("tslib");
const eas_build_job_1 = require("@expo/eas-build-job");
const core_1 = require("@oclif/core");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const resolve_from_1 = tslib_1.__importDefault(require("resolve-from"));
const repository_1 = require("./repository");
const AppPlatform_1 = require("../../graphql/types/AppPlatform");
const log_1 = tslib_1.__importStar(require("../../log"));
const platform_1 = require("../../platform");
const workflow_1 = require("../../project/workflow");
const prompts_1 = require("../../prompts");
const expoCli_1 = require("../../utils/expoCli");
async function ensureExpoDevClientInstalledForDevClientBuildsAsync({ projectDir, vcsClient, nonInteractive = false, buildProfiles = [], }) {
    if (await isExpoDevClientInstalledAsync(projectDir)) {
        return;
    }
    const buildProfilesWithDevelopmentClientRequired = buildProfiles.filter(buildProfile => buildProfile.profile.developmentClient);
    const isDevelopmentClientRequired = buildProfilesWithDevelopmentClientRequired.some(Boolean);
    if (!isDevelopmentClientRequired) {
        return;
    }
    const platformsToCheck = buildProfilesWithDevelopmentClientRequired.map(({ platform }) => platform);
    const workflowPerPlatformList = await Promise.all(platformsToCheck.map(platform => (0, workflow_1.resolveWorkflowAsync)(projectDir, platform, vcsClient)));
    log_1.default.newLine();
    log_1.default.error(`You want to build a development client build for platforms: ${platformsToCheck
        .map(i => chalk_1.default.bold(platform_1.appPlatformDisplayNames[(0, AppPlatform_1.toAppPlatform)(i)]))
        .join(', ')}`);
    log_1.default.error(`However, we detected that you don't have ${chalk_1.default.bold('expo-dev-client')} installed for your project.`);
    if (nonInteractive) {
        log_1.default.error(`You'll need to install ${chalk_1.default.bold('expo-dev-client')} manually.`);
        log_1.default.error((0, log_1.learnMore)('https://docs.expo.dev/clients/installation/', {
            learnMoreMessage: 'See installation instructions on how to do it.',
            dim: false,
        }));
        core_1.Errors.error(`Install ${chalk_1.default.bold('expo-dev-client')} manually and try again later.`, {
            exit: 1,
        });
    }
    const areAllManaged = workflowPerPlatformList.every(i => i === eas_build_job_1.Workflow.MANAGED);
    if (areAllManaged) {
        const install = await (0, prompts_1.confirmAsync)({
            message: 'Do you want EAS CLI to install expo-dev-client for you?',
            instructions: 'The command will abort unless you agree.',
        });
        if (install) {
            await installExpoDevClientAsync(projectDir, vcsClient, { nonInteractive });
        }
        else {
            core_1.Errors.error(`Install ${chalk_1.default.bold('expo-dev-client')} manually and come back later.`, {
                exit: 1,
            });
        }
    }
    else {
        log_1.default.warn(`You'll need to install ${chalk_1.default.bold('expo-dev-client')} manually.`);
        log_1.default.warn((0, log_1.learnMore)('https://docs.expo.dev/clients/installation/', {
            learnMoreMessage: 'See installation instructions on how to do it.',
            dim: false,
        }));
        log_1.default.warn('If you proceed anyway, you might not get the build you want.');
        log_1.default.newLine();
        const shouldContinue = await (0, prompts_1.confirmAsync)({
            message: 'Do you want to proceed anyway?',
            initial: false,
        });
        if (!shouldContinue) {
            core_1.Errors.error('Come back later', { exit: 1 });
        }
    }
}
exports.ensureExpoDevClientInstalledForDevClientBuildsAsync = ensureExpoDevClientInstalledForDevClientBuildsAsync;
async function isExpoDevClientInstalledAsync(projectDir) {
    try {
        (0, resolve_from_1.default)(projectDir, 'expo-dev-client/package.json');
        return true;
    }
    catch (err) {
        log_1.default.debug(err);
        return false;
    }
}
async function installExpoDevClientAsync(projectDir, vcsClient, { nonInteractive }) {
    log_1.default.newLine();
    log_1.default.log(`Running ${chalk_1.default.bold('expo install expo-dev-client')}`);
    log_1.default.newLine();
    await (0, expoCli_1.expoCommandAsync)(projectDir, ['install', 'expo-dev-client']);
    log_1.default.newLine();
    if (await vcsClient.isCommitRequiredAsync()) {
        await (0, repository_1.reviewAndCommitChangesAsync)(vcsClient, 'Install expo-dev-client', {
            nonInteractive,
        });
    }
}

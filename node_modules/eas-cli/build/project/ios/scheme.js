"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectSchemeAsync = exports.resolveXcodeBuildContextAsync = void 0;
const tslib_1 = require("tslib");
const config_plugins_1 = require("@expo/config-plugins");
const eas_build_job_1 = require("@expo/eas-build-job");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const log_1 = tslib_1.__importDefault(require("../../log"));
const prompts_1 = require("../../prompts");
const sortBy_1 = tslib_1.__importDefault(require("../../utils/expodash/sortBy"));
const workflow_1 = require("../workflow");
async function resolveXcodeBuildContextAsync({ exp, projectDir, nonInteractive, vcsClient, }, buildProfile) {
    const workflow = await (0, workflow_1.resolveWorkflowAsync)(projectDir, eas_build_job_1.Platform.IOS, vcsClient);
    if (workflow === eas_build_job_1.Workflow.GENERIC) {
        const buildScheme = buildProfile.scheme ??
            (await selectSchemeAsync({
                projectDir,
                nonInteractive,
            }));
        return {
            buildScheme,
            buildConfiguration: buildProfile.buildConfiguration ??
                (await config_plugins_1.IOSConfig.BuildScheme.getArchiveBuildConfigurationForSchemeAsync(projectDir, buildScheme)),
        };
    }
    else {
        const expoName = exp.name;
        if (!expoName) {
            throw new Error('"expo.name" is required in your app.json');
        }
        const sanitizedExpoName = config_plugins_1.IOSConfig.XcodeUtils.sanitizedName(expoName);
        if (!sanitizedExpoName) {
            throw new Error('"expo.name" needs to contain some alphanumeric characters');
        }
        return {
            buildScheme: sanitizedExpoName,
        };
    }
}
exports.resolveXcodeBuildContextAsync = resolveXcodeBuildContextAsync;
async function selectSchemeAsync({ projectDir, nonInteractive = false, }) {
    const schemes = config_plugins_1.IOSConfig.BuildScheme.getSchemesFromXcodeproj(projectDir);
    if (schemes.length === 0) {
        throw new Error(`We did not find any schemes in the Xcode project, make sure that at least one scheme is marked as "shared" in Xcode, and that it's listed in the output of "xcodebuild -list" command`);
    }
    if (schemes.length === 1) {
        return schemes[0];
    }
    const sortedSchemes = (0, sortBy_1.default)(schemes);
    log_1.default.newLine();
    log_1.default.log(`We've found multiple schemes in your Xcode project: ${chalk_1.default.bold(sortedSchemes.join(', '))}`);
    if (nonInteractive) {
        const withoutTvOS = sortedSchemes.filter(i => !i.includes('tvOS'));
        const scheme = withoutTvOS.length > 0 ? withoutTvOS[0] : sortedSchemes[0];
        log_1.default.log(`You've run EAS CLI in non-interactive mode, choosing the ${chalk_1.default.bold(scheme)} scheme.`);
        log_1.default.newLine();
        return scheme;
    }
    else {
        const { selectedScheme } = await (0, prompts_1.promptAsync)({
            type: 'select',
            name: 'selectedScheme',
            message: 'Which scheme would you like to use?',
            choices: sortedSchemes.map(scheme => ({ title: scheme, value: scheme })),
        });
        log_1.default.newLine();
        return selectedScheme;
    }
}
exports.selectSchemeAsync = selectSchemeAsync;

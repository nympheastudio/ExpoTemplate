"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybePrintBuildProfileDeprecationWarningsAsync = exports.clearHasPrintedDeprecationWarnings = exports.getProfilesAsync = void 0;
const tslib_1 = require("tslib");
const eas_json_1 = require("@expo/eas-json");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const log_1 = tslib_1.__importStar(require("../log"));
async function getProfilesAsync({ easJsonAccessor, platforms, profileName, type, projectDir, }) {
    const results = platforms.map(async function (platform) {
        const profile = await readProfileWithOverridesAsync({
            easJsonAccessor,
            platform,
            type,
            profileName,
            projectDir,
        });
        return {
            profile,
            profileName: profileName ?? 'production',
            platform,
        };
    });
    return await Promise.all(results);
}
exports.getProfilesAsync = getProfilesAsync;
async function maybeSetNodeVersionFromFileAsync(projectDir, profile) {
    if (profile?.node) {
        return;
    }
    const nodeVersion = await getNodeVersionFromFileAsync(projectDir);
    if (nodeVersion) {
        log_1.default.log(`The EAS build profile does not specify a Node.js version. Using the version specified in .nvmrc: ${nodeVersion} `);
        profile.node = nodeVersion;
    }
}
async function getNodeVersionFromFileAsync(projectDir) {
    const nvmrcPath = path_1.default.join(projectDir, '.nvmrc');
    if (!(await fs_extra_1.default.pathExists(nvmrcPath))) {
        return;
    }
    let nodeVersion;
    try {
        nodeVersion = (await fs_extra_1.default.readFile(nvmrcPath, 'utf8')).toString().trim();
    }
    catch {
        return undefined;
    }
    return nodeVersion;
}
async function readProfileWithOverridesAsync({ easJsonAccessor, platform, type, profileName, projectDir, }) {
    if (type === 'build') {
        const buildProfile = await eas_json_1.EasJsonUtils.getBuildProfileAsync(easJsonAccessor, platform, profileName);
        await maybePrintBuildProfileDeprecationWarningsAsync(easJsonAccessor, platform, profileName);
        await maybeSetNodeVersionFromFileAsync(projectDir, buildProfile);
        return buildProfile;
    }
    else {
        return (await eas_json_1.EasJsonUtils.getSubmitProfileAsync(easJsonAccessor, platform, profileName));
    }
}
let hasPrintedDeprecationWarnings = false;
/**
 * Only for testing purposes
 */
function clearHasPrintedDeprecationWarnings() {
    hasPrintedDeprecationWarnings = false;
}
exports.clearHasPrintedDeprecationWarnings = clearHasPrintedDeprecationWarnings;
async function maybePrintBuildProfileDeprecationWarningsAsync(easJsonAccessor, platform, profileName) {
    if (hasPrintedDeprecationWarnings) {
        return;
    }
    const deprecationWarnings = await eas_json_1.EasJsonUtils.getBuildProfileDeprecationWarningsAsync(easJsonAccessor, platform, profileName ?? 'production');
    if (deprecationWarnings.length === 0) {
        return;
    }
    log_1.default.newLine();
    log_1.default.warn('Detected deprecated fields in eas.json:');
    for (const warning of deprecationWarnings) {
        const warnlog = warning.message.map(line => `\t${line}`).join('\n');
        log_1.default.warn(warnlog);
        if (warning.docsUrl) {
            log_1.default.warn(`\t${(0, log_1.learnMore)(warning.docsUrl)}`);
        }
        log_1.default.newLine();
    }
    hasPrintedDeprecationWarnings = true;
}
exports.maybePrintBuildProfileDeprecationWarningsAsync = maybePrintBuildProfileDeprecationWarningsAsync;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIosCredentialsAsync = exports.updateAndroidCredentialsAsync = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const path_1 = tslib_1.__importDefault(require("path"));
const read_1 = require("./read");
const utils_1 = require("./utils");
const log_1 = tslib_1.__importDefault(require("../../log"));
const target_1 = require("../../project/ios/target");
const zipObject_1 = tslib_1.__importDefault(require("../../utils/expodash/zipObject"));
const git_1 = tslib_1.__importDefault(require("../../vcs/clients/git"));
/**
 * Update Android credentials.json with values from www, content of credentials.json
 * is not validated
 */
async function updateAndroidCredentialsAsync(ctx, buildCredentials) {
    const rawCredentialsJson = (await (0, read_1.readRawAsync)(ctx.projectDir, { throwIfMissing: false })) ?? {};
    const keystore = buildCredentials.androidKeystore;
    if (!keystore) {
        throw new Error('There are no credentials configured for this project on EAS servers');
    }
    const keystorePath = rawCredentialsJson?.android?.keystore?.keystorePath ?? 'credentials/android/keystore.jks';
    log_1.default.log(`Writing Keystore to ${keystorePath}`);
    await updateFileAsync(ctx.projectDir, keystorePath, keystore.keystore);
    const shouldWarnKeystore = await isFileUntrackedAsync(keystorePath, ctx.vcsClient);
    const androidCredentials = {
        keystore: {
            keystorePath,
            keystorePassword: keystore.keystorePassword,
            keyAlias: keystore.keyAlias,
            keyPassword: keystore.keyPassword ?? undefined,
        },
    };
    rawCredentialsJson.android = androidCredentials;
    await fs_extra_1.default.writeJson((0, utils_1.getCredentialsJsonPath)(ctx.projectDir), rawCredentialsJson, {
        spaces: 2,
    });
    const shouldWarnCredentialsJson = await isFileUntrackedAsync('credentials.json', ctx.vcsClient);
    const newFilePaths = [];
    if (shouldWarnKeystore) {
        newFilePaths.push(keystorePath);
    }
    if (shouldWarnCredentialsJson) {
        newFilePaths.push('credentials.json');
    }
    displayUntrackedFilesWarning(newFilePaths);
}
exports.updateAndroidCredentialsAsync = updateAndroidCredentialsAsync;
/**
 * Update iOS credentials in credentials.json with values from www, contents
 * of credentials.json are not validated, if www has incomplete credentials
 * credentials.json will be updated partially
 */
async function updateIosCredentialsAsync(ctx, app, targets, distributionType) {
    const rawCredentialsJson = (await (0, read_1.readRawAsync)(ctx.projectDir, { throwIfMissing: false })) ?? {};
    if (typeof rawCredentialsJson.ios?.provisioningProfilePath === 'string') {
        const applicationTarget = (0, target_1.findApplicationTarget)(targets);
        rawCredentialsJson.ios = {
            [applicationTarget.targetName]: rawCredentialsJson.ios,
        };
    }
    const targetBuildCredentialsList = await Promise.all(targets.map(target => getTargetBuildCredentialsAsync(ctx, app, target, distributionType)));
    const targetBuildsCredentialsMap = (0, zipObject_1.default)(targets.map(({ targetName }) => targetName), targetBuildCredentialsList);
    let areAllTargetsConfigured = true;
    const notConfiguredTargetLabels = [];
    for (const [targetName, targetAppBuildCredentials] of Object.entries(targetBuildsCredentialsMap)) {
        if (!targetAppBuildCredentials) {
            areAllTargetsConfigured = false;
            const { bundleIdentifier } = (0, target_1.findTargetByName)(targets, targetName);
            notConfiguredTargetLabels.push(`${targetName} (Bundle Identifier: ${bundleIdentifier})`);
        }
    }
    if (!areAllTargetsConfigured) {
        const errorMessage = targets.length === 1
            ? `There are no credentials configured for the ${distributionType} distribution of this project on EAS servers`
            : `Some of the build targets don't have credentials configured for the ${distributionType} distribution of this project on EAS servers: ${notConfiguredTargetLabels}`;
        throw new Error(errorMessage);
    }
    const iosCredentials = {};
    const targetCredentialsPathsMap = createTargetCredentialsPathsMap(targets, rawCredentialsJson.ios);
    for (const target of targets) {
        iosCredentials[target.targetName] = await backupTargetCredentialsAsync(ctx, {
            // app build credentials must exist for target because otherwise an error must have been thrown earlier
            targetCredentials: (0, nullthrows_1.default)(targetBuildsCredentialsMap[target.targetName]),
            targetCredentialsPaths: targetCredentialsPathsMap[target.targetName],
        });
    }
    if (Object.keys(iosCredentials).length === 1) {
        rawCredentialsJson.ios = iosCredentials[Object.keys(iosCredentials)[0]];
    }
    else {
        rawCredentialsJson.ios = iosCredentials;
    }
    await fs_extra_1.default.writeJson((0, utils_1.getCredentialsJsonPath)(ctx.projectDir), rawCredentialsJson, {
        spaces: 2,
    });
    const newFilePaths = [];
    for (const [, targetCredentials] of Object.entries(iosCredentials)) {
        if (await isFileUntrackedAsync(targetCredentials.distributionCertificate.path, ctx.vcsClient)) {
            newFilePaths.push(targetCredentials.distributionCertificate.path);
        }
        if (await isFileUntrackedAsync(targetCredentials.provisioningProfilePath, ctx.vcsClient)) {
            newFilePaths.push(targetCredentials.provisioningProfilePath);
        }
    }
    if (await isFileUntrackedAsync('credentials.json', ctx.vcsClient)) {
        newFilePaths.push('credentials.json');
    }
    displayUntrackedFilesWarning(newFilePaths);
}
exports.updateIosCredentialsAsync = updateIosCredentialsAsync;
function createTargetCredentialsPathsMap(targets, rawCredentialsJsonMap) {
    const hasManyTargets = targets.length > 1;
    const paths = {};
    // 1. Create initial target credentials paths map
    for (const target of targets) {
        const rawTargetCredentialsJson = rawCredentialsJsonMap?.[target.targetName];
        const filePrefix = hasManyTargets ? `${target.targetName}-` : '';
        paths[target.targetName] = {
            provisioningProfilePath: rawTargetCredentialsJson?.provisioningProfilePath ??
                `credentials/ios/${filePrefix}profile.mobileprovision`,
            distCertPath: rawTargetCredentialsJson?.distributionCertificate?.path ??
                `credentials/ios/${filePrefix}dist-cert.p12`,
        };
    }
    // 2. Look for duplicates and prefix them with target names
    const deduplicatedPaths = {};
    const usedProfilePaths = new Set();
    const usedDistCertPaths = new Set();
    for (const [targetName, { provisioningProfilePath, distCertPath }] of Object.entries(paths)) {
        const newProvisioningProfilePath = usedProfilePaths.has(provisioningProfilePath)
            ? path_1.default.join(path_1.default.dirname(provisioningProfilePath), `${targetName}-${path_1.default.basename(provisioningProfilePath)}`)
            : provisioningProfilePath;
        usedProfilePaths.add(newProvisioningProfilePath);
        const newDistCertPath = usedDistCertPaths.has(distCertPath)
            ? path_1.default.join(path_1.default.dirname(distCertPath), `${targetName}-${path_1.default.basename(distCertPath)}`)
            : distCertPath;
        usedDistCertPaths.add(newDistCertPath);
        deduplicatedPaths[targetName] = {
            distCertPath: newDistCertPath,
            provisioningProfilePath: newProvisioningProfilePath,
        };
    }
    return deduplicatedPaths;
}
async function getTargetBuildCredentialsAsync(ctx, app, target, iosDistributionType) {
    const appCredentials = await ctx.ios.getIosAppCredentialsWithCommonFieldsAsync(ctx.graphqlClient, {
        account: app.account,
        projectName: app.projectName,
        bundleIdentifier: target.bundleIdentifier,
        parentBundleIdentifier: target.parentBundleIdentifier,
    });
    const appBuildCredentials = appCredentials?.iosAppBuildCredentialsList.find(appBuildCredentials => appBuildCredentials.iosDistributionType === iosDistributionType) ?? null;
    if (appBuildCredentials === null) {
        return null;
    }
    if (!(appBuildCredentials.provisioningProfile?.provisioningProfile !== undefined &&
        appBuildCredentials.distributionCertificate?.certificateP12 !== undefined &&
        appBuildCredentials.distributionCertificate?.certificatePassword !== undefined)) {
        return null;
    }
    return {
        distributionCertificate: {
            certificateP12: (0, nullthrows_1.default)(appBuildCredentials.distributionCertificate.certificateP12),
            certificatePassword: (0, nullthrows_1.default)(appBuildCredentials.distributionCertificate.certificatePassword),
        },
        provisioningProfile: (0, nullthrows_1.default)(appBuildCredentials.provisioningProfile.provisioningProfile),
    };
}
async function backupTargetCredentialsAsync(ctx, { targetCredentials, targetCredentialsPaths, }) {
    const { provisioningProfilePath, distCertPath } = targetCredentialsPaths;
    log_1.default.log(`Writing Provisioning Profile to ${provisioningProfilePath}`);
    await updateFileAsync(ctx.projectDir, provisioningProfilePath, targetCredentials.provisioningProfile);
    log_1.default.log(`Writing Distribution Certificate to ${distCertPath}`);
    await updateFileAsync(ctx.projectDir, distCertPath, targetCredentials.distributionCertificate.certificateP12);
    return {
        distributionCertificate: {
            path: distCertPath,
            password: targetCredentials.distributionCertificate.certificatePassword,
        },
        provisioningProfilePath,
    };
}
async function updateFileAsync(projectDir, filePath, base64Data) {
    const absolutePath = path_1.default.isAbsolute(filePath) ? filePath : path_1.default.join(projectDir, filePath);
    if (await fs_extra_1.default.pathExists(absolutePath)) {
        await fs_extra_1.default.remove(absolutePath);
    }
    if (base64Data) {
        await fs_extra_1.default.mkdirp(path_1.default.dirname(filePath));
        await fs_extra_1.default.writeFile(filePath, Buffer.from(base64Data, 'base64'));
    }
}
async function isFileUntrackedAsync(path, vcsClient) {
    if (vcsClient instanceof git_1.default) {
        return await vcsClient.isFileUntrackedAsync(path);
    }
    return false;
}
function displayUntrackedFilesWarning(newFilePaths) {
    if (newFilePaths.length === 1) {
        log_1.default.warn(`File ${newFilePaths[0]} is currently untracked, remember to add it to .gitignore, or to encrypt it (e.g. with git-crypt).`);
    }
    else if (newFilePaths.length > 1) {
        log_1.default.warn(`Files ${newFilePaths.join(', ')} are currently untracked, remember to add them to .gitignore, or to encrypt them (e.g. with git-crypt).`);
    }
}

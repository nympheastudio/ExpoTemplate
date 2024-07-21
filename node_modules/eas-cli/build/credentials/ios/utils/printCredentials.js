"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayProjectCredentials = exports.displayIosCredentials = exports.displayEmptyIosCredentials = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const dateformat_1 = tslib_1.__importDefault(require("dateformat"));
const generated_1 = require("../../../graphql/generated");
const AppleDevice_1 = require("../../../graphql/types/credentials/AppleDevice");
const log_1 = tslib_1.__importDefault(require("../../../log"));
const date_1 = require("../../../utils/date");
const formatFields_1 = tslib_1.__importDefault(require("../../../utils/formatFields"));
function prettyIosDistributionType(distributionType) {
    switch (distributionType) {
        case generated_1.IosDistributionType.AppStore:
            return 'App Store';
        case generated_1.IosDistributionType.AdHoc:
            return 'Ad Hoc';
        case generated_1.IosDistributionType.Development:
            return 'Development';
        case generated_1.IosDistributionType.Enterprise:
            return 'Enterprise';
        default:
            return 'Unknown';
    }
}
function displayEmptyIosCredentials(appLookupParams) {
    const { projectName, bundleIdentifier } = appLookupParams;
    const fields = [
        { label: 'iOS Credentials', value: '' },
        { label: 'Project', value: projectName },
        { label: 'Bundle Identifier', value: bundleIdentifier },
    ];
    fields.push({ label: '', value: 'No credentials set up yet!' });
    fields.push({ label: '', value: '' });
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
}
exports.displayEmptyIosCredentials = displayEmptyIosCredentials;
/**
 * sort a build credentials array in descending order of preference
 */
function sortBuildCredentialsByDistributionType(iosAppBuildCredentialsList) {
    // The order in which we choose the distribution type from least to most preferred
    const typePriority = [
        generated_1.IosDistributionType.Development,
        generated_1.IosDistributionType.AdHoc,
        generated_1.IosDistributionType.Enterprise,
        generated_1.IosDistributionType.AppStore,
    ];
    return iosAppBuildCredentialsList
        .sort((buildCredentialsA, buildCredentialsB) => typePriority.indexOf(buildCredentialsA.iosDistributionType) -
        typePriority.indexOf(buildCredentialsB.iosDistributionType))
        .reverse();
}
function displayIosCredentials(app, appCredentialsMap, targets) {
    const projectFullName = `@${app.account.name}/${app.projectName}`;
    const isMultitarget = targets.length > 1;
    const fields = [
        { label: 'iOS Credentials', value: '' },
        { label: 'Project', value: projectFullName },
    ];
    for (const { targetName, bundleIdentifier } of targets) {
        if (isMultitarget) {
            fields.push({ label: '', value: '' });
            fields.push({ label: 'Target', value: targetName });
        }
        fields.push({ label: 'Bundle Identifier', value: bundleIdentifier });
        const targetAppCredentials = appCredentialsMap[targetName];
        if (!targetAppCredentials) {
            fields.push({ label: '', value: '' });
            fields.push({ label: '', value: 'No credentials set up yet!' });
            fields.push({ label: '', value: '' });
            continue;
        }
        const { appleTeam, pushKey, appStoreConnectApiKeyForSubmissions } = targetAppCredentials;
        if (appleTeam) {
            const { appleTeamIdentifier, appleTeamName } = appleTeam;
            fields.push({
                label: 'Apple Team',
                value: `${appleTeamIdentifier} ${appleTeamName ? `(${appleTeamName})` : ''}`,
            });
        }
        fields.push({ label: '', value: '' });
        if (pushKey) {
            displayApplePushKey(pushKey, fields);
        }
        if (appStoreConnectApiKeyForSubmissions) {
            displayAscApiKey(appStoreConnectApiKeyForSubmissions, fields);
        }
        const sortedIosAppBuildCredentialsList = sortBuildCredentialsByDistributionType(targetAppCredentials.iosAppBuildCredentialsList);
        for (const iosAppBuildCredentials of sortedIosAppBuildCredentialsList) {
            displayIosAppBuildCredentials(iosAppBuildCredentials, fields);
        }
    }
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
}
exports.displayIosCredentials = displayIosCredentials;
function displayProjectCredentials(app, appBuildCredentials, targets) {
    const projectFullName = `@${app.account.name}/${app.projectName}`;
    const targetToBundleId = targets.reduce((acc, target) => {
        acc[target.targetName] = target.bundleIdentifier;
        return acc;
    }, {});
    const isMultitarget = targets.length > 1;
    log_1.default.addNewLineIfNone();
    log_1.default.log(chalk_1.default.cyan.bold('Project Credentials Configuration'));
    log_1.default.newLine();
    const fields = [{ label: 'Project', value: projectFullName }];
    for (const [targetName, buildCredentials] of Object.entries(appBuildCredentials)) {
        if (isMultitarget) {
            fields.push({ label: '', value: '' });
            fields.push({ label: 'Target', value: targetName });
        }
        fields.push({ label: 'Bundle Identifier', value: targetToBundleId[targetName] });
        displayIosAppBuildCredentials(buildCredentials, fields);
    }
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
}
exports.displayProjectCredentials = displayProjectCredentials;
function displayIosAppBuildCredentials(buildCredentials, fields) {
    fields.push({ label: '', value: '' });
    fields.push({
        label: `${prettyIosDistributionType(buildCredentials.iosDistributionType)} Configuration`,
        value: '',
    });
    fields.push({ label: '', value: '' });
    const maybeDistCert = buildCredentials.distributionCertificate;
    fields.push({ label: 'Distribution Certificate', value: '' });
    if (maybeDistCert) {
        const { serialNumber, updatedAt, validityNotAfter, appleTeam } = maybeDistCert;
        fields.push({ label: 'Serial Number', value: serialNumber });
        fields.push({
            label: 'Expiration Date',
            value: (0, dateformat_1.default)(validityNotAfter, 'expiresHeaderFormat'),
        });
        if (appleTeam) {
            const { appleTeamIdentifier, appleTeamName } = appleTeam;
            fields.push({
                label: 'Apple Team',
                value: `${appleTeamIdentifier} ${appleTeamName ? `(${appleTeamName})` : ''}`,
            });
        }
        fields.push({ label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` });
    }
    else {
        fields.push({ label: '', value: 'None assigned yet' });
    }
    fields.push({ label: '', value: '' });
    const maybeProvProf = buildCredentials.provisioningProfile;
    fields.push({ label: 'Provisioning Profile', value: '' });
    if (maybeProvProf) {
        const { expiration, updatedAt, status, developerPortalIdentifier, appleTeam, appleDevices } = maybeProvProf;
        if (developerPortalIdentifier) {
            fields.push({ label: 'Developer Portal ID', value: developerPortalIdentifier });
        }
        fields.push({ label: 'Status', value: status });
        fields.push({ label: 'Expiration', value: (0, dateformat_1.default)(expiration, 'expiresHeaderFormat') });
        if (appleTeam) {
            const { appleTeamIdentifier, appleTeamName } = appleTeam;
            fields.push({
                label: 'Apple Team',
                value: `${appleTeamIdentifier} ${appleTeamName ? `(${appleTeamName})` : ''}`,
            });
        }
        if (appleDevices && appleDevices.length > 0) {
            const [firstAppleDevice, ...rest] = appleDevices;
            fields.push({
                label: 'Provisioned devices',
                value: `- ${formatAppleDevice(firstAppleDevice)}`,
            });
            for (const appleDevice of rest) {
                fields.push({ label: '', value: `- ${formatAppleDevice(appleDevice)}` });
            }
        }
        fields.push({ label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` });
    }
    else {
        fields.push({ label: '', value: 'None assigned yet' });
    }
    fields.push({ label: '', value: '' });
}
function displayApplePushKey(maybePushKey, fields) {
    fields.push({ label: 'Push Key', value: '' });
    if (maybePushKey) {
        const { keyIdentifier, appleTeam, updatedAt } = maybePushKey;
        fields.push({ label: 'Developer Portal ID', value: keyIdentifier });
        if (appleTeam) {
            const { appleTeamIdentifier, appleTeamName } = appleTeam;
            fields.push({
                label: 'Apple Team',
                value: `${appleTeamIdentifier} ${appleTeamName ? `(${appleTeamName})` : ''}`,
            });
        }
        fields.push({ label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` });
    }
    else {
        fields.push({ label: '', value: 'None assigned yet' });
    }
    fields.push({ label: '', value: '' });
}
function displayAscApiKey(maybeAscApiKey, fields) {
    fields.push({ label: 'App Store Connect API Key', value: '' });
    if (maybeAscApiKey) {
        const { keyIdentifier, issuerIdentifier, appleTeam, name, roles, updatedAt } = maybeAscApiKey;
        fields.push({ label: 'Developer Portal ID', value: keyIdentifier });
        if (name) {
            fields.push({ label: 'Name', value: name });
        }
        fields.push({ label: 'Issuer ID', value: issuerIdentifier });
        if (roles) {
            fields.push({ label: 'Roles', value: roles.join(',') });
        }
        if (appleTeam) {
            const { appleTeamIdentifier, appleTeamName } = appleTeam;
            fields.push({
                label: 'Apple Team',
                value: `${appleTeamIdentifier} ${appleTeamName ? `(${appleTeamName})` : ''}`,
            });
        }
        fields.push({ label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` });
    }
    else {
        fields.push({ label: '', value: 'None assigned yet' });
    }
    fields.push({ label: '', value: '' });
}
function formatAppleDevice(device) {
    let deviceString = '';
    if (device.name) {
        deviceString += device.name;
    }
    if (device.deviceClass || device.model) {
        const deviceDetails = [
            device.deviceClass && AppleDevice_1.APPLE_DEVICE_CLASS_LABELS[device.deviceClass],
            device.model,
        ]
            .filter(i => i)
            .join(' ');
        if (deviceString === '') {
            deviceString += deviceDetails;
        }
        else {
            deviceString += ` - ${deviceDetails}`;
        }
    }
    if (deviceString === '') {
        deviceString += device.identifier;
    }
    else {
        deviceString += ` (UDID: ${device.identifier})`;
    }
    return deviceString;
}

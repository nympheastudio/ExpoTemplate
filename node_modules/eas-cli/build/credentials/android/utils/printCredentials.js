"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayAndroidAppCredentials = exports.displayAndroidKeystore = exports.displayEmptyAndroidCredentials = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const generated_1 = require("../../../graphql/generated");
const log_1 = tslib_1.__importDefault(require("../../../log"));
const date_1 = require("../../../utils/date");
const formatFields_1 = tslib_1.__importDefault(require("../../../utils/formatFields"));
const BuildCredentialsUtils_1 = require("../actions/BuildCredentialsUtils");
function displayEmptyAndroidCredentials(appLookupParams) {
    const { projectName, androidApplicationIdentifier } = appLookupParams;
    const fields = [
        { label: 'Android Credentials', value: '' },
        { label: 'Project', value: projectName },
        { label: 'Application Identifier', value: androidApplicationIdentifier },
    ];
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
    log_1.default.log((0, formatFields_1.default)([{ label: 'No credentials set up yet!', value: '' }]));
    log_1.default.newLine();
}
exports.displayEmptyAndroidCredentials = displayEmptyAndroidCredentials;
function displayAndroidFcmCredentials(appCredentials) {
    const maybeFcm = appCredentials.androidFcm;
    log_1.default.log((0, formatFields_1.default)([{ label: 'Push Notifications (FCM Legacy)', value: '' }], {
        labelFormat: chalk_1.default.cyan.bold,
    }));
    if (!maybeFcm) {
        log_1.default.log((0, formatFields_1.default)([{ label: '', value: 'None assigned yet' }]));
        log_1.default.newLine();
        return;
    }
    const { snippet, version, updatedAt } = maybeFcm;
    const fields = [];
    if (version === generated_1.AndroidFcmVersion.Legacy) {
        const { firstFourCharacters, lastFourCharacters } = snippet;
        fields.push({ label: 'Key', value: `${firstFourCharacters}...${lastFourCharacters}` });
    }
    else if (version === generated_1.AndroidFcmVersion.V1) {
        const { projectId, serviceAccountEmail, clientId, keyId } = snippet;
        fields.push({ label: 'Project ID', value: projectId });
        fields.push({ label: 'Client Email', value: serviceAccountEmail });
        fields.push({ label: 'Client ID', value: clientId ?? 'Unknown' });
        fields.push({ label: 'Private Key ID', value: keyId });
    }
    fields.push({ label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` });
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
    log_1.default.newLine();
}
function displayGoogleServiceAccountKeyForSubmissions(appCredentials) {
    const maybeGsaKey = appCredentials.googleServiceAccountKeyForSubmissions;
    log_1.default.log((0, formatFields_1.default)([{ label: 'Submissions: Google Service Account Key for Play Store Submissions', value: '' }], {
        labelFormat: chalk_1.default.cyan.bold,
    }));
    if (!maybeGsaKey) {
        log_1.default.log((0, formatFields_1.default)([{ label: '', value: 'None assigned yet' }]));
        log_1.default.newLine();
        return;
    }
    const { projectIdentifier, privateKeyIdentifier, clientEmail, clientIdentifier, updatedAt } = maybeGsaKey;
    const fields = [
        { label: 'Project ID', value: projectIdentifier },
        { label: 'Client Email', value: clientEmail },
        { label: 'Client ID', value: clientIdentifier },
        { label: 'Private Key ID', value: privateKeyIdentifier },
        { label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` },
    ];
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
    log_1.default.newLine();
}
function displayGoogleServiceAccountKeyForFcmV1(appCredentials) {
    const maybeGsaKey = appCredentials.googleServiceAccountKeyForFcmV1;
    log_1.default.log((0, formatFields_1.default)([{ label: 'Push Notifications (FCM V1): Google Service Account Key For FCM V1', value: '' }], {
        labelFormat: chalk_1.default.cyan.bold,
    }));
    if (!maybeGsaKey) {
        log_1.default.log((0, formatFields_1.default)([{ label: '', value: 'None assigned yet' }]));
        log_1.default.newLine();
        return;
    }
    const { projectIdentifier, privateKeyIdentifier, clientEmail, clientIdentifier, updatedAt } = maybeGsaKey;
    const fields = [
        { label: 'Project ID', value: projectIdentifier },
        { label: 'Client Email', value: clientEmail },
        { label: 'Client ID', value: clientIdentifier },
        { label: 'Private Key ID', value: privateKeyIdentifier },
        { label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` },
    ];
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
    log_1.default.newLine();
}
function displayEASAndroidAppCredentials(appCredentials) {
    displayAndroidFcmCredentials(appCredentials);
    displayGoogleServiceAccountKeyForFcmV1(appCredentials);
    displayGoogleServiceAccountKeyForSubmissions(appCredentials);
    const sortedBuildCredentialsList = (0, BuildCredentialsUtils_1.sortBuildCredentials)(appCredentials.androidAppBuildCredentialsList);
    for (const buildCredentials of sortedBuildCredentialsList) {
        displayAndroidBuildCredentials(buildCredentials);
    }
}
function formatFingerprint(fingerprint) {
    if (!fingerprint) {
        return 'unavailable';
    }
    const uppercaseFingerprint = fingerprint.toUpperCase();
    const bytes = [];
    for (let i = 0; i < uppercaseFingerprint.length; i++) {
        const halfByte = uppercaseFingerprint.charAt(i);
        if (i % 2 === 0) {
            bytes.push(halfByte); // first half of the byte
        }
        else {
            bytes[bytes.length - 1] += halfByte; // second half of the byte
        }
    }
    return bytes.join(':');
}
function displayAndroidBuildCredentials(buildCredentials) {
    const { isDefault, name } = buildCredentials;
    log_1.default.log((0, formatFields_1.default)([{ label: `Configuration: ${name}${isDefault ? ' (Default)' : ''}`, value: '' }], {
        labelFormat: chalk_1.default.cyan.bold,
    }));
    const maybeKeystore = buildCredentials.androidKeystore;
    log_1.default.log((0, formatFields_1.default)([{ label: 'Keystore', value: '' }], {
        labelFormat: chalk_1.default.cyan.bold,
    }));
    if (maybeKeystore) {
        displayAndroidKeystore(maybeKeystore);
    }
    else {
        log_1.default.log((0, formatFields_1.default)([{ label: '', value: 'None assigned yet' }]));
    }
    log_1.default.newLine();
}
function displayAndroidKeystore(keystore) {
    const { keyAlias, type, md5CertificateFingerprint, sha1CertificateFingerprint, sha256CertificateFingerprint, updatedAt, } = keystore;
    const fields = [
        { label: 'Type', value: type },
        { label: 'Key Alias', value: keyAlias },
        { label: 'MD5 Fingerprint', value: formatFingerprint(md5CertificateFingerprint ?? null) },
        { label: 'SHA1 Fingerprint', value: formatFingerprint(sha1CertificateFingerprint ?? null) },
        { label: 'SHA256 Fingerprint', value: formatFingerprint(sha256CertificateFingerprint ?? null) },
        { label: 'Updated', value: `${(0, date_1.fromNow)(new Date(updatedAt))} ago` },
    ];
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
}
exports.displayAndroidKeystore = displayAndroidKeystore;
function displayAndroidAppCredentials({ appLookupParams, appCredentials, }) {
    const { projectName, androidApplicationIdentifier } = appLookupParams;
    const fields = [
        { label: 'Android Credentials', value: '' },
        { label: 'Project', value: projectName },
        { label: 'Application Identifier', value: androidApplicationIdentifier },
    ];
    log_1.default.log((0, formatFields_1.default)(fields, { labelFormat: chalk_1.default.cyan.bold }));
    log_1.default.newLine();
    if (appCredentials) {
        displayEASAndroidAppCredentials(appCredentials);
    }
}
exports.displayAndroidAppCredentials = displayAndroidAppCredentials;

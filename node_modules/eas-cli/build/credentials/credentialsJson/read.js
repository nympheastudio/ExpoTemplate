"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readRawAsync = exports.readIosCredentialsAsync = exports.readAndroidCredentialsAsync = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const types_1 = require("./types");
const utils_1 = require("./utils");
async function readAndroidCredentialsAsync(projectDir) {
    const credentialsJson = await readAsync(projectDir);
    if (!credentialsJson.android) {
        throw new Error('Android credentials are missing in credentials.json');
    }
    const keystoreInfo = credentialsJson.android.keystore;
    return {
        keystore: {
            keystore: await fs_extra_1.default.readFile(getAbsolutePath(projectDir, keystoreInfo.keystorePath), 'base64'),
            keystorePassword: keystoreInfo.keystorePassword,
            keyAlias: keystoreInfo.keyAlias,
            keyPassword: keystoreInfo.keyPassword,
        },
    };
}
exports.readAndroidCredentialsAsync = readAndroidCredentialsAsync;
async function readIosCredentialsAsync(projectDir, applicationTarget) {
    const credentialsJson = await readAsync(projectDir);
    if (!credentialsJson.ios) {
        throw new Error('iOS credentials are missing in credentials.json');
    }
    if (isCredentialsMap(credentialsJson.ios)) {
        const targets = Object.keys(credentialsJson.ios);
        const iosCredentials = {};
        for (const target of targets) {
            iosCredentials[target] = await readCredentialsForTargetAsync(projectDir, credentialsJson.ios[target]);
        }
        return iosCredentials;
    }
    else {
        const applicationTargetCredentials = await readCredentialsForTargetAsync(projectDir, credentialsJson.ios);
        return {
            [applicationTarget.targetName]: applicationTargetCredentials,
        };
    }
}
exports.readIosCredentialsAsync = readIosCredentialsAsync;
function isCredentialsMap(ios) {
    return typeof ios.provisioningProfilePath !== 'string';
}
async function readCredentialsForTargetAsync(projectDir, targetCredentials) {
    return {
        provisioningProfile: await fs_extra_1.default.readFile(getAbsolutePath(projectDir, targetCredentials.provisioningProfilePath), 'base64'),
        distributionCertificate: {
            certificateP12: await fs_extra_1.default.readFile(getAbsolutePath(projectDir, targetCredentials.distributionCertificate.path), 'base64'),
            certificatePassword: targetCredentials.distributionCertificate.password,
        },
    };
}
async function readAsync(projectDir) {
    const credentialsJSONRaw = await readRawAsync(projectDir);
    const { value: credentialsJson, error } = types_1.CredentialsJsonSchema.validate(credentialsJSONRaw, {
        stripUnknown: true,
        convert: true,
        abortEarly: false,
    });
    if (error) {
        throw new Error(`credentials.json is not valid [${error.toString()}]`);
    }
    return credentialsJson;
}
async function readRawAsync(projectDir, { throwIfMissing = true } = {}) {
    const credentialsJsonFilePath = (0, utils_1.getCredentialsJsonPath)(projectDir);
    if (!(await fs_extra_1.default.pathExists(credentialsJsonFilePath))) {
        if (throwIfMissing) {
            throw new Error('credentials.json does not exist in the project root directory');
        }
        else {
            return null;
        }
    }
    try {
        const credentialsJSONContents = await fs_extra_1.default.readFile(credentialsJsonFilePath, 'utf8');
        return JSON.parse(credentialsJSONContents);
    }
    catch {
        throw new Error(`credentials.json must exist in the project root directory and contain a valid JSON`);
    }
}
exports.readRawAsync = readRawAsync;
function getAbsolutePath(projectDir, filePath) {
    return path_1.default.isAbsolute(filePath) ? filePath : path_1.default.join(projectDir, filePath);
}

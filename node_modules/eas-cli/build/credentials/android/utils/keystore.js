"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomKeystoreAsync = exports.keytoolCommandExistsAsync = void 0;
const tslib_1 = require("tslib");
const spawn_async_1 = tslib_1.__importDefault(require("@expo/spawn-async"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const uuid_1 = require("uuid");
const AnalyticsManager_1 = require("../../../analytics/AnalyticsManager");
const fetch_1 = tslib_1.__importDefault(require("../../../fetch"));
const generated_1 = require("../../../graphql/generated");
const KeystoreGenerationUrlMutation_1 = require("../../../graphql/mutations/KeystoreGenerationUrlMutation");
const log_1 = tslib_1.__importDefault(require("../../../log"));
const ora_1 = require("../../../ora");
const paths_1 = require("../../../utils/paths");
async function keytoolCommandExistsAsync() {
    try {
        await (0, spawn_async_1.default)('keytool');
        return true;
    }
    catch {
        return false;
    }
}
exports.keytoolCommandExistsAsync = keytoolCommandExistsAsync;
var KeystoreCreateStep;
(function (KeystoreCreateStep) {
    KeystoreCreateStep["Attempt"] = "attempt";
    KeystoreCreateStep["Fail"] = "fail";
    KeystoreCreateStep["Success"] = "success";
})(KeystoreCreateStep || (KeystoreCreateStep = {}));
async function generateRandomKeystoreAsync(graphqlClient, analytics, projectId) {
    const keystoreData = {
        keystorePassword: crypto_1.default.randomBytes(16).toString('hex'),
        keyPassword: crypto_1.default.randomBytes(16).toString('hex'),
        keyAlias: crypto_1.default.randomBytes(16).toString('hex'),
    };
    return await createKeystoreAsync(graphqlClient, analytics, keystoreData, projectId);
}
exports.generateRandomKeystoreAsync = generateRandomKeystoreAsync;
async function createKeystoreAsync(graphqlClient, analytics, keystoreParams, projectId) {
    analytics.logEvent(AnalyticsManager_1.BuildEvent.ANDROID_KEYSTORE_CREATE, {
        project_id: projectId,
        step: KeystoreCreateStep.Attempt,
        type: generated_1.AndroidKeystoreType.Jks,
    });
    try {
        let keystore;
        let localAttempt = false;
        if (await keytoolCommandExistsAsync()) {
            try {
                localAttempt = true;
                keystore = await createKeystoreLocallyAsync(keystoreParams);
            }
            catch {
                log_1.default.error('Failed to generate keystore locally. Falling back to cloud generation.');
            }
        }
        if (!keystore) {
            keystore = await createKeystoreInCloudAsync(graphqlClient, keystoreParams, {
                showKeytoolDetectionMsg: !localAttempt,
            });
        }
        analytics.logEvent(AnalyticsManager_1.BuildEvent.ANDROID_KEYSTORE_CREATE, {
            project_id: projectId,
            step: KeystoreCreateStep.Success,
            type: generated_1.AndroidKeystoreType.Jks,
        });
        return keystore;
    }
    catch (error) {
        analytics.logEvent(AnalyticsManager_1.BuildEvent.ANDROID_KEYSTORE_CREATE, {
            project_id: projectId,
            step: KeystoreCreateStep.Fail,
            reason: error.message,
            type: generated_1.AndroidKeystoreType.Jks,
        });
        throw error;
    }
}
async function createKeystoreLocallyAsync(keystoreParams) {
    await fs_extra_1.default.mkdirp((0, paths_1.getTmpDirectory)());
    const keystorePath = path_1.default.join((0, paths_1.getTmpDirectory)(), `${(0, uuid_1.v4)()}-keystore.jks`);
    try {
        await (0, spawn_async_1.default)('keytool', [
            '-genkey',
            '-v',
            '-storetype',
            'JKS',
            '-storepass',
            keystoreParams.keystorePassword,
            '-keypass',
            keystoreParams.keyPassword,
            '-keystore',
            keystorePath,
            '-alias',
            keystoreParams.keyAlias,
            '-keyalg',
            'RSA',
            '-keysize',
            '2048',
            '-validity',
            '10000',
            '-dname',
            `CN=,OU=,O=,L=,S=,C=US`,
        ]);
        return {
            ...keystoreParams,
            keystore: await fs_extra_1.default.readFile(keystorePath, 'base64'),
            type: generated_1.AndroidKeystoreType.Jks,
        };
    }
    finally {
        await fs_extra_1.default.remove(keystorePath);
    }
}
async function createKeystoreInCloudAsync(graphqlClient, keystoreParams, { showKeytoolDetectionMsg = true } = {}) {
    if (showKeytoolDetectionMsg) {
        log_1.default.log(`Detected that you do not have ${chalk_1.default.bold('keytool')} installed locally.`);
    }
    const spinner = (0, ora_1.ora)('Generating keystore in the cloud...').start();
    try {
        const url = await KeystoreGenerationUrlMutation_1.KeystoreGenerationUrlMutation.createKeystoreGenerationUrlAsync(graphqlClient);
        const response = await (0, fetch_1.default)(url, {
            method: 'POST',
            body: JSON.stringify(keystoreParams),
            headers: { 'Content-Type': 'application/json' },
        });
        const result = (await response.json());
        spinner.succeed();
        return {
            type: generated_1.AndroidKeystoreType.Jks,
            keystore: result.keystoreBase64,
            keystorePassword: result.keystorePassword,
            keyAlias: result.keyAlias,
            keyPassword: result.keyPassword,
        };
    }
    catch (err) {
        spinner.fail();
        throw err;
    }
}

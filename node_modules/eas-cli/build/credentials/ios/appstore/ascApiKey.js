"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAscApiKeyInfo = exports.revokeAscApiKeyAsync = exports.createAscApiKeyAsync = exports.downloadWithRetryAsync = exports.getAscApiKeyAsync = exports.listAscApiKeysAsync = void 0;
const tslib_1 = require("tslib");
const apple_utils_1 = require("@expo/apple-utils");
const promise_retry_1 = tslib_1.__importDefault(require("promise-retry"));
const authenticate_1 = require("./authenticate");
const AnalyticsManager_1 = require("../../../analytics/AnalyticsManager");
const log_1 = tslib_1.__importStar(require("../../../log"));
const ora_1 = require("../../../ora");
/**
 * List App Store Connect API Keys.
 * **Does not support App Store Connect API (CI).**
 */
async function listAscApiKeysAsync(userAuthCtx) {
    const spinner = (0, ora_1.ora)(`Fetching App Store Connect API Keys.`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(userAuthCtx);
        const keys = await apple_utils_1.ApiKey.getAsync(context);
        spinner.succeed(`Fetched App Store Connect API Keys.`);
        return keys.map(key => getAscApiKeyInfo(key, userAuthCtx));
    }
    catch (error) {
        spinner.fail(`Failed to fetch App Store Connect API Keys.`);
        throw error;
    }
}
exports.listAscApiKeysAsync = listAscApiKeysAsync;
/**
 * Get an App Store Connect API Key.
 * **Does not support App Store Connect API (CI).**
 */
async function getAscApiKeyAsync(userAuthCtx, keyId) {
    const spinner = (0, ora_1.ora)(`Fetching App Store Connect API Key.`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(userAuthCtx);
        const apiKey = await apple_utils_1.ApiKey.infoAsync(context, { id: keyId });
        spinner.succeed(`Fetched App Store Connect API Key (ID: ${keyId}).`);
        return getAscApiKeyInfo(apiKey, userAuthCtx);
    }
    catch (error) {
        const message = error?.message ?? '';
        if (message.includes("There is no resource of type 'apiKeys' with id")) {
            spinner.stop();
            return null;
        }
        log_1.default.error(error);
        spinner.fail(`Failed to fetch App Store Connect API Key.`);
        throw error;
    }
}
exports.getAscApiKeyAsync = getAscApiKeyAsync;
/**
 * There is a bug in Apple's infrastructure that does not propagate newly created objects for a
 * while. If the key has not propagated and you try to download it, Apple will error saying that
 * the resource does not exist. We retry with exponential backoff until the key propagates and
 * is available for download.
 * */
async function downloadWithRetryAsync(analytics, key, { minTimeout = 1000, retries = 6, factor = 2, } = {}) {
    const RESOURCE_DOES_NOT_EXIST_MESSAGE = 'The specified resource does not exist - There is no resource of type';
    try {
        const keyP8 = await (0, promise_retry_1.default)(async (retry, number) => {
            try {
                return await key.downloadAsync();
            }
            catch (e) {
                if (e.name === 'UnexpectedAppleResponse' &&
                    e.message.includes(RESOURCE_DOES_NOT_EXIST_MESSAGE)) {
                    const secondsToRetry = Math.pow(factor, number);
                    log_1.default.log(`Received an unexpected response from Apple, retrying in ${secondsToRetry} seconds...`);
                    analytics.logEvent(AnalyticsManager_1.SubmissionEvent.API_KEY_DOWNLOAD_RETRY, {
                        errorName: e.name,
                        reason: e.message,
                        retry: number,
                    });
                    return retry(e);
                }
                throw e;
            }
        }, {
            retries,
            factor,
            minTimeout,
        });
        analytics.logEvent(AnalyticsManager_1.SubmissionEvent.API_KEY_DOWNLOAD_SUCCESS, {});
        return keyP8;
    }
    catch (e) {
        if (e.name === 'UnexpectedAppleResponse' &&
            e.message.includes(RESOURCE_DOES_NOT_EXIST_MESSAGE)) {
            log_1.default.warn(`Unable to download Api Key from Apple at this time. Create and upload your key manually by running 'eas credentials' ${(0, log_1.learnMore)('https://expo.fyi/creating-asc-api-key')}`);
        }
        analytics.logEvent(AnalyticsManager_1.SubmissionEvent.API_KEY_DOWNLOAD_FAIL, {
            errorName: e.name,
            reason: e.message,
        });
        throw e;
    }
}
exports.downloadWithRetryAsync = downloadWithRetryAsync;
/**
 * Create an App Store Connect API Key.
 * **Does not support App Store Connect API (CI).**
 */
async function createAscApiKeyAsync(analytics, userAuthCtx, { nickname, allAppsVisible, roles, keyType, }) {
    const spinner = (0, ora_1.ora)(`Creating App Store Connect API Key.`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(userAuthCtx);
        const key = await apple_utils_1.ApiKey.createAsync(context, {
            nickname: nickname ?? `[expo] ${new Date().getTime()}`,
            allAppsVisible: allAppsVisible ?? true,
            roles: roles ?? [apple_utils_1.UserRole.ADMIN],
            keyType: keyType ?? apple_utils_1.ApiKeyType.PUBLIC_API,
        });
        const keyP8 = await downloadWithRetryAsync(analytics, key);
        if (!keyP8) {
            const { nickname, roles } = key.attributes;
            const humanReadableKey = `App Store Connect Key '${nickname}' (${key.id}) with roles {${roles.join(',')}}`;
            if (!key.attributes.canDownload) {
                // this case would be unexpected because we just created the key
                throw new Error(`${humanReadableKey} is not available for download from Apple.`);
            }
            else if (!key.attributes.isActive) {
                throw new Error(`${humanReadableKey} is inactive and could not be downloaded.`);
            }
            throw new Error(`Failed to download .p8 file of ${humanReadableKey}.`);
        }
        // this object has more optional parameters populated
        const fullKey = await apple_utils_1.ApiKey.infoAsync(context, { id: key.id });
        spinner.succeed(`Created App Store Connect API Key.`);
        return {
            ...getAscApiKeyInfo(fullKey, userAuthCtx),
            keyP8,
        };
    }
    catch (err) {
        spinner.fail('Failed to create App Store Connect API Key.');
        throw err;
    }
}
exports.createAscApiKeyAsync = createAscApiKeyAsync;
/**
 * Revoke an App Store Connect API Key.
 * **Does not support App Store Connect API (CI).**
 */
async function revokeAscApiKeyAsync(userAuthCtx, keyId) {
    const spinner = (0, ora_1.ora)(`Revoking App Store Connect API Key.`).start();
    try {
        const context = (0, authenticate_1.getRequestContext)(userAuthCtx);
        const apiKey = await apple_utils_1.ApiKey.infoAsync(context, { id: keyId });
        const revokedKey = await apiKey.revokeAsync();
        spinner.succeed(`Revoked App Store Connect API Key.`);
        return getAscApiKeyInfo(revokedKey, userAuthCtx);
    }
    catch (error) {
        log_1.default.error(error);
        spinner.fail(`Failed to revoke App Store Connect API Key.`);
        throw error;
    }
}
exports.revokeAscApiKeyAsync = revokeAscApiKeyAsync;
function getAscApiKeyInfo(apiKey, authCtx) {
    return {
        name: apiKey.attributes.nickname,
        keyId: apiKey.id,
        issuerId: apiKey.attributes.provider?.id,
        teamId: authCtx.team.id,
        teamName: authCtx.team.name,
        roles: apiKey.attributes.roles,
        isRevoked: !!apiKey.attributes.revokingDate,
    };
}
exports.getAscApiKeyInfo = getAscApiKeyInfo;

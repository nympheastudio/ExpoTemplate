"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppStoreAuthAsync = void 0;
const tslib_1 = require("tslib");
const apple_utils_1 = require("@expo/apple-utils");
const assert_1 = tslib_1.__importDefault(require("assert"));
const authenticate_1 = require("../credentials/ios/appstore/authenticate");
const bundleIdentifier_1 = require("../project/ios/bundleIdentifier");
/**
 * Resolve the bundle identifier from the selected submit profile.
 * This bundle identifier is used as target for the metadata submission.
 */
async function resolveAppStoreBundleIdentifierAsync(projectDir, profile, exp, vcsClient) {
    if ('bundleIdentifier' in profile) {
        return profile.bundleIdentifier ?? (await (0, bundleIdentifier_1.getBundleIdentifierAsync)(projectDir, exp, vcsClient));
    }
    return await (0, bundleIdentifier_1.getBundleIdentifierAsync)(projectDir, exp, vcsClient);
}
/**
 * To start syncing ASC entities, we need access to the apple utils App instance.
 * This resolves both the authentication and that App instance.
 */
async function getAppStoreAuthAsync({ projectDir, profile, exp, credentialsCtx, }) {
    const bundleId = await resolveAppStoreBundleIdentifierAsync(projectDir, profile, exp, credentialsCtx.vcsClient);
    const authCtx = await credentialsCtx.appStore.ensureAuthenticatedAsync();
    (0, assert_1.default)(authCtx.authState, 'Failed to authenticate with App Store Connect');
    // TODO: improve error handling by mentioning possible configuration errors
    const app = await apple_utils_1.App.findAsync((0, authenticate_1.getRequestContext)(authCtx), { bundleId });
    (0, assert_1.default)(app, `Failed to load app "${bundleId}" from App Store Connect`);
    return { app, auth: authCtx.authState };
}
exports.getAppStoreAuthAsync = getAppStoreAuthAsync;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureIosCredentialsForBuildResignAsync = exports.ensureIosCredentialsAsync = void 0;
const tslib_1 = require("tslib");
const eas_build_job_1 = require("@expo/eas-build-job");
const IosCredentialsProvider_1 = tslib_1.__importDefault(require("../../credentials/ios/IosCredentialsProvider"));
const BuildCredentialsUtils_1 = require("../../credentials/ios/actions/BuildCredentialsUtils");
const credentials_1 = require("../utils/credentials");
async function ensureIosCredentialsAsync(buildCtx, targets) {
    if (!shouldProvideCredentials(buildCtx)) {
        return;
    }
    const provider = new IosCredentialsProvider_1.default(buildCtx.credentialsCtx, {
        app: await (0, BuildCredentialsUtils_1.getAppFromContextAsync)(buildCtx.credentialsCtx),
        targets,
        distribution: buildCtx.buildProfile.distribution ?? 'store',
        enterpriseProvisioning: buildCtx.buildProfile.enterpriseProvisioning,
    });
    const { credentialsSource } = buildCtx.buildProfile;
    (0, credentials_1.logCredentialsSource)(credentialsSource, eas_build_job_1.Platform.IOS);
    return {
        credentials: await provider.getCredentialsAsync(credentialsSource),
        source: credentialsSource,
    };
}
exports.ensureIosCredentialsAsync = ensureIosCredentialsAsync;
async function ensureIosCredentialsForBuildResignAsync(credentialsCtx, targets, buildProfile) {
    const provider = new IosCredentialsProvider_1.default(credentialsCtx, {
        app: await (0, BuildCredentialsUtils_1.getAppFromContextAsync)(credentialsCtx),
        targets,
        distribution: 'internal',
        enterpriseProvisioning: buildProfile.enterpriseProvisioning,
    });
    const { credentialsSource } = buildProfile;
    (0, credentials_1.logCredentialsSource)(credentialsSource, eas_build_job_1.Platform.IOS);
    return {
        credentials: await provider.getCredentialsAsync(credentialsSource),
        source: credentialsSource,
    };
}
exports.ensureIosCredentialsForBuildResignAsync = ensureIosCredentialsForBuildResignAsync;
function shouldProvideCredentials(buildCtx) {
    return !buildCtx.buildProfile.simulator && !buildCtx.buildProfile.withoutCredentials;
}

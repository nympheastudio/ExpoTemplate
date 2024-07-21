"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAscApiKeyPathAsync = exports.getAscApiKeyLocallyAsync = exports.getAscApiKeyResultAsync = exports.AscApiKeySourceType = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const AscApiKeyUtils_1 = require("../../credentials/ios/actions/AscApiKeyUtils");
const SetUpAscApiKey_1 = require("../../credentials/ios/actions/SetUpAscApiKey");
const log_1 = tslib_1.__importDefault(require("../../log"));
const bundleIdentifier_1 = require("../../project/ios/bundleIdentifier");
const prompts_1 = require("../../prompts");
const files_1 = require("../utils/files");
var AscApiKeySourceType;
(function (AscApiKeySourceType) {
    AscApiKeySourceType[AscApiKeySourceType["path"] = 0] = "path";
    AscApiKeySourceType[AscApiKeySourceType["prompt"] = 1] = "prompt";
    AscApiKeySourceType[AscApiKeySourceType["credentialsService"] = 2] = "credentialsService";
})(AscApiKeySourceType || (exports.AscApiKeySourceType = AscApiKeySourceType = {}));
async function getAscApiKeyResultAsync(ctx, source) {
    if (source.sourceType === AscApiKeySourceType.credentialsService) {
        return await getAscApiKeyFromCredentialsServiceAsync(ctx);
    }
    else {
        return await getAscApiKeyLocallyAsync(ctx, source);
    }
}
exports.getAscApiKeyResultAsync = getAscApiKeyResultAsync;
async function maybeGetIosBundleIdentifierAsync(ctx) {
    try {
        return await (0, bundleIdentifier_1.getBundleIdentifierAsync)(ctx.projectDir, ctx.exp, ctx.vcsClient);
    }
    catch (error) {
        if (error instanceof bundleIdentifier_1.AmbiguousBundleIdentifierError) {
            log_1.default.warn('bundleIdentifier in the Xcode project is ambiguous, specify it via "bundleIdentifier" field in the submit profile in the eas.json.');
            return null;
        }
        throw new Error(`Failed to resolve bundleIdentifier in the Xcode project: ${error.message}.`);
    }
}
async function promptForBundleIdentifierAsync() {
    const { bundleIdentifier } = await (0, prompts_1.promptAsync)({
        name: 'bundleIdentifier',
        message: 'Bundle identifier:',
        type: 'text',
        validate: value => ((0, bundleIdentifier_1.isBundleIdentifierValid)(value) ? true : bundleIdentifier_1.INVALID_BUNDLE_IDENTIFIER_MESSAGE),
    });
    return bundleIdentifier;
}
async function getAscApiKeyFromCredentialsServiceAsync(ctx) {
    const bundleIdentifier = ctx.applicationIdentifierOverride ??
        ctx.profile.bundleIdentifier ??
        (await maybeGetIosBundleIdentifierAsync(ctx)) ??
        (await promptForBundleIdentifierAsync());
    log_1.default.log(`Looking up credentials configuration for ${bundleIdentifier}...`);
    const appLookupParams = {
        account: (0, nullthrows_1.default)(ctx.user.accounts.find(a => a.name === ctx.accountName), `You do not have access to account: ${ctx.accountName}`),
        projectName: ctx.projectName,
        bundleIdentifier,
    };
    const setupAscApiKeyAction = new SetUpAscApiKey_1.SetUpAscApiKey(appLookupParams, AscApiKeyUtils_1.AppStoreApiKeyPurpose.SUBMISSION_SERVICE);
    const iosAppCredentials = await setupAscApiKeyAction.runAsync(ctx.credentialsCtx);
    const ascKeyForSubmissions = (0, nullthrows_1.default)(iosAppCredentials.appStoreConnectApiKeyForSubmissions, `An EAS Submit ASC Api Key could not be found for ${iosAppCredentials.appleAppIdentifier.bundleIdentifier}`);
    const { id, keyIdentifier, name } = ascKeyForSubmissions;
    log_1.default.log(`Using Api Key ID: ${keyIdentifier}${name ? ` (${name})` : ''}`);
    return {
        result: {
            ascApiKeyId: id,
        },
        summary: {
            source: 'EAS servers',
            keyId: keyIdentifier,
            name: name ?? undefined,
        },
    };
}
async function getAscApiKeyLocallyAsync(ctx, source) {
    const ascApiKeyPath = await getAscApiKeyPathAsync(ctx, source);
    const { keyP8Path, keyId, issuerId } = ascApiKeyPath;
    const keyP8 = await fs_extra_1.default.readFile(keyP8Path, 'utf-8');
    return {
        result: { keyP8, keyId, issuerId },
        summary: {
            source: 'local',
            path: keyP8Path,
            keyId,
        },
    };
}
exports.getAscApiKeyLocallyAsync = getAscApiKeyLocallyAsync;
async function getAscApiKeyPathAsync(ctx, source) {
    switch (source.sourceType) {
        case AscApiKeySourceType.path:
            return await handlePathSourceAsync(ctx, source);
        case AscApiKeySourceType.prompt:
            return await handlePromptSourceAsync(ctx, source);
        case AscApiKeySourceType.credentialsService:
            throw new Error(`AscApiKeySourceType ${source} does not return a path.`);
    }
}
exports.getAscApiKeyPathAsync = getAscApiKeyPathAsync;
async function handlePathSourceAsync(ctx, source) {
    const { keyP8Path } = source.path;
    if (!(await (0, files_1.isExistingFileAsync)(keyP8Path))) {
        log_1.default.warn(`File ${keyP8Path} doesn't exist.`);
        return await getAscApiKeyPathAsync(ctx, { sourceType: AscApiKeySourceType.prompt });
    }
    return source.path;
}
async function handlePromptSourceAsync(ctx, _source) {
    const ascApiKeyPath = await (0, AscApiKeyUtils_1.promptForAscApiKeyPathAsync)(ctx.credentialsCtx);
    return await getAscApiKeyPathAsync(ctx, {
        sourceType: AscApiKeySourceType.path,
        path: ascApiKeyPath,
    });
}

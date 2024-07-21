"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceAccountFromCredentialsServiceAsync = exports.getServiceAccountKeyPathAsync = exports.getServiceAccountKeyResultAsync = exports.ServiceAccountSourceType = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const SetUpGoogleServiceAccountKeyForSubmissions_1 = require("../../credentials/android/actions/SetUpGoogleServiceAccountKeyForSubmissions");
const googleServiceAccountKey_1 = require("../../credentials/android/utils/googleServiceAccountKey");
const log_1 = tslib_1.__importStar(require("../../log"));
const applicationId_1 = require("../../project/android/applicationId");
const prompts_1 = require("../../prompts");
const files_1 = require("../utils/files");
var ServiceAccountSourceType;
(function (ServiceAccountSourceType) {
    ServiceAccountSourceType[ServiceAccountSourceType["path"] = 0] = "path";
    ServiceAccountSourceType[ServiceAccountSourceType["prompt"] = 1] = "prompt";
    ServiceAccountSourceType[ServiceAccountSourceType["credentialsService"] = 2] = "credentialsService";
})(ServiceAccountSourceType || (exports.ServiceAccountSourceType = ServiceAccountSourceType = {}));
async function getServiceAccountKeyResultAsync(ctx, source) {
    if (source.sourceType === ServiceAccountSourceType.credentialsService) {
        return await getServiceAccountFromCredentialsServiceAsync(ctx, source);
    }
    else {
        return await getServiceAccountLocallyAsync(source);
    }
}
exports.getServiceAccountKeyResultAsync = getServiceAccountKeyResultAsync;
async function getServiceAccountLocallyAsync(source) {
    const serviceAccountKeyPath = await getServiceAccountKeyPathAsync(source);
    const serviceAccountKey = (0, googleServiceAccountKey_1.readAndValidateServiceAccountKey)(serviceAccountKeyPath);
    return {
        result: { googleServiceAccountKeyJson: await fs_extra_1.default.readFile(serviceAccountKeyPath, 'utf-8') },
        summary: {
            source: 'local',
            path: serviceAccountKeyPath,
            email: serviceAccountKey.client_email,
        },
    };
}
async function getServiceAccountKeyPathAsync(source) {
    switch (source.sourceType) {
        case ServiceAccountSourceType.path:
            return await handlePathSourceAsync(source);
        case ServiceAccountSourceType.prompt:
            return await handlePromptSourceAsync(source);
        case ServiceAccountSourceType.credentialsService: {
            throw new Error(`ServiceAccountSource ${source} does not return a path.`);
        }
    }
}
exports.getServiceAccountKeyPathAsync = getServiceAccountKeyPathAsync;
async function promptForApplicationIdAsync() {
    const { androidPackage } = await (0, prompts_1.promptAsync)({
        name: 'androidPackage',
        message: 'Android package name:',
        type: 'text',
        validate: value => ((0, applicationId_1.isApplicationIdValid)(value) ? true : applicationId_1.INVALID_APPLICATION_ID_MESSAGE),
    });
    return androidPackage;
}
async function getServiceAccountFromCredentialsServiceAsync(ctx, source) {
    const appLookupParams = {
        account: (0, nullthrows_1.default)(ctx.user.accounts.find(a => a.name === ctx.accountName), `You do not have access to account: ${ctx.accountName}`),
        projectName: ctx.projectName,
        androidApplicationIdentifier: source.androidApplicationIdentifier ?? (await promptForApplicationIdAsync()),
    };
    log_1.default.log(`Looking up credentials configuration for ${appLookupParams.androidApplicationIdentifier}...`);
    const setupGoogleServiceAccountKeyAction = new SetUpGoogleServiceAccountKeyForSubmissions_1.SetUpGoogleServiceAccountKeyForSubmissions(appLookupParams);
    const androidAppCredentials = await setupGoogleServiceAccountKeyAction.runAsync(ctx.credentialsCtx);
    const googleServiceAccountKey = (0, nullthrows_1.default)(androidAppCredentials.googleServiceAccountKeyForSubmissions, 'Credentials Service must provide a valid GoogleServiceAccountKey');
    return {
        result: {
            googleServiceAccountKeyId: googleServiceAccountKey.id,
        },
        summary: {
            source: 'EAS servers',
            email: googleServiceAccountKey.clientEmail,
        },
    };
}
exports.getServiceAccountFromCredentialsServiceAsync = getServiceAccountFromCredentialsServiceAsync;
async function handlePathSourceAsync(source) {
    if (!(await (0, files_1.isExistingFileAsync)(source.path))) {
        log_1.default.warn(`File ${source.path} doesn't exist.`);
        return await getServiceAccountKeyPathAsync({ sourceType: ServiceAccountSourceType.prompt });
    }
    return source.path;
}
async function handlePromptSourceAsync(_source) {
    const path = await askForServiceAccountPathAsync();
    return await getServiceAccountKeyPathAsync({
        sourceType: ServiceAccountSourceType.path,
        path,
    });
}
async function askForServiceAccountPathAsync() {
    log_1.default.log(`${chalk_1.default.bold('A Google Service Account JSON key is required to upload your app to Google Play Store')}.\n` +
        `If you're not sure what this is or how to create one, ${(0, log_1.learnMore)('https://expo.fyi/creating-google-service-account', { learnMoreMessage: 'learn more' })}`);
    const { filePath } = await (0, prompts_1.promptAsync)({
        name: 'filePath',
        message: 'Path to Google Service Account file:',
        initial: 'api-0000000000000000000-111111-aaaaaabbbbbb.json',
        type: 'text',
        // eslint-disable-next-line async-protect/async-suffix
        validate: async (filePath) => {
            try {
                const stats = await fs_extra_1.default.stat(filePath);
                if (stats.isFile()) {
                    return true;
                }
                return 'Input is not a file.';
            }
            catch {
                return 'File does not exist.';
            }
        },
    });
    return filePath;
}

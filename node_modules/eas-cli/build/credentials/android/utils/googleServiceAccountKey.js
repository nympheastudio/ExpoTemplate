"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectGoogleServiceAccountKeyPathAsync = exports.selectGoogleServiceAccountKeyAsync = exports.readAndValidateServiceAccountKey = exports.MinimalGoogleServiceAccountKeySchema = void 0;
const tslib_1 = require("tslib");
const json_file_1 = tslib_1.__importDefault(require("@expo/json-file"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const fast_glob_1 = tslib_1.__importDefault(require("fast-glob"));
const joi_1 = tslib_1.__importDefault(require("joi"));
const path_1 = tslib_1.__importDefault(require("path"));
const log_1 = tslib_1.__importStar(require("../../../log"));
const prompts_1 = require("../../../prompts");
const date_1 = require("../../../utils/date");
exports.MinimalGoogleServiceAccountKeySchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    private_key: joi_1.default.string().required(),
    client_email: joi_1.default.string().required(),
});
function fileIsServiceAccountKey(keyJsonPath) {
    try {
        readAndValidateServiceAccountKey(keyJsonPath);
        return true;
    }
    catch {
        return false;
    }
}
function readAndValidateServiceAccountKey(keyJsonPath) {
    try {
        const jsonKeyObject = json_file_1.default.read(keyJsonPath);
        const { error, value } = exports.MinimalGoogleServiceAccountKeySchema.validate(jsonKeyObject, {
            abortEarly: false,
            allowUnknown: true,
        });
        if (error) {
            const maybeGoogleServicesJson = keyJsonPath.includes('google-services');
            if (maybeGoogleServicesJson) {
                log_1.default.error(`Oops! Looks like you uploaded a google-services.json instead of your service account key. ${(0, log_1.learnMore)('https://expo.fyi/creating-google-service-account')}`);
            }
            throw new Error(`Google Service Account JSON Key is not valid [${error.toString()}].`);
        }
        return value;
    }
    catch (err) {
        if (err.code === 'EJSONPARSE') {
            err.message = `Found invalid JSON in Google Service Account JSON Key. ${err.message}`;
        }
        throw err;
    }
}
exports.readAndValidateServiceAccountKey = readAndValidateServiceAccountKey;
async function selectGoogleServiceAccountKeyAsync(keys) {
    const sortedKeys = sortGoogleServiceAccountKeysByUpdatedAtDesc(keys);
    const { chosenKey } = await (0, prompts_1.promptAsync)({
        type: 'select',
        name: 'chosenKey',
        message: 'Select a Google Service Account Key:',
        choices: sortedKeys.map(key => ({
            title: formatGoogleServiceAccountKey(key),
            value: key,
        })),
    });
    return chosenKey;
}
exports.selectGoogleServiceAccountKeyAsync = selectGoogleServiceAccountKeyAsync;
function sortGoogleServiceAccountKeysByUpdatedAtDesc(keys) {
    return keys.sort((keyA, keyB) => new Date(keyB.updatedAt).getTime() - new Date(keyA.updatedAt).getTime());
}
function formatGoogleServiceAccountKey({ projectIdentifier, privateKeyIdentifier, clientEmail, clientIdentifier, updatedAt, }) {
    let line = `Client Email: ${clientEmail}, Project Id: ${projectIdentifier}`;
    line += chalk_1.default.gray(`\n    Client Id: ${clientIdentifier}, Private Key Id: ${privateKeyIdentifier}`);
    line += chalk_1.default.gray(`\n    Updated: ${(0, date_1.fromNow)(new Date(updatedAt))} ago,`);
    return line;
}
async function detectGoogleServiceAccountKeyPathAsync(projectDir) {
    const foundFilePaths = await (0, fast_glob_1.default)('**/*.json', {
        cwd: projectDir,
        ignore: ['app.json', 'package*.json', 'tsconfig.json', 'node_modules', 'google-services.json'],
    });
    const googleServiceFiles = foundFilePaths
        .map(file => path_1.default.join(projectDir, file))
        .filter(fileIsServiceAccountKey);
    if (googleServiceFiles.length > 1) {
        const selectedPath = await displayPathChooserAsync(googleServiceFiles, projectDir);
        if (selectedPath) {
            return selectedPath;
        }
    }
    else if (googleServiceFiles.length === 1) {
        const [detectedPath] = googleServiceFiles;
        if (await confirmDetectedPathAsync(detectedPath)) {
            return detectedPath;
        }
    }
    return null;
}
exports.detectGoogleServiceAccountKeyPathAsync = detectGoogleServiceAccountKeyPathAsync;
async function displayPathChooserAsync(paths, projectDir) {
    const choices = paths.map(f => ({
        value: f,
        title: f.startsWith(projectDir) ? path_1.default.relative(projectDir, f) : f,
    }));
    choices.push({
        title: 'None of the above',
        value: null,
    });
    log_1.default.log('Multiple Google Service Account JSON keys have been found inside your project directory.');
    const { selectedPath } = await (0, prompts_1.promptAsync)({
        name: 'selectedPath',
        type: 'select',
        message: 'Choose the key you want to use:',
        choices,
    });
    log_1.default.addNewLineIfNone();
    return selectedPath;
}
async function confirmDetectedPathAsync(path) {
    log_1.default.log(`A Google Service Account JSON key has been found at\n  ${chalk_1.default.underline(path)}`);
    const confirm = await (0, prompts_1.confirmAsync)({
        message: 'Would you like to use this file?',
    });
    log_1.default.addNewLineIfNone();
    return confirm;
}

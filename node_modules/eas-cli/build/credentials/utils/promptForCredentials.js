"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldAutoGenerateCredentialsAsync = exports.getCredentialsFromUserAsync = exports.askForUserProvidedAsync = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const untildify_1 = tslib_1.__importDefault(require("untildify"));
const log_1 = tslib_1.__importDefault(require("../../log"));
const prompts_1 = require("../../prompts");
let expertPromptLogged = false;
const EXPERT_PROMPT = () => {
    if (expertPromptLogged) {
        return;
    }
    log_1.default.warn(`
In this mode, we won't be able to make sure that your credentials are valid.
Double check that you're uploading valid files for your app otherwise you may encounter strange errors!
When building for IOS make sure you've created your App ID on the Apple Developer Portal, that your App ID
is in app.json as \`bundleIdentifier\`, and that the provisioning profile you
upload matches that Team ID and App ID.
`);
    expertPromptLogged = true;
};
async function askForUserProvidedAsync(schema, initialValues = {}) {
    if (await shouldAutoGenerateCredentialsAsync(schema)) {
        return null;
    }
    EXPERT_PROMPT();
    return await getCredentialsFromUserAsync(schema, initialValues);
}
exports.askForUserProvidedAsync = askForUserProvidedAsync;
async function getCredentialsFromUserAsync(credentialsSchema, initialValues = {}) {
    const results = {};
    for (const question of credentialsSchema.questions) {
        results[question.field] = await askQuestionAndProcessAnswerAsync(question, initialValues?.[question.field]);
    }
    return credentialsSchema.transformResultAsync
        ? await credentialsSchema.transformResultAsync(results)
        : results;
}
exports.getCredentialsFromUserAsync = getCredentialsFromUserAsync;
async function shouldAutoGenerateCredentialsAsync(schema) {
    const answer = await (0, prompts_1.confirmAsync)({
        message: schema?.provideMethodQuestion?.question ?? `Generate a new ${schema.name}?`,
        initial: true,
    });
    return answer;
}
exports.shouldAutoGenerateCredentialsAsync = shouldAutoGenerateCredentialsAsync;
async function askQuestionAndProcessAnswerAsync(definition, initialValue) {
    const questionObject = buildQuestionObject(definition, initialValue);
    const { input } = await (0, prompts_1.promptAsync)(questionObject);
    return await processAnswerAsync(definition, input);
}
function buildQuestionObject({ type, question }, initialValue) {
    switch (type) {
        case 'string':
            return {
                type: 'text',
                name: 'input',
                initial: initialValue,
                message: question,
                validate: validateNonEmptyInput,
            };
        case 'file':
            return {
                type: 'text',
                name: 'input',
                message: question,
                format: produceAbsolutePath,
                validate: validateExistingFileAsync,
            };
        case 'password':
            return {
                type: 'password',
                name: 'input',
                message: question,
                validate: validateNonEmptyInput,
            };
    }
}
async function processAnswerAsync({ type, base64Encode }, input) {
    if (type === 'file') {
        return await fs_extra_1.default.readFile(input, base64Encode ? 'base64' : 'utf8');
    }
    else {
        return input;
    }
}
function produceAbsolutePath(filePath) {
    const untildified = (0, untildify_1.default)(filePath.trim());
    return !path_1.default.isAbsolute(untildified) ? path_1.default.resolve(untildified) : untildified;
}
function validateNonEmptyInput(val) {
    return val !== '';
}
async function validateExistingFileAsync(filePath) {
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
}

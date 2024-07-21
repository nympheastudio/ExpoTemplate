"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSecret = exports.validateURL = exports.prepareInputParamsAsync = void 0;
const tslib_1 = require("tslib");
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const url_1 = require("url");
const generated_1 = require("../graphql/generated");
const log_1 = tslib_1.__importDefault(require("../log"));
const prompts_1 = require("../prompts");
async function prepareInputParamsAsync({ event: maybeEvent, url: maybeUrl, secret: maybeSecret, 'non-interactive': nonInteractive, }, existingWebhook) {
    let event = maybeEvent;
    let url = maybeUrl;
    let secret = maybeSecret;
    if (!event) {
        if (nonInteractive) {
            throw new Error('Must supply event flag in non-interative mode');
        }
        const choices = [
            { title: 'Build', value: generated_1.WebhookType.Build },
            { title: 'Submit', value: generated_1.WebhookType.Submit },
        ];
        ({ event } = await (0, prompts_1.promptAsync)({
            type: 'select',
            name: 'event',
            message: 'Webhook event type:',
            choices,
            initial: existingWebhook?.event
                ? choices.findIndex(choice => choice.value === existingWebhook.event)
                : undefined,
        }));
    }
    if (!url || !validateURL(url)) {
        const urlValidationMessage = 'The provided webhook URL is invalid and must be an absolute URL, including a scheme.';
        if (url && !validateURL(url)) {
            log_1.default.error(urlValidationMessage);
        }
        if (nonInteractive) {
            throw new Error('Must supply url flag in non-interative mode');
        }
        ({ url } = await (0, prompts_1.promptAsync)({
            type: 'text',
            name: 'url',
            message: 'Webhook URL:',
            initial: url ? undefined : existingWebhook?.url,
            validate: (value) => validateURL(value) || urlValidationMessage,
        }));
    }
    if (!secret || !validateSecret(secret)) {
        const secretValidationMessage = 'Webhook secret has be at least 16 and not more than 1000 characters long';
        if (secret && !validateSecret(secret)) {
            log_1.default.error(secretValidationMessage);
        }
        if (nonInteractive) {
            throw new Error('Must supply secret flag in non-interative mode');
        }
        ({ secret } = await (0, prompts_1.promptAsync)({
            type: 'text',
            name: 'secret',
            message: 'Webhook secret:',
            validate: (value) => validateSecret(value) || secretValidationMessage,
        }));
    }
    return {
        event: (0, nullthrows_1.default)(event),
        url: (0, nullthrows_1.default)(url),
        secret: (0, nullthrows_1.default)(secret),
    };
}
exports.prepareInputParamsAsync = prepareInputParamsAsync;
function validateURL(url) {
    try {
        // eslint-disable-next-line no-new
        new url_1.URL(url);
        return true;
    }
    catch {
        return false;
    }
}
exports.validateURL = validateURL;
function validateSecret(secret) {
    return secret.length >= 16 && secret.length <= 1000;
}
exports.validateSecret = validateSecret;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertContractMessagesAsync = exports.formatContractMessage = void 0;
const tslib_1 = require("tslib");
const apple_utils_1 = require("@expo/apple-utils");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const log_1 = tslib_1.__importDefault(require("../../../log"));
const convertHTMLToASCII_1 = require("../utils/convertHTMLToASCII");
/**
 * **Does not support App Store Connect API (CI).**
 */
async function getContractStatusAsync(context) {
    try {
        const capabilities = await apple_utils_1.ITCAgreements.getCapabilitiesAsync(context);
        return capabilities?.contractStatus ?? null;
    }
    catch (error) {
        log_1.default.warn(`Failed to get iTunes contract status: ${error.message}`);
        return null;
    }
}
/**
 * **Does not support App Store Connect API (CI).**
 */
async function getContractMessagesAsync(context) {
    try {
        return await apple_utils_1.ITCAgreements.getContractMessagesAsync(context);
    }
    catch (error) {
        log_1.default.warn(`Failed to get iTunes contract messages: ${error.message}`);
        return null;
    }
}
/**
 * **Does not support App Store Connect API (CI).**
 */
async function getRequiredContractMessagesAsync(context) {
    // This emulates the check that's performed on the ASC website's "apps"
    // page before presenting the (+) create app button.
    const status = await getContractStatusAsync(context);
    if (status) {
        if (['FREE_APP_AGREEMENT_ACTIVE', 'PAID_APP_AGREEMENT_ACTIVE'].includes(status)) {
            // The user can freely create an app, no contracts need to be accepted.
            // No need to check for messages because afaict no vital messages will be present.
            return { messages: [], isFatal: false };
        }
        else if (['FREE_APP_AGREEMENT_OUTDATED', 'PAID_APP_AGREEMENT_OUTDATED', 'EXPIRED_MEMBERSHIP'].includes(status)) {
            // The user cannot create an app until they've reviewed, and agreed to the updated agreements
            // or renewed their membership on ASC.
            // Get the exact messages from ASC to show the user a useful message.
            return { messages: (await getContractMessagesAsync(context)) ?? [], isFatal: true };
        }
    }
    // The contract messages aren't documented so if a new one is present we cannot be sure if it's fatal or not.
    // This will check for messages, if none exist, then the process will continue.
    // Otherwise messages will be present and the process will stop.
    // There is a small chance that this could result in a false positive if the messages are extraneous, so we'll also
    // prompt the user to open an issue so we can address the new contract state if it ever appears.
    // TODO: Maybe a silent analytic would be better
    log_1.default.error(`\nUnexpected Apple developer contract status "${status}". Open an issue on https://github.com/expo/eas-cli`);
    log_1.default.newLine();
    return { messages: (await getContractMessagesAsync(context)) ?? [], isFatal: false };
}
const rootUrl = 'https://appstoreconnect.apple.com';
function formatContractMessage(message) {
    return (0, convertHTMLToASCII_1.convertHTMLToASCII)({
        content: '\u203A ' +
            [message.subject && `<b>${message.subject}</b>`, message.message]
                .filter(Boolean)
                .join('<br />'),
        rootUrl,
    });
}
exports.formatContractMessage = formatContractMessage;
/**
 * **Does not support App Store Connect API (CI).**
 */
async function assertContractMessagesAsync(context, spinner) {
    const { messages, isFatal } = await getRequiredContractMessagesAsync(context);
    if (Array.isArray(messages) && messages.length) {
        if (spinner) {
            spinner.stop();
        }
        log_1.default.newLine();
        log_1.default.log(chalk_1.default.yellow.bold('Messages from App Store Connect:'));
        log_1.default.newLine();
        for (const message of messages) {
            if (log_1.default.isDebug) {
                log_1.default.log(JSON.stringify(message, null, 2));
                log_1.default.newLine();
            }
            log_1.default.addNewLineIfNone();
            log_1.default.log(formatContractMessage(message));
        }
        log_1.default.addNewLineIfNone();
        // Only throw an error if we know that the status is fatal, otherwise attempt to finish the process.
        if (isFatal) {
            throw new Error('App Store Connect has agreement updates that must be resolved');
        }
    }
}
exports.assertContractMessagesAsync = assertContractMessagesAsync;

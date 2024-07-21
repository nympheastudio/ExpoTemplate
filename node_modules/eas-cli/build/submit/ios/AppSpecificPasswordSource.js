"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppleIdUsernameAsync = exports.getAppSpecificPasswordLocallyAsync = exports.AppSpecificPasswordSourceType = void 0;
const tslib_1 = require("tslib");
const getenv_1 = tslib_1.__importDefault(require("getenv"));
const authenticate_1 = require("../../credentials/ios/appstore/authenticate");
const prompts_1 = require("../../prompts");
const UserSettings_1 = tslib_1.__importDefault(require("../../user/UserSettings"));
var AppSpecificPasswordSourceType;
(function (AppSpecificPasswordSourceType) {
    AppSpecificPasswordSourceType[AppSpecificPasswordSourceType["userDefined"] = 0] = "userDefined";
})(AppSpecificPasswordSourceType || (exports.AppSpecificPasswordSourceType = AppSpecificPasswordSourceType = {}));
async function getAppSpecificPasswordLocallyAsync(ctx, source) {
    if (source.sourceType === AppSpecificPasswordSourceType.userDefined) {
        return {
            password: source.appSpecificPassword,
            appleIdUsername: await getAppleIdUsernameAsync(ctx),
        };
    }
    else {
        // exhaustive -- should never happen
        throw new Error(`Unknown app specific password source type "${source?.sourceType}"`);
    }
}
exports.getAppSpecificPasswordLocallyAsync = getAppSpecificPasswordLocallyAsync;
async function getAppleIdUsernameAsync(ctx) {
    if (ctx.profile.appleId) {
        return ctx.profile.appleId;
    }
    const envAppleId = getenv_1.default.string('EXPO_APPLE_ID', '');
    if (envAppleId) {
        return envAppleId;
    }
    if ((0, authenticate_1.isUserAuthCtx)(ctx.credentialsCtx.appStore.authCtx)) {
        return ctx.credentialsCtx.appStore.authCtx.appleId;
    }
    // Get the email address that was last used and set it as
    // the default value for quicker authentication.
    const lastAppleId = await UserSettings_1.default.getAsync('appleId', null);
    if (ctx.nonInteractive) {
        if (lastAppleId) {
            return lastAppleId;
        }
        else {
            throw new Error('Set appleId in the submit profile (eas.json).');
        }
    }
    const { appleId } = await (0, prompts_1.promptAsync)({
        type: 'text',
        name: 'appleId',
        message: `Enter your Apple ID:`,
        validate: (val) => !!val,
        initial: lastAppleId ?? undefined,
    });
    return appleId;
}
exports.getAppleIdUsernameAsync = getAppleIdUsernameAsync;

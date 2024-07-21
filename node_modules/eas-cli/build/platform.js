"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlatforms = exports.selectPlatformAsync = exports.selectRequestedPlatformAsync = exports.requestedPlatformDisplayNames = exports.RequestedPlatform = exports.appPlatformEmojis = exports.appPlatformDisplayNames = void 0;
const eas_build_job_1 = require("@expo/eas-build-job");
const generated_1 = require("./graphql/generated");
const prompts_1 = require("./prompts");
exports.appPlatformDisplayNames = {
    [generated_1.AppPlatform.Android]: 'Android',
    [generated_1.AppPlatform.Ios]: 'iOS',
};
exports.appPlatformEmojis = {
    [generated_1.AppPlatform.Ios]: '🍏',
    [generated_1.AppPlatform.Android]: '🤖',
};
// for `eas build`, `eas submit`, and `eas update`
var RequestedPlatform;
(function (RequestedPlatform) {
    RequestedPlatform["Android"] = "android";
    RequestedPlatform["Ios"] = "ios";
    RequestedPlatform["All"] = "all";
})(RequestedPlatform || (exports.RequestedPlatform = RequestedPlatform = {}));
exports.requestedPlatformDisplayNames = {
    [RequestedPlatform.Android]: 'Android',
    [RequestedPlatform.Ios]: 'iOS',
    [RequestedPlatform.All]: 'Android and iOS',
};
async function selectRequestedPlatformAsync(platform) {
    if (platform &&
        Object.values(RequestedPlatform).includes(platform.toLowerCase())) {
        return platform.toLowerCase();
    }
    const { requestedPlatform } = await (0, prompts_1.promptAsync)({
        type: 'select',
        message: 'Select platform',
        name: 'requestedPlatform',
        choices: [
            { title: 'All', value: RequestedPlatform.All },
            { title: 'Android', value: RequestedPlatform.Android },
            { title: 'iOS', value: RequestedPlatform.Ios },
        ],
    });
    return requestedPlatform;
}
exports.selectRequestedPlatformAsync = selectRequestedPlatformAsync;
async function selectPlatformAsync(platform) {
    if (platform && Object.values(eas_build_job_1.Platform).includes(platform.toLowerCase())) {
        return platform.toLowerCase();
    }
    const { resolvedPlatform } = await (0, prompts_1.promptAsync)({
        type: 'select',
        message: 'Select platform',
        name: 'resolvedPlatform',
        choices: [
            { title: 'Android', value: eas_build_job_1.Platform.ANDROID },
            { title: 'iOS', value: eas_build_job_1.Platform.IOS },
        ],
    });
    return resolvedPlatform;
}
exports.selectPlatformAsync = selectPlatformAsync;
function toPlatforms(requestedPlatform) {
    if (requestedPlatform === RequestedPlatform.All) {
        return [eas_build_job_1.Platform.ANDROID, eas_build_job_1.Platform.IOS];
    }
    else if (requestedPlatform === RequestedPlatform.Android) {
        return [eas_build_job_1.Platform.ANDROID];
    }
    else {
        return [eas_build_job_1.Platform.IOS];
    }
}
exports.toPlatforms = toPlatforms;

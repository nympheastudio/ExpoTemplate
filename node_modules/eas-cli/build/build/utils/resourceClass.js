"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBuildResourceClassAsync = void 0;
const tslib_1 = require("tslib");
const eas_build_job_1 = require("@expo/eas-build-job");
const eas_json_1 = require("@expo/eas-json");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const generated_1 = require("../../graphql/generated");
const log_1 = tslib_1.__importStar(require("../../log"));
const iosResourceClassToBuildResourceClassMapping = {
    [eas_json_1.ResourceClass.DEFAULT]: generated_1.BuildResourceClass.IosDefault,
    [eas_json_1.ResourceClass.LARGE]: generated_1.BuildResourceClass.IosLarge,
    [eas_json_1.ResourceClass.M1_MEDIUM]: generated_1.BuildResourceClass.IosMMedium,
    [eas_json_1.ResourceClass.MEDIUM]: generated_1.BuildResourceClass.IosMedium,
    [eas_json_1.ResourceClass.M_MEDIUM]: generated_1.BuildResourceClass.IosMMedium,
    [eas_json_1.ResourceClass.M_LARGE]: generated_1.BuildResourceClass.IosMLarge,
};
const androidResourceClassToBuildResourceClassMapping = {
    [eas_json_1.ResourceClass.DEFAULT]: generated_1.BuildResourceClass.AndroidDefault,
    [eas_json_1.ResourceClass.LARGE]: generated_1.BuildResourceClass.AndroidLarge,
    [eas_json_1.ResourceClass.MEDIUM]: generated_1.BuildResourceClass.AndroidMedium,
};
async function resolveBuildResourceClassAsync(profile, platform, resourceClassFlag) {
    const profileResourceClass = profile.resourceClass;
    if (profileResourceClass && resourceClassFlag && resourceClassFlag !== profileResourceClass) {
        log_1.default.warn(`Build profile specifies the "${profileResourceClass}" resource class but you passed "${resourceClassFlag}" to --resource-class.\nUsing "${resourceClassFlag}" as the override.`);
    }
    const selectedResourceClass = resourceClassFlag ?? profileResourceClass;
    return platform === eas_build_job_1.Platform.IOS
        ? resolveIosResourceClass(resourceClassFlag, profileResourceClass)
        : resolveAndroidResourceClass(selectedResourceClass);
}
exports.resolveBuildResourceClassAsync = resolveBuildResourceClassAsync;
function resolveAndroidResourceClass(selectedResourceClass) {
    if (selectedResourceClass && eas_json_1.ResourceClass.M1_MEDIUM === selectedResourceClass) {
        throw new Error(`Resource class ${selectedResourceClass} is only available for iOS builds`);
    }
    const resourceClass = selectedResourceClass ?? eas_json_1.ResourceClass.DEFAULT;
    return androidResourceClassToBuildResourceClassMapping[resourceClass];
}
function resolveIosResourceClass(resourceClassFlag, profileResourceClass) {
    const resourceClass = resourceClassFlag ?? profileResourceClass ?? eas_json_1.ResourceClass.DEFAULT;
    if (resourceClassFlag === eas_json_1.ResourceClass.LARGE) {
        throw new Error(`Experimental "large" resource class for Intel iOS workers is no longer available. Remove the specified resource class to use the default, or learn more about all available resource classes: ${(0, log_1.link)('https://docs.expo.dev/build-reference/eas-json/')}`);
    }
    if (eas_json_1.ResourceClass.M1_MEDIUM === resourceClass) {
        log_1.default.warn(`Resource class ${chalk_1.default.bold(resourceClass)} is deprecated. Use ${chalk_1.default.bold('m-medium')} instead.`);
    }
    if (eas_json_1.ResourceClass.M_LARGE === resourceClass) {
        log_1.default.warn(`Resource class ${chalk_1.default.bold(resourceClass)} is deprecated. Use ${chalk_1.default.bold('large')} instead.`);
    }
    return iosResourceClassToBuildResourceClassMapping[resourceClass];
}

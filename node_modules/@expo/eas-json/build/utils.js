"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasJsonUtils = void 0;
const eas_build_job_1 = require("@expo/eas-build-job");
const resolver_1 = require("./build/resolver");
const errors_1 = require("./errors");
const resolver_2 = require("./submit/resolver");
const schema_1 = require("./submit/schema");
class EasJsonUtils {
    static async getBuildProfileNamesAsync(accessor) {
        const easJson = await accessor.readAsync();
        return Object.keys(easJson?.build ?? {});
    }
    static async getBuildProfileAsync(accessor, platform, profileName) {
        const easJson = await accessor.readAsync();
        return (0, resolver_1.resolveBuildProfile)({ easJson, platform, profileName });
    }
    static async getBuildProfileDeprecationWarningsAsync(easJsonAccessor, platform, profileName) {
        const warnings = [];
        const buildProfile = await EasJsonUtils.getBuildProfileAsync(easJsonAccessor, platform, profileName);
        const rawEasJson = await easJsonAccessor.readRawJsonAsync();
        if (buildProfile.cache?.cacheDefaultPaths !== undefined) {
            warnings.push({
                message: [
                    `The "build.${profileName}.cache.cacheDefaultPaths" field in eas.json is deprecated and will be removed in the future.`,
                ],
                docsUrl: 'https://docs.expo.dev/build-reference/caching/#ios-dependencies',
            });
        }
        if (buildProfile.expoCli) {
            warnings.push({
                message: [
                    `The "build.${profileName}.expoCli" field in eas.json is deprecated and will be removed in the future.`,
                    `Global Expo CLI is deprecated. Since Expo SDK 46 local Expo CLI shipped with "expo" package is used. Remove this field from eas.json.`,
                    `Using this field has no effect on EAS Build process.`,
                ],
            });
        }
        warnings.push(...EasJsonUtils.getCustomPathsDeprecationWarnings(rawEasJson, profileName));
        return warnings;
    }
    static getCustomPathsDeprecationWarnings(rawEasJson, profileName) {
        const warnings = [];
        if (rawEasJson.build?.[profileName]?.cache?.customPaths !== undefined) {
            warnings.push({
                message: [
                    `The "build.${profileName}.cache.customPaths" field in eas.json is deprecated and will be removed in the future. Please use "build.${profileName}.cache.paths" instead.`,
                ],
                docsUrl: 'https://docs.expo.dev/build-reference/eas-json/#cache',
            });
        }
        if (rawEasJson.build?.[profileName]?.extends !== undefined) {
            warnings.push(...EasJsonUtils.getCustomPathsDeprecationWarnings(rawEasJson, rawEasJson.build?.[profileName].extends));
        }
        return warnings;
    }
    static async getCliConfigAsync(accessor) {
        try {
            const easJson = await accessor.readAsync();
            return easJson.cli ?? null;
        }
        catch (err) {
            if (err instanceof errors_1.MissingEasJsonError) {
                return null;
            }
            throw err;
        }
    }
    static async getSubmitProfileNamesAsync(accessor) {
        const easJson = await accessor.readAsync();
        return Object.keys(easJson?.submit ?? {});
    }
    static async getSubmitProfileAsync(accessor, platform, profileName) {
        const easJson = await accessor.readAsync();
        const profile = (0, resolver_2.resolveSubmitProfile)({ easJson, platform, profileName });
        const Schema = platform === eas_build_job_1.Platform.ANDROID ? schema_1.AndroidSubmitProfileSchema : schema_1.ResolvedIosSubmitProfileSchema;
        const { value, error } = Schema.validate(profile, {
            allowUnknown: false,
            abortEarly: false,
            convert: true,
        });
        if (error) {
            throw error;
        }
        return value;
    }
}
exports.EasJsonUtils = EasJsonUtils;

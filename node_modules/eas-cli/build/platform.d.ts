import { Platform } from '@expo/eas-build-job';
import { AppPlatform } from './graphql/generated';
export declare const appPlatformDisplayNames: Record<AppPlatform, string>;
export declare const appPlatformEmojis: {
    IOS: string;
    ANDROID: string;
};
export declare enum RequestedPlatform {
    Android = "android",
    Ios = "ios",
    All = "all"
}
export declare const requestedPlatformDisplayNames: Record<RequestedPlatform, string>;
export declare function selectRequestedPlatformAsync(platform?: string): Promise<RequestedPlatform>;
export declare function selectPlatformAsync(platform?: string): Promise<Platform>;
export declare function toPlatforms(requestedPlatform: RequestedPlatform): Platform[];

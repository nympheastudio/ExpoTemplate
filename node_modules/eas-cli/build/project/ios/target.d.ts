/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { ExpoConfig } from '@expo/config';
import { XcodeBuildContext } from './scheme';
import { ApplePlatform } from '../../credentials/ios/appstore/constants';
import { Target } from '../../credentials/ios/types';
import { Client } from '../../vcs/vcs';
interface ResolveTargetOptions {
    projectDir: string;
    exp: ExpoConfig;
    env?: Record<string, string>;
    xcodeBuildContext: XcodeBuildContext;
    vcsClient: Client;
}
export declare function resolveManagedProjectTargetsAsync({ exp, projectDir, xcodeBuildContext, env, vcsClient, }: ResolveTargetOptions): Promise<Target[]>;
export declare function resolveBareProjectTargetsAsync({ exp, projectDir, xcodeBuildContext, vcsClient, }: ResolveTargetOptions): Promise<Target[]>;
export declare function resolveTargetsAsync(opts: ResolveTargetOptions): Promise<Target[]>;
export declare function findApplicationTarget(targets: Target[]): Target;
export declare function findTargetByName(targets: Target[], name: string): Target;
/**
 * Get Apple Platform from the Xcode Target where possible.
 * @returns - Apple Platform when known, defaults to IOS when unknown
 */
export declare function getApplePlatformFromTarget(target: Target): ApplePlatform;
/**
 * Get Apple Platform from the Xcode SDKROOT where possible.
 * @returns - Apple Platform when known, defaults to null when unknown
 */
export declare function getApplePlatformFromSdkRoot(target: Target): ApplePlatform | null;
/**
 * Get Apple Platform from the Xcode TARGETED_DEVICE_FAMILY where possible.
 *
 * References:
 * https://developer-mdn.apple.com/library/archive/documentation/DeveloperTools/Reference/XcodeBuildSettingRef/1-Build_Setting_Reference/build_setting_ref.html
 * https://stackoverflow.com/questions/39677524/xcode-8-how-to-change-targeted-device-family#comment100316573_39677659
 *
 * @returns - Apple Platform when known, defaults to null when unknown
 */
export declare function getApplePlatformFromDeviceFamily(target: Target): ApplePlatform | null;
export {};

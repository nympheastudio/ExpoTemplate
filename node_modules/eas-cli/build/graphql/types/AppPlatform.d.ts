import { Platform } from '@expo/eas-build-job';
import { AppPlatform } from '../generated';
export declare function toAppPlatform(platform: Platform): AppPlatform;
export declare function toPlatform(appPlatform: AppPlatform): Platform;

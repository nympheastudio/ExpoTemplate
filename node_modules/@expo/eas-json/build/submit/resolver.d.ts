import { Platform } from '@expo/eas-build-job';
import { SubmitProfile } from './types';
import { EasJson } from '../types';
export declare function resolveSubmitProfile<T extends Platform>({ easJson, platform, profileName, }: {
    easJson: EasJson;
    platform: T;
    profileName?: string;
}): SubmitProfile<T>;
export declare function getDefaultProfile<T extends Platform>(platform: T): SubmitProfile<T>;

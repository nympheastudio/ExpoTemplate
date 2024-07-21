import { Platform } from '@expo/eas-build-job';
import { EasJson } from '../types';
import { BuildProfile } from './types';
export declare function resolveBuildProfile<T extends Platform>({ easJson, platform, profileName, }: {
    easJson: EasJson;
    platform: T;
    profileName?: string;
}): BuildProfile<T>;

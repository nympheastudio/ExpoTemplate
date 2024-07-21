import { Platform } from '@expo/eas-build-job';
import { BuildProfile, EasJsonAccessor, ProfileType, SubmitProfile } from '@expo/eas-json';
type EasProfile<T extends ProfileType> = T extends 'build' ? BuildProfile<Platform> : SubmitProfile<Platform>;
export type ProfileData<T extends ProfileType> = {
    profile: EasProfile<T>;
    platform: Platform;
    profileName: string;
};
export declare function getProfilesAsync<T extends ProfileType>({ easJsonAccessor, platforms, profileName, type, projectDir, }: {
    easJsonAccessor: EasJsonAccessor;
    platforms: Platform[];
    profileName?: string;
    projectDir: string;
    type: T;
}): Promise<ProfileData<T>[]>;
/**
 * Only for testing purposes
 */
export declare function clearHasPrintedDeprecationWarnings(): void;
export declare function maybePrintBuildProfileDeprecationWarningsAsync(easJsonAccessor: EasJsonAccessor, platform: Platform, profileName?: string): Promise<void>;
export {};

import { Platform } from '@expo/eas-build-job';
import { BuildProfile } from '@expo/eas-json';
import { Client } from '../vcs/vcs';
export interface CustomBuildConfigMetadata {
    workflowName?: string;
}
export declare function validateCustomBuildConfigAsync({ profile, projectDir, vcsClient, }: {
    projectDir: string;
    profile: BuildProfile<Platform>;
    vcsClient: Client;
}): Promise<CustomBuildConfigMetadata | undefined>;
export declare function getCustomBuildConfigPath(configFilename: string): string;
export declare function getCustomBuildConfigPathForJob(configFilename: string): string;

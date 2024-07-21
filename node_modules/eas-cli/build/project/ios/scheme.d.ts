import { ExpoConfig } from '@expo/config';
import { Platform } from '@expo/eas-build-job';
import { BuildProfile } from '@expo/eas-json';
import { Client } from '../../vcs/vcs';
export interface XcodeBuildContext {
    buildScheme: string;
    buildConfiguration?: string;
}
export declare function resolveXcodeBuildContextAsync({ exp, projectDir, nonInteractive, vcsClient, }: {
    exp: ExpoConfig;
    projectDir: string;
    nonInteractive: boolean;
    vcsClient: Client;
}, buildProfile: BuildProfile<Platform.IOS>): Promise<XcodeBuildContext>;
export declare function selectSchemeAsync({ projectDir, nonInteractive, }: {
    projectDir: string;
    nonInteractive: boolean;
}): Promise<string>;

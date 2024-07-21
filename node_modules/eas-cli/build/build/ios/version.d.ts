import { ExpoConfig } from '@expo/config';
import { Platform } from '@expo/eas-build-job';
import { BuildProfile } from '@expo/eas-json';
import type { XCBuildConfiguration } from 'xcode';
import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { Target } from '../../credentials/ios/types';
import { Client } from '../../vcs/vcs';
export declare enum BumpStrategy {
    APP_VERSION = 0,
    BUILD_NUMBER = 1,
    NOOP = 2
}
export declare function bumpVersionAsync({ bumpStrategy, projectDir, exp, targets, }: {
    projectDir: string;
    exp: ExpoConfig;
    bumpStrategy: BumpStrategy;
    targets: Target[];
}): Promise<void>;
export declare function bumpVersionInAppJsonAsync({ bumpStrategy, projectDir, exp, }: {
    bumpStrategy: BumpStrategy;
    projectDir: string;
    exp: ExpoConfig;
}): Promise<void>;
export declare function readShortVersionAsync(projectDir: string, exp: ExpoConfig, buildSettings: XCBuildConfiguration['buildSettings'], vcsClient: Client): Promise<string | undefined>;
export declare function readBuildNumberAsync(projectDir: string, exp: ExpoConfig, buildSettings: XCBuildConfiguration['buildSettings'], vcsClient: Client): Promise<string | undefined>;
export declare function maybeResolveVersionsAsync(projectDir: string, exp: ExpoConfig, targets: Target[], vcsClient: Client): Promise<{
    appVersion?: string;
    appBuildVersion?: string;
}>;
export declare function getInfoPlistPath(projectDir: string, buildSettings: XCBuildConfiguration['buildSettings']): string;
export declare function updateNativeVersionsAsync({ projectDir, version, buildNumber, targets, }: {
    projectDir: string;
    version?: string;
    buildNumber?: string;
    targets: Target[];
}): Promise<void>;
export declare function evaluateTemplateString(s: string, buildSettings: XCBuildConfiguration['buildSettings']): string;
/**
 * Returns buildNumber that will be used for the next build. If current build profile
 * has an 'autoIncrement' option set, it increments the version on server.
 */
export declare function resolveRemoteBuildNumberAsync(graphqlClient: ExpoGraphqlClient, { projectDir, projectId, exp, applicationTarget, buildProfile, vcsClient, }: {
    projectDir: string;
    projectId: string;
    exp: ExpoConfig;
    applicationTarget: Target;
    buildProfile: BuildProfile<Platform.IOS>;
    vcsClient: Client;
}): Promise<string>;

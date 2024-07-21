import { ExpoConfig } from '@expo/config';
import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { Client } from '../../vcs/vcs';
export declare const INVALID_BUNDLE_IDENTIFIER_MESSAGE = "Invalid format of iOS bundle identifier. Only alphanumeric characters, '.' and '-' are allowed, and each '.' must be followed by a letter.";
export declare function ensureBundleIdentifierIsDefinedForManagedProjectAsync({ graphqlClient, projectDir, projectId, exp, vcsClient, nonInteractive, }: {
    graphqlClient: ExpoGraphqlClient;
    projectDir: string;
    projectId: string;
    exp: ExpoConfig;
    vcsClient: Client;
    nonInteractive: boolean;
}): Promise<string>;
export declare class AmbiguousBundleIdentifierError extends Error {
    constructor(message?: string);
}
export declare function getBundleIdentifierAsync(projectDir: string, exp: ExpoConfig, vcsClient: Client, xcodeContext?: {
    targetName?: string;
    buildConfiguration?: string;
}): Promise<string>;
export declare function isBundleIdentifierValid(bundleIdentifier: string): boolean;
export declare function warnIfBundleIdentifierDefinedInAppConfigForBareWorkflowProject(projectDir: string, exp: ExpoConfig): void;
export declare function isWildcardBundleIdentifier(bundleIdentifier: string): boolean;

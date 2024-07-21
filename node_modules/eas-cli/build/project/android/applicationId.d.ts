import { ExpoConfig } from '@expo/config';
import { GradleBuildContext } from './gradle';
import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { Client } from '../../vcs/vcs';
export declare const INVALID_APPLICATION_ID_MESSAGE = "Invalid format of Android applicationId. Only alphanumeric characters, '.' and '_' are allowed, and each '.' must be followed by a letter.";
export declare function ensureApplicationIdIsDefinedForManagedProjectAsync({ graphqlClient, projectDir, projectId, exp, vcsClient, nonInteractive, }: {
    graphqlClient: ExpoGraphqlClient;
    projectDir: string;
    projectId: string;
    exp: ExpoConfig;
    vcsClient: Client;
    nonInteractive: boolean;
}): Promise<string>;
export declare class AmbiguousApplicationIdError extends Error {
    constructor(message?: string);
}
export declare function getApplicationIdFromBareAsync(projectDir: string, gradleContext?: GradleBuildContext): Promise<string>;
export declare function getApplicationIdAsync(projectDir: string, exp: ExpoConfig, vcsClient: Client, gradleContext?: GradleBuildContext): Promise<string>;
export declare function isApplicationIdValid(applicationId: string): boolean;
export declare function warnIfAndroidPackageDefinedInAppConfigForBareWorkflowProject(projectDir: string, exp: ExpoConfig): void;

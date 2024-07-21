import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { EnvironmentSecretFragment } from '../generated';
export declare enum EnvironmentSecretScope {
    ACCOUNT = "account",
    PROJECT = "project"
}
export type EnvironmentSecretWithScope = EnvironmentSecretFragment & {
    scope: EnvironmentSecretScope;
};
export declare const EnvironmentSecretsQuery: {
    byAppIdAsync(graphqlClient: ExpoGraphqlClient, appId: string): Promise<{
        accountSecrets: EnvironmentSecretFragment[];
        appSecrets: EnvironmentSecretFragment[];
    }>;
    allAsync(graphqlClient: ExpoGraphqlClient, projectId: string): Promise<EnvironmentSecretWithScope[]>;
};

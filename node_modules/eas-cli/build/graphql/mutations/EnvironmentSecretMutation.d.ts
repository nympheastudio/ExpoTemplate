import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { EnvironmentSecretFragment, EnvironmentSecretType } from '../generated';
export declare const EnvironmentSecretMutation: {
    createForAccountAsync(graphqlClient: ExpoGraphqlClient, input: {
        name: string;
        value: string;
        type: EnvironmentSecretType;
    }, accountId: string): Promise<EnvironmentSecretFragment>;
    createForAppAsync(graphqlClient: ExpoGraphqlClient, input: {
        name: string;
        value: string;
        type: EnvironmentSecretType;
    }, appId: string): Promise<EnvironmentSecretFragment>;
    deleteAsync(graphqlClient: ExpoGraphqlClient, id: string): Promise<{
        id: string;
    }>;
};

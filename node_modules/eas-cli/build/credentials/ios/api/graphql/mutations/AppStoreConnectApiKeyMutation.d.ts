import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppStoreConnectApiKeyFragment, AppStoreConnectApiKeyInput } from '../../../../../graphql/generated';
export declare const AppStoreConnectApiKeyMutation: {
    createAppStoreConnectApiKeyAsync(graphqlClient: ExpoGraphqlClient, appStoreConnectApiKeyInput: AppStoreConnectApiKeyInput, accountId: string): Promise<AppStoreConnectApiKeyFragment>;
    deleteAppStoreConnectApiKeyAsync(graphqlClient: ExpoGraphqlClient, appStoreConnectApiKeyId: string): Promise<void>;
};

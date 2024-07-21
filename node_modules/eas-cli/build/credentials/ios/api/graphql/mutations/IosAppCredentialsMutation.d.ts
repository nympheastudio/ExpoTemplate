import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { CommonIosAppCredentialsFragment, IosAppCredentialsInput } from '../../../../../graphql/generated';
export declare const IosAppCredentialsMutation: {
    createIosAppCredentialsAsync(graphqlClient: ExpoGraphqlClient, iosAppCredentialsInput: IosAppCredentialsInput, appId: string, appleAppIdentifierId: string): Promise<CommonIosAppCredentialsFragment>;
    setPushKeyAsync(graphqlClient: ExpoGraphqlClient, iosAppCredentialsId: string, pushKeyId: string): Promise<CommonIosAppCredentialsFragment>;
    setAppStoreConnectApiKeyForSubmissionsAsync(graphqlClient: ExpoGraphqlClient, iosAppCredentialsId: string, ascApiKeyId: string): Promise<CommonIosAppCredentialsFragment>;
};

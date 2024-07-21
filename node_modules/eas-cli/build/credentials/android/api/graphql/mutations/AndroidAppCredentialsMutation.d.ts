import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { CommonAndroidAppCredentialsFragment } from '../../../../../graphql/generated';
export declare const AndroidAppCredentialsMutation: {
    createAndroidAppCredentialsAsync(graphqlClient: ExpoGraphqlClient, androidAppCredentialsInput: {
        fcmId?: string;
    }, appId: string, applicationIdentifier: string): Promise<CommonAndroidAppCredentialsFragment>;
    setFcmKeyAsync(graphqlClient: ExpoGraphqlClient, androidAppCredentialsId: string, fcmId: string): Promise<CommonAndroidAppCredentialsFragment>;
    setGoogleServiceAccountKeyForSubmissionsAsync(graphqlClient: ExpoGraphqlClient, androidAppCredentialsId: string, googleServiceAccountKeyId: string): Promise<CommonAndroidAppCredentialsFragment>;
    setGoogleServiceAccountKeyForFcmV1Async(graphqlClient: ExpoGraphqlClient, androidAppCredentialsId: string, googleServiceAccountKeyId: string): Promise<CommonAndroidAppCredentialsFragment>;
};

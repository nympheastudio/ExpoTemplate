import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AndroidAppBuildCredentialsFragment, AndroidAppBuildCredentialsInput } from '../../../../../graphql/generated';
export type AndroidAppBuildCredentialsMetadataInput = Omit<AndroidAppBuildCredentialsInput, 'keystoreId'>;
export declare const AndroidAppBuildCredentialsMutation: {
    createAndroidAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, androidAppBuildCredentialsInput: AndroidAppBuildCredentialsInput, androidAppCredentialsId: string): Promise<AndroidAppBuildCredentialsFragment>;
    setDefaultAndroidAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, androidAppBuildCredentialsId: string): Promise<AndroidAppBuildCredentialsFragment>;
    setKeystoreAsync(graphqlClient: ExpoGraphqlClient, androidAppBuildCredentialsId: string, keystoreId: string): Promise<AndroidAppBuildCredentialsFragment>;
};

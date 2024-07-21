import { ExpoGraphqlClient } from '../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AccountFragment, AndroidAppBuildCredentialsFragment, AndroidFcmFragment, AndroidFcmVersion, AndroidKeystoreFragment, CommonAndroidAppCredentialsFragment, GoogleServiceAccountKeyFragment } from '../../../graphql/generated';
import { GoogleServiceAccountKey, KeystoreWithType } from '../credentials';
export interface AppLookupParams {
    account: AccountFragment;
    projectName: string;
    androidApplicationIdentifier: string;
}
export declare function getAndroidAppCredentialsWithCommonFieldsAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams): Promise<CommonAndroidAppCredentialsFragment | null>;
export declare function getAndroidAppBuildCredentialsListAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams): Promise<AndroidAppBuildCredentialsFragment[]>;
export declare function getLegacyAndroidAppCredentialsWithCommonFieldsAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams): Promise<CommonAndroidAppCredentialsFragment | null>;
export declare function getLegacyAndroidAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams): Promise<AndroidAppBuildCredentialsFragment | null>;
export declare function createOrGetExistingAndroidAppCredentialsWithBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams): Promise<CommonAndroidAppCredentialsFragment>;
export declare function updateAndroidAppCredentialsAsync(graphqlClient: ExpoGraphqlClient, appCredentials: CommonAndroidAppCredentialsFragment, { androidFcmId, googleServiceAccountKeyForSubmissionsId, googleServiceAccountKeyForFcmV1Id, }: {
    androidFcmId?: string;
    googleServiceAccountKeyForSubmissionsId?: string;
    googleServiceAccountKeyForFcmV1Id?: string;
}): Promise<CommonAndroidAppCredentialsFragment>;
export declare function updateAndroidAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, buildCredentials: AndroidAppBuildCredentialsFragment, { androidKeystoreId, }: {
    androidKeystoreId: string;
}): Promise<AndroidAppBuildCredentialsFragment>;
export declare function setDefaultAndroidAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, buildCredentials: AndroidAppBuildCredentialsFragment): Promise<AndroidAppBuildCredentialsFragment>;
export declare function createAndroidAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams, { name, isDefault, androidKeystoreId, }: {
    name: string;
    isDefault: boolean;
    androidKeystoreId: string;
}): Promise<AndroidAppBuildCredentialsFragment>;
export declare function getDefaultAndroidAppBuildCredentialsAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams): Promise<AndroidAppBuildCredentialsFragment | null>;
export declare function getAndroidAppBuildCredentialsByNameAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams, name: string): Promise<AndroidAppBuildCredentialsFragment | null>;
export declare function createOrUpdateAndroidAppBuildCredentialsByNameAsync(graphqlClient: ExpoGraphqlClient, appLookupParams: AppLookupParams, name: string, { androidKeystoreId, }: {
    androidKeystoreId: string;
}): Promise<AndroidAppBuildCredentialsFragment>;
export declare function createOrUpdateDefaultIosAppBuildCredentialsAsync(): Promise<void>;
export declare function createKeystoreAsync(graphqlClient: ExpoGraphqlClient, account: AccountFragment, keystore: KeystoreWithType): Promise<AndroidKeystoreFragment>;
export declare function deleteKeystoreAsync(graphqlClient: ExpoGraphqlClient, keystore: AndroidKeystoreFragment): Promise<void>;
export declare function createFcmAsync(graphqlClient: ExpoGraphqlClient, account: AccountFragment, fcmApiKey: string, version: AndroidFcmVersion): Promise<AndroidFcmFragment>;
export declare function deleteFcmAsync(graphqlClient: ExpoGraphqlClient, fcm: AndroidFcmFragment): Promise<void>;
export declare function createGoogleServiceAccountKeyAsync(graphqlClient: ExpoGraphqlClient, account: AccountFragment, jsonKey: GoogleServiceAccountKey): Promise<GoogleServiceAccountKeyFragment>;
export declare function deleteGoogleServiceAccountKeyAsync(graphqlClient: ExpoGraphqlClient, googleServiceAccountKey: GoogleServiceAccountKeyFragment): Promise<void>;
export declare function getGoogleServiceAccountKeysForAccountAsync(graphqlClient: ExpoGraphqlClient, account: AccountFragment): Promise<GoogleServiceAccountKeyFragment[]>;
export declare const formatProjectFullName: ({ account, projectName }: AppLookupParams) => string;

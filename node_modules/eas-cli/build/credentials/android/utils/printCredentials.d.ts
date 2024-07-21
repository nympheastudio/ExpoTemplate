import { AndroidKeystoreFragment, CommonAndroidAppCredentialsFragment } from '../../../graphql/generated';
import { AppLookupParams } from '../api/GraphqlClient';
export declare function displayEmptyAndroidCredentials(appLookupParams: AppLookupParams): void;
export declare function displayAndroidKeystore(keystore: AndroidKeystoreFragment): void;
export declare function displayAndroidAppCredentials({ appLookupParams, appCredentials, }: {
    appLookupParams: AppLookupParams;
    appCredentials: CommonAndroidAppCredentialsFragment | null;
}): void;

import { AndroidAppBuildCredentialsFragment } from '../../../graphql/generated';
import { GradleBuildContext } from '../../../project/android/gradle';
import { CredentialsContext } from '../../context';
import { AppLookupParams } from '../api/GraphqlClient';
/**
 * Legacy credentials can be copied over to EAS if the user does not have
 * EAS credentials set up yet
 */
export declare function canCopyLegacyCredentialsAsync(ctx: CredentialsContext, app: AppLookupParams): Promise<boolean>;
export declare function promptUserAndCopyLegacyCredentialsAsync(ctx: CredentialsContext, app: AppLookupParams): Promise<void>;
export declare function getAppLookupParamsFromContextAsync(ctx: CredentialsContext, gradleContext?: GradleBuildContext): Promise<AppLookupParams>;
export declare function createOrUpdateDefaultAndroidAppBuildCredentialsAsync(ctx: CredentialsContext, appLookupParams: AppLookupParams, { androidKeystoreId, }: {
    androidKeystoreId: string;
}): Promise<AndroidAppBuildCredentialsFragment>;
export declare function promptForNameAsync(): Promise<string>;
/**
 * sort a build credentials array in descending order of preference
 * prefer default credentials, then prefer names that come first lexicographically
 */
export declare function sortBuildCredentials(androidAppBuildCredentialsList: AndroidAppBuildCredentialsFragment[]): AndroidAppBuildCredentialsFragment[];

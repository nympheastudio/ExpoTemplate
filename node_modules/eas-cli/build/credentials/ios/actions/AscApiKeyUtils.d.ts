import { AccountFragment, AppStoreConnectApiKeyFragment } from '../../../graphql/generated';
import { CredentialsContext } from '../../context';
import { AscApiKey } from '../appstore/Credentials.types';
import { AscApiKeyPath, MinimalAscApiKey } from '../credentials';
export declare enum AppStoreApiKeyPurpose {
    SUBMISSION_SERVICE = "EAS Submit"
}
export declare function promptForAscApiKeyPathAsync(ctx: CredentialsContext): Promise<AscApiKeyPath>;
export declare function promptForIssuerIdAsync(): Promise<string>;
export declare function getMinimalAscApiKeyAsync(ascApiKey: AscApiKey): Promise<MinimalAscApiKey>;
export declare function provideOrGenerateAscApiKeyAsync(ctx: CredentialsContext, purpose: AppStoreApiKeyPurpose): Promise<MinimalAscApiKey>;
export declare function getAscApiKeyName(purpose: AppStoreApiKeyPurpose): string;
export declare function getAscApiKeysFromAccountAsync(ctx: CredentialsContext, account: AccountFragment, { filterDifferentAppleTeam }?: {
    filterDifferentAppleTeam?: boolean;
}): Promise<AppStoreConnectApiKeyFragment[]>;
export declare function selectAscApiKeysFromAccountAsync(ctx: CredentialsContext, account: AccountFragment, { filterDifferentAppleTeam }?: {
    filterDifferentAppleTeam?: boolean;
}): Promise<AppStoreConnectApiKeyFragment | null>;
export declare function sortAscApiKeysByUpdatedAtDesc(keys: AppStoreConnectApiKeyFragment[]): AppStoreConnectApiKeyFragment[];
export declare function formatAscApiKey(ascApiKey: AppStoreConnectApiKeyFragment): string;

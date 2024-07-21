import { AppStoreConnectApiKeyFragment } from '../../../graphql/generated';
import { CredentialsContext } from '../../context';
import { MinimalAscApiKey } from '../credentials';
export declare function isAscApiKeyValidAndTrackedAsync(ctx: CredentialsContext, ascApiKey: MinimalAscApiKey): Promise<boolean>;
export declare function getValidAndTrackedAscApiKeysAsync(ctx: CredentialsContext, ascApiKeys: AppStoreConnectApiKeyFragment[]): Promise<AppStoreConnectApiKeyFragment[]>;

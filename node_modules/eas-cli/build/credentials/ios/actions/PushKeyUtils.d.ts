import { AccountFragment, ApplePushKeyFragment } from '../../../graphql/generated';
import { CredentialsContext } from '../../context';
import { PushKey } from '../appstore/Credentials.types';
export declare function provideOrGeneratePushKeyAsync(ctx: CredentialsContext): Promise<PushKey>;
/**
 * select a push key from an account (validity status shown on a best effort basis)
 * */
export declare function selectPushKeyAsync(ctx: CredentialsContext, account: AccountFragment): Promise<ApplePushKeyFragment | null>;
export declare function getValidAndTrackedPushKeysOnEasServersAsync(ctx: CredentialsContext, pushKeysForAccount: ApplePushKeyFragment[]): Promise<ApplePushKeyFragment[]>;
export declare function sortPushKeys(pushKeys: ApplePushKeyFragment[], validPushKeys?: ApplePushKeyFragment[]): ApplePushKeyFragment[];
export declare function formatPushKey(pushKey: ApplePushKeyFragment, validPushKeyIdentifiers?: string[]): string;

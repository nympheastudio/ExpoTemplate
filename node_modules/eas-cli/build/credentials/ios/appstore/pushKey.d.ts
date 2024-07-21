import { PushKey, PushKeyStoreInfo } from './Credentials.types';
import { UserAuthCtx } from './authenticateTypes';
export declare const APPLE_KEYS_TOO_MANY_GENERATED_ERROR: string;
/**
 * List all existing push keys on Apple servers.
 * **Does not support App Store Connect API (CI).**
 */
export declare function listPushKeysAsync(userAuthCtx: UserAuthCtx): Promise<PushKeyStoreInfo[]>;
/**
 * Create a new push key on Apple servers.
 * **Does not support App Store Connect API (CI).**
 */
export declare function createPushKeyAsync(userAuthCtx: UserAuthCtx, name?: string): Promise<PushKey>;
/**
 * Revoke an existing push key on Apple servers.
 * **Does not support App Store Connect API (CI).**
 */
export declare function revokePushKeyAsync(userAuthCtx: UserAuthCtx, ids: string[]): Promise<void>;

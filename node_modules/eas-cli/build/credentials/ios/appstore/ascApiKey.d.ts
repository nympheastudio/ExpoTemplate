/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { ApiKey, ApiKeyProps } from '@expo/apple-utils';
import { AscApiKey, AscApiKeyInfo } from './Credentials.types';
import { AuthCtx, UserAuthCtx } from './authenticateTypes';
import { Analytics } from '../../../analytics/AnalyticsManager';
/**
 * List App Store Connect API Keys.
 * **Does not support App Store Connect API (CI).**
 */
export declare function listAscApiKeysAsync(userAuthCtx: UserAuthCtx): Promise<AscApiKeyInfo[]>;
/**
 * Get an App Store Connect API Key.
 * **Does not support App Store Connect API (CI).**
 */
export declare function getAscApiKeyAsync(userAuthCtx: UserAuthCtx, keyId: string): Promise<AscApiKeyInfo | null>;
/**
 * There is a bug in Apple's infrastructure that does not propagate newly created objects for a
 * while. If the key has not propagated and you try to download it, Apple will error saying that
 * the resource does not exist. We retry with exponential backoff until the key propagates and
 * is available for download.
 * */
export declare function downloadWithRetryAsync(analytics: Analytics, key: ApiKey, { minTimeout, retries, factor, }?: {
    minTimeout?: number;
    retries?: number;
    factor?: number;
}): Promise<string | null>;
/**
 * Create an App Store Connect API Key.
 * **Does not support App Store Connect API (CI).**
 */
export declare function createAscApiKeyAsync(analytics: Analytics, userAuthCtx: UserAuthCtx, { nickname, allAppsVisible, roles, keyType, }: Partial<Pick<ApiKeyProps, 'nickname' | 'roles' | 'allAppsVisible' | 'keyType'>>): Promise<AscApiKey>;
/**
 * Revoke an App Store Connect API Key.
 * **Does not support App Store Connect API (CI).**
 */
export declare function revokeAscApiKeyAsync(userAuthCtx: UserAuthCtx, keyId: string): Promise<AscApiKeyInfo>;
export declare function getAscApiKeyInfo(apiKey: ApiKey, authCtx: AuthCtx): AscApiKeyInfo;

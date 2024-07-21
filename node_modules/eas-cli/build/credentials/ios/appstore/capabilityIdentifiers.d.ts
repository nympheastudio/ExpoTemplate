/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { BundleId } from '@expo/apple-utils';
import { JSONObject } from '@expo/json-file';
/**
 * Sync the capability identifiers with the bundle identifier capabilities.
 * If a capability identifier is missing, then attempt to create it.
 * Link all of the capability identifiers at the same time after parsing the entitlements file.
 *
 * **Does not support App Store Connect API (CI).**
 *
 * @param bundleId Bundle identifier object.
 * @param entitlements JSON representation of the iOS entitlements plist
 *
 * @returns an object specifying the capabilities that were linked, and created.
 */
export declare function syncCapabilityIdentifiersForEntitlementsAsync(bundleId: BundleId, entitlements?: JSONObject): Promise<{
    created: string[];
    linked: string[];
}>;

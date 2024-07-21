/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { DistributionCertificate, ProvisioningProfile, ProvisioningProfileStoreInfo } from './Credentials.types';
import { AuthCtx } from './authenticateTypes';
import { ApplePlatform } from './constants';
export declare enum ProfileClass {
    Adhoc = "ad_hoc",
    General = "general"
}
export declare function useExistingProvisioningProfileAsync(authCtx: AuthCtx, bundleIdentifier: string, provisioningProfile: ProvisioningProfile, distCert: DistributionCertificate): Promise<ProvisioningProfile>;
export declare function listProvisioningProfilesAsync(authCtx: AuthCtx, bundleIdentifier: string, applePlatform: ApplePlatform, profileClass?: ProfileClass): Promise<ProvisioningProfileStoreInfo[]>;
export declare function createProvisioningProfileAsync(authCtx: AuthCtx, bundleIdentifier: string, distCert: DistributionCertificate, profileName: string, applePlatform: ApplePlatform, profileClass?: ProfileClass): Promise<ProvisioningProfile>;
export declare function revokeProvisioningProfileAsync(authCtx: AuthCtx, bundleIdentifier: string, applePlatform: ApplePlatform, profileClass?: ProfileClass): Promise<void>;

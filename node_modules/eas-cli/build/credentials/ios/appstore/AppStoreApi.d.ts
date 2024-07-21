/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { ProfileType } from '@expo/app-store';
import { AscApiKey, AscApiKeyInfo, DistributionCertificate, DistributionCertificateStoreInfo, ProvisioningProfile, ProvisioningProfileStoreInfo, PushKey, PushKeyStoreInfo } from './Credentials.types';
import { Options as AuthenticateOptions } from './authenticate';
import { AuthCtx, AuthenticationMode, UserAuthCtx } from './authenticateTypes';
import { ApplePlatform } from './constants';
import { AppLookupParams, IosCapabilitiesOptions } from './ensureAppExists';
import { ProfileClass } from './provisioningProfile';
import { Analytics } from '../../../analytics/AnalyticsManager';
export default class AppStoreApi {
    authCtx?: AuthCtx;
    defaultAuthenticationMode: AuthenticationMode;
    constructor();
    ensureUserAuthenticatedAsync(options?: AuthenticateOptions): Promise<UserAuthCtx>;
    ensureAuthenticatedAsync(options?: AuthenticateOptions): Promise<AuthCtx>;
    ensureBundleIdExistsAsync(app: AppLookupParams, options?: IosCapabilitiesOptions): Promise<void>;
    listDistributionCertificatesAsync(): Promise<DistributionCertificateStoreInfo[]>;
    createDistributionCertificateAsync(): Promise<DistributionCertificate>;
    revokeDistributionCertificateAsync(ids: string[]): Promise<void>;
    listPushKeysAsync(): Promise<PushKeyStoreInfo[]>;
    createPushKeyAsync(name?: string): Promise<PushKey>;
    revokePushKeyAsync(ids: string[]): Promise<void>;
    useExistingProvisioningProfileAsync(bundleIdentifier: string, provisioningProfile: ProvisioningProfile, distCert: DistributionCertificate): Promise<ProvisioningProfile>;
    listProvisioningProfilesAsync(bundleIdentifier: string, applePlatform: ApplePlatform, profileClass?: ProfileClass): Promise<ProvisioningProfileStoreInfo[]>;
    createProvisioningProfileAsync(bundleIdentifier: string, distCert: DistributionCertificate, profileName: string, applePlatform: ApplePlatform, profileClass?: ProfileClass): Promise<ProvisioningProfile>;
    revokeProvisioningProfileAsync(bundleIdentifier: string, applePlatform: ApplePlatform, profileClass?: ProfileClass): Promise<void>;
    createOrReuseAdhocProvisioningProfileAsync(udids: string[], bundleIdentifier: string, distCertSerialNumber: string, profileType: ProfileType): Promise<ProvisioningProfile>;
    listAscApiKeysAsync(): Promise<AscApiKeyInfo[]>;
    getAscApiKeyAsync(keyId: string): Promise<AscApiKeyInfo | null>;
    createAscApiKeyAsync(analytics: Analytics, { nickname }: {
        nickname: string;
    }): Promise<AscApiKey>;
    revokeAscApiKeyAsync(keyId: string): Promise<AscApiKeyInfo>;
}

/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { UserRole } from '@expo/apple-utils';
import { DistributionCertificate, ProvisioningProfile, PushKey } from './appstore/Credentials.types';
import { AppleDevice } from '../../graphql/generated';
import { CredentialSchema } from '../utils/promptForCredentials';
export interface AppLookupParams {
    accountName: string;
    projectName: string;
    bundleIdentifier: string;
}
export declare function getAppLookupParams(experienceName: string, bundleIdentifier: string): AppLookupParams;
export interface IosCredentials {
    appCredentials: IosAppCredentials[];
    userCredentials: (IosPushCredentials | IosDistCredentials)[];
}
export interface IosAppCredentials {
    experienceName: string;
    bundleIdentifier: string;
    pushCredentialsId?: number;
    distCredentialsId?: number;
    credentials: {
        provisioningProfileId?: string;
        provisioningProfile?: string;
        devices?: AppleDevice[];
        teamId?: string;
        teamName?: string;
        pushId?: string;
        pushP12?: string;
        pushPassword?: string;
    };
}
export interface IosPushCredentials extends PushKey {
    id: string;
    type: 'push-key';
}
export interface IosDistCredentials extends DistributionCertificate {
    id: string;
    type: 'dist-cert';
}
export declare const distributionCertificateSchema: CredentialSchema<DistributionCertificate>;
export type MinimalAscApiKey = {
    keyP8: string;
    keyId: string;
    issuerId: string;
    teamId?: string;
    teamName?: string;
    roles?: UserRole[];
    name?: string;
};
export interface AscApiKeyPath {
    keyP8Path: string;
    keyId: string;
    issuerId: string;
}
export declare const ascApiKeyIdSchema: CredentialSchema<Pick<MinimalAscApiKey, 'keyId'>>;
export declare const ascApiKeyIssuerIdSchema: CredentialSchema<Pick<MinimalAscApiKey, 'issuerId'>>;
export declare const pushKeySchema: CredentialSchema<PushKey>;
export declare const provisioningProfileSchema: CredentialSchema<ProvisioningProfile>;

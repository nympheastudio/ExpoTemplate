import Joi from 'joi';
import { Keystore } from '../android/credentials';
export interface CredentialsJson {
    android?: CredentialsJsonAndroidCredentials;
    ios?: CredentialsJsonIosTargetCredentials | CredentialsJsonIosCredentials;
}
export interface CredentialsJsonAndroidCredentials {
    keystore: {
        keystorePath: string;
        keystorePassword: string;
        keyAlias: string;
        keyPassword?: string;
    };
}
export interface CredentialsJsonIosTargetCredentials {
    provisioningProfilePath: string;
    distributionCertificate: {
        path: string;
        password: string;
    };
}
export type CredentialsJsonIosCredentials = Record<string, CredentialsJsonIosTargetCredentials>;
export interface AndroidCredentials {
    keystore: Keystore;
}
export interface IosTargetCredentials {
    provisioningProfile: string;
    distributionCertificate: {
        certificateP12: string;
        certificatePassword: string;
    };
}
export type IosCredentials = Record<string, IosTargetCredentials>;
export declare const CredentialsJsonSchema: Joi.ObjectSchema<any>;

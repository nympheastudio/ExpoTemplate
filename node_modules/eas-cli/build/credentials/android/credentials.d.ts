import { AndroidKeystoreType } from '../../graphql/generated';
import { CredentialSchema } from '../utils/promptForCredentials';
export interface FcmCredentials {
    fcmApiKey: string;
}
export interface Keystore {
    keystore: string;
    keystorePassword: string;
    keyAlias: string;
    keyPassword?: string;
}
export type KeystoreWithType = Keystore & {
    type: AndroidKeystoreType;
};
export type GoogleServiceAccountKey = {
    [key: string]: any;
    private_key: string;
    type: string;
    client_email: string;
};
export type AndroidCredentials = {
    experienceName: string;
    keystore: Keystore | null;
    pushCredentials: FcmCredentials | null;
};
export declare const keystoreSchema: CredentialSchema<Keystore>;

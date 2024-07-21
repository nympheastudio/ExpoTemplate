import { AndroidKeystoreType } from '../../../graphql/generated';
import { Keystore, KeystoreWithType } from '../credentials';
export declare function getKeystoreWithType(keystore: Keystore): KeystoreWithType;
export declare function getKeystoreType(keystore: Keystore): AndroidKeystoreType;
export declare function validateKeystore(keystore: KeystoreWithType): void;

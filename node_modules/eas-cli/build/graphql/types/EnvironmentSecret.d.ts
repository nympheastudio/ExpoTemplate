import { EnvironmentSecretType } from '../generated';
export declare const EnvironmentSecretFragmentNode: import("graphql").DocumentNode;
export declare enum SecretType {
    STRING = "string",
    FILE = "file"
}
export declare const SecretTypeToEnvironmentSecretType: Record<SecretType, EnvironmentSecretType>;
export declare const EnvironmentSecretTypeToSecretType: Record<EnvironmentSecretType, SecretType>;

import { ExpoConfig } from '@expo/config';
import { pki as PKI } from 'node-forge';
import { Response } from '../fetch';
import { PartialManifest } from '../graphql/generated';
export type CodeSigningInfo = {
    privateKey: PKI.rsa.PrivateKey;
    certificate: PKI.Certificate;
    codeSigningMetadata: {
        alg: string;
        keyid: string;
    };
};
export declare function getCodeSigningInfoAsync(config: ExpoConfig, privateKeyPath: string | undefined): Promise<CodeSigningInfo | undefined>;
export declare function getKeyAndCertificateFromPathsAsync({ codeSigningCertificatePath, privateKeyPath, }: {
    codeSigningCertificatePath: string;
    privateKeyPath: string;
}): Promise<{
    privateKey: PKI.rsa.PrivateKey;
    certificate: PKI.Certificate;
}>;
export declare function getManifestBodyAsync(res: Response): Promise<string | null>;
export declare function getDirectiveBodyAsync(res: Response): Promise<string | null>;
export declare function signBody(body: string, codeSigningInfo: CodeSigningInfo): string;
export declare function checkManifestBodyAgainstUpdateInfoGroup(manifestResponseBody: string, partialManifest: PartialManifest): void;
export declare function checkDirectiveBodyAgainstUpdateInfoGroup(directiveResponseBody: string): void;

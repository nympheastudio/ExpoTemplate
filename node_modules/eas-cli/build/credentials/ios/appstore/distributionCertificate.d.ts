/// <reference types="@expo/apple-utils/ts-declarations/expo__app-store" />
import { Certificate, RequestContext } from '@expo/apple-utils';
import { DistributionCertificate, DistributionCertificateStoreInfo } from './Credentials.types';
import { AuthCtx } from './authenticateTypes';
export declare class AppleTooManyCertsError extends Error {
}
export declare function getCertificateBySerialNumberAsync(context: RequestContext, serialNumber: string): Promise<Certificate>;
export declare function getDistributionCertificateAsync(context: RequestContext, serialNumber: string): Promise<Certificate | null>;
export declare function transformCertificate(cert: Certificate): DistributionCertificateStoreInfo;
export declare function listDistributionCertificatesAsync(authCtx: AuthCtx): Promise<DistributionCertificateStoreInfo[]>;
/**
 * Run from `eas credentials` -> iOS -> Add new Distribution Certificate
 */
export declare function createDistributionCertificateAsync(authCtx: AuthCtx): Promise<DistributionCertificate>;
export declare function revokeDistributionCertificateAsync(authCtx: AuthCtx, ids: string[]): Promise<void>;

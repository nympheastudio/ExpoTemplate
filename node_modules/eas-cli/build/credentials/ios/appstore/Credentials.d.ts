import { DistributionCertificate, DistributionCertificateStoreInfo, PushKey, PushKeyStoreInfo } from './Credentials.types';
export declare function formatDistributionCertificate({ name, id, status, expires, created, ownerName, }: DistributionCertificateStoreInfo): string;
export declare function isDistributionCertificate(val: {
    [key: string]: any;
}): val is DistributionCertificate;
export declare function formatPushKey({ id, name }: PushKeyStoreInfo): string;
export declare function isPushKey(obj: {
    [key: string]: any;
}): obj is PushKey;

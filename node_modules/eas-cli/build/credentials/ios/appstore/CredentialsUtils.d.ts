import { DistributionCertificate, DistributionCertificateStoreInfo, PushKey, PushKeyStoreInfo } from './Credentials.types';
import { AppleDistributionCertificateFragment, ApplePushKeyFragment } from '../../../graphql/generated';
/**
 * Edge case: Uploaded push keys rely on the user to provide the keyIdentifier, which could be incorrect
 * It is possible an uploaded key could have a valid p8 but invalid identifier, making it impossible for us to
 * track it's status on the Apple Developer Portal
 */
export declare function filterRevokedAndUntrackedPushKeysAsync<T extends PushKey>(pushKeys: T[], pushInfoFromApple: PushKeyStoreInfo[]): Promise<T[]>;
/**
 * Edge case: Uploaded push keys rely on the user to provide the keyIdentifier, which could be incorrect
 * It is possible an uploaded key could have a valid p8 but invalid identifier, making it impossible for us to
 * track it's status on the Apple Developer Portal
 */
export declare function filterRevokedAndUntrackedPushKeysFromEasServersAsync(pushKeys: ApplePushKeyFragment[], pushInfoFromApple: PushKeyStoreInfo[]): Promise<ApplePushKeyFragment[]>;
export declare function filterRevokedDistributionCertsFromEasServers(distributionCerts: AppleDistributionCertificateFragment[], certInfoFromApple: DistributionCertificateStoreInfo[]): AppleDistributionCertificateFragment[];
export declare function filterRevokedDistributionCerts<T extends DistributionCertificate>(distributionCerts: T[], certInfoFromApple: DistributionCertificateStoreInfo[]): T[];
export declare function sortCertificatesByExpiryDesc<T extends DistributionCertificate>(certInfoFromApple: DistributionCertificateStoreInfo[], distributionCerts: T[]): T[];
export declare function getValidCertSerialNumbers(certInfoFromApple: DistributionCertificateStoreInfo[]): string[];

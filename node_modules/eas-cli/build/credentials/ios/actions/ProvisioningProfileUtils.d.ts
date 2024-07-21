import { CredentialsContext } from '../../context';
import { DistributionCertificate, ProvisioningProfile, ProvisioningProfileStoreInfo } from '../appstore/Credentials.types';
import { Target } from '../types';
export declare function formatProvisioningProfileFromApple(appleInfo: ProvisioningProfileStoreInfo): string;
export declare function generateProvisioningProfileAsync(ctx: CredentialsContext, target: Target, bundleIdentifier: string, distCert: DistributionCertificate): Promise<ProvisioningProfile>;

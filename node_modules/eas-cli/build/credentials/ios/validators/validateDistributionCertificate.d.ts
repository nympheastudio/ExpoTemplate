import { CredentialsContext } from '../../context';
import { DistributionCertificate } from '../appstore/Credentials.types';
export declare function validateDistributionCertificateAsync(ctx: CredentialsContext, distributionCertificate: DistributionCertificate): Promise<boolean>;

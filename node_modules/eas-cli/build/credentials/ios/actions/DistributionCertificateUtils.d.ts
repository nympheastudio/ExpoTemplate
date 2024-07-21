import { AccountFragment, AppleDistributionCertificateFragment } from '../../../graphql/generated';
import { CredentialsContext } from '../../context';
import { AppLookupParams } from '../api/graphql/types/AppLookupParams';
import { DistributionCertificate } from '../appstore/Credentials.types';
export declare function formatDistributionCertificate(distributionCertificate: AppleDistributionCertificateFragment, validSerialNumbers?: string[]): string;
/**
 * select a distribution certificate from an account (validity status shown on a best effort basis)
 * */
export declare function selectDistributionCertificateWithDependenciesAsync(ctx: CredentialsContext, account: AccountFragment): Promise<AppleDistributionCertificateFragment | null>;
/**
 * select a distribution certificate from a valid set (curated on a best effort basis)
 * */
export declare function selectValidDistributionCertificateAsync(ctx: CredentialsContext, appLookupParams: AppLookupParams): Promise<AppleDistributionCertificateFragment | null>;
export declare function provideOrGenerateDistributionCertificateAsync(ctx: CredentialsContext): Promise<DistributionCertificate>;

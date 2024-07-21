import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleDistributionCertificateFragment, AppleDistributionCertificateInput, AppleTeamFragment } from '../../../../../graphql/generated';
export type AppleDistributionCertificateMutationResult = AppleDistributionCertificateFragment & {
    appleTeam?: AppleTeamFragment | null;
};
export declare const AppleDistributionCertificateMutation: {
    createAppleDistributionCertificateAsync(graphqlClient: ExpoGraphqlClient, appleDistributionCertificateInput: AppleDistributionCertificateInput, accountId: string): Promise<AppleDistributionCertificateMutationResult>;
    deleteAppleDistributionCertificateAsync(graphqlClient: ExpoGraphqlClient, appleDistributionCertificateId: string): Promise<void>;
};

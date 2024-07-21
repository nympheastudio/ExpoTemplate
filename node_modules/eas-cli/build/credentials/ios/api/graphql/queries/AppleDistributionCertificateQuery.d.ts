import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleDistributionCertificateFragment, AppleDistributionCertificatesPaginatedByAccountQuery, IosDistributionType } from '../../../../../graphql/generated';
export declare const AppleDistributionCertificateQuery: {
    getForAppAsync(graphqlClient: ExpoGraphqlClient, projectFullName: string, { appleAppIdentifierId, iosDistributionType, }: {
        appleAppIdentifierId: string;
        iosDistributionType: IosDistributionType;
    }): Promise<AppleDistributionCertificateFragment | null>;
    getAllForAccountAsync(graphqlClient: ExpoGraphqlClient, accountName: string): Promise<AppleDistributionCertificateFragment[]>;
    getAllForAccountPaginatedAsync(graphqlClient: ExpoGraphqlClient, accountName: string, { after, first, before, last, }: {
        after?: string | undefined;
        first?: number | undefined;
        before?: string | undefined;
        last?: number | undefined;
    }): Promise<AppleDistributionCertificatesPaginatedByAccountQuery['account']['byName']['appleDistributionCertificatesPaginated']>;
};

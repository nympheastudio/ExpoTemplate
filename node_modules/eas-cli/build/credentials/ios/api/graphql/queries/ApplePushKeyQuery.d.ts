import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { ApplePushKeyFragment, ApplePushKeysPaginatedByAccountQuery } from '../../../../../graphql/generated';
export declare const ApplePushKeyQuery: {
    getAllForAccountAsync(graphqlClient: ExpoGraphqlClient, accountName: string): Promise<ApplePushKeyFragment[]>;
    getAllForAccountPaginatedAsync(graphqlClient: ExpoGraphqlClient, accountName: string, { after, first, before, last, }: {
        after?: string | undefined;
        first?: number | undefined;
        before?: string | undefined;
        last?: number | undefined;
    }): Promise<ApplePushKeysPaginatedByAccountQuery['account']['byName']['applePushKeysPaginated']>;
};

import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { GoogleServiceAccountKeyFragment, GoogleServiceAccountKeysPaginatedByAccountQuery } from '../../../../../graphql/generated';
export declare const GoogleServiceAccountKeyQuery: {
    getAllForAccountAsync(graphqlClient: ExpoGraphqlClient, accountName: string): Promise<GoogleServiceAccountKeyFragment[]>;
    getAllForAccountPaginatedAsync(graphqlClient: ExpoGraphqlClient, accountName: string, { after, first, before, last, }: {
        after?: string | undefined;
        first?: number | undefined;
        before?: string | undefined;
        last?: number | undefined;
    }): Promise<GoogleServiceAccountKeysPaginatedByAccountQuery['account']['byName']['googleServiceAccountKeysPaginated']>;
};

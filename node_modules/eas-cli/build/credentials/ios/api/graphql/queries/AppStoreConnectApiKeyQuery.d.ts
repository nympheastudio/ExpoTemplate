import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppStoreConnectApiKeyFragment, AppStoreConnectApiKeysPaginatedByAccountQuery } from '../../../../../graphql/generated';
export declare const AppStoreConnectApiKeyQuery: {
    getAllForAccountAsync(graphqlClient: ExpoGraphqlClient, accountName: string): Promise<AppStoreConnectApiKeyFragment[]>;
    getAllForAccountPaginatedAsync(graphqlClient: ExpoGraphqlClient, accountName: string, { after, first, before, last, }: {
        after?: string | undefined;
        first?: number | undefined;
        before?: string | undefined;
        last?: number | undefined;
    }): Promise<AppStoreConnectApiKeysPaginatedByAccountQuery['account']['byName']['appStoreConnectApiKeysPaginated']>;
};

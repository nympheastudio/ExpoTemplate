import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleDevice, AppleDeviceFilterInput, AppleDeviceFragment, AppleDevicesByTeamIdentifierQueryVariables, AppleDevicesPaginatedByAccountQuery, AppleTeamFragment } from '../../../../../graphql/generated';
export type AppleDeviceFragmentWithAppleTeam = AppleDeviceFragment & {
    appleTeam: AppleTeamFragment;
};
export type AppleDeviceQueryResult = Pick<AppleDevice, 'id' | 'identifier' | 'name' | 'deviceClass' | 'enabled'>;
export type AppleDevicesByTeamIdentifierQueryResult = AppleTeamFragment & {
    appleDevices: AppleDeviceQueryResult[];
};
export type AppleDevicesByIdentifierQueryResult = AppleDeviceQueryResult & {
    appleTeam: AppleTeamFragment;
};
export declare const AppleDeviceQuery: {
    getAllByAppleTeamIdentifierAsync(graphqlClient: ExpoGraphqlClient, accountName: string, appleTeamIdentifier: string, { useCache }?: {
        useCache?: boolean | undefined;
    }): Promise<AppleDeviceFragmentWithAppleTeam[]>;
    getAllForAppleTeamAsync(graphqlClient: ExpoGraphqlClient, { accountName, appleTeamIdentifier, offset, limit }: AppleDevicesByTeamIdentifierQueryVariables): Promise<AppleDeviceFragment[]>;
    getByDeviceIdentifierAsync(graphqlClient: ExpoGraphqlClient, accountName: string, identifier: string): Promise<AppleDeviceFragmentWithAppleTeam>;
    getAllForAccountPaginatedAsync(graphqlClient: ExpoGraphqlClient, accountName: string, { after, first, before, last, filter, useCache, }: {
        after?: string | undefined;
        first?: number | undefined;
        before?: string | undefined;
        last?: number | undefined;
        filter?: AppleDeviceFilterInput | undefined;
        useCache?: boolean | undefined;
    }): Promise<AppleDevicesPaginatedByAccountQuery['account']['byName']['appleDevicesPaginated']>;
};

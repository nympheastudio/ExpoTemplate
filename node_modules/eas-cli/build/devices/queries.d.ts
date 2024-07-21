import { AppleTeamIdAndName } from './utils/formatDevice';
import { ExpoGraphqlClient } from '../commandUtils/context/contextUtils/createGraphqlClient';
import { PaginatedQueryOptions } from '../commandUtils/pagination';
import { AppleDeviceFragment, AppleTeamFragment } from '../graphql/generated';
export declare const TEAMS_LIMIT = 50;
export declare const DEVICES_LIMIT = 50;
export declare function selectAppleTeamOnAccountAsync(graphqlClient: ExpoGraphqlClient, { accountName, selectionPromptTitle, paginatedQueryOptions, }: {
    accountName: string;
    selectionPromptTitle: string;
    paginatedQueryOptions: PaginatedQueryOptions;
}): Promise<AppleTeamFragment>;
export declare function selectAppleDeviceOnAppleTeamAsync(graphqlClient: ExpoGraphqlClient, { accountName, appleTeamIdentifier, selectionPromptTitle, paginatedQueryOptions, }: {
    accountName: string;
    appleTeamIdentifier: string;
    selectionPromptTitle: string;
    paginatedQueryOptions: PaginatedQueryOptions;
}): Promise<AppleDeviceFragment>;
export declare function listAndRenderAppleDevicesOnAppleTeamAsync(graphqlClient: ExpoGraphqlClient, { accountName, appleTeam, paginatedQueryOptions, }: {
    accountName: string;
    appleTeam: AppleTeamIdAndName;
    paginatedQueryOptions: PaginatedQueryOptions;
}): Promise<void>;

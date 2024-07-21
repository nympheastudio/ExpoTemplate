import { ExpoGraphqlClient } from '../commandUtils/context/contextUtils/createGraphqlClient';
import { PaginatedQueryOptions } from '../commandUtils/pagination';
import { BuildFilter, BuildFragment } from '../graphql/generated';
export declare const BUILDS_LIMIT = 50;
export declare function listAndRenderBuildsOnAppAsync(graphqlClient: ExpoGraphqlClient, { projectId, projectDisplayName, filter, paginatedQueryOptions, }: {
    projectId: string;
    projectDisplayName: string;
    filter?: BuildFilter;
    paginatedQueryOptions: PaginatedQueryOptions;
}): Promise<void>;
export declare function listAndSelectBuildOnAppAsync(graphqlClient: ExpoGraphqlClient, { projectId, title, filter, paginatedQueryOptions, selectPromptDisabledFunction, selectPromptWarningMessage, }: {
    projectId: string;
    title: string;
    filter?: BuildFilter;
    paginatedQueryOptions: PaginatedQueryOptions;
    selectPromptDisabledFunction?: (build: BuildFragment) => boolean;
    selectPromptWarningMessage?: string;
}): Promise<BuildFragment | null>;
export declare function getLatestBuildAsync(graphqlClient: ExpoGraphqlClient, { projectId, filter, }: {
    projectId: string;
    filter?: BuildFilter;
}): Promise<BuildFragment | null>;

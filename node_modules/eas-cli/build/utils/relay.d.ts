import { PageInfo } from '../graphql/generated';
export type Connection<T> = {
    edges: Edge<T>[];
    pageInfo: PageInfo;
};
export type Edge<T> = {
    cursor: string;
    node: T;
};
export type QueryParams = {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
};
/**
 *
 * Pagination that performs client side filtering on the nodes returned from a relay compliant datasource.
 *
 * @param queryParams The query params for the pagination.
 * @param queryAsync A promise based function for querying.
 * @param filterPredicate A predicate function to filter the node.
 * @param beforeEachQuery Optional. A callback function to be called before each query
 * @param afterEachQuery Optional. A callback function to be called after each query.
 * @param internalBatchSize Optional. The batch size of queryAsync. Defaults to 100.
 * @param maxNodesFetched Optional. The maximum number of nodes to fetch. Defaults to 10_000.
 * @param beforeEachQuery Optional. A callback function to be called before each query
 * @args externalQueryParams The query params for the pagination.
 * @args totalNodesFetched The total number of nodes fetched so far.
 * @args dataset The dataset so far.
 * @param afterEachQuery Optional. A callback function to be called after each query.
 * @args externalQueryParams The query params for the pagination.
 * @args totalNodesFetched The total number of nodes fetched so far.
 * @args dataset The dataset so far.
 * @args willFetchAgain If the query will fetch again to get a complete page.
 *
 * @throws {Error} - If an error occurs during execution of the query or pagination.
 */
export declare class FilterPagination {
    static getPageAsync<T>({ queryParams, queryAsync, filterPredicate, internalBatchSize, maxNodesFetched, beforeEachQuery, afterEachQuery, }: {
        queryParams: QueryParams;
        queryAsync: (queryParams: QueryParams) => Promise<Connection<T>>;
        filterPredicate: (node: T) => boolean;
        internalBatchSize?: number;
        maxNodesFetched?: number;
        beforeEachQuery?: (externalQueryParams: QueryParams, totalNodesFetched: number, dataset: Edge<T>[]) => void;
        afterEachQuery?: (externalQueryParams: QueryParams, totalNodesFetched: number, dataset: Edge<T>[], willFetchAgain: boolean) => void;
    }): Promise<Connection<T>>;
    static isFirstAfter(connectionArgs: QueryParams): connectionArgs is {
        first: number;
        after?: string;
    };
    static isLastBefore(connectionArgs: {
        first?: number;
        after?: string;
        last?: number;
        before?: string;
    }): connectionArgs is {
        last: number;
        before?: string;
    };
    static getFirstItemsAsync<T>({ first, after }: {
        first: number;
        after?: string;
    }, { internalBatchSize, maxNodesFetched, filterPredicate, queryAsync, beforeEachQuery, afterEachQuery, }: {
        internalBatchSize?: number;
        maxNodesFetched: number;
        filterPredicate: (node: T) => boolean;
        queryAsync: (queryParams: QueryParams) => Promise<Connection<T>>;
        beforeEachQuery?: (externalQueryParams: QueryParams, totalNodesFetched: number, dataset: Edge<T>[]) => void;
        afterEachQuery?: (externalQueryParams: QueryParams, totalNodesFetched: number, dataset: Edge<T>[], willFetchAgain: boolean) => void;
    }): Promise<Connection<T>>;
    static getLastItemsAsync<T>({ last, before }: {
        last: number;
        before?: string;
    }, { internalBatchSize, maxNodesFetched, filterPredicate, queryAsync, beforeEachQuery, afterEachQuery, }: {
        internalBatchSize?: number;
        maxNodesFetched: number;
        filterPredicate: (node: T) => boolean;
        queryAsync: (queryParams: QueryParams) => Promise<Connection<T>>;
        beforeEachQuery?: (externalQueryParams: QueryParams, totalNodesFetched: number, dataset: Edge<T>[]) => void;
        afterEachQuery?: (externalQueryParams: QueryParams, totalNodesFetched: number, dataset: Edge<T>[], willFetchAgain: boolean) => void;
    }): Promise<Connection<T>>;
}
export declare function selectPaginatedAsync<T>({ queryAsync, getTitleAsync, printedType, pageSize, }: {
    pageSize: number;
    queryAsync: (queryParams: QueryParams) => Promise<Connection<T>>;
    getTitleAsync: (node: T) => Promise<string>;
    printedType: string;
}): Promise<T | null>;
export declare const PREV_PAGE_OPTION: {
    value: symbol;
    title: string;
};
export declare const NEXT_PAGE_OPTION: {
    value: symbol;
    title: string;
};
export type PaginatedGetterAsync<Node> = (relayArgs: QueryParams) => Promise<Connection<Node>>;
export declare const PAGE_SIZE = 20;
export declare function fetchEntireDatasetAsync<Node>({ paginatedGetterAsync, progressBarLabel, }: {
    paginatedGetterAsync: PaginatedGetterAsync<Node>;
    progressBarLabel?: string;
}): Promise<Node[]>;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEntireDatasetAsync = exports.PAGE_SIZE = exports.NEXT_PAGE_OPTION = exports.PREV_PAGE_OPTION = exports.selectPaginatedAsync = exports.FilterPagination = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const cli_progress_1 = tslib_1.__importDefault(require("cli-progress"));
const prompts_1 = require("../prompts");
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
class FilterPagination {
    static async getPageAsync({ queryParams, queryAsync, filterPredicate, internalBatchSize = 100, maxNodesFetched = 10000, beforeEachQuery, afterEachQuery, }) {
        if (this.isFirstAfter(queryParams)) {
            return await this.getFirstItemsAsync(queryParams, {
                queryAsync,
                filterPredicate,
                internalBatchSize,
                maxNodesFetched,
                beforeEachQuery,
                afterEachQuery,
            });
        }
        else if (this.isLastBefore(queryParams)) {
            return await this.getLastItemsAsync(queryParams, {
                queryAsync,
                filterPredicate,
                internalBatchSize,
                maxNodesFetched,
                beforeEachQuery,
                afterEachQuery,
            });
        }
        throw new Error('Invalid query params');
    }
    static isFirstAfter(connectionArgs) {
        return 'first' in connectionArgs;
    }
    static isLastBefore(connectionArgs) {
        return 'last' in connectionArgs;
    }
    static async getFirstItemsAsync({ first, after }, { internalBatchSize, maxNodesFetched, filterPredicate, queryAsync, beforeEachQuery, afterEachQuery, }) {
        const limit = first + 1;
        const dataset = [];
        let hasMore = true;
        let afterInternal = after;
        let totalNodesFetched = 0;
        while (hasMore && dataset.length < limit) {
            if (beforeEachQuery) {
                beforeEachQuery({ first, after }, totalNodesFetched, dataset);
            }
            const result = await queryAsync({ first: internalBatchSize, after: afterInternal });
            const { edges: batchEdges, pageInfo } = result;
            const batch = batchEdges.filter(edge => filterPredicate(edge.node));
            const nodesRemaining = limit - dataset.length;
            dataset.push(...batch.slice(0, nodesRemaining));
            hasMore = pageInfo.hasNextPage;
            afterInternal = pageInfo.endCursor ?? undefined;
            totalNodesFetched += batchEdges.length;
            if (afterEachQuery) {
                afterEachQuery({ first, after }, totalNodesFetched, dataset, hasMore && dataset.length < limit);
            }
            if (totalNodesFetched >= maxNodesFetched) {
                throw new Error(`Max nodes of ${maxNodesFetched} fetched`);
            }
        }
        const edges = dataset.slice(0, first);
        return {
            edges,
            pageInfo: {
                hasNextPage: dataset.length > first,
                hasPreviousPage: false, // cannot be computed efficiently
                startCursor: edges[0]?.cursor ?? null,
                endCursor: edges[edges.length - 1]?.cursor ?? null,
            },
        };
    }
    static async getLastItemsAsync({ last, before }, { internalBatchSize, maxNodesFetched, filterPredicate, queryAsync, beforeEachQuery, afterEachQuery, }) {
        const limit = last + 1;
        const dataset = [];
        let hasMore = true;
        let beforeInternal = before;
        let totalNodesFetched = 0;
        while (hasMore && dataset.length < limit) {
            if (beforeEachQuery) {
                beforeEachQuery({ last, before }, totalNodesFetched, dataset);
            }
            const result = await queryAsync({ last: internalBatchSize, before: beforeInternal });
            const { edges: batchEdges, pageInfo } = result;
            const batch = batchEdges.filter(edge => filterPredicate(edge.node));
            const nodesRemaining = limit - dataset.length;
            // relay orders pages from first to last, so we reverse the batch to to choose the last n
            const nodesChosen = batch.reverse().slice(0, nodesRemaining);
            dataset.push(...nodesChosen);
            hasMore = pageInfo.hasPreviousPage;
            beforeInternal = pageInfo.startCursor ?? undefined;
            totalNodesFetched += batchEdges.length;
            if (afterEachQuery) {
                afterEachQuery({ last, before }, totalNodesFetched, dataset, hasMore && dataset.length < limit);
            }
            if (totalNodesFetched >= maxNodesFetched) {
                throw new Error(`Max nodes of ${maxNodesFetched} fetched`);
            }
        }
        // we reverse our dataset again to restore the original order of first to last to match relay
        const edges = dataset.slice(0, last).reverse();
        return {
            edges,
            pageInfo: {
                hasNextPage: false, // cannot be computed efficiently,
                hasPreviousPage: dataset.length > last,
                startCursor: edges[0]?.cursor ?? null,
                endCursor: edges[edges.length - 1]?.cursor ?? null,
            },
        };
    }
}
exports.FilterPagination = FilterPagination;
async function selectPaginatedAsync({ queryAsync, getTitleAsync, printedType, pageSize, }) {
    return await selectPaginatedInternalAsync({
        queryAsync,
        getTitleAsync,
        printedType,
        queryParams: { first: pageSize },
    });
}
exports.selectPaginatedAsync = selectPaginatedAsync;
exports.PREV_PAGE_OPTION = {
    value: Symbol('PREV_PAGE'),
    title: '⬆️ Previous page',
};
exports.NEXT_PAGE_OPTION = {
    value: Symbol('NEXT_PAGE'),
    title: '⬇️ Next page',
};
async function selectPaginatedInternalAsync({ queryAsync, getTitleAsync, printedType, queryParams, }) {
    const limit = queryParams.first ?? queryParams.last;
    (0, assert_1.default)(limit, 'queryParams must have either first or last');
    const connection = await queryAsync(queryParams);
    const { edges, pageInfo } = connection;
    if (edges.length === 0) {
        return null;
    }
    /*
     * The Relay spec has a weird definition on hasNextPage and hasPreviousPage:
     * 'If the client is paginating with last/before, then the server must return true if prior edges
     * exist, otherwise false. If the client is paginating with first/after, then the client may
     * return true if edges prior to after exist, if it can do so efficiently, otherwise may return false.'
     *
     * This means if we are paginating with first/after, we can't rely on pageInfo.hasPreviousPage and vice versa.
     */
    const { endCursor, hasNextPage: serverResponseHasNextPage, startCursor, hasPreviousPage: serverResponseHasPreviousPage, } = pageInfo;
    const hasPreviousPage = serverResponseHasPreviousPage || queryParams.after;
    const hasNextPage = serverResponseHasNextPage || queryParams.before;
    const nodes = edges.map(edge => edge.node);
    const options = [];
    if (hasPreviousPage) {
        options.push(exports.PREV_PAGE_OPTION);
    }
    const nodeTitles = await Promise.all(nodes.map(node => getTitleAsync(node)));
    options.push(...nodes.map((node, index) => ({ value: node, title: nodeTitles[index] })));
    if (hasNextPage) {
        options.push(exports.NEXT_PAGE_OPTION);
    }
    const { item: selectedItem } = await (0, prompts_1.promptAsync)({
        type: 'select',
        name: 'item',
        message: `Select a ${printedType}`,
        choices: options.map(option => ({
            value: option.value,
            title: option.title,
        })),
    });
    if (selectedItem === exports.PREV_PAGE_OPTION.value) {
        return await selectPaginatedInternalAsync({
            queryParams: {
                last: limit,
                before: startCursor ?? undefined,
            },
            queryAsync,
            getTitleAsync,
            printedType,
        });
    }
    else if (selectedItem === exports.NEXT_PAGE_OPTION.value) {
        return await selectPaginatedInternalAsync({
            queryParams: {
                first: limit,
                after: endCursor ?? undefined,
            },
            queryAsync,
            getTitleAsync,
            printedType,
        });
    }
    else {
        return selectedItem;
    }
}
exports.PAGE_SIZE = 20;
async function fetchEntireDatasetAsync({ paginatedGetterAsync, progressBarLabel, }) {
    // No way to know the total count of items beforehand
    let totalEstimatedWork = 10;
    const queueProgressBar = new cli_progress_1.default.SingleBar({ format: `|{bar}| ${progressBarLabel}` }, cli_progress_1.default.Presets.rect);
    const data = [];
    let cursor = undefined;
    let didStartProgressBar = false;
    let progress = 0;
    while (true) {
        const connection = await paginatedGetterAsync({ first: exports.PAGE_SIZE, after: cursor });
        const nodes = connection.edges.map(edge => edge.node);
        const hasNextPage = connection.pageInfo.hasNextPage;
        data.push(...nodes);
        if (!hasNextPage) {
            break;
        }
        cursor = connection.pageInfo.endCursor ?? undefined;
        if (!didStartProgressBar) {
            // only show the progress bar if user has more than 1 page of items
            queueProgressBar.start(totalEstimatedWork, 0);
            didStartProgressBar = true;
        }
        progress++;
        queueProgressBar.update(progress);
        if (progress >= totalEstimatedWork) {
            totalEstimatedWork = 8 * totalEstimatedWork;
            queueProgressBar.setTotal(totalEstimatedWork);
        }
    }
    if (didStartProgressBar) {
        queueProgressBar.update(totalEstimatedWork);
        queueProgressBar.stop();
    }
    return data;
}
exports.fetchEntireDatasetAsync = fetchEntireDatasetAsync;

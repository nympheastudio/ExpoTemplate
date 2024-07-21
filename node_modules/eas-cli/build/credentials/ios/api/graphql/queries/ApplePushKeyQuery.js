"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplePushKeyQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const ApplePushKey_1 = require("../../../../../graphql/types/credentials/ApplePushKey");
const relay_1 = require("../../../../../utils/relay");
exports.ApplePushKeyQuery = {
    async getAllForAccountAsync(graphqlClient, accountName) {
        const paginatedGetterAsync = async (relayArgs) => {
            return await exports.ApplePushKeyQuery.getAllForAccountPaginatedAsync(graphqlClient, accountName, relayArgs);
        };
        return await (0, relay_1.fetchEntireDatasetAsync)({
            paginatedGetterAsync,
            progressBarLabel: 'fetching Apple Push Keys...',
        });
    },
    async getAllForAccountPaginatedAsync(graphqlClient, accountName, { after, first, before, last, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query ApplePushKeysPaginatedByAccountQuery(
              $accountName: String!
              $after: String
              $first: Int
              $before: String
              $last: Int
            ) {
              account {
                byName(accountName: $accountName) {
                  id
                  applePushKeysPaginated(
                    after: $after
                    first: $first
                    before: $before
                    last: $last
                  ) {
                    edges {
                      cursor
                      node {
                        id
                        ...ApplePushKeyFragment
                      }
                    }
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                      startCursor
                      endCursor
                    }
                  }
                }
              }
            }
            ${(0, graphql_1.print)(ApplePushKey_1.ApplePushKeyFragmentNode)}
          `, {
            accountName,
            after,
            first,
            before,
            last,
        }, {
            additionalTypenames: ['ApplePushKey'],
        })
            .toPromise());
        return data.account.byName.applePushKeysPaginated;
    },
};

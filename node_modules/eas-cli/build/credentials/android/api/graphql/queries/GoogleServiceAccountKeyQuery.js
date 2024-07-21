"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleServiceAccountKeyQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const GoogleServiceAccountKey_1 = require("../../../../../graphql/types/credentials/GoogleServiceAccountKey");
const relay_1 = require("../../../../../utils/relay");
exports.GoogleServiceAccountKeyQuery = {
    async getAllForAccountAsync(graphqlClient, accountName) {
        const paginatedGetterAsync = async (relayArgs) => {
            return await exports.GoogleServiceAccountKeyQuery.getAllForAccountPaginatedAsync(graphqlClient, accountName, relayArgs);
        };
        return await (0, relay_1.fetchEntireDatasetAsync)({
            paginatedGetterAsync,
            progressBarLabel: 'fetching Google Service Account Keys...',
        });
    },
    async getAllForAccountPaginatedAsync(graphqlClient, accountName, { after, first, before, last, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query GoogleServiceAccountKeysPaginatedByAccountQuery(
              $accountName: String!
              $after: String
              $first: Int
              $before: String
              $last: Int
            ) {
              account {
                byName(accountName: $accountName) {
                  id
                  googleServiceAccountKeysPaginated(
                    after: $after
                    first: $first
                    before: $before
                    last: $last
                  ) {
                    edges {
                      cursor
                      node {
                        id
                        ...GoogleServiceAccountKeyFragment
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
            ${(0, graphql_1.print)(GoogleServiceAccountKey_1.GoogleServiceAccountKeyFragmentNode)}
          `, {
            accountName,
            after,
            first,
            before,
            last,
        }, {
            additionalTypenames: ['GoogleServiceAccountKey'],
        })
            .toPromise());
        return data.account.byName.googleServiceAccountKeysPaginated;
    },
};

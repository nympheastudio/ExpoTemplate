"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStoreConnectApiKeyQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppStoreConnectApiKey_1 = require("../../../../../graphql/types/credentials/AppStoreConnectApiKey");
const relay_1 = require("../../../../../utils/relay");
exports.AppStoreConnectApiKeyQuery = {
    async getAllForAccountAsync(graphqlClient, accountName) {
        const paginatedGetterAsync = async (relayArgs) => {
            return await exports.AppStoreConnectApiKeyQuery.getAllForAccountPaginatedAsync(graphqlClient, accountName, relayArgs);
        };
        return await (0, relay_1.fetchEntireDatasetAsync)({
            paginatedGetterAsync,
            progressBarLabel: 'fetching ASC Keys...',
        });
    },
    async getAllForAccountPaginatedAsync(graphqlClient, accountName, { after, first, before, last, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppStoreConnectApiKeysPaginatedByAccountQuery(
              $accountName: String!
              $after: String
              $first: Int
              $before: String
              $last: Int
            ) {
              account {
                byName(accountName: $accountName) {
                  id
                  appStoreConnectApiKeysPaginated(
                    after: $after
                    first: $first
                    before: $before
                    last: $last
                  ) {
                    edges {
                      cursor
                      node {
                        id
                        ...AppStoreConnectApiKeyFragment
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
            ${(0, graphql_1.print)(AppStoreConnectApiKey_1.AppStoreConnectApiKeyFragmentNode)}
          `, {
            accountName,
            after,
            first,
            before,
            last,
        }, {
            additionalTypenames: ['AppStoreConnectApiKey'],
        })
            .toPromise());
        return data.account.byName.appStoreConnectApiKeysPaginated;
    },
};

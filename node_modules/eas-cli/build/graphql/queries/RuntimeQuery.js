"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const utils_1 = require("../../branch/utils");
const client_1 = require("../client");
const Runtime_1 = require("../types/Runtime");
exports.RuntimeQuery = {
    async getRuntimesOnBranchAsync(graphqlClient, { appId, name, first, after, last, before, filter }) {
        const response = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query ViewRuntimesOnBranch(
              $appId: String!
              $name: String!
              $first: Int
              $after: String
              $last: Int
              $before: String
              $filter: RuntimeFilterInput
            ) {
              app {
                byId(appId: $appId) {
                  id
                  updateBranchByName(name: $name) {
                    id
                    runtimes(
                      first: $first
                      after: $after
                      before: $before
                      last: $last
                      filter: $filter
                    ) {
                      edges {
                        node {
                          id
                          ...RuntimeFragment
                        }
                        cursor
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
            }
            ${(0, graphql_1.print)(Runtime_1.RuntimeFragmentNode)}
          `, {
            appId,
            name,
            first,
            after,
            last,
            before,
            filter,
        }, { additionalTypenames: ['UpdateBranch', 'Runtime'] })
            .toPromise());
        const { updateBranchByName } = response.app.byId;
        if (!updateBranchByName) {
            throw new utils_1.BranchNotFoundError(`Could not find a branch named "${name}".`);
        }
        return updateBranchByName.runtimes;
    },
};

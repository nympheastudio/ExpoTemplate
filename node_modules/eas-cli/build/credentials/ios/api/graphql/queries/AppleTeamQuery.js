"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleTeamQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleTeam_1 = require("../../../../../graphql/types/credentials/AppleTeam");
exports.AppleTeamQuery = {
    async getAllForAccountAsync(graphqlClient, { accountName, offset, limit }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleTeamsByAccountName($accountName: String!, $offset: Int, $limit: Int) {
              account {
                byName(accountName: $accountName) {
                  id
                  appleTeams(offset: $offset, limit: $limit) {
                    id
                    ...AppleTeamFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
          `, { accountName, offset, limit }, {
            additionalTypenames: ['AppleTeam'],
        })
            .toPromise());
        return data.account.byName.appleTeams ?? [];
    },
    async getByAppleTeamIdentifierAsync(graphqlClient, accountId, appleTeamIdentifier) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleTeamByIdentifierQuery($accountId: ID!, $appleTeamIdentifier: String!) {
              appleTeam {
                byAppleTeamIdentifier(accountId: $accountId, identifier: $appleTeamIdentifier) {
                  id
                  ...AppleTeamFragment
                }
              }
            }
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
          `, {
            accountId,
            appleTeamIdentifier,
        }, {
            additionalTypenames: ['AppleTeam'],
        })
            .toPromise());
        return data.appleTeam.byAppleTeamIdentifier ?? null;
    },
};

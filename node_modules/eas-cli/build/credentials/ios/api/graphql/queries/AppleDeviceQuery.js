"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDeviceQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const errors_1 = require("../../../../../devices/utils/errors");
const client_1 = require("../../../../../graphql/client");
const AppleDevice_1 = require("../../../../../graphql/types/credentials/AppleDevice");
const AppleTeam_1 = require("../../../../../graphql/types/credentials/AppleTeam");
const relay_1 = require("../../../../../utils/relay");
const AppleTeamFormatting_1 = require("../../../actions/AppleTeamFormatting");
exports.AppleDeviceQuery = {
    async getAllByAppleTeamIdentifierAsync(graphqlClient, accountName, appleTeamIdentifier, { useCache = true } = {}) {
        const paginatedGetterAsync = async (relayArgs) => {
            return await exports.AppleDeviceQuery.getAllForAccountPaginatedAsync(graphqlClient, accountName, {
                ...relayArgs,
                filter: {
                    appleTeamIdentifier,
                },
                useCache,
            });
        };
        return await (0, relay_1.fetchEntireDatasetAsync)({
            paginatedGetterAsync,
            progressBarLabel: 'Fetching Apple devices...',
        });
    },
    async getAllForAppleTeamAsync(graphqlClient, { accountName, appleTeamIdentifier, offset, limit }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleDevicesByTeamIdentifier(
              $accountName: String!
              $appleTeamIdentifier: String!
              $offset: Int
              $limit: Int
            ) {
              account {
                byName(accountName: $accountName) {
                  id
                  appleTeams(appleTeamIdentifier: $appleTeamIdentifier) {
                    id
                    appleTeamIdentifier
                    appleTeamName
                    appleDevices(offset: $offset, limit: $limit) {
                      id
                      identifier
                      name
                      deviceClass
                      enabled
                      model
                      createdAt
                    }
                  }
                }
              }
            }
          `, { accountName, appleTeamIdentifier, offset, limit }, {
            additionalTypenames: ['AppleDevice', 'AppleTeam'],
        })
            .toPromise());
        const [appleTeam] = data.account.byName.appleTeams;
        const { appleDevices } = appleTeam;
        if (!appleDevices) {
            throw new Error(`Could not find devices on Apple team -- ${(0, AppleTeamFormatting_1.formatAppleTeam)(appleTeam)}`);
        }
        return appleDevices;
    },
    async getByDeviceIdentifierAsync(graphqlClient, accountName, identifier) {
        const paginatedGetterAsync = async (relayArgs) => {
            return await exports.AppleDeviceQuery.getAllForAccountPaginatedAsync(graphqlClient, accountName, {
                ...relayArgs,
                filter: {
                    identifier,
                },
            });
        };
        const devices = await (0, relay_1.fetchEntireDatasetAsync)({
            paginatedGetterAsync,
        });
        const device = devices[0];
        if (!device) {
            throw new errors_1.DeviceNotFoundError(`Device with id ${identifier} was not found on account ${accountName}.`);
        }
        return device;
    },
    async getAllForAccountPaginatedAsync(graphqlClient, accountName, { after, first, before, last, filter, useCache = true, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleDevicesPaginatedByAccountQuery(
              $accountName: String!
              $after: String
              $first: Int
              $before: String
              $last: Int
              $filter: AppleDeviceFilterInput
            ) {
              account {
                byName(accountName: $accountName) {
                  id
                  appleDevicesPaginated(
                    after: $after
                    first: $first
                    before: $before
                    last: $last
                    filter: $filter
                  ) {
                    edges {
                      cursor
                      node {
                        id
                        ...AppleDeviceFragment
                        appleTeam {
                          id
                          ...AppleTeamFragment
                        }
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
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
            ${(0, graphql_1.print)(AppleDevice_1.AppleDeviceFragmentNode)}
          `, {
            accountName,
            after,
            first,
            before,
            last,
            filter,
        }, {
            additionalTypenames: ['AppleDevice'],
            requestPolicy: useCache ? 'cache-first' : 'network-only',
        })
            .toPromise());
        return data.account.byName.appleDevicesPaginated;
    },
};

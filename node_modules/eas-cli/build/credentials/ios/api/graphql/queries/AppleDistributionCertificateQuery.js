"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDistributionCertificateQuery = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleDistributionCertificate_1 = require("../../../../../graphql/types/credentials/AppleDistributionCertificate");
const AppleTeam_1 = require("../../../../../graphql/types/credentials/AppleTeam");
const relay_1 = require("../../../../../utils/relay");
exports.AppleDistributionCertificateQuery = {
    async getForAppAsync(graphqlClient, projectFullName, { appleAppIdentifierId, iosDistributionType, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleDistributionCertificateByAppQuery(
              $projectFullName: String!
              $appleAppIdentifierId: String!
              $iosDistributionType: IosDistributionType!
            ) {
              app {
                byFullName(fullName: $projectFullName) {
                  id
                  iosAppCredentials(filter: { appleAppIdentifierId: $appleAppIdentifierId }) {
                    id
                    iosAppBuildCredentialsList(
                      filter: { iosDistributionType: $iosDistributionType }
                    ) {
                      id
                      distributionCertificate {
                        id
                        ...AppleDistributionCertificateFragment
                        appleTeam {
                          id
                          ...AppleTeamFragment
                        }
                      }
                    }
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AppleDistributionCertificate_1.AppleDistributionCertificateFragmentNode)}
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
          `, {
            projectFullName,
            appleAppIdentifierId,
            iosDistributionType,
        }, {
            additionalTypenames: [
                'AppleDistributionCertificate',
                'IosAppCredentials',
                'IosAppBuildCredentials',
            ],
        })
            .toPromise());
        (0, assert_1.default)(data.app, 'GraphQL: `app` not defined in server response');
        return (data.app.byFullName.iosAppCredentials[0]?.iosAppBuildCredentialsList[0]
            ?.distributionCertificate ?? null);
    },
    async getAllForAccountAsync(graphqlClient, accountName) {
        const paginatedGetterAsync = async (relayArgs) => {
            return await exports.AppleDistributionCertificateQuery.getAllForAccountPaginatedAsync(graphqlClient, accountName, relayArgs);
        };
        return await (0, relay_1.fetchEntireDatasetAsync)({
            paginatedGetterAsync,
            progressBarLabel: 'fetching Apple Distribution Certificates...',
        });
    },
    async getAllForAccountPaginatedAsync(graphqlClient, accountName, { after, first, before, last, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleDistributionCertificatesPaginatedByAccountQuery(
              $accountName: String!
              $after: String
              $first: Int
              $before: String
              $last: Int
            ) {
              account {
                byName(accountName: $accountName) {
                  id
                  appleDistributionCertificatesPaginated(
                    after: $after
                    first: $first
                    before: $before
                    last: $last
                  ) {
                    edges {
                      cursor
                      node {
                        id
                        ...AppleDistributionCertificateFragment
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
            ${(0, graphql_1.print)(AppleDistributionCertificate_1.AppleDistributionCertificateFragmentNode)}
          `, {
            accountName,
            after,
            first,
            before,
            last,
        }, {
            additionalTypenames: ['AppleDistributionCertificate'],
        })
            .toPromise());
        return data.account.byName.appleDistributionCertificatesPaginated;
    },
};

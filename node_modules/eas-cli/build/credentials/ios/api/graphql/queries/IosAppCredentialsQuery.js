"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IosAppCredentialsQuery = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const IosAppBuildCredentials_1 = require("../../../../../graphql/types/credentials/IosAppBuildCredentials");
const IosAppCredentials_1 = require("../../../../../graphql/types/credentials/IosAppCredentials");
exports.IosAppCredentialsQuery = {
    async withBuildCredentialsByAppIdentifierIdAsync(graphqlClient, projectFullName, { appleAppIdentifierId, iosDistributionType, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query IosAppCredentialsWithBuildCredentialsByAppIdentifierIdQuery(
              $projectFullName: String!
              $appleAppIdentifierId: String!
              $iosDistributionType: IosDistributionType
            ) {
              app {
                byFullName(fullName: $projectFullName) {
                  id
                  iosAppCredentials(filter: { appleAppIdentifierId: $appleAppIdentifierId }) {
                    id
                    ...CommonIosAppCredentialsWithoutBuildCredentialsFragment
                    iosAppBuildCredentialsList(
                      filter: { iosDistributionType: $iosDistributionType }
                    ) {
                      id
                      ...IosAppBuildCredentialsFragment
                    }
                  }
                }
              }
            }
            ${(0, graphql_1.print)(IosAppCredentials_1.CommonIosAppCredentialsWithoutBuildCredentialsFragmentNode)}
            ${(0, graphql_1.print)(IosAppBuildCredentials_1.IosAppBuildCredentialsFragmentNode)}
          `, {
            projectFullName,
            appleAppIdentifierId,
            iosDistributionType,
        }, {
            additionalTypenames: ['IosAppCredentials', 'IosAppBuildCredentials'],
        })
            .toPromise());
        (0, assert_1.default)(data.app, 'GraphQL: `app` not defined in server response');
        return data.app.byFullName.iosAppCredentials[0] ?? null;
    },
    async withCommonFieldsByAppIdentifierIdAsync(graphqlClient, projectFullName, { appleAppIdentifierId, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query CommonIosAppCredentialsWithBuildCredentialsByAppIdentifierIdQuery(
              $projectFullName: String!
              $appleAppIdentifierId: String!
            ) {
              app {
                byFullName(fullName: $projectFullName) {
                  id
                  iosAppCredentials(filter: { appleAppIdentifierId: $appleAppIdentifierId }) {
                    id
                    ...CommonIosAppCredentialsFragment
                  }
                }
              }
            }
            ${IosAppCredentials_1.CommonIosAppCredentialsFragmentNode}
          `, {
            projectFullName,
            appleAppIdentifierId,
        }, {
            additionalTypenames: ['IosAppCredentials', 'IosAppBuildCredentials', 'App'],
        })
            .toPromise());
        (0, assert_1.default)(data.app, 'GraphQL: `app` not defined in server response');
        return data.app.byFullName.iosAppCredentials[0] ?? null;
    },
};

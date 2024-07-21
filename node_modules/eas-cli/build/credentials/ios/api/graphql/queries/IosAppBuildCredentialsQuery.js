"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IosAppBuildCredentialsQuery = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const IosAppBuildCredentials_1 = require("../../../../../graphql/types/credentials/IosAppBuildCredentials");
exports.IosAppBuildCredentialsQuery = {
    async byAppIdentifierIdAndDistributionTypeAsync(graphqlClient, projectFullName, { appleAppIdentifierId, iosDistributionType, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query IosAppBuildCredentialsByAppleAppIdentiferAndDistributionQuery(
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
                      ...IosAppBuildCredentialsFragment
                    }
                  }
                }
              }
            }
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
        return data.app.byFullName.iosAppCredentials[0]?.iosAppBuildCredentialsList[0] ?? null;
    },
};

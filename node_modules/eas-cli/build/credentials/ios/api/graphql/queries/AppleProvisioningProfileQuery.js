"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleProvisioningProfileQuery = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleAppIdentifier_1 = require("../../../../../graphql/types/credentials/AppleAppIdentifier");
const AppleDevice_1 = require("../../../../../graphql/types/credentials/AppleDevice");
const AppleProvisioningProfile_1 = require("../../../../../graphql/types/credentials/AppleProvisioningProfile");
const AppleTeam_1 = require("../../../../../graphql/types/credentials/AppleTeam");
exports.AppleProvisioningProfileQuery = {
    async getForAppAsync(graphqlClient, projectFullName, { appleAppIdentifierId, iosDistributionType, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleProvisioningProfilesByAppQuery(
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
                      provisioningProfile {
                        id
                        ...AppleProvisioningProfileFragment
                        appleTeam {
                          id
                          ...AppleTeamFragment
                        }
                        appleDevices {
                          id
                          ...AppleDeviceFragment
                        }
                        appleAppIdentifier {
                          id
                          ...AppleAppIdentifierFragment
                        }
                      }
                    }
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AppleProvisioningProfile_1.AppleProvisioningProfileFragmentNode)}
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
            ${(0, graphql_1.print)(AppleDevice_1.AppleDeviceFragmentNode)}
            ${(0, graphql_1.print)(AppleAppIdentifier_1.AppleAppIdentifierFragmentNode)}
          `, {
            projectFullName,
            appleAppIdentifierId,
            iosDistributionType,
        }, {
            additionalTypenames: [
                'AppleProvisioningProfile',
                'IosAppCredentials',
                'IosAppBuildCredentials',
            ],
        })
            .toPromise());
        (0, assert_1.default)(data.app, 'GraphQL: `app` not defined in server response');
        return (data.app.byFullName.iosAppCredentials[0]?.iosAppBuildCredentialsList[0]
            ?.provisioningProfile ?? null);
    },
};

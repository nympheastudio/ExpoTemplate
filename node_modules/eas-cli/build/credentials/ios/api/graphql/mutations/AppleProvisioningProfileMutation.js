"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleProvisioningProfileMutation = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleProvisioningProfile_1 = require("../../../../../graphql/types/credentials/AppleProvisioningProfile");
const AppleTeam_1 = require("../../../../../graphql/types/credentials/AppleTeam");
exports.AppleProvisioningProfileMutation = {
    async createAppleProvisioningProfileAsync(graphqlClient, appleProvisioningProfileInput, accountId, appleAppIdentifierId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppleProvisioningProfileMutation(
              $appleProvisioningProfileInput: AppleProvisioningProfileInput!
              $accountId: ID!
              $appleAppIdentifierId: ID!
            ) {
              appleProvisioningProfile {
                createAppleProvisioningProfile(
                  appleProvisioningProfileInput: $appleProvisioningProfileInput
                  accountId: $accountId
                  appleAppIdentifierId: $appleAppIdentifierId
                ) {
                  id
                  ...AppleProvisioningProfileFragment
                  appleTeam {
                    id
                    ...AppleTeamFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AppleProvisioningProfile_1.AppleProvisioningProfileFragmentNode)}
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
          `, {
            appleProvisioningProfileInput,
            accountId,
            appleAppIdentifierId,
        })
            .toPromise());
        return data.appleProvisioningProfile.createAppleProvisioningProfile;
    },
    async updateAppleProvisioningProfileAsync(graphqlClient, appleProvisioningProfileId, appleProvisioningProfileInput) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation UpdateAppleProvisioningProfileMutation(
              $appleProvisioningProfileId: ID!
              $appleProvisioningProfileInput: AppleProvisioningProfileInput!
            ) {
              appleProvisioningProfile {
                updateAppleProvisioningProfile(
                  id: $appleProvisioningProfileId
                  appleProvisioningProfileInput: $appleProvisioningProfileInput
                ) {
                  id
                  ...AppleProvisioningProfileFragment
                  appleTeam {
                    id
                    ...AppleTeamFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AppleProvisioningProfile_1.AppleProvisioningProfileFragmentNode)}
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
          `, {
            appleProvisioningProfileId,
            appleProvisioningProfileInput,
        })
            .toPromise());
        return data.appleProvisioningProfile.updateAppleProvisioningProfile;
    },
    async deleteAppleProvisioningProfilesAsync(graphqlClient, appleProvisioningProfileIds) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteAppleProvisioningProfilesMutation($appleProvisioningProfileIds: [ID!]!) {
              appleProvisioningProfile {
                deleteAppleProvisioningProfiles(ids: $appleProvisioningProfileIds) {
                  id
                }
              }
            }
          `, {
            appleProvisioningProfileIds,
        }, {
            additionalTypenames: ['AppleProvisioningProfile', 'IosAppBuildCredentials'],
        })
            .toPromise());
    },
};

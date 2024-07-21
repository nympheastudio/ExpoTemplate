"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IosAppBuildCredentialsMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const IosAppBuildCredentials_1 = require("../../../../../graphql/types/credentials/IosAppBuildCredentials");
exports.IosAppBuildCredentialsMutation = {
    async createIosAppBuildCredentialsAsync(graphqlClient, iosAppBuildCredentialsInput, iosAppCredentialsId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateIosAppBuildCredentialsMutation(
              $iosAppBuildCredentialsInput: IosAppBuildCredentialsInput!
              $iosAppCredentialsId: ID!
            ) {
              iosAppBuildCredentials {
                createIosAppBuildCredentials(
                  iosAppBuildCredentialsInput: $iosAppBuildCredentialsInput
                  iosAppCredentialsId: $iosAppCredentialsId
                ) {
                  id
                  ...IosAppBuildCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(IosAppBuildCredentials_1.IosAppBuildCredentialsFragmentNode)}
          `, {
            iosAppBuildCredentialsInput,
            iosAppCredentialsId,
        })
            .toPromise());
        return data.iosAppBuildCredentials.createIosAppBuildCredentials;
    },
    async setDistributionCertificateAsync(graphqlClient, iosAppBuildCredentialsId, distributionCertificateId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetDistributionCertificateMutation(
              $iosAppBuildCredentialsId: ID!
              $distributionCertificateId: ID!
            ) {
              iosAppBuildCredentials {
                setDistributionCertificate(
                  id: $iosAppBuildCredentialsId
                  distributionCertificateId: $distributionCertificateId
                ) {
                  id
                  ...IosAppBuildCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(IosAppBuildCredentials_1.IosAppBuildCredentialsFragmentNode)}
          `, {
            iosAppBuildCredentialsId,
            distributionCertificateId,
        })
            .toPromise());
        return data.iosAppBuildCredentials.setDistributionCertificate;
    },
    async setProvisioningProfileAsync(graphqlClient, iosAppBuildCredentialsId, provisioningProfileId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetProvisioningProfileMutation(
              $iosAppBuildCredentialsId: ID!
              $provisioningProfileId: ID!
            ) {
              iosAppBuildCredentials {
                setProvisioningProfile(
                  id: $iosAppBuildCredentialsId
                  provisioningProfileId: $provisioningProfileId
                ) {
                  id
                  ...IosAppBuildCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(IosAppBuildCredentials_1.IosAppBuildCredentialsFragmentNode)}
          `, {
            iosAppBuildCredentialsId,
            provisioningProfileId,
        })
            .toPromise());
        (0, assert_1.default)(data.iosAppBuildCredentials.setProvisioningProfile, 'GraphQL: `setProvisioningProfile` not defined in server response');
        return data.iosAppBuildCredentials.setProvisioningProfile;
    },
};

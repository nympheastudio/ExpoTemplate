"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleDistributionCertificateMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleDistributionCertificate_1 = require("../../../../../graphql/types/credentials/AppleDistributionCertificate");
const AppleTeam_1 = require("../../../../../graphql/types/credentials/AppleTeam");
exports.AppleDistributionCertificateMutation = {
    async createAppleDistributionCertificateAsync(graphqlClient, appleDistributionCertificateInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppleDistributionCertificateMutation(
              $appleDistributionCertificateInput: AppleDistributionCertificateInput!
              $accountId: ID!
            ) {
              appleDistributionCertificate {
                createAppleDistributionCertificate(
                  appleDistributionCertificateInput: $appleDistributionCertificateInput
                  accountId: $accountId
                ) {
                  id
                  ...AppleDistributionCertificateFragment
                  appleTeam {
                    id
                    ...AppleTeamFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AppleDistributionCertificate_1.AppleDistributionCertificateFragmentNode)}
            ${(0, graphql_1.print)(AppleTeam_1.AppleTeamFragmentNode)}
          `, {
            appleDistributionCertificateInput,
            accountId,
        })
            .toPromise());
        (0, assert_1.default)(data.appleDistributionCertificate.createAppleDistributionCertificate, 'GraphQL: `createAppleDistributionCertificate` not defined in server response');
        return data.appleDistributionCertificate.createAppleDistributionCertificate;
    },
    async deleteAppleDistributionCertificateAsync(graphqlClient, appleDistributionCertificateId) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteAppleDistributionCertificateMutation(
              $appleDistributionCertificateId: ID!
            ) {
              appleDistributionCertificate {
                deleteAppleDistributionCertificate(id: $appleDistributionCertificateId) {
                  id
                }
              }
            }
          `, {
            appleDistributionCertificateId,
        }, {
            additionalTypenames: ['AppleDistributionCertificate', 'IosAppBuildCredentials'],
        })
            .toPromise());
    },
};

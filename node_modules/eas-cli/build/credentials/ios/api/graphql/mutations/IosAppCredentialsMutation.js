"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IosAppCredentialsMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const IosAppCredentials_1 = require("../../../../../graphql/types/credentials/IosAppCredentials");
exports.IosAppCredentialsMutation = {
    async createIosAppCredentialsAsync(graphqlClient, iosAppCredentialsInput, appId, appleAppIdentifierId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateIosAppCredentialsMutation(
              $iosAppCredentialsInput: IosAppCredentialsInput!
              $appId: ID!
              $appleAppIdentifierId: ID!
            ) {
              iosAppCredentials {
                createIosAppCredentials(
                  iosAppCredentialsInput: $iosAppCredentialsInput
                  appId: $appId
                  appleAppIdentifierId: $appleAppIdentifierId
                ) {
                  id
                  ...CommonIosAppCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(IosAppCredentials_1.CommonIosAppCredentialsFragmentNode)}
          `, {
            iosAppCredentialsInput,
            appId,
            appleAppIdentifierId,
        })
            .toPromise());
        (0, assert_1.default)(data.iosAppCredentials.createIosAppCredentials, 'GraphQL: `createIosAppCredentials` not defined in server response');
        return data.iosAppCredentials.createIosAppCredentials;
    },
    async setPushKeyAsync(graphqlClient, iosAppCredentialsId, pushKeyId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetPushKeyMutation($iosAppCredentialsId: ID!, $pushKeyId: ID!) {
              iosAppCredentials {
                setPushKey(id: $iosAppCredentialsId, pushKeyId: $pushKeyId) {
                  id
                  ...CommonIosAppCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(IosAppCredentials_1.CommonIosAppCredentialsFragmentNode)}
          `, {
            iosAppCredentialsId,
            pushKeyId,
        })
            .toPromise());
        return data.iosAppCredentials.setPushKey;
    },
    async setAppStoreConnectApiKeyForSubmissionsAsync(graphqlClient, iosAppCredentialsId, ascApiKeyId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetAppStoreConnectApiKeyForSubmissionsMutation(
              $iosAppCredentialsId: ID!
              $ascApiKeyId: ID!
            ) {
              iosAppCredentials {
                setAppStoreConnectApiKeyForSubmissions(
                  id: $iosAppCredentialsId
                  ascApiKeyId: $ascApiKeyId
                ) {
                  id
                  ...CommonIosAppCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(IosAppCredentials_1.CommonIosAppCredentialsFragmentNode)}
          `, {
            iosAppCredentialsId,
            ascApiKeyId,
        })
            .toPromise());
        return data.iosAppCredentials.setAppStoreConnectApiKeyForSubmissions;
    },
};

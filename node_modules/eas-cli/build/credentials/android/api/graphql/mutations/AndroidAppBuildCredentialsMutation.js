"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidAppBuildCredentialsMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AndroidAppBuildCredentials_1 = require("../../../../../graphql/types/credentials/AndroidAppBuildCredentials");
exports.AndroidAppBuildCredentialsMutation = {
    async createAndroidAppBuildCredentialsAsync(graphqlClient, androidAppBuildCredentialsInput, androidAppCredentialsId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAndroidAppBuildCredentialsMutation(
              $androidAppBuildCredentialsInput: AndroidAppBuildCredentialsInput!
              $androidAppCredentialsId: ID!
            ) {
              androidAppBuildCredentials {
                createAndroidAppBuildCredentials(
                  androidAppBuildCredentialsInput: $androidAppBuildCredentialsInput
                  androidAppCredentialsId: $androidAppCredentialsId
                ) {
                  id
                  ...AndroidAppBuildCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppBuildCredentials_1.AndroidAppBuildCredentialsFragmentNode)}
          `, {
            androidAppBuildCredentialsInput,
            androidAppCredentialsId,
        })
            .toPromise());
        (0, assert_1.default)(data.androidAppBuildCredentials.createAndroidAppBuildCredentials, 'GraphQL: `createAndroidAppBuildCredentials` not defined in server response');
        return data.androidAppBuildCredentials.createAndroidAppBuildCredentials;
    },
    async setDefaultAndroidAppBuildCredentialsAsync(graphqlClient, androidAppBuildCredentialsId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetDefaultAndroidAppBuildCredentialsMutation(
              $androidAppBuildCredentialsId: ID!
              $isDefault: Boolean!
            ) {
              androidAppBuildCredentials {
                setDefault(id: $androidAppBuildCredentialsId, isDefault: $isDefault) {
                  id
                  ...AndroidAppBuildCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppBuildCredentials_1.AndroidAppBuildCredentialsFragmentNode)}
          `, {
            androidAppBuildCredentialsId,
            isDefault: true,
        })
            .toPromise());
        (0, assert_1.default)(data, `GraphQL: 'setDefault' not defined in server response ${JSON.stringify(data)}}`);
        return data.androidAppBuildCredentials.setDefault;
    },
    async setKeystoreAsync(graphqlClient, androidAppBuildCredentialsId, keystoreId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetKeystoreMutation($androidAppBuildCredentialsId: ID!, $keystoreId: ID!) {
              androidAppBuildCredentials {
                setKeystore(id: $androidAppBuildCredentialsId, keystoreId: $keystoreId) {
                  id
                  ...AndroidAppBuildCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppBuildCredentials_1.AndroidAppBuildCredentialsFragmentNode)}
          `, {
            androidAppBuildCredentialsId,
            keystoreId,
        })
            .toPromise());
        (0, assert_1.default)(data.androidAppBuildCredentials.setKeystore, 'GraphQL: `setKeystore` not defined in server response');
        return data.androidAppBuildCredentials.setKeystore;
    },
};

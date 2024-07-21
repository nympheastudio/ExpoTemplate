"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStoreConnectApiKeyMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppStoreConnectApiKey_1 = require("../../../../../graphql/types/credentials/AppStoreConnectApiKey");
exports.AppStoreConnectApiKeyMutation = {
    async createAppStoreConnectApiKeyAsync(graphqlClient, appStoreConnectApiKeyInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppStoreConnectApiKeyMutation(
              $appStoreConnectApiKeyInput: AppStoreConnectApiKeyInput!
              $accountId: ID!
            ) {
              appStoreConnectApiKey {
                createAppStoreConnectApiKey(
                  appStoreConnectApiKeyInput: $appStoreConnectApiKeyInput
                  accountId: $accountId
                ) {
                  id
                  ...AppStoreConnectApiKeyFragment
                }
              }
            }
            ${(0, graphql_1.print)(AppStoreConnectApiKey_1.AppStoreConnectApiKeyFragmentNode)}
          `, {
            appStoreConnectApiKeyInput,
            accountId,
        })
            .toPromise());
        (0, assert_1.default)(data.appStoreConnectApiKey.createAppStoreConnectApiKey, 'GraphQL: `createAppStoreConnectApiKey` not defined in server response');
        return data.appStoreConnectApiKey.createAppStoreConnectApiKey;
    },
    async deleteAppStoreConnectApiKeyAsync(graphqlClient, appStoreConnectApiKeyId) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteAppStoreConnectApiKeyMutation($appStoreConnectApiKeyId: ID!) {
              appStoreConnectApiKey {
                deleteAppStoreConnectApiKey(id: $appStoreConnectApiKeyId) {
                  id
                }
              }
            }
          `, {
            appStoreConnectApiKeyId,
        }, {
            additionalTypenames: ['AppStoreConnectApiKey', 'IosAppCredentials'],
        })
            .toPromise());
    },
};

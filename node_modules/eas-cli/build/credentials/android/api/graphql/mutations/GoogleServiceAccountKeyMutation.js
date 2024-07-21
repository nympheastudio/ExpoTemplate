"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleServiceAccountKeyMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const GoogleServiceAccountKey_1 = require("../../../../../graphql/types/credentials/GoogleServiceAccountKey");
exports.GoogleServiceAccountKeyMutation = {
    async createGoogleServiceAccountKeyAsync(graphqlClient, googleServiceAccountKeyInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateGoogleServiceAccountKeyMutation(
              $googleServiceAccountKeyInput: GoogleServiceAccountKeyInput!
              $accountId: ID!
            ) {
              googleServiceAccountKey {
                createGoogleServiceAccountKey(
                  googleServiceAccountKeyInput: $googleServiceAccountKeyInput
                  accountId: $accountId
                ) {
                  id
                  ...GoogleServiceAccountKeyFragment
                }
              }
            }
            ${(0, graphql_1.print)(GoogleServiceAccountKey_1.GoogleServiceAccountKeyFragmentNode)}
          `, {
            googleServiceAccountKeyInput,
            accountId,
        })
            .toPromise());
        (0, assert_1.default)(data.googleServiceAccountKey.createGoogleServiceAccountKey, 'GraphQL: `createAndroidFcm` not defined in server response');
        return data.googleServiceAccountKey.createGoogleServiceAccountKey;
    },
    async deleteGoogleServiceAccountKeyAsync(graphqlClient, googleServiceAccountKeyId) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteGoogleServiceAccountKeyMutation($googleServiceAccountKeyId: ID!) {
              googleServiceAccountKey {
                deleteGoogleServiceAccountKey(id: $googleServiceAccountKeyId) {
                  id
                }
              }
            }
          `, {
            googleServiceAccountKeyId,
        }, {
            additionalTypenames: ['GoogleServiceAccountKey', 'AndroidAppCredentials'],
        })
            .toPromise());
    },
};

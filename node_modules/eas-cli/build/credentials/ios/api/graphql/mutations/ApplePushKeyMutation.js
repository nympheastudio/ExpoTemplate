"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplePushKeyMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const ApplePushKey_1 = require("../../../../../graphql/types/credentials/ApplePushKey");
exports.ApplePushKeyMutation = {
    async createApplePushKeyAsync(graphqlClient, applePushKeyInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateApplePushKeyMutation(
              $applePushKeyInput: ApplePushKeyInput!
              $accountId: ID!
            ) {
              applePushKey {
                createApplePushKey(applePushKeyInput: $applePushKeyInput, accountId: $accountId) {
                  id
                  ...ApplePushKeyFragment
                }
              }
            }
            ${(0, graphql_1.print)(ApplePushKey_1.ApplePushKeyFragmentNode)}
          `, {
            applePushKeyInput,
            accountId,
        })
            .toPromise());
        (0, assert_1.default)(data.applePushKey.createApplePushKey, 'GraphQL: `createApplePushKey` not defined in server response');
        return data.applePushKey.createApplePushKey;
    },
    async deleteApplePushKeyAsync(graphqlClient, applePushKeyId) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteApplePushKeyMutation($applePushKeyId: ID!) {
              applePushKey {
                deleteApplePushKey(id: $applePushKeyId) {
                  id
                }
              }
            }
          `, {
            applePushKeyId,
        }, {
            additionalTypenames: ['ApplePushKey', 'IosAppCredentials'],
        })
            .toPromise());
    },
};

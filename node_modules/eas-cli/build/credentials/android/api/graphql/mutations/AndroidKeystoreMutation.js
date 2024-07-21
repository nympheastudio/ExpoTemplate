"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidKeystoreMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AndroidKeystore_1 = require("../../../../../graphql/types/credentials/AndroidKeystore");
exports.AndroidKeystoreMutation = {
    async createAndroidKeystoreAsync(graphqlClient, androidKeystoreInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAndroidKeystoreMutation(
              $androidKeystoreInput: AndroidKeystoreInput!
              $accountId: ID!
            ) {
              androidKeystore {
                createAndroidKeystore(
                  androidKeystoreInput: $androidKeystoreInput
                  accountId: $accountId
                ) {
                  id
                  ...AndroidKeystoreFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidKeystore_1.AndroidKeystoreFragmentNode)}
          `, {
            androidKeystoreInput,
            accountId,
        })
            .toPromise());
        (0, assert_1.default)(data.androidKeystore.createAndroidKeystore, 'GraphQL: `createAndroidKeystore` not defined in server response');
        return data.androidKeystore.createAndroidKeystore;
    },
    async deleteAndroidKeystoreAsync(graphqlClient, androidKeystoreId) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteAndroidKeystoreMutation($androidKeystoreId: ID!) {
              androidKeystore {
                deleteAndroidKeystore(id: $androidKeystoreId) {
                  id
                }
              }
            }
          `, {
            androidKeystoreId,
        }, {
            additionalTypenames: ['AndroidKeystore', 'AndroidAppBuildCredentials'],
        })
            .toPromise());
    },
};

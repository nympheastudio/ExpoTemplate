"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidFcmMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AndroidFcm_1 = require("../../../../../graphql/types/credentials/AndroidFcm");
exports.AndroidFcmMutation = {
    async createAndroidFcmAsync(graphqlClient, androidFcmInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAndroidFcmMutation($androidFcmInput: AndroidFcmInput!, $accountId: ID!) {
              androidFcm {
                createAndroidFcm(androidFcmInput: $androidFcmInput, accountId: $accountId) {
                  id
                  ...AndroidFcmFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidFcm_1.AndroidFcmFragmentNode)}
          `, {
            androidFcmInput,
            accountId,
        })
            .toPromise());
        (0, assert_1.default)(data.androidFcm.createAndroidFcm, 'GraphQL: `createAndroidFcm` not defined in server response');
        return data.androidFcm.createAndroidFcm;
    },
    async deleteAndroidFcmAsync(graphqlClient, androidFcmId) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteAndroidFcmMutation($androidFcmId: ID!) {
              androidFcm {
                deleteAndroidFcm(id: $androidFcmId) {
                  id
                }
              }
            }
          `, {
            androidFcmId,
        }, {
            additionalTypenames: ['AndroidFcm', 'AndroidAppCredentials'],
        })
            .toPromise());
    },
};

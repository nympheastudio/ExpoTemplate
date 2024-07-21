"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentSecretMutation = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
const EnvironmentSecret_1 = require("../types/EnvironmentSecret");
exports.EnvironmentSecretMutation = {
    async createForAccountAsync(graphqlClient, input, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateEnvironmentSecretForAccount(
              $input: CreateEnvironmentSecretInput!
              $accountId: String!
            ) {
              environmentSecret {
                createEnvironmentSecretForAccount(
                  environmentSecretData: $input
                  accountId: $accountId
                ) {
                  id
                  ...EnvironmentSecretFragment
                }
              }
            }
            ${(0, graphql_1.print)(EnvironmentSecret_1.EnvironmentSecretFragmentNode)}
          `, { input, accountId })
            .toPromise());
        return data.environmentSecret.createEnvironmentSecretForAccount;
    },
    async createForAppAsync(graphqlClient, input, appId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateEnvironmentSecretForApp(
              $input: CreateEnvironmentSecretInput!
              $appId: String!
            ) {
              environmentSecret {
                createEnvironmentSecretForApp(environmentSecretData: $input, appId: $appId) {
                  id
                  ...EnvironmentSecretFragment
                }
              }
            }
            ${(0, graphql_1.print)(EnvironmentSecret_1.EnvironmentSecretFragmentNode)}
          `, { input, appId })
            .toPromise());
        return data.environmentSecret.createEnvironmentSecretForApp;
    },
    async deleteAsync(graphqlClient, id) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteEnvironmentSecret($id: String!) {
              environmentSecret {
                deleteEnvironmentSecret(id: $id) {
                  id
                }
              }
            }
          `, { id })
            .toPromise());
        return data.environmentSecret.deleteEnvironmentSecret;
    },
};

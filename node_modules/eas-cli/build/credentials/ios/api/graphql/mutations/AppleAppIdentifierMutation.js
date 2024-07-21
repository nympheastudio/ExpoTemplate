"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleAppIdentifierMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleAppIdentifier_1 = require("../../../../../graphql/types/credentials/AppleAppIdentifier");
exports.AppleAppIdentifierMutation = {
    async createAppleAppIdentifierAsync(graphqlClient, appleAppIdentifierInput, accountId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppleAppIdentifierMutation(
              $appleAppIdentifierInput: AppleAppIdentifierInput!
              $accountId: ID!
            ) {
              appleAppIdentifier {
                createAppleAppIdentifier(
                  appleAppIdentifierInput: $appleAppIdentifierInput
                  accountId: $accountId
                ) {
                  id
                  ...AppleAppIdentifierFragment
                }
              }
            }
            ${(0, graphql_1.print)(AppleAppIdentifier_1.AppleAppIdentifierFragmentNode)}
          `, {
            appleAppIdentifierInput,
            accountId,
        })
            .toPromise());
        (0, assert_1.default)(data.appleAppIdentifier.createAppleAppIdentifier, 'GraphQL: `createAppleAppIdentifier` not defined in server response');
        return data.appleAppIdentifier.createAppleAppIdentifier;
    },
};

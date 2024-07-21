"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleAppIdentifierQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AppleAppIdentifier_1 = require("../../../../../graphql/types/credentials/AppleAppIdentifier");
exports.AppleAppIdentifierQuery = {
    async byBundleIdentifierAsync(graphqlClient, accountName, bundleIdentifier) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query AppleAppIdentifierByBundleIdQuery(
              $accountName: String!
              $bundleIdentifier: String!
            ) {
              account {
                byName(accountName: $accountName) {
                  id
                  appleAppIdentifiers(bundleIdentifier: $bundleIdentifier) {
                    id
                    ...AppleAppIdentifierFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AppleAppIdentifier_1.AppleAppIdentifierFragmentNode)}
          `, {
            accountName,
            bundleIdentifier,
        }, {
            additionalTypenames: ['AppleAppIdentifier'],
        })
            .toPromise());
        return data.account.byName.appleAppIdentifiers[0];
    },
};

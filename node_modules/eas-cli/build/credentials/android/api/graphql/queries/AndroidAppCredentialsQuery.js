"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidAppCredentialsQuery = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AndroidAppCredentials_1 = require("../../../../../graphql/types/credentials/AndroidAppCredentials");
exports.AndroidAppCredentialsQuery = {
    async withCommonFieldsByApplicationIdentifierAsync(graphqlClient, projectFullName, { androidApplicationIdentifier, legacyOnly, }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query CommonAndroidAppCredentialsWithBuildCredentialsByApplicationIdentifierQuery(
              $projectFullName: String!
              $applicationIdentifier: String
              $legacyOnly: Boolean
            ) {
              app {
                byFullName(fullName: $projectFullName) {
                  id
                  androidAppCredentials(
                    filter: {
                      applicationIdentifier: $applicationIdentifier
                      legacyOnly: $legacyOnly
                    }
                  ) {
                    id
                    ...CommonAndroidAppCredentialsFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppCredentials_1.CommonAndroidAppCredentialsFragmentNode)}
          `, {
            projectFullName,
            applicationIdentifier: androidApplicationIdentifier,
            legacyOnly,
        }, {
            additionalTypenames: [
                'AndroidAppCredentials',
                'AndroidAppBuildCredentials',
                'App',
                'AndroidFcm',
            ],
        })
            .toPromise());
        (0, assert_1.default)(data.app, 'GraphQL: `app` not defined in server response');
        return data.app.byFullName.androidAppCredentials[0] ?? null;
    },
};

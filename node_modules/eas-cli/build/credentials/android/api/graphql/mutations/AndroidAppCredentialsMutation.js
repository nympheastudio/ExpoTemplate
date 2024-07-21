"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidAppCredentialsMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../../../../../graphql/client");
const AndroidAppCredentials_1 = require("../../../../../graphql/types/credentials/AndroidAppCredentials");
exports.AndroidAppCredentialsMutation = {
    async createAndroidAppCredentialsAsync(graphqlClient, androidAppCredentialsInput, appId, applicationIdentifier) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAndroidAppCredentialsMutation(
              $androidAppCredentialsInput: AndroidAppCredentialsInput!
              $appId: ID!
              $applicationIdentifier: String!
            ) {
              androidAppCredentials {
                createAndroidAppCredentials(
                  androidAppCredentialsInput: $androidAppCredentialsInput
                  appId: $appId
                  applicationIdentifier: $applicationIdentifier
                ) {
                  id
                  ...CommonAndroidAppCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppCredentials_1.CommonAndroidAppCredentialsFragmentNode)}
          `, {
            androidAppCredentialsInput,
            appId,
            applicationIdentifier,
        })
            .toPromise());
        (0, assert_1.default)(data.androidAppCredentials.createAndroidAppCredentials, 'GraphQL: `createAndroidAppCredentials` not defined in server response');
        return data.androidAppCredentials.createAndroidAppCredentials;
    },
    async setFcmKeyAsync(graphqlClient, androidAppCredentialsId, fcmId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetFcmMutation($androidAppCredentialsId: ID!, $fcmId: ID!) {
              androidAppCredentials {
                setFcm(id: $androidAppCredentialsId, fcmId: $fcmId) {
                  id
                  ...CommonAndroidAppCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppCredentials_1.CommonAndroidAppCredentialsFragmentNode)}
          `, {
            androidAppCredentialsId,
            fcmId,
        })
            .toPromise());
        (0, assert_1.default)(data.androidAppCredentials.setFcm, 'GraphQL: `setFcm` not defined in server response');
        return data.androidAppCredentials.setFcm;
    },
    async setGoogleServiceAccountKeyForSubmissionsAsync(graphqlClient, androidAppCredentialsId, googleServiceAccountKeyId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetGoogleServiceAccountKeyForSubmissionsMutation(
              $androidAppCredentialsId: ID!
              $googleServiceAccountKeyId: ID!
            ) {
              androidAppCredentials {
                setGoogleServiceAccountKeyForSubmissions(
                  id: $androidAppCredentialsId
                  googleServiceAccountKeyId: $googleServiceAccountKeyId
                ) {
                  id
                  ...CommonAndroidAppCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppCredentials_1.CommonAndroidAppCredentialsFragmentNode)}
          `, {
            androidAppCredentialsId,
            googleServiceAccountKeyId,
        })
            .toPromise());
        (0, assert_1.default)(data.androidAppCredentials.setGoogleServiceAccountKeyForSubmissions, 'GraphQL: `setGoogleServiceAccountKeyForSubmissions` not defined in server response');
        return data.androidAppCredentials.setGoogleServiceAccountKeyForSubmissions;
    },
    async setGoogleServiceAccountKeyForFcmV1Async(graphqlClient, androidAppCredentialsId, googleServiceAccountKeyId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation SetGoogleServiceAccountKeyForFcmV1Mutation(
              $androidAppCredentialsId: ID!
              $googleServiceAccountKeyId: ID!
            ) {
              androidAppCredentials {
                setGoogleServiceAccountKeyForFcmV1(
                  id: $androidAppCredentialsId
                  googleServiceAccountKeyId: $googleServiceAccountKeyId
                ) {
                  id
                  ...CommonAndroidAppCredentialsFragment
                }
              }
            }
            ${(0, graphql_1.print)(AndroidAppCredentials_1.CommonAndroidAppCredentialsFragmentNode)}
          `, {
            androidAppCredentialsId,
            googleServiceAccountKeyId,
        })
            .toPromise());
        (0, assert_1.default)(data.androidAppCredentials.setGoogleServiceAccountKeyForFcmV1, 'GraphQL: `setGoogleServiceAccountKeyForFcmV1` not defined in server response');
        return data.androidAppCredentials.setGoogleServiceAccountKeyForFcmV1;
    },
};

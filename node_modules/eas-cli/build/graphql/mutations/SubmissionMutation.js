"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionMutation = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const client_1 = require("../client");
const Submission_1 = require("../types/Submission");
exports.SubmissionMutation = {
    async createAndroidSubmissionAsync(graphqlClient, input) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAndroidSubmissionMutation(
              $appId: ID!
              $config: AndroidSubmissionConfigInput!
              $submittedBuildId: ID
              $archiveSource: SubmissionArchiveSourceInput
            ) {
              submission {
                createAndroidSubmission(
                  input: {
                    appId: $appId
                    config: $config
                    submittedBuildId: $submittedBuildId
                    archiveSource: $archiveSource
                  }
                ) {
                  submission {
                    id
                    ...SubmissionFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(Submission_1.SubmissionFragmentNode)}
          `, input)
            .toPromise());
        return (0, nullthrows_1.default)(data.submission.createAndroidSubmission.submission);
    },
    async createIosSubmissionAsync(graphqlClient, input) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateIosSubmissionMutation(
              $appId: ID!
              $config: IosSubmissionConfigInput!
              $submittedBuildId: ID
              $archiveSource: SubmissionArchiveSourceInput
            ) {
              submission {
                createIosSubmission(
                  input: {
                    appId: $appId
                    config: $config
                    submittedBuildId: $submittedBuildId
                    archiveSource: $archiveSource
                  }
                ) {
                  submission {
                    id
                    ...SubmissionFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(Submission_1.SubmissionFragmentNode)}
          `, input)
            .toPromise());
        return (0, nullthrows_1.default)(data.submission.createIosSubmission.submission);
    },
};

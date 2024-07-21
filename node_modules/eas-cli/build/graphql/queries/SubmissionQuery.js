"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
const Submission_1 = require("../types/Submission");
exports.SubmissionQuery = {
    async byIdAsync(graphqlClient, submissionId, { useCache = true } = {}) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query SubmissionsByIdQuery($submissionId: ID!) {
              submissions {
                byId(submissionId: $submissionId) {
                  id
                  ...SubmissionFragment
                }
              }
            }
            ${(0, graphql_1.print)(Submission_1.SubmissionFragmentNode)}
          `, { submissionId }, {
            requestPolicy: useCache ? 'cache-first' : 'network-only',
            additionalTypenames: ['Submission'],
        })
            .toPromise());
        return data.submissions.byId;
    },
    async allForAppAsync(graphqlClient, appId, { limit = 10, offset = 0, status, platform }) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query GetAllSubmissionsForApp(
              $appId: String!
              $offset: Int!
              $limit: Int!
              $status: SubmissionStatus
              $platform: AppPlatform
            ) {
              app {
                byId(appId: $appId) {
                  id
                  submissions(
                    filter: { status: $status, platform: $platform }
                    offset: $offset
                    limit: $limit
                  ) {
                    id
                    ...SubmissionFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(Submission_1.SubmissionFragmentNode)}
          `, { appId, offset, limit, status, platform }, { additionalTypenames: ['Submission'] })
            .toPromise());
        return data.app?.byId.submissions ?? [];
    },
};

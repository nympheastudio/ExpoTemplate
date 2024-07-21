"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildMutation = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const nullthrows_1 = tslib_1.__importDefault(require("nullthrows"));
const client_1 = require("../client");
const Build_1 = require("../types/Build");
exports.BuildMutation = {
    async createAndroidBuildAsync(graphqlClient, input) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAndroidBuildMutation(
              $appId: ID!
              $job: AndroidJobInput!
              $metadata: BuildMetadataInput
              $buildParams: BuildParamsInput
            ) {
              build {
                createAndroidBuild(
                  appId: $appId
                  job: $job
                  metadata: $metadata
                  buildParams: $buildParams
                ) {
                  build {
                    id
                    ...BuildFragment
                  }
                  deprecationInfo {
                    type
                    message
                  }
                }
              }
            }
            ${(0, graphql_1.print)(Build_1.BuildFragmentNode)}
          `, input, { noRetry: true })
            .toPromise());
        return (0, nullthrows_1.default)(data.build?.createAndroidBuild);
    },
    async createIosBuildAsync(graphqlClient, input) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateIosBuildMutation(
              $appId: ID!
              $job: IosJobInput!
              $metadata: BuildMetadataInput
              $buildParams: BuildParamsInput
            ) {
              build {
                createIosBuild(
                  appId: $appId
                  job: $job
                  metadata: $metadata
                  buildParams: $buildParams
                ) {
                  build {
                    id
                    ...BuildFragment
                  }
                  deprecationInfo {
                    type
                    message
                  }
                }
              }
            }
            ${(0, graphql_1.print)(Build_1.BuildFragmentNode)}
          `, input, { noRetry: true })
            .toPromise());
        return (0, nullthrows_1.default)(data.build?.createIosBuild);
    },
    async updateBuildMetadataAsync(graphqlClient, input) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation UpdateBuildMetadataMutation($buildId: ID!, $metadata: BuildMetadataInput!) {
              build {
                updateBuildMetadata(buildId: $buildId, metadata: $metadata) {
                  id
                  ...BuildFragment
                }
              }
            }
            ${(0, graphql_1.print)(Build_1.BuildFragmentNode)}
          `, input)
            .toPromise());
        return (0, nullthrows_1.default)(data.build?.updateBuildMetadata);
    },
    async retryIosBuildAsync(graphqlClient, input) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation RetryIosBuildMutation($buildId: ID!, $jobOverrides: IosJobOverridesInput!) {
              build {
                retryIosBuild(buildId: $buildId, jobOverrides: $jobOverrides) {
                  id
                  ...BuildFragment
                }
              }
            }
            ${(0, graphql_1.print)(Build_1.BuildFragmentNode)}
          `, input, { noRetry: true })
            .toPromise());
        return (0, nullthrows_1.default)(data.build?.retryIosBuild);
    },
};

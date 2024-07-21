"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppVersionQuery = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
exports.AppVersionQuery = {
    async latestVersionAsync(graphqlClient, appId, platform, applicationIdentifier) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query LatestAppVersion(
              $appId: String!
              $platform: AppPlatform!
              $applicationIdentifier: String!
            ) {
              app {
                byId(appId: $appId) {
                  id
                  latestAppVersionByPlatformAndApplicationIdentifier(
                    platform: $platform
                    applicationIdentifier: $applicationIdentifier
                  ) {
                    id
                    storeVersion
                    buildVersion
                  }
                }
              }
            }
          `, { appId, applicationIdentifier, platform }, {
            additionalTypenames: ['App', 'AppVersion'],
        })
            .toPromise());
        return data.app.byId.latestAppVersionByPlatformAndApplicationIdentifier ?? null;
    },
};

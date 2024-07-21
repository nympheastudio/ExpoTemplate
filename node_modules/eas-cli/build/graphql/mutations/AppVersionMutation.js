"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppVersionMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
exports.AppVersionMutation = {
    async createAppVersionAsync(graphqlClient, appVersionInput) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppVersionMutation($appVersionInput: AppVersionInput!) {
              appVersion {
                createAppVersion(appVersionInput: $appVersionInput) {
                  id
                }
              }
            }
          `, {
            appVersionInput,
        })
            .toPromise());
        const appVersionId = data.appVersion?.createAppVersion.id;
        (0, assert_1.default)(appVersionId, 'AppVersion ID must be defined');
        return appVersionId;
    },
};

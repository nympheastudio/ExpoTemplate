"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMutation = void 0;
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
exports.AppMutation = {
    async createAppAsync(graphqlClient, appInput) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateAppMutation($appInput: AppInput!) {
              app {
                createApp(appInput: $appInput) {
                  id
                }
              }
            }
          `, {
            appInput,
        })
            .toPromise());
        const appId = data.app?.createApp.id;
        (0, assert_1.default)(appId, 'App ID must be defined');
        return appId;
    },
};

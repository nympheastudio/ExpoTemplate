"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublishQuery = void 0;
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
exports.PublishQuery = {
    async getAssetMetadataAsync(graphqlClient, storageKeys) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query GetAssetMetadataQuery($storageKeys: [String!]!) {
              asset {
                metadata(storageKeys: $storageKeys) {
                  storageKey
                  status
                }
              }
            }
          `, {
            storageKeys,
        }, {
            requestPolicy: 'network-only',
            additionalTypenames: ['AssetMetadataResult'],
        } // Since we reptitively query this to monitor the asset upload, we need to ensure it is not cached.
        )
            .toPromise());
        return data.asset.metadata;
    },
    async getAssetLimitPerUpdateGroupAsync(graphqlClient, appId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query GetAssetLimitPerUpdateGroupForApp($appId: String!) {
              app {
                byId(appId: $appId) {
                  id
                  assetLimitPerUpdateGroup
                }
              }
            }
          `, { appId }, { additionalTypenames: [] } // required arg
        )
            .toPromise());
        return data.app.byId.assetLimitPerUpdateGroup;
    },
};

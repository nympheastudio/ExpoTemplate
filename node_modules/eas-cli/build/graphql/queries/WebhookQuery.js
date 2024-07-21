"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookQuery = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
const Webhook_1 = require("../types/Webhook");
exports.WebhookQuery = {
    async byAppIdAsync(graphqlClient, appId, webhookFilter) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query WebhooksByAppId($appId: String!, $webhookFilter: WebhookFilter) {
              app {
                byId(appId: $appId) {
                  id
                  webhooks(filter: $webhookFilter) {
                    id
                    ...WebhookFragment
                  }
                }
              }
            }
            ${(0, graphql_1.print)(Webhook_1.WebhookFragmentNode)}
          `, { appId, webhookFilter }, {
            additionalTypenames: ['Webhook'],
        })
            .toPromise());
        return data.app?.byId.webhooks ?? [];
    },
    async byIdAsync(graphqlClient, webhookId) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .query((0, graphql_tag_1.default) `
            query WebhookById($webhookId: ID!) {
              webhook {
                byId(id: $webhookId) {
                  id
                  ...WebhookFragment
                }
              }
            }
            ${(0, graphql_1.print)(Webhook_1.WebhookFragmentNode)}
          `, { webhookId }, {
            additionalTypenames: ['Webhook'],
        })
            .toPromise());
        return data.webhook.byId;
    },
};

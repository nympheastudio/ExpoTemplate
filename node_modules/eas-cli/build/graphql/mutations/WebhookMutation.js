"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookMutation = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("graphql");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const client_1 = require("../client");
const Webhook_1 = require("../types/Webhook");
exports.WebhookMutation = {
    async createWebhookAsync(graphqlClient, appId, webhookInput) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation CreateWebhookMutation($appId: String!, $webhookInput: WebhookInput!) {
              webhook {
                createWebhook(appId: $appId, webhookInput: $webhookInput) {
                  id
                  ...WebhookFragment
                }
              }
            }
            ${(0, graphql_1.print)(Webhook_1.WebhookFragmentNode)}
          `, { appId, webhookInput })
            .toPromise());
        return data.webhook.createWebhook;
    },
    async updateWebhookAsync(graphqlClient, webhookId, webhookInput) {
        const data = await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation UpdateWebhookMutation($webhookId: ID!, $webhookInput: WebhookInput!) {
              webhook {
                updateWebhook(webhookId: $webhookId, webhookInput: $webhookInput) {
                  id
                  ...WebhookFragment
                }
              }
            }
            ${(0, graphql_1.print)(Webhook_1.WebhookFragmentNode)}
          `, { webhookId, webhookInput })
            .toPromise());
        return data.webhook.updateWebhook;
    },
    async deleteWebhookAsync(graphqlClient, webhookId) {
        await (0, client_1.withErrorHandlingAsync)(graphqlClient
            .mutation((0, graphql_tag_1.default) `
            mutation DeleteWebhookMutation($webhookId: ID!) {
              webhook {
                deleteWebhook(webhookId: $webhookId) {
                  id
                }
              }
            }
          `, { webhookId })
            .toPromise());
    },
};

import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { WebhookFragment, WebhookInput } from '../generated';
export declare const WebhookMutation: {
    createWebhookAsync(graphqlClient: ExpoGraphqlClient, appId: string, webhookInput: WebhookInput): Promise<WebhookFragment>;
    updateWebhookAsync(graphqlClient: ExpoGraphqlClient, webhookId: string, webhookInput: WebhookInput): Promise<WebhookFragment>;
    deleteWebhookAsync(graphqlClient: ExpoGraphqlClient, webhookId: string): Promise<void>;
};

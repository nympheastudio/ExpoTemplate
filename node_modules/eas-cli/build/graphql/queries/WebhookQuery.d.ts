import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { WebhookFilter, WebhookFragment } from '../generated';
export declare const WebhookQuery: {
    byAppIdAsync(graphqlClient: ExpoGraphqlClient, appId: string, webhookFilter?: WebhookFilter): Promise<WebhookFragment[]>;
    byIdAsync(graphqlClient: ExpoGraphqlClient, webhookId: string): Promise<WebhookFragment>;
};

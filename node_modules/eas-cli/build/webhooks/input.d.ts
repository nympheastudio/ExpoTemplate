import { WebhookFragment, WebhookInput, WebhookType } from '../graphql/generated';
export declare function prepareInputParamsAsync({ event: maybeEvent, url: maybeUrl, secret: maybeSecret, 'non-interactive': nonInteractive, }: {
    event?: WebhookType;
    url?: string;
    secret?: string;
    'non-interactive': boolean;
}, existingWebhook?: WebhookFragment): Promise<WebhookInput>;
export declare function validateURL(url: string): boolean;
export declare function validateSecret(secret: string): boolean;

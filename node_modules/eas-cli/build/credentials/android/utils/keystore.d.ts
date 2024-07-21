import { Analytics } from '../../../analytics/AnalyticsManager';
import { ExpoGraphqlClient } from '../../../commandUtils/context/contextUtils/createGraphqlClient';
import { KeystoreWithType } from '../credentials';
export declare function keytoolCommandExistsAsync(): Promise<boolean>;
export declare function generateRandomKeystoreAsync(graphqlClient: ExpoGraphqlClient, analytics: Analytics, projectId: string): Promise<KeystoreWithType>;

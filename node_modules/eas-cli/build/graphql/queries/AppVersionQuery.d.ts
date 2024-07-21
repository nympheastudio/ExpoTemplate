import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppPlatform, AppVersion } from '../generated';
export declare const AppVersionQuery: {
    latestVersionAsync(graphqlClient: ExpoGraphqlClient, appId: string, platform: AppPlatform, applicationIdentifier: string): Promise<Pick<AppVersion, 'storeVersion' | 'buildVersion'> | null>;
};

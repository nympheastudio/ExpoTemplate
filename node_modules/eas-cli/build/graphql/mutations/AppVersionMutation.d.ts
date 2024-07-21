import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppPlatform } from '../generated';
export declare const AppVersionMutation: {
    createAppVersionAsync(graphqlClient: ExpoGraphqlClient, appVersionInput: {
        appId: string;
        platform: AppPlatform;
        applicationIdentifier: string;
        storeVersion: string;
        buildVersion: string;
        runtimeVersion?: string;
    }): Promise<string>;
};

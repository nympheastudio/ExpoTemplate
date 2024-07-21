import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { AssetMetadataResult, GetAssetLimitPerUpdateGroupForAppQuery } from '../generated';
export declare const PublishQuery: {
    getAssetMetadataAsync(graphqlClient: ExpoGraphqlClient, storageKeys: string[]): Promise<AssetMetadataResult[]>;
    getAssetLimitPerUpdateGroupAsync(graphqlClient: ExpoGraphqlClient, appId: string): Promise<GetAssetLimitPerUpdateGroupForAppQuery['app']['byId']['assetLimitPerUpdateGroup']>;
};

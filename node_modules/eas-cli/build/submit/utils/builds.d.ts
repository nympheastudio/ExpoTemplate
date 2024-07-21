import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppPlatform, BuildFragment } from '../../graphql/generated';
export declare function getRecentBuildsForSubmissionAsync(graphqlClient: ExpoGraphqlClient, platform: AppPlatform, appId: string, { limit }?: {
    limit?: number;
}): Promise<BuildFragment[]>;

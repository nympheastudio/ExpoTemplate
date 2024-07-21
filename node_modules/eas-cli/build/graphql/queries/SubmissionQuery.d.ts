import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppPlatform, SubmissionFragment, SubmissionStatus } from '../generated';
type Filters = {
    platform?: AppPlatform;
    status?: SubmissionStatus;
    offset?: number;
    limit?: number;
};
export declare const SubmissionQuery: {
    byIdAsync(graphqlClient: ExpoGraphqlClient, submissionId: string, { useCache }?: {
        useCache?: boolean | undefined;
    }): Promise<SubmissionFragment>;
    allForAppAsync(graphqlClient: ExpoGraphqlClient, appId: string, { limit, offset, status, platform }: Filters): Promise<SubmissionFragment[]>;
};
export {};

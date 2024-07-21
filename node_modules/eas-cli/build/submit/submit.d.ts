import { Platform } from '@expo/eas-build-job';
import { SubmissionContext } from './context';
import { ExpoGraphqlClient } from '../commandUtils/context/contextUtils/createGraphqlClient';
import { SubmissionFragment } from '../graphql/generated';
export declare function submitAsync<T extends Platform>(ctx: SubmissionContext<T>): Promise<SubmissionFragment>;
export declare function waitToCompleteAsync(graphqlClient: ExpoGraphqlClient, submissions: SubmissionFragment[], { verbose }?: {
    verbose?: boolean;
}): Promise<SubmissionFragment[]>;
export declare function exitWithNonZeroCodeIfSomeSubmissionsDidntFinish(submissions: SubmissionFragment[]): void;

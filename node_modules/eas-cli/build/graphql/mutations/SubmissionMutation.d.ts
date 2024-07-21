import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { CreateAndroidSubmissionInput, CreateIosSubmissionInput, SubmissionFragment } from '../generated';
export declare const SubmissionMutation: {
    createAndroidSubmissionAsync(graphqlClient: ExpoGraphqlClient, input: CreateAndroidSubmissionInput): Promise<SubmissionFragment>;
    createIosSubmissionAsync(graphqlClient: ExpoGraphqlClient, input: CreateIosSubmissionInput): Promise<SubmissionFragment>;
};

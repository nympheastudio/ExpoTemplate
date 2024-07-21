import { SubmissionFragment } from '../../graphql/generated';
export declare function displayLogsAsync(submission: SubmissionFragment, { verbose, moreSubmissions }?: {
    verbose?: boolean | undefined;
    moreSubmissions?: boolean | undefined;
}): Promise<void>;

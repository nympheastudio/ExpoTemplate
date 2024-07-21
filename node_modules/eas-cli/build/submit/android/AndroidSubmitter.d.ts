import { Platform } from '@expo/eas-build-job';
import { ServiceAccountKeyResult, ServiceAccountSource } from './ServiceAccountSource';
import { AndroidSubmissionConfigInput, SubmissionFragment } from '../../graphql/generated';
import { ArchiveSource, ResolvedArchiveSource } from '../ArchiveSource';
import BaseSubmitter, { SubmissionInput } from '../BaseSubmitter';
import { SubmissionContext } from '../context';
export interface AndroidSubmissionOptions extends Pick<AndroidSubmissionConfigInput, 'track' | 'releaseStatus' | 'changesNotSentForReview' | 'rollout'> {
    projectId: string;
    archiveSource: ArchiveSource;
    serviceAccountSource: ServiceAccountSource;
}
interface ResolvedSourceOptions {
    archive: ResolvedArchiveSource;
    serviceAccountKeyResult: ServiceAccountKeyResult;
}
export default class AndroidSubmitter extends BaseSubmitter<Platform.ANDROID, ResolvedSourceOptions, AndroidSubmissionOptions> {
    constructor(ctx: SubmissionContext<Platform.ANDROID>, options: AndroidSubmissionOptions, archive: ResolvedArchiveSource);
    createSubmissionInputAsync(resolvedSourceOptions: ResolvedSourceOptions): Promise<SubmissionInput<Platform.ANDROID>>;
    protected createPlatformSubmissionAsync({ projectId, submissionConfig, buildId, archiveSource, }: SubmissionInput<Platform.ANDROID>): Promise<SubmissionFragment>;
    private formatSubmissionConfig;
    private prepareSummaryData;
}
export {};

import { Platform } from '@expo/eas-build-job';
import { AppSpecificPasswordCredentials, AppSpecificPasswordSource } from './AppSpecificPasswordSource';
import { AscApiKeyResult, AscApiKeySource } from './AscApiKeySource';
import { IosSubmissionConfigInput, SubmissionFragment } from '../../graphql/generated';
import { ArchiveSource, ResolvedArchiveSource } from '../ArchiveSource';
import BaseSubmitter, { SubmissionInput } from '../BaseSubmitter';
import { SubmissionContext } from '../context';
export interface IosSubmissionOptions extends Pick<IosSubmissionConfigInput, 'appleIdUsername' | 'ascAppIdentifier'> {
    projectId: string;
    archiveSource: ArchiveSource;
    appSpecificPasswordSource?: AppSpecificPasswordSource;
    ascApiKeySource?: AscApiKeySource;
    isVerboseFastlaneEnabled?: boolean;
}
interface ResolvedSourceOptions {
    archive: ResolvedArchiveSource;
    credentials: {
        appSpecificPassword?: AppSpecificPasswordCredentials;
        ascApiKeyResult?: AscApiKeyResult;
    };
}
export default class IosSubmitter extends BaseSubmitter<Platform.IOS, ResolvedSourceOptions, IosSubmissionOptions> {
    constructor(ctx: SubmissionContext<Platform.IOS>, options: IosSubmissionOptions, archive: ResolvedArchiveSource);
    createSubmissionInputAsync(resolvedSourceOptions: ResolvedSourceOptions): Promise<SubmissionInput<Platform.IOS>>;
    protected createPlatformSubmissionAsync({ projectId, submissionConfig, buildId, archiveSource, }: SubmissionInput<Platform.IOS>): Promise<SubmissionFragment>;
    private formatSubmissionConfig;
    private formatAppSpecificPassword;
    private formatAscApiKeyResult;
    private prepareSummaryData;
}
export {};

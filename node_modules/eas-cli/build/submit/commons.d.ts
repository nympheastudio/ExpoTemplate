import { Platform } from '@expo/eas-build-job';
import { ArchiveSource } from './ArchiveSource';
import { SubmissionContext } from './context';
export declare function resolveArchiveSource<T extends Platform>(ctx: SubmissionContext<T>): ArchiveSource;
export declare function refreshContextSubmitProfileAsync<T extends Platform>(ctx: SubmissionContext<T>, archiveProfile: string): Promise<SubmissionContext<T>>;

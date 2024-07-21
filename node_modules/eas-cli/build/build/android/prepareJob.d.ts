import { Android, ArchiveSource, Platform } from '@expo/eas-build-job';
import { AndroidCredentials } from '../../credentials/android/AndroidCredentialsProvider';
import { BuildContext } from '../context';
interface JobData {
    projectArchive: ArchiveSource;
    credentials?: AndroidCredentials;
}
export declare function prepareJobAsync(ctx: BuildContext<Platform.ANDROID>, jobData: JobData): Promise<Android.Job>;
export {};

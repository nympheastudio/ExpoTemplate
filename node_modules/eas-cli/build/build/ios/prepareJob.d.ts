import { ArchiveSource, Ios, Platform } from '@expo/eas-build-job';
import { IosCredentials } from '../../credentials/ios/types';
import { IosJobSecretsInput } from '../../graphql/generated';
import { BuildContext } from '../context';
interface JobData {
    projectArchive: ArchiveSource;
    credentials?: IosCredentials;
    buildScheme: string;
}
export declare function prepareJobAsync(ctx: BuildContext<Platform.IOS>, jobData: JobData): Promise<Ios.Job>;
export declare function prepareCredentialsToResign(credentials: IosCredentials): IosJobSecretsInput;
export {};

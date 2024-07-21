import { Ios } from '@expo/eas-build-job';
import { IosJobInput, IosJobSecretsInput } from '../../graphql/generated';
export declare function transformJob(job: Ios.Job): IosJobInput;
export declare function transformIosSecrets(secrets: {
    buildCredentials?: Ios.BuildCredentials;
}): IosJobSecretsInput;

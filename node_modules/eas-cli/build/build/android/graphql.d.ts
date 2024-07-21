import { Android } from '@expo/eas-build-job';
import { AndroidJobInput } from '../../graphql/generated';
export declare function transformJob(job: Android.Job): AndroidJobInput;

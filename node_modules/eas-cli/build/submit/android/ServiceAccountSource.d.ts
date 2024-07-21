import { Platform } from '@expo/eas-build-job';
import { SubmissionContext } from '../context';
export declare enum ServiceAccountSourceType {
    path = 0,
    prompt = 1,
    credentialsService = 2
}
interface ServiceAccountSourceBase {
    sourceType: ServiceAccountSourceType;
}
interface ServiceAccountPathSource extends ServiceAccountSourceBase {
    sourceType: ServiceAccountSourceType.path;
    path: string;
}
interface ServiceAccountPromptSource extends ServiceAccountSourceBase {
    sourceType: ServiceAccountSourceType.prompt;
}
export interface ServiceAccountCredentialsServiceSource extends ServiceAccountSourceBase {
    sourceType: ServiceAccountSourceType.credentialsService;
    androidApplicationIdentifier?: string;
}
export type ServiceAccountKeyResult = {
    result: ServiceAccountKeyFile | ServiceAccountKeyFromExpoServers;
    summary: ServiceAccountKeySummary;
};
type ServiceAccountKeySummary = {
    source: 'local' | 'EAS servers';
    path?: string;
    email: string;
};
type ServiceAccountKeyFile = {
    googleServiceAccountKeyJson: string;
};
type ServiceAccountKeyFromExpoServers = {
    googleServiceAccountKeyId: string;
};
export type ServiceAccountSource = ServiceAccountPathSource | ServiceAccountPromptSource | ServiceAccountCredentialsServiceSource;
export declare function getServiceAccountKeyResultAsync(ctx: SubmissionContext<Platform.ANDROID>, source: ServiceAccountSource): Promise<ServiceAccountKeyResult>;
export declare function getServiceAccountKeyPathAsync(source: ServiceAccountSource): Promise<string>;
export declare function getServiceAccountFromCredentialsServiceAsync(ctx: SubmissionContext<Platform.ANDROID>, source: ServiceAccountCredentialsServiceSource): Promise<ServiceAccountKeyResult>;
export {};

import { Platform } from '@expo/eas-build-job';
import { AscApiKeyPath, MinimalAscApiKey } from '../../credentials/ios/credentials';
import { SubmissionContext } from '../context';
export declare enum AscApiKeySourceType {
    path = 0,
    prompt = 1,
    credentialsService = 2
}
interface AscApiKeySourceBase {
    sourceType: AscApiKeySourceType;
}
interface AscApiKeyCredentialsServiceSource extends AscApiKeySourceBase {
    sourceType: AscApiKeySourceType.credentialsService;
}
interface AscApiKeyPromptSource extends AscApiKeySourceBase {
    sourceType: AscApiKeySourceType.prompt;
}
interface AscApiKeyEnvVarSource extends AscApiKeySourceBase {
    sourceType: AscApiKeySourceType.path;
    path: AscApiKeyPath;
}
export type AscApiKeySource = AscApiKeyEnvVarSource | AscApiKeyPromptSource | AscApiKeyCredentialsServiceSource;
type AscApiKeySummary = {
    source: 'local' | 'EAS servers';
    path?: string;
    keyId: string;
    name?: string;
};
export type AscApiKeyFromExpoServers = {
    ascApiKeyId: string;
};
export type AscApiKeyResult = {
    result: MinimalAscApiKey | AscApiKeyFromExpoServers;
    summary: AscApiKeySummary;
};
export declare function getAscApiKeyResultAsync(ctx: SubmissionContext<Platform.IOS>, source: AscApiKeySource): Promise<AscApiKeyResult>;
export declare function getAscApiKeyLocallyAsync(ctx: SubmissionContext<Platform.IOS>, source: AscApiKeySource): Promise<AscApiKeyResult>;
export declare function getAscApiKeyPathAsync(ctx: SubmissionContext<Platform.IOS>, source: AscApiKeySource): Promise<AscApiKeyPath>;
export {};

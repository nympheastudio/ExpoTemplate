import { Platform } from '@expo/eas-build-job';
import { SubmissionContext } from '../context';
type AppStoreResult = {
    ascAppIdentifier: string;
};
export declare function ensureAppStoreConnectAppExistsAsync(ctx: SubmissionContext<Platform.IOS>): Promise<AppStoreResult>;
export {};

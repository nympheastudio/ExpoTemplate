import { Platform } from '@expo/eas-build-job';
import { SubmissionContext } from '../context';
export declare enum AppSpecificPasswordSourceType {
    userDefined = 0
}
interface AppSpecificPasswordSourceBase {
    sourceType: AppSpecificPasswordSourceType;
}
interface AppSpecificPasswordUserDefinedSource extends AppSpecificPasswordSourceBase {
    sourceType: AppSpecificPasswordSourceType.userDefined;
    appSpecificPassword: string;
}
export interface AppSpecificPasswordCredentials {
    password: string;
    appleIdUsername: string;
}
export type AppSpecificPasswordSource = AppSpecificPasswordUserDefinedSource;
export declare function getAppSpecificPasswordLocallyAsync(ctx: SubmissionContext<Platform.IOS>, source: AppSpecificPasswordSource): Promise<AppSpecificPasswordCredentials>;
export declare function getAppleIdUsernameAsync(ctx: SubmissionContext<Platform.IOS>): Promise<string>;
export {};

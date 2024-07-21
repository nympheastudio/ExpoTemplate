import { ActionInfo } from './Actions';
import { CredentialsContext } from '../context';
export declare const highLevelActions: ActionInfo[];
export declare const credentialsJsonActions: ActionInfo[];
export declare function getPushKeyActions(ctx: CredentialsContext): ActionInfo[];
export declare function getAscApiKeyActions(ctx: CredentialsContext): ActionInfo[];
export declare function getBuildCredentialsActions(ctx: CredentialsContext): ActionInfo[];

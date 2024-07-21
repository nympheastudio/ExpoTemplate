import { JSONObject } from '@expo/json-file';
import { Client } from '../../vcs/vcs';
interface Target {
    buildConfiguration?: string;
    targetName: string;
}
export declare function getManagedApplicationTargetEntitlementsAsync(projectDir: string, env: Record<string, string>, vcsClient: Client): Promise<JSONObject>;
export declare function getNativeTargetEntitlementsAsync(projectDir: string, target: Target): Promise<JSONObject | null>;
export {};

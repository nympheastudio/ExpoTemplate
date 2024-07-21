import { Platform, Workflow } from '@expo/eas-build-job';
import { Client } from '../vcs/vcs';
export declare function resolveWorkflowAsync(projectDir: string, platform: Platform, vcsClient: Client): Promise<Workflow>;
export declare function resolveWorkflowPerPlatformAsync(projectDir: string, vcsClient: Client): Promise<Record<Platform, Workflow>>;
export declare function hasIgnoredIosProjectAsync(projectDir: string, vcsClient: Client): Promise<boolean>;

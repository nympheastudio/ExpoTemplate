import { Analytics } from '../../analytics/AnalyticsManager';
import { DynamicConfigContextFn } from '../../commandUtils/context/DynamicProjectConfigContextField';
import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { Actor } from '../../user/User';
import { Client } from '../../vcs/vcs';
import { CredentialsContextProjectInfo } from '../context';
export declare class SelectPlatform {
    readonly actor: Actor;
    readonly graphqlClient: ExpoGraphqlClient;
    readonly vcsClient: Client;
    readonly analytics: Analytics;
    readonly projectInfo: CredentialsContextProjectInfo | null;
    readonly getDynamicPrivateProjectConfigAsync: DynamicConfigContextFn;
    private readonly flagPlatform?;
    constructor(actor: Actor, graphqlClient: ExpoGraphqlClient, vcsClient: Client, analytics: Analytics, projectInfo: CredentialsContextProjectInfo | null, getDynamicPrivateProjectConfigAsync: DynamicConfigContextFn, flagPlatform?: string | undefined);
    runAsync(): Promise<void>;
}

import { ExpoGraphqlClient } from '../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleTeam } from '../../../graphql/generated';
export declare function runCurrentMachineMethodAsync(graphqlClient: ExpoGraphqlClient, accountId: string, appleTeam: Pick<AppleTeam, 'appleTeamIdentifier' | 'appleTeamName' | 'id'>): Promise<void>;

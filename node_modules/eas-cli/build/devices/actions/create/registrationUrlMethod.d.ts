import { ExpoGraphqlClient } from '../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleTeam } from '../../../graphql/generated';
export declare function runRegistrationUrlMethodAsync(graphqlClient: ExpoGraphqlClient, accountId: string, appleTeam: Pick<AppleTeam, 'id'>): Promise<void>;

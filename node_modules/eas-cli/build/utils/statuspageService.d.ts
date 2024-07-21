import { ExpoGraphqlClient } from '../commandUtils/context/contextUtils/createGraphqlClient';
import { StatuspageServiceName } from '../graphql/generated';
export declare function maybeWarnAboutEasOutagesAsync(graphqlClient: ExpoGraphqlClient, serviceNames: StatuspageServiceName[]): Promise<void>;

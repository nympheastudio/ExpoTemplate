import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { StatuspageServiceFragment, StatuspageServiceName } from '../generated';
export declare const StatuspageServiceQuery: {
    statuspageServicesAsync(graphqlClient: ExpoGraphqlClient, serviceNames: StatuspageServiceName[]): Promise<StatuspageServiceFragment[]>;
};

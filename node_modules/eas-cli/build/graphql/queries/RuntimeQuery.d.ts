import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { Connection } from '../../utils/relay';
import { RuntimeFragment, ViewRuntimesOnBranchQueryVariables } from '../generated';
export declare const RuntimeQuery: {
    getRuntimesOnBranchAsync(graphqlClient: ExpoGraphqlClient, { appId, name, first, after, last, before, filter }: ViewRuntimesOnBranchQueryVariables): Promise<Connection<RuntimeFragment>>;
};

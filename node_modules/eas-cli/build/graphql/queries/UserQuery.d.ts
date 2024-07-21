import { ExpoGraphqlClient } from '../../commandUtils/context/contextUtils/createGraphqlClient';
import { CurrentUserQuery } from '../generated';
export declare const UserQuery: {
    currentUserAsync(graphqlClient: ExpoGraphqlClient): Promise<CurrentUserQuery['meActor']>;
};

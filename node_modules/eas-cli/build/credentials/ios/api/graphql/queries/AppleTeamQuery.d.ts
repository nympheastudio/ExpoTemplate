import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleTeamFragment, AppleTeamsByAccountNameQueryVariables } from '../../../../../graphql/generated';
export declare const AppleTeamQuery: {
    getAllForAccountAsync(graphqlClient: ExpoGraphqlClient, { accountName, offset, limit }: AppleTeamsByAccountNameQueryVariables): Promise<AppleTeamFragment[]>;
    getByAppleTeamIdentifierAsync(graphqlClient: ExpoGraphqlClient, accountId: string, appleTeamIdentifier: string): Promise<AppleTeamFragment | null>;
};

import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleAppIdentifierFragment, AppleAppIdentifierInput } from '../../../../../graphql/generated';
export declare const AppleAppIdentifierMutation: {
    createAppleAppIdentifierAsync(graphqlClient: ExpoGraphqlClient, appleAppIdentifierInput: AppleAppIdentifierInput, accountId: string): Promise<AppleAppIdentifierFragment>;
};

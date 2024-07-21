import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { ApplePushKeyFragment, ApplePushKeyInput } from '../../../../../graphql/generated';
export declare const ApplePushKeyMutation: {
    createApplePushKeyAsync(graphqlClient: ExpoGraphqlClient, applePushKeyInput: ApplePushKeyInput, accountId: string): Promise<ApplePushKeyFragment>;
    deleteApplePushKeyAsync(graphqlClient: ExpoGraphqlClient, applePushKeyId: string): Promise<void>;
};

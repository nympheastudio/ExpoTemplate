import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { GoogleServiceAccountKeyFragment, GoogleServiceAccountKeyInput } from '../../../../../graphql/generated';
export declare const GoogleServiceAccountKeyMutation: {
    createGoogleServiceAccountKeyAsync(graphqlClient: ExpoGraphqlClient, googleServiceAccountKeyInput: GoogleServiceAccountKeyInput, accountId: string): Promise<GoogleServiceAccountKeyFragment>;
    deleteGoogleServiceAccountKeyAsync(graphqlClient: ExpoGraphqlClient, googleServiceAccountKeyId: string): Promise<void>;
};

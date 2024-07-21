import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AndroidFcmFragment, AndroidFcmInput } from '../../../../../graphql/generated';
export declare const AndroidFcmMutation: {
    createAndroidFcmAsync(graphqlClient: ExpoGraphqlClient, androidFcmInput: AndroidFcmInput, accountId: string): Promise<AndroidFcmFragment>;
    deleteAndroidFcmAsync(graphqlClient: ExpoGraphqlClient, androidFcmId: string): Promise<void>;
};

import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AndroidKeystoreFragment, AndroidKeystoreInput } from '../../../../../graphql/generated';
export declare const AndroidKeystoreMutation: {
    createAndroidKeystoreAsync(graphqlClient: ExpoGraphqlClient, androidKeystoreInput: AndroidKeystoreInput, accountId: string): Promise<AndroidKeystoreFragment>;
    deleteAndroidKeystoreAsync(graphqlClient: ExpoGraphqlClient, androidKeystoreId: string): Promise<void>;
};

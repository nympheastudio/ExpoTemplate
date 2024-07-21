import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { CommonAndroidAppCredentialsFragment } from '../../../../../graphql/generated';
export declare const AndroidAppCredentialsQuery: {
    withCommonFieldsByApplicationIdentifierAsync(graphqlClient: ExpoGraphqlClient, projectFullName: string, { androidApplicationIdentifier, legacyOnly, }: {
        androidApplicationIdentifier?: string | undefined;
        legacyOnly?: boolean | undefined;
    }): Promise<CommonAndroidAppCredentialsFragment | null>;
};

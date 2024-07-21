import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { AppleAppIdentifierFragment } from '../../../../../graphql/generated';
export declare const AppleAppIdentifierQuery: {
    byBundleIdentifierAsync(graphqlClient: ExpoGraphqlClient, accountName: string, bundleIdentifier: string): Promise<AppleAppIdentifierFragment | null>;
};

import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { CommonIosAppCredentialsFragment, IosDistributionType } from '../../../../../graphql/generated';
export declare const IosAppCredentialsQuery: {
    withBuildCredentialsByAppIdentifierIdAsync(graphqlClient: ExpoGraphqlClient, projectFullName: string, { appleAppIdentifierId, iosDistributionType, }: {
        appleAppIdentifierId: string;
        iosDistributionType?: IosDistributionType | undefined;
    }): Promise<CommonIosAppCredentialsFragment | null>;
    withCommonFieldsByAppIdentifierIdAsync(graphqlClient: ExpoGraphqlClient, projectFullName: string, { appleAppIdentifierId, }: {
        appleAppIdentifierId: string;
    }): Promise<CommonIosAppCredentialsFragment | null>;
};

import { ExpoGraphqlClient } from '../../../../../commandUtils/context/contextUtils/createGraphqlClient';
import { IosAppBuildCredentialsFragment, IosDistributionType } from '../../../../../graphql/generated';
export declare const IosAppBuildCredentialsQuery: {
    byAppIdentifierIdAndDistributionTypeAsync(graphqlClient: ExpoGraphqlClient, projectFullName: string, { appleAppIdentifierId, iosDistributionType, }: {
        appleAppIdentifierId: string;
        iosDistributionType: IosDistributionType;
    }): Promise<IosAppBuildCredentialsFragment | null>;
};
